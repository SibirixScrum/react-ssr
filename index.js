import 'isomorphic-fetch';
import path from 'path';

import express from 'express';

import {serverRenderer as serverRendererApp} from './src/server';
import {template} from "./src/template";

const PORT = 8080;
const app = express();

const router = express.Router();

const serverRenderer = (req, res) => {
    res.send(template(serverRendererApp(req)));
};

app.use('/build', express.static('build'));
app.use('/assets', express.static('assets'));
app.use('/images', express.static('images'));

router.use('**', serverRenderer);

router.use(
    express.static(path.resolve(__dirname, '..', 'build'), { maxAge: '30d' })
);

// tell the app to use the above rules
app.use(router);

// app.use(express.static('./build'))
app.listen(PORT, () => {
    console.log(`SSR running on port ${PORT}`)
});
