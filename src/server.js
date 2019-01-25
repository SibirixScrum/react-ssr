import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import {App} from "./app";

export function serverRenderer(req) {
    return ReactDOMServer.renderToString(<App serverParams={{
        url: req.originalUrl
    }} />);
}
