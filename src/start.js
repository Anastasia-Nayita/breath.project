import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./Pages/Welcome";
import App from "./Pages/App";
//import { init } from "./socket";

// import { Provider } from "react-redux";
// import { createStore, applyMiddleware } from "redux";
// import reduxPromise from "redux-promise";
//import reducer from "./reducers";
// import { composeWithDevTools } from "redux-devtools-extension";

// const store = createStore(
//     reducer,
//     composeWithDevTools(applyMiddleware(reduxPromise))
// );

let component;

if (location.pathname === "/welcome") {
    component = <Welcome />;
} else {
    // init(store);
    component = (
        // <Provider store={store}>
        <App />
        // </Provider>
    );
}

ReactDOM.render(component, document.querySelector("main"));
