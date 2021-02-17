import {FilterValuesType, TodoListType} from "../App";
import { v1 } from "uuid";

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodoListActionType  = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
type ChangeTodoListTitleActionType  = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    id: string
}
type ChangeTodoListFilterActionType  = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterValuesType
    id: string
}
export let todoListID1 = v1()
export let todoListID2 = v1()
let initialState:Array<TodoListType> = [
    {id: todoListID1, title: "What to learn", filter: "all"},
    {id: todoListID2, title: "What to buy", filter: "all"}]

export type ActionType = RemoveTodoListActionType | AddTodoListActionType | ChangeTodoListTitleActionType | ChangeTodoListFilterActionType

export function todoListsReducer(state:Array<TodoListType> = initialState, action: ActionType):Array<TodoListType> {
    switch (action.type){
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            debugger;
        {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: "all"
            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE':
           const todoLists =  state.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, title: action.title}
                } else {
                    return  tl
                }
            })
                return todoLists
        case 'CHANGE-TODOLIST-FILTER': {
            const todoLists = state.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, filter: action.filter}
                } else {
                    return tl
                }
            })
            return todoLists
        }
        default:
            return state
    }
}

export const RemoveTodoListAC = (id: string): RemoveTodoListActionType => {
    return {type: 'REMOVE-TODOLIST', id: id}
}
export const AddTodoListAC = (todoListTitle: string, ): AddTodoListActionType => {
    return {type: 'ADD-TODOLIST', title: todoListTitle, todolistId: v1()}
}
export const ChangeTodoListTitleAC = (title: string, todoListID: string): ChangeTodoListTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', title: title, id: todoListID}
}
export const ChangeTodoListFilterAC = (filter: FilterValuesType, todoListID: string): ChangeTodoListFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: todoListID}
}