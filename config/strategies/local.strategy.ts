import chalk from 'chalk';
import * as Debug from 'debug';
import * as mongoose from 'mongoose';
import * as passport from 'passport';
import { Strategy } from 'passport-local';
import { UserModel } from '../../lib/models/crmModels';

const debug = Debug('app:local.strategy');
const url = 'mongodb://todoAppAdmin:asdfg@localhost:27017/todoApp';
const dbName = 'todoApp';

async function validateUser(username: string, password: string, done: any) {
    try {
        UserModel.findOne({ username }, function (err, user) {
            if (err) throw err;
            UserModel.schema.methods.comparePassword(password, user, (error, isMatch: boolean) => {
                try {
                    isMatch ? done(null, user, { message: 'Successfully signed in' }) : done(null, false, { message: 'Incorrect username or password' });
                }
                catch (error) {
                    debug(chalk.red(error.stack));
                }
            })
        });
    } catch (err) {
        debug(chalk.red(err.stack));
    }
}

export function localStrategy() {
    passport.use(
        new Strategy(
            {
                passwordField: 'password',
                usernameField: 'username',
            },
            (username, password, done) => {
                validateUser(username, password, done);
            }
        )
    );
}
