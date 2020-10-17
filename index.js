const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const db = require("./db");
const bc = require("./bc.js");
const csurf = require("csurf");
const cryptoRandomString = require("crypto-random-string");
//const { sendEmail } = require("./ses");
const multer = require("multer");
const path = require("path");
const s3 = require("./s3");
const { s3Url } = require("./config");
const uidSafe = require("uid-safe");

const server = require("http").Server(app);
const io = require("socket.io")(server, { origins: "localhost:8080" }); /// if deploy on heroku add instead myheroukuapp.blabla - name of the port

app.use(compression());
app.use(express.static("./public"));
app.use(express.json());

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90,
});

app.use(cookieSessionMiddleware);
io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(
    express.urlencoded({
        extended: false,
    })
);

app.use(csurf());

app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    res.setHeader("x-frame-options", "deny");
    next();
});

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/",
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

//////////////////////////////////////////

app.post("/register", (req, res) => {
    const { first, last, email, password } = req.body;
    //console.log("req.body in register", req.body);
    if (first != "" && last != "" && email != "" && password != "") {
        bc.hash(password)
            .then((hashedPassword) => {
                req.body.password = hashedPassword;

                db.addUserData(first, last, email, hashedPassword)
                    .then((resultUser) => {
                        req.session.registered = true;
                        req.session.userId = resultUser.rows[0].id;
                        res.json({ error: false });
                    })

                    .catch((err) => {
                        console.log("err in post register: ", err);
                        res.send("something went wrong, try one more time");
                        res.json({ error: true });
                    });
            })
            .catch((err) => {
                console.log("err : ", err);
                res.json({ error: true });
            });
    }
});

//////////////////////////////////////////
app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/welcome");
    //res.json({ err: false });
});

app.get("/login", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (email != "" && password != "") {
        db.getUserData(email)
            .then((valid) => {
                if (valid) {
                    bc.compare(password, valid.rows[0].password)
                        .then((result) => {
                            let userId = valid.rows[0].id;
                            if (result) {
                                req.session.userId = userId;
                                res.json({ err: false });
                            } else {
                                res.json({ err: true });
                            }
                        })
                        .catch((err) => {
                            console.log("err in bc.compare: ", err);
                            res.json({ error: true });
                        });
                }
            })
            .catch((err) => console.log("err in login: ", err));
    } else {
        res.json({ err: true }); //err in db.query
    }
});

/////////////////////////////////////////////////

app.get("/user", async function (req, res) {
    //console.log("req.session in app.get.user : ", req.session);
    try {
        const { rows } = await db.getUserDataById(req.session.userId);
        //console.log("rows[0] in /user/", rows[0]);
        res.json(rows[0]);
    } catch (err) {
        console.log("err in getUserDataById: ", err);
    }
});

app.post("/uploader", uploader.single("file"), s3.upload, async function (
    req,
    res
) {
    console.log("req", req.file);
    var imageUrl;
    if (req.body.imageLink) {
        imageUrl = req.body.imageLink;
    } else {
        const filename = req.file.filename;
        imageUrl = `${s3Url}${filename}`;
        console.log("imageUrl", imageUrl);
    }

    try {
        const { rows } = await db.addProfilePic(imageUrl, req.session.userId);
        res.json(rows[0]);
    } catch (err) {
        console.log("err in addProfilePic: ", err);
    }
});

app.post("/physical", async function (req, res) {
    //console.log("req.session in app.get.user : ", req.session);
    console.log("req.body", req.body);
    try {
        const { rows } = await db.addPhysChoice(
            req.session.userId,
            req.body.choice
        );
        //console.log("rows[0] in /user/", rows[0]);
        res.json(rows[0]);
    } catch (err) {
        console.log("err in /physical: ", err);
    }
});

app.post("/mentall", async function (req, res) {
    //console.log("req.session in app.get.user : ", req.session);
    console.log("req.body", req.body);
    try {
        const { rows } = await db.addMentChoice(
            req.session.userId,
            req.body.choice
        );
        //console.log("rows[0] in /user/", rows[0]);
        res.json(rows[0]);
    } catch (err) {
        console.log("err in /mentall: ", err);
    }
});

app.get("/chart/phys", async function (req, res) {
    try {
        const { rows } = await db.getChartPhysData(req.session.userId);
        // console.log("all rows in /chart/phys", rows);
        res.json(rows);
    } catch (err) {
        console.log("err in /mentall: ", err);
    }
});

app.get("/chart/ment", async function (req, res) {
    try {
        const { rows } = await db.getChartMentData(req.session.userId);
        console.log("all rows in /chart/ment", rows);
        res.json(rows);
    } catch (err) {
        console.log("err in /mentall: ", err);
    }
});

/////////////////////////////////////////////////

app.get("*", function (req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

server.listen(8080, function () {
    console.log("Tell me something new 👸");
});

io.on("connection", (socket) => {
    console.log(`socket with ${socket.id} connected`);
    //console.log( "socket.request.session.userId: ",  socket.request.session.userId );
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }
    socket.on("disconnect", () => {
        console.log("socket with id disconnected: ", socket.id);
    });
});
