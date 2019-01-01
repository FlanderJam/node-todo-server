import * as mongoose from 'mongoose';
import { TodoInterface, UserInterface } from './interfaces';
import * as bcrypt from 'bcrypt';

const Schema = mongoose.Schema;
const SALT_WOR_FACTOR = 10;

const TodoSchema = new Schema({
    todoTitle: {
        type: String,
        required: 'Please enter a title for your todo item.'
    },
    todoDescription: String,
    todoIsComplete: {
        type: Boolean,
        default: false
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    deleteDate: {
        type: Date,
        default: null
    },
    updateDate: {
        type: Date,
        default: Date.now
    },
    user: {
        ref: 'User',
        type: Schema.Types.ObjectId
    }
})

export const TodoModel = mongoose.model<TodoInterface & mongoose.Document>('Todo', TodoSchema);

const UserSchema = new Schema({
    username: {
        type: String,
        required: 'Username is required!',
        index: { unique: true }
    },
    password: {
        type: String,
        required: 'Password is required!'
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    deleteDate: {
        type: Date,
        default: null
    },
    updateDate: {
        type: Date,
        default: Date.now
    }
})

UserSchema.pre('save', function (next) {
    let user = this;

    // * Only has the password if it has been modified (or is new)
    if (!user.isModified('password')) {
        return next();
    }

    // * generate a salt
    bcrypt.genSalt(SALT_WOR_FACTOR, function (err, salt) {
        if (err) {
            return next(err);
        }
        // * hash the password along with our new salt
        bcrypt.hash(user['password'], salt, function (err, hash) {
            // * override the cleartext password with the hashed one
            user['password'] = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
}

export const UserModel = mongoose.model<UserInterface & mongoose.Document>('User', UserSchema);