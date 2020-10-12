import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import axios from "../axios";
import Card from "@material-ui/core/Card";
//import { Slide } from "material-auto-rotating-carousel";

export default function Checkup() {
    //console.log("🦸🏻‍♀️🦹🏻‍♀️🧝‍♀️");
    const [clicked, setClicked] = useState(false);
    const [image, setImage] = useState("");
    //console.log("clicked first", { clicked });
    // setClicked({ clicked: false });

    const handleClick = async (e) => {
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

        // if (!clicked) {
        //     setImage("../images/Physically_Meh.png");
        // } else
        if (choice === "great") {
            setImage("../images/Physically_Great.png");
        } else if (choice === "good") {
            setImage("../images/Physically_Good.png");
        } else if (choice === "poor") {
            //console.log("this choice is poor");
            setImage("../images/Physically_Poor.png");
        } else if (choice === "rough") {
            //console.log("this choice is rough");
            setImage("../images/Physically_Rough.png");
        }
        //    if (choice === "meh")
        else {
            //console.log("this choice is meh");
            setImage("../images/Physically_Meh.png");
        }
    };
    console.log("clicked ", { clicked });

    return (
        <div>
            <div className="checkup-block">
                <div className="physically">
                    <h1>Physically</h1>
                    <div className="checkup-btns">
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
                            value="good"
                            onClick={(e) => handleClick(e)}
                        >
                            good
                        </Button>
                        <Button
                            style={{ margin: "10% 0" }}
                            variant="contained"
                            color="primary"
                            value="meh"
                            onClick={(e) => handleClick(e)}
                        >
                            meh
                        </Button>
                        <Button
                            style={{ margin: "10% 0" }}
                            variant="contained"
                            color="primary"
                            value="poor"
                            onClick={(e) => handleClick(e)}
                        >
                            poor
                        </Button>
                        <Button
                            style={{ margin: "10% 0" }}
                            variant="contained"
                            color="primary"
                            value="rough"
                            onClick={(e) => handleClick(e)}
                        >
                            rough
                        </Button>
                    </div>
                    <div>
                        <img
                            className="phy-img"
                            //src={image}
                            src={image}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
