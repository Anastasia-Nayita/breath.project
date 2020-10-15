import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
//import "./chart.css";
import axios from "../axios.js";

export default function ChartTest() {
    const [dataChart, setDataChart] = useState({});
    const [timePeriods, setTimePeriods] = useState([]);
    const [physConditions, setPhysConditions] = useState([]);

    const chart = () => {
        let physCond = [];
        let timePer = [];

        axios
            .get("/chart/phys")
            .then((res) => {
                // console.log("res in get chart/phys: ", res);
                // console.log("WOW");

                for (const dataObj of res.data) {
                    physCond.push(
                        {
                            great: 500,
                            good: 400,
                            meh: 300,
                            poor: 200,
                            rough: 100,
                            null: null,
                        }[dataObj.physically]
                    );
                    // physCond.push(parseInt(dataObj.physically));
                    timePer.push(parseInt(dataObj.created_at));
                }

                setDataChart({
                    labels: timePer,
                    datasets: [
                        {
                            label: "Confirmed cases",
                            data: physCond,
                            backgroundColor: ["rgba(75, 192, 192, 0.6)"],
                            borderWidth: 4,
                        },
                    ],
                });
            })
            .catch((err) => {
                console.log("err in chart", err);
            });
        console.log("physCond: ", physCond);
        console.log("timePer: ", timePer);
    };

    useEffect(() => {
        chart();
    }, []);

    return (
        <div className="container">
            <h1>Charts charts charts</h1>
            <Line data={dataChart} />
        </div>
    );
}

// export default class Chart extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             barChartData: [],
//         };
//         this.change0 = this.change0.bind(this);
//         this.change1 = this.change1.bind(this);
//         this.change2 = this.change2.bind(this);
//     }

//     componentDidMount() {
//         this.change0();
//     }

//     change0() {
//         this.setState({
//             barChartData: {
//                 labels: ["January", "February", "March"],
//                 datasets: [
//                     {
//                         label: "3 Months",
//                         backgroundColor: "rgba(255,99,132,0.2)",
//                         borderColor: "rgba(255,99,132,1)",
//                         borderWidth: 1,
//                         hoverBackgroundColor: "rgba(255,99,132,0.4)",
//                         hoverBorderColor: "rgba(255,99,132,1)",

//                         data: [65, 59, 80],
//                     },
//                 ],
//             },
//         });
//     }

//     change1() {
//         this.setState({
//             barChartData: {
//                 labels: [
//                     "January",
//                     "February",
//                     "March",
//                     "April",
//                     "May",
//                     "June",
//                 ],
//                 datasets: [
//                     {
//                         label: "6 Months",
//                         backgroundColor: "rgba(255,99,132,0.2)",
//                         borderColor: "rgba(255,99,132,1)",
//                         borderWidth: 1,
//                         hoverBackgroundColor: "rgba(255,99,132,0.4)",
//                         hoverBorderColor: "rgba(255,99,132,1)",
//                         data: [blabla],
//                         //data: [49, 22, 23, 65, 43, 21],
//                     },
//                 ],
//             },
//         });
//     }

//     change2() {
//         this.setState({
//             barChartData: {
//                 labels: [
//                     "January",
//                     "February",
//                     "March",
//                     "April",
//                     "May",
//                     "June",
//                     "July",
//                     "Aug",
//                     "Sept",
//                     "Oct",
//                     "Nov",
//                     "Dec",
//                 ],
//                 datasets: [
//                     {
//                         label: "One Year",
//                         backgroundColor: "rgba(255,99,132,0.2)",
//                         borderColor: "rgba(255,99,132,1)",
//                         borderWidth: 1,
//                         hoverBackgroundColor: "rgba(255,99,132,0.4)",
//                         hoverBorderColor: "rgba(255,99,132,1)",
//                         data: [49, 22, 23, 65, 43, 21, 56, 57, 100, 23, 43, 21],
//                     },
//                 ],
//             },
//         });
//     }

//     render() {
//         return (
//             <div>
//                 <Bar data={this.state.barChartData} />
//                 <button onClick={this.change0}>Change to 3 months</button>
//                 <button onClick={this.change1}>Change to 6 months</button>
//                 <button onClick={this.change2}>Change to 1 year</button>
//                 {/*<button onClick={this.change2}></button>*/}
//             </div>
//         );
//     }
// }
