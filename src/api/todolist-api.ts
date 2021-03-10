import React from "react";
import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '5adec434-290c-4eac-9a59-2a005f8dd341'
    }
}

export const todolistAPI = {
    getTodolists(){
        const promise = axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
           return promise
    }
}
