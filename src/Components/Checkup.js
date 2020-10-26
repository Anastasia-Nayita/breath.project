import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import axios from "../axios";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import { animateScroll as scroll } from "react-scroll";

import Emotionally from "../Components/Emotionally";

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
}));

export default function Checkup() {
    const classes = useStyles();
    const [clicked, setClicked] = useState(false);
    const [image, setImage] = useState("");

    const handleClickPh = async (e) => {
        e.preventDefault();
        let choice = e.currentTarget.value;

        try {
            const { data } = await axios.post("/physical", { choice });
            console.log("data in try - axios", data);

            setClicked(true);
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
        scroll.scrollTo(725, {
            delay: 500,
            smooth: true,
        });
    };

    const handleMouseOverPh = async (e) => {
        let choice = e.currentTarget.value;
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
    };

    console.log("clicked  ", clicked);
    const [imageM, setImageM] = useState("");

    const handleClickMn = async (e) => {
        e.preventDefault();
        let choice = e.currentTarget.value;

        try {
            const { data } = await axios.post("/mentall", { choice });
            console.log("data in try - axios", data);

            setClicked(true);
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

        scroll.scrollTo(1500, {
            delay: 500,
            smooth: true,
        });
    };

    const handleMouseOverMn = async (e) => {
        //console.log("e.currentTarget.value: ", e.currentTarget.value);
        let choice = e.currentTarget.value;

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
    };

    return (
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
                        onMouseOver={(e) => handleMouseOverPh(e)}
                    >
                        great
                    </Button>
                    <Button
                        style={{ margin: "5% 0" }}
                        variant="contained"
                        color="primary"
                        value="good"
                        onClick={(e) => handleClickPh(e)}
                        onMouseOver={(e) => handleMouseOverPh(e)}
                    >
                        good
                    </Button>
                    <Button
                        style={{ margin: "5% 0" }}
                        variant="contained"
                        color="primary"
                        value="meh"
                        onClick={(e) => handleClickPh(e)}
                        onMouseOver={(e) => handleMouseOverPh(e)}
                    >
                        meh
                    </Button>
                    <Button
                        style={{ margin: "5% 0" }}
                        variant="contained"
                        color="primary"
                        value="poor"
                        onClick={(e) => handleClickPh(e)}
                        onMouseOver={(e) => handleMouseOverPh(e)}
                    >
                        poor
                    </Button>
                    <Button
                        style={{ margin: "5% 0" }}
                        variant="contained"
                        color="primary"
                        value="rough"
                        onClick={(e) => handleClickPh(e)}
                        onMouseOver={(e) => handleMouseOverPh(e)}
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
                        onMouseOver={(e) => handleMouseOverMn(e)}
                    >
                        great
                    </Button>
                    <Button
                        style={{ margin: "5% 0" }}
                        variant="contained"
                        color="primary"
                        value="good"
                        onClick={(e) => handleClickMn(e)}
                        onMouseOver={(e) => handleMouseOverMn(e)}
                    >
                        good
                    </Button>
                    <Button
                        style={{ margin: "5% 0" }}
                        variant="contained"
                        color="primary"
                        value="meh"
                        onClick={(e) => handleClickMn(e)}
                        onMouseOver={(e) => handleMouseOverMn(e)}
                    >
                        meh
                    </Button>
                    <Button
                        style={{ margin: "5% 0" }}
                        variant="contained"
                        color="primary"
                        value="poor"
                        onClick={(e) => handleClickMn(e)}
                        onMouseOver={(e) => handleMouseOverMn(e)}
                    >
                        poor
                    </Button>
                    <Button
                        style={{ margin: "5% 0" }}
                        variant="contained"
                        color="primary"
                        value="rough"
                        onClick={(e) => handleClickMn(e)}
                        onMouseOver={(e) => handleMouseOverMn(e)}
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
            <Emotionally />
        </div>
    );
}
