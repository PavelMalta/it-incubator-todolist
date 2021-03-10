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
        const todolistId = '05db8dc0-eaa2-4035-9733-7a09695fd479'
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
        const todolistId = 'ab210b02-1018-42c4-a91f-2a650777807c'
        const title = 'React'
        todolistAPI.updateTodolistTitle(todolistId, title)
            .then((res) => {setState(res.data)})
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
