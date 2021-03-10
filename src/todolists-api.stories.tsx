import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistAPI} from "./api/todolist-api";

export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '5adec434-290c-4eac-9a59-2a005f8dd341'
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists()
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = "newTodolist"
        todolistAPI.createTodolist(title).then((res) => {setState(res.data)})
    }, [])


    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '5f1473cf-e64a-470c-b277-f2e69e1522c5'
        todolistAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '539fa6d0-1aed-4e25-9dd8-bc74f748e014'
        const title = 'React'
        todolistAPI.updateTodolistTitle(todolistId, title)
            .then((res) => {setState(res.data)})
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
