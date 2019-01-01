export interface TodoInterface {
    createDate: Date,
    deleteDate: Date | null,
    updateDate: Date,
    todoTitle: string,
    todoDescription: string,
    todoIsComplete: boolean
}

export interface UserInterface {
    username: string,
    password: string,
    createDate: Date,
    deleteDate: Date | null,
    updateDate: Date
}