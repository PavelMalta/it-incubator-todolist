import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {IconButton, Button, Checkbox} from "@material-ui/core";
import {CheckBox, Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import { TodoListType } from "./AppWithRedux";

type PropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    addTask: (title: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (filterValue: FilterValuesType, todoListID: string) => void
    changeStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}

function TodoList(props: PropsType) {
    const todolist = useSelector<AppRootStateType, TodoListType>(state =>
        state.todolists.filter(todo => todo.id === props.id)[0])
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id])

    const dispatch = useDispatch()

    const addTask = (title: string) => {
        //dispatch(addTaskAC(title, todolist.id))
        props.addTask(title, props.id)
    }
    const onAllClickHandler = () => {
        props.changeFilter("all", props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active", props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed", props.id)
    }
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }

    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(title, props.id)
    }

    return (

        <div>
            <h3 style={{textAlign: "center"}}>
                <EditableSpan title={todolist.title} changeTitle={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList}><Delete/></IconButton>
            </h3 >
            <AddItemForm addItem={addTask}/>
            <ul style={{listStyle: "none", paddingLeft: "0px"}}>
                {
                    props.tasks.map(task => {
                        const removeTask = () => {
                            props.removeTask(task.id, props.id)
                        }
                        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(task.id, e.currentTarget.checked, props.id)
                        }//e.currentTarget - это ссылка на input, checked - свойство инпута
                        const changeTaskTitle = (title: string) => {
                            props.changeTaskTitle(task.id, title, props.id)
                        }
                        return (
                            <li key={task.id} className={task.isDone ? "is-done" : ""}>
                                <Checkbox
                                    color={"primary"}
                                    checked={task.isDone}
                                    onChange={changeStatus}
                                />
                                <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                                <IconButton onClick={removeTask}>
                                    <Delete/>
                                </IconButton>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <Button
                    style={{marginRight: "4px"}}
                    variant={props.filter === "all" ? "contained" : "outlined"}
                    color={"primary"}
                    size={"small"}
                    onClick={onAllClickHandler}
                >
                    All
                </Button>
                <Button
                    style={{marginRight: "4px"}}
                    variant={props.filter === "active" ? "contained" : "outlined"}
                    color={"primary"}
                    size={"small"}
                    onClick={onActiveClickHandler}
                >
                    Active
                </Button>
                <Button
                    style={{marginRight: "4px"}}
                    variant={props.filter === "completed" ? "contained" : "outlined"}
                    color={"primary"}
                    size={"small"}
                    onClick={onCompletedClickHandler}
                >
                    Completed
                </Button>
            </div>
        </div>
    )
};

export default TodoList