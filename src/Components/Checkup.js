import React, { useEffect } from "react";
import { socket } from "../socket";
import { useSelector } from "react-redux";
import Button from "@material-ui/core/Button";

export default function Chat() {
    const chatMsgs = useSelector((state) => state && state.msgs);
    //console.log("here are my last 10 messages: ", chatMsgs);

    const click = (e) => {
        // console.log("value of button", e.target.value);
        // console.log("key pressed", e.key);
        e.preventDefault();
        console.log("choice: ", e.currentTarget.value);
        // socket.emit("choice", e.target.value);
        e.target.value = "";
    };

    return (
        <div>
            <div className="checkup-block">
                <div className="physically">
                    <h1>Physically</h1>
                    <Button variant="contained" color="primary" onClick={click}>
                        great
                    </Button>
                    <Button variant="contained" color="primary" onClick={click}>
                        good
                    </Button>
                    <Button variant="contained" color="primary" onClick={click}>
                        meh
                    </Button>
                    <Button variant="contained" color="primary" onClick={click}>
                        poor
                    </Button>
                    <Button variant="contained" color="primary" onClick={click}>
                        rough
                    </Button>
                </div>
            </div>
        </div>
    );
}
