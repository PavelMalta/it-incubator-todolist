import React from "react";
import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '5adec434-290c-4eac-9a59-2a005f8dd341'
    }
}

export const todolistAPI = {
    getTodolists() {
        const promise = axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
           return promise
    },
    createTodolist(title: string) {
        const promise = axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists',
            {title}, settings)
        return promise
    },
    deleteTodolist(todolistId: string) {
        return  axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title}, settings)
    }

}
