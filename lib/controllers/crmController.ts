import * as mongoose from 'mongoose';
import { TodoModel, UserModel } from '../models/crmModels';
import { Request, Response } from 'express';

const Todo = TodoModel;
const User = UserModel;

export class TodoController {
    public addNewTodo(req: Request, res: Response) {
        let newTodo = new Todo(req.body);

        newTodo.save((err, todo) => {
            if (err) {
                res.send(err);
            }
            res.json(todo);
        })
    }

    public getTodos(req: Request, res: Response) {
        Todo.find({}, (err, todo) => {
            if (err) {
                res.send(err);
            }
            res.json(todo);
        })
    }

    public getTodoById(req: Request, res: Response) {
        Todo.findById(req.params.id, (err, todo) => {
            if (err) {
                res.send(err);
            }
            res.json(todo);
        })
    }

    public updateTodo(req: Request, res: Response) {
        Todo.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, todo) => {
            if (err) {
                res.send(err);
            }
            res.json(todo);
        })
    }

    public deleteTodo(req: Request, res: Response) {
        Todo.findOneAndUpdate({ _id: req.params.id }, { deleteDate: Date.now(), updateDate: Date.now() }, { new: true }, (err, todo) => {
            if (err) {
                res.send(err);
            }
            res.json(todo);
        })
    }
}

export class UserController {
    public addNewUser(req: Request, res: Response) {
        let newUser = new User(req.body);

        newUser.save((err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        })
    }

    public getUsers(req: Request, res: Response) {
        User.find({}, (err, users) => {
            if (err) {
                res.send(err);
            }
            res.json(users);
        })
    }
}