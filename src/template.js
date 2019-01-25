import {HtmlHead} from "./isomorphic/html-head";

export function template(content) {
    return (
        `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>${HtmlHead.title}</title>
        
        
            <link rel="stylesheet" href="/assets/style.css">
        </head>
        <body>
            <div id="root" class="flex-grow">${content}</div>
        
            <script src="/build/client.bundle.js"></script>
        </body>
        </html>`
    );
}
