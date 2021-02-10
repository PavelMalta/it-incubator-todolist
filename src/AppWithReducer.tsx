import React, {useReducer, useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, IconButton, Toolbar, Typography, Container, Grid, Paper} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todoListsReducer
} from "./state/todolists-reducer";
import {tasksReducer, removeTaskAC, addTaskAC, changeTaskStatusAC, changeTaskTitleAC} from "./state/tasks-reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    // BLL:
    const todoListID1 = v1()
    const todoListID2 = v1()

    const [todoLists, dispatchToTodolist] = useReducer(todoListsReducer,[
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "all"}
    ])

    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
            [todoListID1]: [
                {id: v1(), title: "AAA", isDone: false},
                {id: v1(), title: "BBB", isDone: true},
                {id: v1(), title: "CCC", isDone: false}
            ],
            [todoListID2]: [
                {id: v1(), title: "DDD", isDone: true},
                {id: v1(), title: "EEE", isDone: false},
                {id: v1(), title: "FFF", isDone: false}
            ]
        }
    )


    function removeTask(taskID: string, todoListID: string) {
        dispatchToTasks (removeTaskAC(taskID, todoListID))                                          //перерисовывает при обновлении стейта
    }

    function changeFilter(filterValue: FilterValuesType, todoListID: string) {
        dispatchToTodolist(ChangeTodoListFilterAC(filterValue,todoListID))
    }

    function addTask(newTaskTitle: string, todoListID: string) {
        dispatchToTasks (addTaskAC(newTaskTitle, todoListID))
    }

    function changeTaskTitle(taskID: string, title: string, todoListID: string) {
        dispatchToTasks (changeTaskTitleAC(taskID, title, todoListID))
    }

    function changeStatus(taskID: string, isDone: boolean, todoListID: string) {
        dispatchToTasks (changeTaskStatusAC(taskID, isDone, todoListID))
    }

    function removeTodoList(todoListID: string) {
        let action = RemoveTodoListAC(todoListID)
        dispatchToTodolist(action)
        dispatchToTasks(action)
    }

    function addTodoList(todoListTitle: string) {
        let action = AddTodoListAC(todoListTitle)
        dispatchToTodolist(action)
        dispatchToTasks(action)
    }

    function changeTodoListTitle(title: string, todoListID: string) {
        dispatchToTodolist(ChangeTodoListTitleAC(title, todoListID))
    }


    // UI:
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{display: "flex", justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <div style={{display: "flex"}}>
                        <Typography variant="h6" style={{margin: "20px"}}>
                            News
                        </Typography>
                        <Typography variant="h6" style={{margin: "20px"}}>
                            About
                        </Typography>
                    </div>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container style={{padding: "10px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoLists.map(tl => {

                            let tasksForTodoList = tasks[tl.id]
                            if (tl.filter === "active") {
                                tasksForTodoList = tasks[tl.id].filter(t => t.isDone === false)
                            }
                            if (tl.filter === "completed") {
                                tasksForTodoList = tasks[tl.id].filter(t => t.isDone === true)
                            }
                            return (
                                <Grid item key={tl.id}>
                                    <Paper elevation={10} style={{padding: "30px"}}>
                                        <TodoList
                                            id={tl.id}
                                            filter={tl.filter}
                                            title={tl.title}
                                            tasks={tasksForTodoList}
                                            addTask={addTask}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            changeStatus={changeStatus}
                                            removeTodoList={removeTodoList}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodoListTitle={changeTodoListTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>

        </div>
    )
}

export default App;

