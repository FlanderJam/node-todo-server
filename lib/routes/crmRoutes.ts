import { Request, Response } from 'express';
import chalk from 'chalk';
import { TodoController, UserController } from '../controllers/crmController';
import * as Debug from 'debug';
import * as morgan from 'morgan';
import * as passport from 'passport';

const debug = Debug('app:routes');

export class Routes {
    public todoController: TodoController = new TodoController();
    public userController: UserController = new UserController();

    public routes(app): void {

        app.use((req: Request, res: Response, next: () => void) => {
            if (req.url.includes('/api/login') || req.url === '/' || req.signedCookies['user'] || (!req.signedCookies['user'] && (req.url.includes('signin') || req.url.includes('signup')))) {
                next();
            } else {
                res.status(400).send('Unauthorized!');
            }
        })

        app.route('/')
            .get((req: Request, res: Response) => {
                res.render('index');
            });

        // * todo
        app.route('/todos')
            // * GET endpoint
            .get(this.todoController.getTodos)
            .post(this.todoController.addNewTodo);

        app.route('/todos/:id')
            .get(this.todoController.getTodoById)
            .put(this.todoController.updateTodo)
            .delete(this.todoController.deleteTodo);

        // * user
        app.route('/users')
            .get(this.userController.getUsers);

        app.route('/users/:id')
            .get(this.userController.getUserById);

        // * auth
        app.route('/auth/signup')
            .post(this.userController.addNewUser);

        app.route('/auth/signin')
            .post(
                passport.authenticate('local', {
                    successRedirect: '/api/login/success',
                    failureRedirect: '/api/login/failure'
                })
            );

        app.route('/auth/signout')
            .post((req: Request, res: Response) => {
                res.clearCookie('user');
                res.send({ message: 'Logout successful.' });
            })

        // * api
        app.get('/api/login/success', (req: Request, res: Response) => {
            res.cookie('user', {
                "_id": req.user._id,
                "username": req.user.username,
                "privilege": req.user.privilege,
                "createDate": req.user.createDate,
                "updateDate": req.user.updateDate,
                "deleteDate": req.user.deleteDate
            }, { expires: new Date(Date.now() + 60000 * 5), signed: true });
            res.send({ message: 'Login successful.' });
        });
        app.get('/api/login/failure', (req: Request, res: Response) => {
            res.send({ message: 'Invalid username or password' });
        })
    }

    constructor() {

    }
}
