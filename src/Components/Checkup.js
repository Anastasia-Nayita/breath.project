import React, { useState, useEffect, useRef } from "react";
import Button from "@material-ui/core/Button";
import axios from "../axios";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { animateScroll as scroll } from "react-scroll";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        "& > *": {
            margin: theme.spacing(1),
        },
    },
    cards: {
        height: 550,
        textAlign: "center",
        margin: "10%",
    },
    large: {
        textAlign: "center",
        width: theme.spacing(10),
        height: theme.spacing(10),
        margin: theme.spacing(3),
        padding: theme.spacing(2),
        border: "solid grey",
    },
}));

export default function Checkup() {
    //console.log("🦸🏻‍♀️🦹🏻‍♀️🧝‍♀️");
    const classes = useStyles();
    const [clicked, setClicked] = useState(false);
    const [image, setImage] = useState("");

    const handleClickPh = async (e) => {
        e.preventDefault();
        console.log("choice: ", e.currentTarget.value);
        let choice = e.currentTarget.value;

        try {
            const { data } = await axios.post("/physical", { choice });
            console.log("data in try - axios", data);

            setClicked(true);
            //console.log("clicked in try", { clicked });
        } catch (err) {
            console.log("err: ", err);
        }

        if (choice === "great") {
            setImage("../images/Physically_Great.png");
        } else if (choice === "good") {
            setImage("../images/Physically_Good.png");
        } else if (choice === "poor") {
            setImage("../images/Physically_Poor.png");
        } else if (choice === "rough") {
            setImage("../images/Physically_Rough.png");
        } else if (choice === "meh") {
            setImage("../images/Physically_Meh.png");
        }
        //const cardRef = useRef();

        //scroll.scrollTo(cardRef.current.clientHeight + 100);
        scroll.scrollTo(725);
    };

    console.log("clicked  ", clicked);
    const [imageM, setImageM] = useState("");

    const handleClickMn = async (e) => {
        e.preventDefault();
        //console.log("choice: ", e.currentTarget.value);
        let choice = e.currentTarget.value;

        try {
            const { data } = await axios.post("/mentall", { choice });
            console.log("data in try - axios", data);

            setClicked(true);
            //console.log("clicked in try", { clicked });
        } catch (err) {
            console.log("err: ", err);
        }

        if (choice === "great") {
            setImageM("../images/Mentally_Great.png");
        } else if (choice === "good") {
            setImageM("../images/Mentally_Good.png");
        } else if (choice === "poor") {
            setImageM("../images/Mentally_Poor.png");
        } else if (choice === "rough") {
            setImageM("../images/Mentally_Rough.png");
        } else if (choice === "meh") {
            setImageM("../images/Mentally_Meh.png");
        }

        scroll.scrollTo(1500);
    };

    const handleClickEm = async (e) => {
        e.preventDefault();
        console.log("clicked on emotion");
    };

    ////////////////////////////////////////////////////////////////////

    // const [noDisplay, setNoDisplay] = useState(false);
    // useEffect(() => {
    //     if (clicked) setTimeout(() => setNoDisplay(true), 350);
    //     else setNoDisplay(false);
    // }, [clicked]);
    // const style = noDisplay ? { display: "none" } : null;

    ////////////////////////////////////////////////////////////////////

    // useEffect(() => {
    //     // console.log("useEffect hook component mounted");
    //     // elemRef.current.scrollTop = cardRef.current.scrollHeight;

    //
    //     console.log("clicked", clicked);
    //     // console.log("scrollTop: ", elemRef.current.scrollTop);

    //     if (clicked) {
    //         // setTimeout(
    //         //     () =>
    //         //         (elemRef.current.scrollTop = elemRef.current.scrollHeight),
    //         //     300
    //         // );
    //         // console.log(
    //         //     "cardRef.current.scrollHeight: ",
    //         //     cardRef.current.scrollHeight
    //         // );
    //         // console.log(
    //         //     "cardRef.current.clientHeight: ",
    //         //     cardRef.current.clientHeight
    //         // );

    //         console.log("useEffect scroll inside IF");

    //         window.scrollTo(0, cardRef.current.clientHeight);
    //         // elemRef.current.scrollTop = "200px";
    //     }

    //     //  elemRef.current.scrollHeight - elemRef.current.clientHeight;
    // }, [clicked]);

    return (
        <div>
            <div className="checkup-block">
                <Card className={classes.cards}>
                    <h1>Physically</h1>
                    <div className="checkup-btns">
                        <Button
                            variant="contained"
                            style={{ margin: "5% 0" }}
                            color="primary"
                            value="great"
                            onClick={(e) => handleClickPh(e)}
                        >
                            great
                        </Button>
                        <Button
                            style={{ margin: "5% 0" }}
                            variant="contained"
                            color="primary"
                            value="good"
                            onClick={(e) => handleClickPh(e)}
                        >
                            good
                        </Button>
                        <Button
                            style={{ margin: "5% 0" }}
                            variant="contained"
                            color="primary"
                            value="meh"
                            onClick={(e) => handleClickPh(e)}
                        >
                            meh
                        </Button>
                        <Button
                            style={{ margin: "5% 0" }}
                            variant="contained"
                            color="primary"
                            value="poor"
                            onClick={(e) => handleClickPh(e)}
                        >
                            poor
                        </Button>
                        <Button
                            style={{ margin: "5% 0" }}
                            variant="contained"
                            color="primary"
                            value="rough"
                            onClick={(e) => handleClickPh(e)}
                        >
                            rough
                        </Button>
                    </div>
                    <div>
                        <img
                            className="phy-img"
                            src={image || "../images/Physically_Meh.png"}
                        />
                    </div>
                </Card>

                <Card className={classes.cards}>
                    <h1>Mentally</h1>
                    <div className="checkup-btns">
                        <Button
                            variant="contained"
                            style={{ margin: "5% 0" }}
                            color="primary"
                            value="great"
                            onClick={(e) => handleClickMn(e)}
                        >
                            great
                        </Button>
                        <Button
                            style={{ margin: "5% 0" }}
                            variant="contained"
                            color="primary"
                            value="good"
                            onClick={(e) => handleClickMn(e)}
                        >
                            good
                        </Button>
                        <Button
                            style={{ margin: "5% 0" }}
                            variant="contained"
                            color="primary"
                            value="meh"
                            onClick={(e) => handleClickMn(e)}
                        >
                            meh
                        </Button>
                        <Button
                            style={{ margin: "5% 0" }}
                            variant="contained"
                            color="primary"
                            value="poor"
                            onClick={(e) => handleClickMn(e)}
                        >
                            poor
                        </Button>
                        <Button
                            style={{ margin: "5% 0" }}
                            variant="contained"
                            color="primary"
                            value="rough"
                            onClick={(e) => handleClickMn(e)}
                        >
                            rough
                        </Button>
                    </div>
                    <div>
                        <img
                            className="phy-img"
                            src={imageM || "../images/Mentally_Meh.png"}
                        />
                    </div>
                </Card>

                <Card className={classes.cards}>
                    <h1>Emotionally</h1>
                    <div className="checkup-btns-em">
                        <Avatar
                            variant="square"
                            src="../images/Emotionaly_Great.png"
                            className={classes.large}
                        />
                        <Avatar
                            variant="square"
                            src="../images/Emotionaly_Good.png"
                            className={classes.large}
                        />
                        <Avatar
                            variant="square"
                            src="../images/Emotionaly_Meh.png"
                            className={classes.large}
                        />
                        <Avatar
                            variant="square"
                            src="../images/Emotionaly_Poor.png"
                            className={classes.large}
                        />
                        <Avatar
                            variant="square"
                            src="../images/Emotionaly_Rough.png"
                            className={classes.large}
                            onClick={(e) => handleClickEm(e)}
                        />
                    </div>
                </Card>
            </div>
        </div>
    );
}
