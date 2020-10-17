import React from "react";
import { Link } from "react-router-dom";
import axios from "../axios";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            error: false,
        };
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState(
            {
                [name]: value,
            },
            () => console.log("this.state: ", this.state)
        );
    }

    handleClick(e) {
        e.preventDefault();
        var that = this;
        axios
            .post("/login", that.state)
            .then(function (response) {
                console.log("response: ", response);
                location.replace("/");
            })

            .catch(function (error) {
                console.log("error: ", error);
            });
    }

    render() {
        return (
            <Card>
                <div className="block">
                    <h2>Log in here: </h2>
                    {this.state.error && (
                        <p className="error">something went wrong!</p>
                    )}
                    <label htmlFor="email">enter your email:</label>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="email"
                        placeholder="email"
                    />
                    <label htmlFor="password">enter your password:</label>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="password"
                        type="password"
                        placeholder="password"
                    />
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={(e) => this.handleClick(e)}
                    >
                        log in
                    </Button>
                </div>
            </Card>
        );
    }
}
