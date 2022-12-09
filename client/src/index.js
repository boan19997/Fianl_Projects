import React from "react";
import ReactDOM from "react-dom"

import "./index.css"
import App from "./App";

import { BrowserRouter as Router } from "react-router-dom"
import { StateProvider } from "./context/StateProvider";
import { initalState } from './context/initalState'
import reducer from "./context/reducer";

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <StateProvider initalState={initalState} reducer={reducer}>
                <App />
            </StateProvider>
        </Router>
    </React.StrictMode>
, document.getElementById('root'))