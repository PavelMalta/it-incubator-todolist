import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {IconButton, Button, Checkbox} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import { TodoListType } from "./AppWithRedux";
import Task from "./Task";

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

const TodoList = React.memo((props: PropsType) => {
    const todolist = useSelector<AppRootStateType, TodoListType>(state =>
        state.todolists.filter(todo => todo.id === props.id)[0])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])
    const onAllClickHandler = useCallback(() => {
        props.changeFilter("all", props.id)
    },[props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter("active", props.id)
    },[])
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter("completed", props.id)
    }, [])
    const removeTodoList = useCallback(() => {
        props.removeTodoList(props.id)
    },[])

    const changeTodoListTitle = useCallback((title: string) => {
        props.changeTodoListTitle(title, props.id)
    },[])

    let tasksForTodoList = props.tasks
    if (props.filter === "active") {
        tasksForTodoList = props.tasks.filter(t => t.isDone === false)
    }
    if (props.filter === "completed") {
        tasksForTodoList = props.tasks.filter(t => t.isDone === true)
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
                    tasksForTodoList.map(t => {
                        return <Task
                            key={t.id}
                            task={t}
                            todolistId={props.id}
                            changeTaskTitle={props.changeTaskTitle}
                            changeStatus={props.changeStatus}
                            removeTask={props.removeTask}
                        />
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
})




export default TodoList