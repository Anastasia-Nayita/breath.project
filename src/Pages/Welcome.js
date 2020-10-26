import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Registration from "../Components/Registration";
import Login from "../Components/Login";
import App from "./App.js";
import { ThemeProvider } from "@material-ui/core/styles";

import theme from "../theme";

export default function Welcome() {
    return (
        <div id="welcome">
            <ThemeProvider theme={theme}>
                <App />
                <HashRouter>
                    <div>
                        <Route exact path="/" component={Registration} />
                        <Route path="/login" component={Login} />
                    </div>
                </HashRouter>
            </ThemeProvider>
        </div>
    );
}
