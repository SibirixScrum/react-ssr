import 'isomorphic-fetch';
import path from 'path';

import express from 'express';

import {template} from "./src/template";

const PORT = 3000;
const app = express();

const router = express.Router();

const serverRenderer = (req, res) => {
    res.send(template(req, typeof req.query.rss === 'undefined'));
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
app.listen(PORT, '192.168.0.153', () => {
    console.log(`SSR running on port ${PORT}`)
});
