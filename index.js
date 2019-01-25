import 'isomorphic-fetch';
import path from 'path';
import fs from 'fs';

import express from 'express';

import {serverRenderer as serverRendererApp, ServerState} from './src/server';

const PORT = 8080;
const app = express();

const router = express.Router();

const serverRenderer = (req, res) => {
    fs.readFile(path.resolve('./index.html'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('An error occurred');
        }

        return res.send(data);
        return res.send(
            data
                .replace(
                    '<div id="root"></div>',
                    '<div id="root">' + serverRendererApp(req) + '</div>'
                )
                .replace(
                    '<title></title>',
                    `<title>${ServerState.getInstance().title}</title>`
                )
        )
    })
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
