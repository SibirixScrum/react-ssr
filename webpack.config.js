const serverConfig = require('./webpack-back.config');
const clientConfig = require('./webpack-front.config');
const config = {
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: [
                        '@babel/react'
                    ]
                }
            }
        ]
    },
};

module.exports = [
    Object.assign({}, serverConfig, config),
    Object.assign({}, clientConfig, config),
];
