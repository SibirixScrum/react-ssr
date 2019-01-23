import React from "react";
import * as ReactDOM from "react-dom";
import {App} from "./app";

const root = document.getElementById('root');

root.innerHTML = '';

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
