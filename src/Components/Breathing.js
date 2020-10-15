import React from "react";
import Timer from "react-timer-wrapper";
import { CircleIndicator } from "react-indicators";

export default function Breathe() {
    return (
        <Timer active loop>
            <CircleIndicator
                fill="#AC9160"
                size={300}
                stroke="#fff"
                strokeBackground="transparent"
                duration={8}
            />
        </Timer>
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
