import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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

    const addTask = (title: string) => {
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
    const removeTodoList = () => {props.removeTodoList(props.id)}

    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(title, props.id)
    }


    return (

        <div>
            <h3><EditableSpan title={props.title} changeTitle={changeTodoListTitle}/><button onClick={removeTodoList}>x</button> </h3>
            <AddItemForm addItem={addTask} />
            <ul>
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
                                <input
                                    onChange={changeStatus}
                                    type="checkbox"
                                    checked={task.isDone}
                                />
                               <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                                <button onClick={removeTask}>x
                                </button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button onClick={onAllClickHandler} className={props.filter==="all" ? "active-filter" : ""}>All
                </button>
                <button onClick={onActiveClickHandler} className={props.filter==="active" ? "active-filter" : ""}>Active
                </button>
                <button onClick={onCompletedClickHandler} className={props.filter==="completed" ? "active-filter" : ""}>Completed
                </button>
            </div>
        </div>
    )
};

export default TodoList