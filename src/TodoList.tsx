import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from "./App";

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
}

function TodoList(props: PropsType) {

    const [title, setTitle] = useState<string>("")

    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        const taskTitle = title.trim() //метод trim обрезает пробелы
        if (taskTitle) {               // если taskTitle true т.е не пробелы и не пусто , то рисуем таску
            props.addTask(taskTitle, props.id)
        } else {
            setError("Title is required!")
        }
        setTitle("")
    }                                                                        ////e.currentTarget.value === input
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)  /* очищаем поле ввода от класса error*/
        setTitle(e.currentTarget.value)
    } //код для изменения содержимого инпут и записи его в тайтл

    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") addTask()
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


    return (

        <div>
            <h3>{props.title}<button onClick={removeTodoList}>x</button> </h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPress}
                    className={error ? "error" : ""}  //присваеваем класснейм:
                />
                <button onClick={addTask}>+</button>
                {error && <div className={"error-message"}>{error}</div>} {/*// дивка отобразится только если появится error*/}
            </div>
            <ul>
                {
                    props.tasks.map(task => {
                        const removeTask = () => {
                            props.removeTask(task.id, props.id)
                        }
                        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(task.id, e.currentTarget.checked, props.id)
                        }//e.currentTarget - это ссылка на input, checked - свойство инпута
                        return (
                            <li key={task.id} className={task.isDone ? "is-done" : ""}>
                                <input
                                    onChange={changeStatus}
                                    type="checkbox"
                                    checked={task.isDone}
                                />
                                <span>{task.title}</span>
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

export default TodoList;