import React, { useState } from "react";
import Timer from "react-timer-wrapper";
import { CircleIndicator } from "react-indicators";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles(() => ({
    card: {
        height: 550,
        textAlign: "center",
        margin: "10%",
    },
}));

export default function Breathe() {
    const classes = useStyles();
    // const { progress } = useState;
    //const howMuch = 1;
    const [howMuch, setHowMuch] = useState("");
    const [howManyCycles, sethowManyCycles] = useState("");
    const [timerActive, setTimerActive] = useState(false);

    const handleChange = (e) => {
        setHowMuch(e.target.value);
        console.log(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            console.log("enter press here! ");
            const a = howMuch / 0.133333;
            sethowManyCycles(a);
            console.log("howManyCycles", howManyCycles);
            console.log("a", a);
            setTimerActive(true);
        }
    };
    return (
        <Card className={classes.card}>
            <Paper>
                <InputLabel>How many minutes do we have?</InputLabel>
                <Input
                    id="howmuch-inp"
                    // value={values.howMuch}
                    onChange={(e) => handleChange(e)}
                    onKeyPress={(e) => handleKeyPress(e)}
                />
            </Paper>
            <Timer active={timerActive}>
                <CircleIndicator
                    // progress={progress}>
                    fill="#AC9160"
                    size={300}
                    time={howManyCycles}
                    stroke="#fff"
                    strokeBackground="transparent"
                    duration={8}
                    //onFinish={}
                />
            </Timer>
            {/* <p>{`${Math.round({ progress })}`}</p> */}
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
