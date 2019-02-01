import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import {App} from "./app";
import {DataContext} from "./contexts";

export function serverRenderer(req, context) {
    return ReactDOMServer.renderToString(
        <DataContext.Provider value={context}>
            <App serverParams={{
                url: req.originalUrl
            }} />
        </DataContext.Provider>
    );
}
