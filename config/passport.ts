import chalk from 'chalk';
import * as Debug from 'debug';
import * as passport from 'passport';
import { localStrategy } from './strategies/local.strategy';

const debug = Debug('app:passport');

localStrategy();

export function passportConfig(app: any) {
    app.use(passport.initialize());
    app.use(passport.session());

    // Stores user in session
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    // Retrieves user from session
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
}
