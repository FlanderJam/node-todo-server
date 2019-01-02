import * as bodyParser from 'body-parser';
import chalk from 'chalk';
import * as cookieParser from 'cookie-parser';
import * as Debug from 'debug';
import * as express from 'express';
import * as expressSession from 'express-session';
import * as mongoose from 'mongoose';
import * as morgan from 'morgan';
import { passportConfig } from '../config/passport';
import { Routes } from './routes/crmRoutes';

const debug = Debug('app');


class App {
    public app: express.Application;
    public mongoUrl: string = 'mongodb://todoAppAdmin:asdfg@localhost:27017/todoApp'
    public routePrv: Routes = new Routes();

    constructor() {
        this.app = express();
        this.config();
        this.routePrv.routes(this.app);
        this.mongoSetup();
    }

    private config(): void {
        // * support application/json type post data
        this.app.use(express.json());

        // * support application/x-www-form-urlencoded post data
        this.app.use(express.urlencoded({ extended: false }));

        this.app.use(cookieParser());

        this.app.use(expressSession({
            secret: 'todo-server',
            resave: false,
            saveUninitialized: false
        }));

        passportConfig(this.app)
    }

    private mongoSetup(): void {
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
    }
}

export default new App().app;
