import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import axios from "../axios";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { animateScroll as scroll } from "react-scroll";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

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
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        borderRadius: "10%",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(5, 15),
    },
    emolist: {
        listStyle: "none",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        textAlign: "center",
    },
    large: {
        textAlign: "center",
        width: theme.spacing(10),
        height: theme.spacing(10),
        margin: theme.spacing(3),
        padding: theme.spacing(2),
        border: "solid grey 0.5px",
    },
}));

export default function Checkup() {
    //console.log("🦸🏻‍♀️🦹🏻‍♀️🧝‍♀️");
    const classes = useStyles();
    const [clicked, setClicked] = useState(false);
    const [image, setImage] = useState("");
    ///////////// Modal
    const [openGreat, setOpenGreat] = useState(false);
    const [openGood, setOpenGood] = useState(false);
    const [openMeh, setOpenMeh] = useState(false);
    const [openPoor, setOpenPoor] = useState(false);
    const [openRough, setOpenRough] = useState(false);

    const handleOpen = (e) => {
        console.log("e.currentTarget.id: ", e.currentTarget.id);
        if (e.currentTarget.id == "Great") {
            setOpenGreat(true);
        } else if (e.currentTarget.id == "Good") {
            setOpenGood(true);
        } else if (e.currentTarget.id == "Meh") {
            setOpenMeh(true);
        } else if (e.currentTarget.id == "Poor") {
            setOpenPoor(true);
        } else if (e.currentTarget.id == "Rough") {
            setOpenRough(true);
        }
    };

    const handleClose = () => {
        // console.log("e.currentTarget.id: ", e.currentTarget.id);
        // if (e.currentTarget.id == "Great") {
        //     setOpenGreat(false);
        // } else if (e.currentTarget.id == "Good") {
        //     setOpenGood(false);
        // } else if (e.currentTarget.id == "Meh") {
        //     setOpenMeh(false);
        // } else if (e.currentTarget.id == "Poor") {
        //     setOpenPoor(false);
        // } else if (e.currentTarget.id == "Rough") {
        //     setOpenRough(false);
        // }

        setOpenGreat(false);
        setOpenGood(false);
        setOpenMeh(false);
        setOpenPoor(false);
        setOpenRough(false);
    };

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
        scroll.scrollTo(725, {
            delay: 500,
            smooth: true,
        });
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

        scroll.scrollTo(1500, {
            delay: 500,
            smooth: true,
        });
    };

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
                            id="Great"
                            variant="square"
                            src="../images/Emotionaly_Great.png"
                            className={classes.large}
                            onClick={handleOpen}
                        />
                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            className={classes.modal}
                            open={openGreat}
                            onClose={handleClose}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            <Fade in={openGreat}>
                                <div className={classes.paper}>
                                    <h2 id="transition-modal-title">
                                        Choose 5 descriptive emotions
                                    </h2>
                                    <h4 id="transition-modal-description">
                                        <List className={classes.emolist}>
                                            <ListItem button>
                                                <ListItemText primary="Confident" />
                                            </ListItem>
                                            <ListItem button>
                                                <ListItemText primary="Gratefull" />
                                            </ListItem>
                                            <ListItem button>
                                                <ListItemText primary="Delighted" />
                                            </ListItem>
                                            <ListItem button>
                                                <ListItemText primary="Optimistic" />
                                            </ListItem>
                                            <ListItem button>
                                                <ListItemText primary="Enthusiastic" />
                                            </ListItem>
                                            <ListItem button>
                                                <ListItemText primary="Content" />
                                            </ListItem>
                                            <ListItem button>
                                                <ListItemText primary="Joyful" />
                                            </ListItem>
                                            <ListItem button>
                                                <ListItemText primary="Loving" />
                                            </ListItem>
                                            <ListItem button>
                                                <ListItemText primary="Glad" />
                                            </ListItem>
                                            <ListItem button>
                                                <ListItemText primary="Amused" />
                                            </ListItem>
                                        </List>
                                    </h4>
                                </div>
                            </Fade>
                        </Modal>

                        <Avatar
                            id="Good"
                            variant="square"
                            src="../images/Emotionaly_Good.png"
                            className={classes.large}
                            onClick={handleOpen}
                        />
                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            className={classes.modal}
                            open={openGood}
                            onClose={handleClose}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            <Fade in={openGood}>
                                <div className={classes.paper}>
                                    <h2 id="transition-modal-title">
                                        Choose 5 descriptive emotions
                                    </h2>
                                    <h4 id="transition-modal-description">
                                        <List className={classes.emolist}>
                                            <ListItem button>
                                                <ListItemText primary="Accepted" />
                                            </ListItem>
                                            <ListItem button>
                                                <ListItemText primary="Balanced" />
                                            </ListItem>
                                            <ListItem button>
                                                <ListItemText primary="Rested" />
                                            </ListItem>
                                            <ListItem button>
                                                <ListItemText primary="Calm" />
                                            </ListItem>
                                            <ListItem button>
                                                <ListItemText primary="Peaceful" />
                                            </ListItem>
                                            <ListItem button>
                                                <ListItemText primary="Patient" />
                                            </ListItem>
                                            <ListItem button>
                                                <ListItemText primary="Grounded" />
                                            </ListItem>
                                            <ListItem button>
                                                <ListItemText primary="Neutral" />
                                            </ListItem>
                                            <ListItem button>
                                                <ListItemText primary="Focused" />
                                            </ListItem>
                                            <ListItem button>
                                                <ListItemText primary="Caring" />
                                            </ListItem>
                                        </List>
                                    </h4>
                                </div>
                            </Fade>
                        </Modal>
                        <Avatar
                            id="Meh"
                            variant="square"
                            src="../images/Emotionaly_Meh.png"
                            className={classes.large}
                            onClick={handleOpen}
                        />
                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            className={classes.modal}
                            open={openMeh}
                            onClose={handleClose}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            <Fade in={openMeh}>
                                <div className={classes.paper}>
                                    <h2 id="transition-modal-title">
                                        Choose 5 descriptive emotions
                                    </h2>
                                    <h4 id="transition-modal-description">
                                        <List className={classes.emolist}>
                                            <ListItem button>
                                                <ListItemText primary="Doubtful" />
                                            </ListItem>
                                            <ListItem button>
                                                <ListItemText primary="Uncertain" />
                                            </ListItem>
                                            <ListItem button>
                                                <ListItemText primary="Bored" />
                                            </ListItem>
                                            <ListItem button>
                                                <ListItemText primary="Indifferent" />
                                            </ListItem>
                                            <ListItem button>
                                                <ListItemText primary="Clingy" />
                                            </ListItem>
                                            <ListItem button>
                                                <ListItemText primary="Lazy" />
                                            </ListItem>
                                            <ListItem button>
                                                <ListItemText primary="Numb" />
                                            </ListItem>
                                            <ListItem button>
                                                <ListItemText primary="Powerless" />
                                            </ListItem>
                                            <ListItem button>
                                                <ListItemText primary="Invisible" />
                                            </ListItem>
                                            <ListItem button>
                                                <ListItemText primary="Unfocused" />
                                            </ListItem>
                                        </List>
                                    </h4>
                                </div>
                            </Fade>
                        </Modal>
                        <Avatar
                            id="Poor"
                            variant="square"
                            src="../images/Emotionaly_Poor.png"
                            className={classes.large}
                            onClick={(e) => handleOpen(e)}
                        />
                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            className={classes.modal}
                            open={openPoor}
                            onClose={(e) => handleClose(e)}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            <Fade in={openPoor}>
                                <div className={classes.paper}>
                                    <h2 id="transition-modal-title">
                                        Choose 5 descriptive emotions
                                    </h2>
                                    <h4 id="transition-modal-description">
                                        <List className={classes.emolist}>
                                            <ListItem button>
                                                <ListItemText primary="Anxious" />
                                            </ListItem>
                                            <ListItem button>
                                                <ListItemText primary="Cautious" />
                                            </ListItem>
                                            <ListItem button>
                                                <ListItemText primary="Lonely" />
                                            </ListItem>
                                            <ListItem button>
                                                <ListItemText primary="Vulverable" />
                                            </ListItem>
                                            <ListItem button>
                                                <ListItemText primary="Uneasy" />
                                            </ListItem>
                                            <ListItem button>
                                                <ListItemText primary="Disappointed" />
                                            </ListItem>
                                            <ListItem button>
                                                <ListItemText primary="Forgotten" />
                                            </ListItem>
                                            <ListItem button>
                                                <ListItemText primary="Tired" />
                                            </ListItem>
                                            <ListItem button>
                                                <ListItemText primary="Guilty" />
                                            </ListItem>
                                            <ListItem button>
                                                <ListItemText primary="Longing" />
                                            </ListItem>
                                        </List>
                                    </h4>
                                </div>
                            </Fade>
                        </Modal>
                        <Avatar
                            id="Rough"
                            variant="square"
                            src="../images/Emotionaly_Rough.png"
                            className={classes.large}
                            //onClick={(e) => handleClickEm(e)}
                            onClick={handleOpen}
                        />
                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            className={classes.modal}
                            open={openRough}
                            onClose={handleClose}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            <Fade in={openRough}>
                                <div className={classes.paper}>
                                    <h2 id="transition-modal-title">
                                        Choose 5 descriptive emotions
                                    </h2>
                                    <h4 id="transition-modal-description">
                                        <List className={classes.emolist}>
                                            <ListItem button>
                                                <ListItemText primary="Self-critical" />
                                            </ListItem>
                                            <ListItem button>
                                                <ListItemText primary="Annoyed" />
                                            </ListItem>
                                            <ListItem button>
                                                <ListItemText primary="Jealous" />
                                            </ListItem>
                                            <ListItem button>
                                                <ListItemText primary="Impatient" />
                                            </ListItem>
                                            <ListItem button>
                                                <ListItemText primary="Defensive" />
                                            </ListItem>
                                            <ListItem button>
                                                <ListItemText primary="Resentful" />
                                            </ListItem>
                                            <ListItem button>
                                                <ListItemText primary="Frustrated" />
                                            </ListItem>
                                            <ListItem button>
                                                <ListItemText primary="Furious" />
                                            </ListItem>
                                            <ListItem button>
                                                <ListItemText primary="Irritated" />
                                            </ListItem>
                                            <ListItem button>
                                                <ListItemText primary="Agressive" />
                                            </ListItem>
                                        </List>
                                    </h4>
                                </div>
                            </Fade>
                        </Modal>
                    </div>
                </Card>
            </div>
        </div>
    );
}
