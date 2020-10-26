import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ToggleButton from "@material-ui/lab/ToggleButton";
import Button from "@material-ui/core/Button";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import axios from "../axios";

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
    emolistItem: {
        textAlign: "center",
        border: "1px solid rgba(0, 0, 0, 0.38)",
        borderRadius: "5px",

        "&:not(:first-child)": {
            border: "1px solid rgba(0, 0, 0, 0.38)",
            borderRadius: "2px",
        },

        "&:hover": {
            backgroundColor: "#FFEECB",
            color: "black",
        },
        "&[aria-pressed=true]": {
            backgroundColor: "blue",
        },
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

export default function Emotionally() {
    const classes = useStyles();

    const [openGreat, setOpenGreat] = useState(false);
    const [openGood, setOpenGood] = useState(false);
    const [openMeh, setOpenMeh] = useState(false);
    const [openPoor, setOpenPoor] = useState(false);
    const [openRough, setOpenRough] = useState(false);
    const [emoChoice, setEmoChoice] = useState([]);

    const handleOpen = (e) => {
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
        setOpenGreat(false);
        setOpenGood(false);
        setOpenMeh(false);
        setOpenPoor(false);
        setOpenRough(false);
    };

    const handleEmochoice = (e, newEmoChoice) => {
        if (newEmoChoice.length < 6) {
            setEmoChoice(newEmoChoice);
            console.log("NEWemochoice: ", newEmoChoice);
            console.log("emochoice: ", emoChoice);
        }
        if (newEmoChoice.length === 5) {
            console.log("Enougn is enough. Its 5");

            try {
                const { data } = axios.post("/emotional", { newEmoChoice });
                console.log("data in try - axios emotional", data);
            } catch (err) {
                console.log("err: ", err);
            }
        }
    };

    return (
        <>
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
                                    <ToggleButtonGroup
                                        value={emoChoice}
                                        onChange={handleEmochoice}
                                        aria-label="great"
                                        className={classes.emolist}
                                    >
                                        <ToggleButton
                                            className={classes.emolistItem}
                                            value="Confident"
                                            aria-label="Confident"
                                        >
                                            Confident
                                        </ToggleButton>
                                        <ToggleButton
                                            className={classes.emolistItem}
                                            value="Gratefull"
                                        >
                                            Gratefull
                                        </ToggleButton>
                                        <ToggleButton
                                            className={classes.emolistItem}
                                            value="Delighted"
                                        >
                                            Delighted
                                        </ToggleButton>
                                        <ToggleButton
                                            className={classes.emolistItem}
                                            value="Optimistic"
                                        >
                                            Optimistic
                                        </ToggleButton>
                                        <ToggleButton
                                            className={classes.emolistItem}
                                            value="Enthusiastic"
                                        >
                                            Enthusiastic
                                        </ToggleButton>
                                        <ToggleButton
                                            className={classes.emolistItem}
                                            value="Content"
                                        >
                                            Content
                                        </ToggleButton>
                                        <ToggleButton
                                            className={classes.emolistItem}
                                            value="Joyful"
                                        >
                                            Joyful
                                        </ToggleButton>
                                        <ToggleButton
                                            className={classes.emolistItem}
                                            value="Loving"
                                        >
                                            Loving
                                        </ToggleButton>
                                        <ToggleButton
                                            className={classes.emolistItem}
                                            value="Glad"
                                        >
                                            Glad
                                        </ToggleButton>
                                        <ToggleButton
                                            className={classes.emolistItem}
                                            value="Amused"
                                        >
                                            Amused
                                        </ToggleButton>
                                    </ToggleButtonGroup>
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
                                    <ToggleButtonGroup
                                        value={emoChoice}
                                        onChange={handleEmochoice}
                                        aria-label="good"
                                        className={classes.emolist}
                                    >
                                        <ToggleButton
                                            className={classes.emolistItem}
                                            value="Accepted"
                                            aria-label="Accepted"
                                        >
                                            Accepted
                                        </ToggleButton>

                                        <ToggleButton
                                            className={classes.emolistItem}
                                            value="Balanced"
                                            aria-label="Balanced"
                                        >
                                            Balanced
                                        </ToggleButton>

                                        <ToggleButton
                                            className={classes.emolistItem}
                                            value="Rested"
                                            aria-label="Rested"
                                        >
                                            Rested
                                        </ToggleButton>

                                        <ToggleButton
                                            className={classes.emolistItem}
                                            value="Calm"
                                            aria-label="Calm"
                                        >
                                            Calm
                                        </ToggleButton>

                                        <ToggleButton
                                            className={classes.emolistItem}
                                            value="Peaceful"
                                            aria-label="Peaceful"
                                        >
                                            Peaceful
                                        </ToggleButton>

                                        <ToggleButton
                                            className={classes.emolistItem}
                                            value="Patient"
                                            aria-label="Patient"
                                        >
                                            Patient
                                        </ToggleButton>

                                        <ToggleButton
                                            className={classes.emolistItem}
                                            value="Grounded"
                                            aria-label="Grounded"
                                        >
                                            Grounded
                                        </ToggleButton>

                                        <ToggleButton
                                            className={classes.emolistItem}
                                            value="Neutral"
                                            aria-label="Neutral"
                                        >
                                            Neutral
                                        </ToggleButton>

                                        <ToggleButton
                                            className={classes.emolistItem}
                                            value="Focused"
                                            aria-label="Focused"
                                        >
                                            Focused
                                        </ToggleButton>

                                        <ToggleButton
                                            className={classes.emolistItem}
                                            value="Caring"
                                            aria-label="Caring"
                                        >
                                            Caring
                                        </ToggleButton>
                                    </ToggleButtonGroup>
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
                                    <ToggleButtonGroup
                                        value={emoChoice}
                                        onChange={handleEmochoice}
                                        aria-label="meh"
                                        className={classes.emolist}
                                    >
                                        <ToggleButton
                                            className={classes.emolistItem}
                                            value="Doubtful"
                                            aria-label="Doubtful"
                                        >
                                            Doubtful
                                        </ToggleButton>

                                        <ToggleButton
                                            className={classes.emolistItem}
                                            value="Uncertain"
                                            aria-label="Uncertain"
                                        >
                                            Uncertain
                                        </ToggleButton>

                                        <ToggleButton
                                            className={classes.emolistItem}
                                            value="Bored"
                                            aria-label="Bored"
                                        >
                                            Bored
                                        </ToggleButton>

                                        <ToggleButton
                                            className={classes.emolistItem}
                                            value="Indifferent"
                                            aria-label="Indifferent"
                                        >
                                            Indifferent
                                        </ToggleButton>

                                        <ToggleButton
                                            className={classes.emolistItem}
                                            value="Clingy"
                                            aria-label="Clingy"
                                        >
                                            Clingy
                                        </ToggleButton>

                                        <ToggleButton
                                            className={classes.emolistItem}
                                            value="Lazy"
                                            aria-label="Lazy"
                                        >
                                            Lazy
                                        </ToggleButton>

                                        <ToggleButton
                                            className={classes.emolistItem}
                                            value="Numb"
                                            aria-label="Numb"
                                        >
                                            Numb
                                        </ToggleButton>

                                        <ToggleButton
                                            className={classes.emolistItem}
                                            value="Powerless"
                                            aria-label="Powerless"
                                        >
                                            Powerless
                                        </ToggleButton>

                                        <ToggleButton
                                            className={classes.emolistItem}
                                            value="Invisible"
                                            aria-label="Invisible"
                                        >
                                            Invisible
                                        </ToggleButton>

                                        <ToggleButton
                                            className={classes.emolistItem}
                                            value="Unfocused"
                                            aria-label="Unfocused"
                                        >
                                            Unfocused
                                        </ToggleButton>
                                    </ToggleButtonGroup>
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
                                    <ToggleButtonGroup
                                        value={emoChoice}
                                        onChange={handleEmochoice}
                                        aria-label="poor"
                                        className={classes.emolist}
                                    >
                                        <ToggleButton
                                            className={classes.emolistItem}
                                            value="Anxious"
                                            aria-label="Anxious"
                                        >
                                            Anxious
                                        </ToggleButton>

                                        <ToggleButton
                                            className={classes.emolistItem}
                                            value="Cautious"
                                            aria-label="Cautious"
                                        >
                                            Cautious
                                        </ToggleButton>

                                        <ToggleButton
                                            className={classes.emolistItem}
                                            value="Lonely"
                                            aria-label="Lonely"
                                        >
                                            Lonely
                                        </ToggleButton>

                                        <ToggleButton
                                            className={classes.emolistItem}
                                            value="Vulnerable"
                                            aria-label="Vulnerable"
                                        >
                                            Vulnerable
                                        </ToggleButton>

                                        <ToggleButton
                                            className={classes.emolistItem}
                                            value="Uneasy"
                                            aria-label="Uneasy"
                                        >
                                            Uneasy
                                        </ToggleButton>

                                        <ToggleButton
                                            className={classes.emolistItem}
                                            value="Disappointed"
                                            aria-label="Disappointed"
                                        >
                                            Disappointed
                                        </ToggleButton>

                                        <ToggleButton
                                            className={classes.emolistItem}
                                            value="Forgotten"
                                            aria-label="Forgotten"
                                        >
                                            Forgotten
                                        </ToggleButton>

                                        <ToggleButton
                                            className={classes.emolistItem}
                                            value="Tired"
                                            aria-label="Tired"
                                        >
                                            Tired
                                        </ToggleButton>

                                        <ToggleButton
                                            className={classes.emolistItem}
                                            value="Guilty"
                                            aria-label="Guilty"
                                        >
                                            Guilty
                                        </ToggleButton>

                                        <ToggleButton
                                            className={classes.emolistItem}
                                            value="Longing"
                                            aria-label="Longing"
                                        >
                                            Longing
                                        </ToggleButton>
                                    </ToggleButtonGroup>
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
                                    <ToggleButtonGroup
                                        value={emoChoice}
                                        onChange={handleEmochoice}
                                        aria-label="rough"
                                        className={classes.emolist}
                                    >
                                        <ToggleButton
                                            className={classes.emolistItem}
                                            value="Self-critical"
                                            aria-label="Self-critical"
                                        >
                                            Self-critical
                                        </ToggleButton>

                                        <ToggleButton
                                            className={classes.emolistItem}
                                            value="Annoyed"
                                            aria-label="Annoyed"
                                        >
                                            Annoyed
                                        </ToggleButton>

                                        <ToggleButton
                                            className={classes.emolistItem}
                                            value="Jealous"
                                            aria-label="Jealous"
                                        >
                                            Jealous
                                        </ToggleButton>

                                        <ToggleButton
                                            className={classes.emolistItem}
                                            value="Impatient"
                                            aria-label="Impatient"
                                        >
                                            Impatient
                                        </ToggleButton>

                                        <ToggleButton
                                            className={classes.emolistItem}
                                            value="Defensive"
                                            aria-label="Defensive"
                                        >
                                            Defensive
                                        </ToggleButton>

                                        <ToggleButton
                                            className={classes.emolistItem}
                                            value="Resentful"
                                            aria-label="Resentful"
                                        >
                                            Resentful
                                        </ToggleButton>

                                        <ToggleButton
                                            className={classes.emolistItem}
                                            value="Frustrated"
                                            aria-label="Frustrated"
                                        >
                                            Frustrated
                                        </ToggleButton>

                                        <ToggleButton
                                            className={classes.emolistItem}
                                            value="Furious"
                                            aria-label="Furious"
                                        >
                                            Furious
                                        </ToggleButton>

                                        <ToggleButton
                                            className={classes.emolistItem}
                                            value="Irritated"
                                            aria-label="Irritated"
                                        >
                                            Irritated
                                        </ToggleButton>

                                        <ToggleButton
                                            className={classes.emolistItem}
                                            value="Agressive"
                                            aria-label="Agressive"
                                        >
                                            Agressive
                                        </ToggleButton>
                                    </ToggleButtonGroup>
                                </h4>
                            </div>
                        </Fade>
                    </Modal>
                </div>
            </Card>
        </>
    );
}
