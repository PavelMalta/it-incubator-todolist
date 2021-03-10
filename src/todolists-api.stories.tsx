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
        const todolistId = '8d6b8b5f-54e2-481c-9f67-e638e3ffca56'
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
        const todolistId = '8d6b8b5f-54e2-481c-9f67-e638e3ffca56'
        const title = 'React'
        todolistAPI.updateTodolistTitle(todolistId, title)
            .then((res) => {setState(res.data)})
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '539fa6d0-1aed-4e25-9dd8-bc74f748e014'
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState<string>("")
    const [todolistId, setTodolistId] = useState<string>("")

    const createTask = () => {
        todolistAPI.createTask(todolistId, taskTitle)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <input placeholder={"todolistId"} value={todolistId}
                onChange={(e) => {setTodolistId(e.currentTarget.value)}}/>
        <input placeholder={"Task Title"} value={taskTitle}
               onChange={(e) => {setTaskTitle(e.currentTarget.value)}}/>
         <button onClick={createTask}>create task</button>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '539fa6d0-1aed-4e25-9dd8-bc74f748e014'
        const taskId = '92b55b18-b6ec-4d88-a54c-912f16f2fa3e'
        todolistAPI.deleteTask(todolistId, taskId)
            .then((res) => {setState(res.data)})
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '539fa6d0-1aed-4e25-9dd8-bc74f748e014'
        const taskId = '5342ff5e-b3f2-4fa5-ad51-6e5138cbc3e9'
        const title = 'React and Redux'
        todolistAPI.updateTask(todolistId, taskId, title)
            .then((res) => {setState(res.data)})
    }, [])

    return <div> {JSON.stringify(state)}</div>
}