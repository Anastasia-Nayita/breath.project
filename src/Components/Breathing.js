import React, { useState } from "react";
import Timer from "react-timer-wrapper";
import { CircleIndicator } from "react-indicators";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
    card: {
        textAlign: "center",
        margin: "5% 10%",
    },
    title: {
        marginTop: "5%",
        textAlign: "center",
    },

    breathe: {
        position: "relative",
        top: "30%",
        fontSize: "2rem",
    },
}));

export default function Breathe() {
    const classes = useStyles();

    const [howMuch, setHowMuch] = useState("");
    const [howManyCycles, sethowManyCycles] = useState("");
    const [timerActive, setTimerActive] = useState(false);
    const [loopActive, setLoopActive] = useState(false);
    const [progress, setProgress] = useState();
    const [condComponent, setCondComponent] = useState("");

    const handleChange = (e) => {
        const a = Math.floor(e.target.value / 0.133333);
        setHowMuch(a);
        console.log("howmuch", howMuch);
        console.log("target val", e.target.value);

        console.log("a", a);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            console.log("enter press here! ");

            setTimerActive(true);
            setLoopActive(true);
            sethowManyCycles(1);
        }
    };

    const onFinish = ({ progress }) => {
        console.log("this is finish!");

        if (progress === 1 && howManyCycles != howMuch) {
            sethowManyCycles(howManyCycles + 1);
            setTimerActive(true);
        } else if (howManyCycles == howMuch) {
            console.log("eNOUGH");
            setTimerActive(false);
        }
    };

    const onTimeUpdate = ({ progress }) => {
        if (howManyCycles & 1) {
            setCondComponent("inhale");
        } else {
            setCondComponent("exhale");
        }
        console.log("this is update!");
    };
    const onClickStop = (e) => {
        setTimerActive(false);
    };
    return (
        <>
            <h1 className={classes.title}>Breathing timer</h1>
            <Card className={classes.card}>
                <Paper>
                    <InputLabel>How many minutes do we have?</InputLabel>
                    <Input
                        id="howmuch-inp"
                        onChange={(e) => handleChange(e)}
                        onKeyPress={(e) => handleKeyPress(e)}
                    />
                </Paper>
                <Button
                    style={{ margin: "5% 0" }}
                    variant="contained"
                    color="secondary"
                    onClick={(e) => onClickStop(e)}
                >
                    Stop
                </Button>
                <div className={classes.breathe}>{condComponent}</div>

                <Timer
                    active={timerActive}
                    loop={loopActive}
                    onTimeUpdate={(e) => onTimeUpdate(e)}
                    onFinish={(e) => onFinish(e)}
                    duration={8000}
                    progress={progress}
                >
                    <CircleIndicator
                        fill="#AC9160"
                        size={300}
                        stroke="#fff"
                        strokeBackground="transparent"
                    />
                </Timer>
            </Card>
        </>
    );
}
