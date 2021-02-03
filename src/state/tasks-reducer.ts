import {TasksStateType, TaskType} from "../App";
import {v1} from "uuid";

type RemoveActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}
type AddTaskActionType  = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}


export type ActionType = RemoveActionType | AddTaskActionType

export function tasksReducer(state: Array<TasksStateType>, action: ActionType): Array<TasksStateType> {
    switch (action.type){
        case 'REMOVE-TASK': {
            let copyState = {...state}
            copyState[action.todolistId] =  copyState[action.todolistId].filter(task => task.id !== action.taskId)
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
