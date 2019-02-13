import chalk from 'chalk';
import * as Debug from 'debug';
import * as mongoose from 'mongoose';
import { TodoModel, UserModel } from '../models/crmModels';
import { Request, Response } from 'express';
import * as passport from 'passport';

const debug = Debug('app:crmControllers');

const Todo = TodoModel;
const User = UserModel;

export class TodoController {
    public addNewTodo(req: Request, res: Response) {
        req.body.user = req.signedCookies.user;
        let newTodo = new Todo(req.body);

        newTodo.save((err, todo) => {
            if (err) {
                res.send(err);
            }
            res.json(todo);
        })
    }

    public getTodos(req: Request, res: Response) {
        Todo.find({ user: req.signedCookies.user._id }, (err, todo) => {
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
            if (todo['user'] == req.signedCookies.user._id) {
                res.json(todo);
            } else {
                res.status(400).send('Unauthorized.');
            }
        })
    }

    public updateTodo(req: Request, res: Response) {
        Todo.findOneAndUpdate({ _id: req.params.id, user: req.signedCookies.user._id }, req.body, { new: true }, (err, todo) => {
            if (err) {
                res.send(err);
            }
            res.json(todo);
        })
    }

    public deleteTodo(req: Request, res: Response) {
        Todo.findOneAndUpdate({ _id: req.params.id, user: req.signedCookies.user._id }, { deleteDate: Date.now(), updateDate: Date.now() }, { new: true }, (err, todo) => {
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
            res.json({
                "_id": user._id,
                "username": user.username,
                "privilege": user.privilege,
                "createDate": user.createDate,
                "updateDate": user.updateDate,
                "deleteDate": user.deleteDate
            });
        })
    }

    public getUsers(req: Request, res: Response) {
        User.find({}, { username: 1, privilege: 1, createDate: 1, updateDate: 1 }, (err, users) => {
            if (err) {
                res.send(err);
            }
            res.json(users);
        })
    }

    public getUserById(req: Request, res: Response) {
        User.findById(req.params.id, { username: 1, privilege: 1, createDate: 1, updateDate: 1 }, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        })
    }
}
