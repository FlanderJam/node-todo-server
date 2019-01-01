import { Request, Response } from 'express';
import chalk from 'chalk';
import { TodoController, UserController } from '../controllers/crmController';
import * as Debug from 'debug';
import * as morgan from 'morgan';

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
            .get(this.userController.getUsers)
            .post(this.userController.addNewUser);
    }

    constructor() {

    }
}
