export interface TodoInterface {
    todoTitle: string,
    todoDescription: string,
    todoIsComplete: boolean,
    createDate: Date,
    deleteDate: Date | null,
    updateDate: Date
}

export interface UserInterface {
    username: string,
    password: string,
    privilege: string,
    createDate: Date,
    deleteDate: Date | null,
    updateDate: Date
}