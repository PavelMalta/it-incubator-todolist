import {TasksStateType, TaskType} from "../App";
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todolists-reducer";

type RemoveActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}
type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
type ChangeTaskStatusAC = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    isDone: boolean
    todolistId: string
}
type ChangeTaskTitleAC = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    title: string
    todolistId: string
}


export type ActionType = RemoveActionType
    | AddTaskActionType
    | ChangeTaskStatusAC
    | ChangeTaskTitleAC
    | AddTodoListActionType
    | RemoveTodoListActionType

export function tasksReducer(state: TasksStateType, action: ActionType): TasksStateType {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let copyState = {...state}
            copyState[action.todolistId] = copyState[action.todolistId].filter(task => task.id !== action.taskId)
            return copyState
        }
        case 'ADD-TASK': {
            let task: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            return {
                ...state,
                [action.todolistId]: [task, ...state[action.todolistId]]
            }
        }
        case 'CHANGE-TASK-STATUS': {
            let copyState = {...state}
            const task = copyState[action.todolistId].find(t => t.id === action.taskId)
            if (task) {
                task.isDone = action.isDone
            }
            return copyState
        }
        case 'CHANGE-TASK-TITLE': {
            let copyState = {...state}
            const task = copyState[action.todolistId].find(t => t.id === action.taskId)
            if (task) {
                task.title = action.title
            }
            return copyState
        }
        case "ADD-TODOLIST": {
            return {
                ...state,
                [v1()]: []
            }
        }
        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }


        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistId}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusAC => {
    return {type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleAC => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistId}
}
