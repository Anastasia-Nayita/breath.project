import React from "react";
import axios from "../axios";
import Profile from "../Components/Profile.js";
import Uploader from "../Components/Uploader.js";
import Navbar from "../Components/Navbar.js";
import Profilepic from "../Components/Profilepic.js";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Checkup from "../Components/Checkup";

///////////////////////////

import * as io from "socket.io-client";

io.connect();

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            uploaderIsVisible: false,
        };
    }

    componentDidMount() {
        axios.get("/user").then(({ data }) => {
            this.setState({
                ...data,
                image_url: data.image_url || "./default.png",
            });
        });
    }

    clickHandler() {
        this.setState({
            uploaderIsVisible: true,
        });
    }

    render() {
        return (
            <div>
                <Router>
                    <Navbar
                        profilepic={
                            <Profilepic imageUrl={this.state.image_url} />
                        }
                    />
                    <Route exact path="/" render={() => <Checkup />} />
                    <Route
                        exact
                        path="/profile"
                        render={() => (
                            <Profile
                                first={this.state.first}
                                last={this.state.last}
                                profilepic={
                                    <Profilepic
                                        id={this.state.id}
                                        first={this.state.first}
                                        last={this.state.last}
                                        imageUrl={this.state.image_url}
                                        clickHandler={() =>
                                            this.setState({
                                                uploaderIsVisible: true,
                                            })
                                        }
                                    />
                                }
                            />
                        )}
                    />
                </Router>
                <div className="Logo">
                    <h1> here is a logo </h1>
                </div>

                {this.state.uploaderIsVisible && (
                    <Uploader
                        addImage={(newImage) => {
                            console.log("newImage: ", newImage);
                            this.setState({
                                image_url: newImage,
                                uploaderIsVisible: false,
                            });
                        }}
                    />
                )}
            </div>
        );
    }
}
