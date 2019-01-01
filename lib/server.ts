import app from './app';
import chalk from 'chalk';
import * as Debug from 'debug';
import * as https from 'https';
import * as fs from 'fs';
import * as morgan from 'morgan';

const debug = Debug('app:server');

const PORT = process.env.PORT ? process.env.PORT : 3000;

const httpsOptions = {
    key: fs.readFileSync('./config/localhost.key'),
    cert: fs.readFileSync('./config/localhost.crt')
}

https.createServer(httpsOptions, app).listen(PORT, () => {
    debug(`Express server listening on port ${chalk.green(`${PORT}`)}`)
})