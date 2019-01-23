const path = require('path');

module.exports = {
    target: "web",
    entry: {
        app: ["./src/client.js"]
    },
    output: {
        path: path.resolve(__dirname, "./build"),
        filename: "client.bundle.js",
    },
    devtool: 'inline-source-map',
    node: {
        fs: 'empty',
    },
};
