import React from "react";
import axios from "axios";


type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type ResponseType<T> = {
    resultCode: number
    messages: Array<string>
    data: T
}

type TaskType = {
    id: string
    title: string
    description: string
    todoListId: string
    order: number
    status: number
    priority: number
    startDate: string
    deadline: string
    addedDate: string
}

type GetTaskResponse = {
    error: string | null
    totalCount: number
    items: Array<TaskType>
}


const instance = axios.create({
    baseURL:'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '5adec434-290c-4eac-9a59-2a005f8dd341'
    }
})

export const todolistAPI = {
    getTodolists() {
        const promise = instance.get<Array<TodolistType>>('todo-lists')
           return promise
    },
    createTodolist(title: string) {
        const promise = instance.post<ResponseType<{item: TodolistType}>>('todo-lists',{title})
        return promise
    },
    deleteTodolist(todolistId: string) {
        return  instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}`)
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put<ResponseType<{}>>(`todo-lists/${todolistId}`, {title})
    },
    getTasks(todolistId: string) {
        return instance.get<GetTaskResponse>(`todo-lists/${todolistId}/tasks`)
            },
    createTask(todolistId: string, title: string) {
      return instance.post(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, title: string) {
        return instance.put(`todo-lists/${todolistId}/tasks/${taskId}`, {title})
    }
}
