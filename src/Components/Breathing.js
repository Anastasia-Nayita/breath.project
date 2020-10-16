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
        height: 550,
        textAlign: "center",
        margin: "10%",
    },
    breathe: {
        position: "relative",
        top: "30%",
        fontSize: "2rem",
    },
}));

export default function Breathe() {
    const classes = useStyles();
    // const { progress } = useState;
    //const howMuch = 1;
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
    //console.log("howmuch2", howMuch);

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            console.log("enter press here! ");
            //const a = howMuch / 0.133333;
            // sethowManyCycles(a);
            // console.log("howManyCycles", howManyCycles);
            // console.log("a", a);
            setTimerActive(true);
            setLoopActive(true);
            sethowManyCycles(1);
        }
    };

    const onFinish = ({ progress }) => {
        console.log("this is finish!");
        //sethowManyCycles(+1);
        // console.log("howManyCycles: ", howManyCycles);

        if (progress === 1 && howManyCycles != howMuch) {
            //setTimerActive(false);

            sethowManyCycles(howManyCycles + 1);
            //   console.log("howManyCycles: ", howManyCycles);
            setTimerActive(true);
        } else if (howManyCycles == howMuch) {
            console.log("eNOUGH");
            setTimerActive(false);
        }
    };

    const onTimeUpdate = ({ progress }) => {
        if (howManyCycles & 1) {
            console.log("howManyCycles: ", howManyCycles);
            console.log("нечетное");
            setCondComponent("inhale");
        } else {
            console.log("howManyCycles: ", howManyCycles);
            console.log("четное");
            setCondComponent("exhale");
        }
        console.log("this is update!");
        //setProgress({ progress });
        // console.log("progress", progress);
    };
    const onClickStop = (e) => {
        /// e.preventDefault();
        setTimerActive(false);
    };
    return (
        <Card className={classes.card}>
            <Paper>
                <InputLabel>How many minutes do we have?</InputLabel>
                <Input
                    // style={{ textAlign: "center" }}
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
                //onStop={(e) => onClickStop(e)}
                duration={8000}
            >
                <CircleIndicator
                    fill="#AC9160"
                    size={300}
                    stroke="#fff"
                    strokeBackground="transparent"
                />
            </Timer>
        </Card>
    );
}

//////////////////////////////////////////////////

// import { CountdownCircleTimer } from "react-countdown-circle-timer";
// var i = 0;
// const renderTime = ({ remainingTime }) => {
//     //console.log("remainingTime", remainingTime);
//     ///console.log("key", key );

//     if (remainingTime === 0) {
//         i = i + 1;
//         return <div className="timer">Pause</div>;
//     }
//     console.log("i", i);

//     if ({i % 2 = 0})
//         return (
//             <div className="timer">
//                 <div className="text-timer">Inhale</div>
//                 <div className="value">{remainingTime}</div>
//             </div>
//         );
// };

// export default function Breathe() {
//     var [key, setKey] = useState(0);

//     //setKey(key + 1);

//     return (
//         <div className="Breathe">
//             <h1>Breathing timer</h1>
//             <div className="timer-wrapper">
//                 <CountdownCircleTimer
//                     isPlaying
//                     duration={8}
//                     colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
//                     onComplete={() => {
//                         setKey(key + 1);
//                         //console.log("key inside", key);
//                         return [true, 1000];
//                     }}
//                 >
//                     {renderTime}
//                 </CountdownCircleTimer>
//             </div>
//         </div>
//     );
// }
