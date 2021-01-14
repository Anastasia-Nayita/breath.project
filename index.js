const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const db = require("./db");
const bc = require("./bc.js");
const csurf = require("csurf");

app.use(compression());
app.use(express.static("./public"));
app.use(express.json());
app.use(
    cookieSession({
        secret: `I'm always angry.`,
        maxAge: 1000 * 60 * 60 * 24 * 90,
    })
);
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

app.post("/register", (req, res) => {
    const { first, last, email, password } = req.body;
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

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/welcome");
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

app.get("/user", async function (req, res) {
    try {
        const { rows } = await db.getUserDataById(req.session.userId);
        res.json(rows[0]);
    } catch (err) {
        console.log("err in getUserDataById: ", err);
    }
});


app.post("/physical", async function (req, res) {
    try {
        const { rows } = await db.addPhysChoice(
            req.session.userId,
            req.body.choice
        );
        res.json(rows[0]);
    } catch (err) {
        console.log("err in /physical: ", err);
    }
});

app.post("/mentall", async function (req, res) {
    try {
        const { rows } = await db.addMentChoice(
            req.session.userId,
            req.body.choice
        );
        res.json(rows[0]);
    } catch (err) {
        console.log("err in /mentall: ", err);
    }
});

app.post("/emotional", async function (req, res) {
    try {
        const { rows } = await db.addEmoChoice(
            req.session.userId,
            req.body.newEmoChoice
        );
        res.json(rows[0]);
    } catch (err) {
        console.log("err in /emotional: ", err);
    }
});

app.get("/chart/phys", async function (req, res) {
    try {
        const { rows } = await db.getChartPhysData(req.session.userId);
        res.json(rows);
    } catch (err) {
        console.log("err in /mentall: ", err);
    }
});

app.get("/chart/ment", async function (req, res) {
    try {
        const { rows } = await db.getChartMentData(req.session.userId);
        res.json(rows);
    } catch (err) {
        console.log("err in /mentall: ", err);
    }
});

app.get("/chart/top5emo", async function (req, res) {
    try {
        const { rows } = await db.getTop5EmData(req.session.userId);
        console.log("all rows in getTop5EmData", rows);
        res.json(rows);
    } catch (err) {
        console.log("err in /top5emo: ", err);
    }
});
app.get("/chart/emo", async function (req, res) {
    try {
        const { rows } = await db.getChartEmoData(req.session.userId);
        console.log("all rows in /chart/emo", rows);
        res.json(rows);
    } catch (err) {
        console.log("err in chart/emo: ", err);
    }
});

app.get("*", function (req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.listen(8080, function () {
    console.log("server is running...");
});