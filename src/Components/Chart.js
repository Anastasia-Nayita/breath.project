import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
//import "./chart.css";
import axios from "../axios.js";
import promise from "redux-promise";

export default function ChartTest() {
    const [dataChartP, setDataChartP] = useState({});
    const [dataChartM, setDataChartM] = useState({});
    const [timePeriods, setTimePeriods] = useState([]);
    const [physConditions, setPhysConditions] = useState([]);

    ////to_char(current_timestamp, 'Day, DD  HH12:MI:SS')

    const options = {
        scales: {
            xAxes: [
                {
                    gridLines: {
                        color: "rgb(204, 204, 204)",
                        borderDash: [3, 3],
                    },
                    stacked: true,
                    ticks: {
                        fontColor: "rgb(204, 204, 204)",
                    },
                },
            ],
            yAxes: [
                {
                    gridLines: {
                        color: "rgb(204, 204, 204)",
                        borderDash: [3, 3],
                    },
                    stacked: true,
                    ticks: {
                        fontColor: "rgb(204, 204, 204)",
                        callback: function (value) {
                            if (value == "500") {
                                return (value = "great");
                            }
                            if (value == "400") {
                                return (value = "good");
                            }
                            if (value == "300") {
                                return (value = "meh");
                            }
                            if (value == "200") {
                                return (value = "poor");
                            }
                            if (value == "100") {
                                return (value = "rough");
                            }
                        },
                    },
                },
            ],
        },
    };
    const chart = () => {
        let physCond = [];
        let timePer = [];
        let mentCond = [];

        Promise.all([axios.get("/chart/phys"), axios.get("/chart/ment")])
            .then(([resp, resm]) => {
                // console.log("res in get chart/phys: ", resp);

                // console.log("res in get chart/ment: ", resm);
                // console.log("WOW");
                ///////////////////////////////// PHYS
                for (const dataObj of resp.data) {
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
                    timePer.push(dataObj.created_at);
                }

                setDataChartP({
                    labels: timePer,
                    datasets: [
                        {
                            label: "Physical state",
                            data: physCond,
                            backgroundColor: "#FF6384",
                            borderColor: "orange",
                            borderWidth: 1,
                            hoverBackgroundColor: "green",
                            hoverBorderColor: "orange",
                        },
                    ],
                });
                ///////////////////////////////// MENT
                for (const dataObj of resm.data) {
                    mentCond.push(
                        {
                            great: 500,
                            good: 400,
                            meh: 300,
                            poor: 200,
                            rough: 100,
                            null: null,
                        }[dataObj.mentally]
                    );
                    // physCond.push(parseInt(dataObj.physically));
                    timePer.push(dataObj.created_at);
                }

                setDataChartM({
                    labels: timePer,
                    datasets: [
                        {
                            label: "Mental state",
                            data: mentCond,
                            backgroundColor: "#FF6384",
                            borderColor: "orange",
                            borderWidth: 1,
                            hoverBackgroundColor: "green",
                            hoverBorderColor: "orange",
                        },
                    ],
                });
            })
            .catch((err) => {
                console.log("err in chart", err);
            });
        // console.log("physCond: ", physCond);
        // console.log("mentCond: ", mentCond);
        // console.log("timePer: ", timePer);
    };

    useEffect(() => {
        chart();
    }, []);

    return (
        <div className="container">
            <h1>Charts charts charts</h1>
            <h3>Physically</h3>
            <Line data={dataChartP} options={options} />
            <h3>Mentally</h3>
            <Line data={dataChartM} options={options} />
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
