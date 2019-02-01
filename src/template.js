import {HtmlHead} from "./isomorphic/html-head";
import {TransferState} from "./isomorphic/transfer-state";
import {serverRenderer} from "./server";

export function template(req, client) {
    const transferState = TransferState.factory();
    const htmlHead = new HtmlHead();

    const content = serverRenderer(req, {
        transferState: transferState,
        htmlHead: htmlHead,
    });

    return (
        `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>${htmlHead.title}</title>
        
        
            <link rel="stylesheet" href="/assets/style.css">
        </head>
        <body>
            <div id="root" class="flex-grow">${content}</div>
            
            <div id="__STATE__" style="display: none;">${transferState.toJson()}</div>
            ${client ? `<script src="/build/client.bundle.js"></script>` : ''}
        </body>
        </html>`
    );
}
