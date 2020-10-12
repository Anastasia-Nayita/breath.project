import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import axios from "../axios";
import Card from "@material-ui/core/Card";

export default function Checkup() {
    const handleClick = async (e) => {
        e.preventDefault();
        console.log("choice: ", e.currentTarget.value);
        let choice = e.currentTarget.value;
        try {
            const { data } = await axios.post("/physical");
            console.log("data in try - axios", data);
        } catch (err) {
            console.log("err: ", err);
        }
    };

    return (
        <div>
            <div className="checkup-block">
                <div className="physically">
                    <h1>Physically</h1>

                    <Button
                        variant="contained"
                        style={{ margin: "10% 0" }}
                        color="primary"
                        value="great"
                        onClick={(e) => handleClick(e)}
                    >
                        great
                    </Button>
                    <Button
                        style={{ margin: "10% 0" }}
                        variant="contained"
                        color="primary"

                        // onClick={clickGood}
                    >
                        good
                    </Button>
                    <Button
                        style={{ margin: "10% 0" }}
                        variant="contained"
                        color="primary"
                        // onClick={clickMeh}
                    >
                        meh
                    </Button>
                    <Button
                        style={{ margin: "10% 0" }}
                        variant="contained"
                        color="primary"
                        // onClick={clickPoor}
                    >
                        poor
                    </Button>
                    <Button
                        style={{ margin: "10% 0" }}
                        variant="contained"
                        color="primary"
                        // onClick={clickRough}
                    >
                        rough
                    </Button>
                </div>
            </div>
        </div>
    );
}
