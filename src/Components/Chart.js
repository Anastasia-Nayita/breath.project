import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
//import "./chart.css";
import axios from "../axios.js";
import promise from "redux-promise";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    title: {
        textAlign: "center",
    },
    titleSmaller: {
        textAlign: "center",
    },
}));

export default function ChartTest() {
    const classes = useStyles();

    const [dataChartP, setDataChartP] = useState({});
    const [dataChartM, setDataChartM] = useState({});
    const [timePeriods, setTimePeriods] = useState([]);
    const [physConditions, setPhysConditions] = useState([]);

    const options = {
        scales: {
            xAxes: [
                {
                    gridLines: {
                        color: "rgb(204, 204, 204)",
                        borderDash: [3, 3],
                    },
                    stacked: true,
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
        let timePerP = [];
        let mentCond = [];
        let timePerM = [];

        Promise.all([axios.get("/chart/phys"), axios.get("/chart/ment")])
            .then(([resp, resm]) => {
                for (const dataObj of resp.data) {
                    physCond.push(
                        {
                            great: 500,
                            good: 400,
                            meh: 300,
                            poor: 200,
                            rough: 100,
                        }[dataObj.physically]
                    );
                    timePerP.push(dataObj.created_at);
                }

                setDataChartP({
                    labels: timePerP,
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
                            // null: null,
                        }[dataObj.mentally]
                    );
                    timePerM.push(dataObj.created_at);
                }

                setDataChartM({
                    labels: timePerM,
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
    };

    useEffect(() => {
        chart();
    }, []);

    return (
        <div className="container">
            <h1 className={classes.title}>charts charts charts</h1>
            <h3 className={classes.titleSmaller}>Physically</h3>
            <Line data={dataChartP} options={options} />
            <h3 className={classes.titleSmaller}>Mentally</h3>
            <Line data={dataChartM} options={options} />
        </div>
    );
}
