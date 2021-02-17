import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./App";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TodoListType} from "./AppWithRedux";
import {removeTaskAC} from "./state/tasks-reducer";

export type TaskPropsType ={
    task: TaskType
    todolistId: string
    removeTask: (taskID: string, todoListID: string) => void
    changeStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
}

const Task = React.memo(function (props:TaskPropsType) {
   /* const taskFromRedux = useSelector<AppRootStateType, TaskType>
    (state => state.tasks[props.todolistId].filter(task => task.id === props.task.id)[0])

    const dispatch = useDispatch()*/

   /* const removeTask = () => {
        dispatch(removeTaskAC(taskFromRedux.id, props.todolistId))
    }*/
    const removeTask = () => {
        props.removeTask(props.task.id, props.todolistId)
    }

    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeStatus(props.task.id, e.currentTarget.checked, props.todolistId)
    }//e.currentTarget - это ссылка на input, checked - свойство инпута
    const changeTaskTitle = useCallback((title: string) => {
        props.changeTaskTitle(props.task.id, title, props.todolistId)
    }, [])
    return (
        <li className={props.task.isDone ? "is-done" : ""}>
            <Checkbox
                color={"primary"}
                checked={props.task.isDone}
                onChange={changeStatus}
            />
            <EditableSpan title={props.task.title} changeTitle={changeTaskTitle}/>
            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>
        </li>
    )
})

export default Task