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
        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'GET request successful.'
                });
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

        // app.route('/auth/signout')
        //     .post(this.authController.signout)

        // * api
        app.get('/api/login/success', (req: Request, res: Response) => {
            res.send({
                user: {
                    "_id": req.user._id,
                    "username": req.user.username,
                    "privilege": req.user.privilege,
                    "createDate": req.user.createDate,
                    "updateDate": req.user.updateDate,
                    "deleteDate": req.user.deleteDate
                }
            });
        });
        app.get('/api/login/failure', (req: Request, res: Response) => {
            res.send({ message: 'Invalid username or password' });
        })
    }

    constructor() {

    }
}
