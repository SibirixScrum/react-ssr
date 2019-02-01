import React from "react";
import * as ReactDOM from "react-dom";
import {App} from "./app";
import {HtmlHead} from "./isomorphic/html-head";
import {TransferState} from "./isomorphic/transfer-state";
import {DataContext} from "./contexts";

ReactDOM.hydrate(
    <DataContext.Provider value={{
        transferState: TransferState.factory(),
        htmlHead: new HtmlHead(),
    }}>
        <App />
    </DataContext.Provider>,
    document.getElementById('root')
);
