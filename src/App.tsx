import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    // BLL:
    const todoListID1 = v1()
    const todoListID2 = v1()

    const [todoLists, setTodolist] = useState<Array<TodoListType>>([
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "all"}
    ])


    const [tasks, setTasks] = useState<TasksStateType>({
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
        const todoListTasks = tasks[todoListID]
        tasks[todoListID] = todoListTasks.filter(task => task.id !== taskID)        //если task.id !== taskID вернет true то в новый массив запишется этот элемент
        setTasks({...tasks})                                              //перерисовывает при обновлении стейта
    }

    function changeFilter(filterValue: FilterValuesType, todoListID: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.filter = filterValue
            setTodolist([...todoLists])
        }
    }

    function addTask(newTaskTitle: string, todoListID: string) {
        const newTask: TaskType = {
            id: v1(),
            title: newTaskTitle,
            isDone: false
        }
        tasks[todoListID] = [newTask, ...tasks[todoListID]]
        setTasks({...tasks})    /// ...tasks это деструктиризация массива, содержимое старого массива добавить в новый
    }

    function changeStatus(taskID: string, isDone: boolean, todoListID: string) {
        const todoListTasks = tasks[todoListID]
        const task = todoListTasks.find(t => t.id === taskID)   //метод find перебирает массив обьектов и возвращает обьект с нужным id (t.id)
        if (task) {
            task.isDone = isDone  // в найденном обьекте меняем свойство isDone на то что нам пришло
            setTasks({...tasks})  //перерисовываем новый массив со новыми данными
        }
    }

    function removeTodoList(todoListID: string) {
        setTodolist(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }

    function addTodoList(todoListTitle: string) {
        const todoListID = v1()
        const newTodoList: TodoListType = {
            id: todoListID,
            title: todoListTitle,
            filter: "all"
        }
        setTodolist([...todoLists, newTodoList])
        setTasks({
            ...tasks,
            [todoListID]: []
        })
    }


    // UI:
    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {
                todoLists.map( tl => {

                    let tasksForTodoList = tasks[tl.id]
                    if (tl.filter === "active") {
                        tasksForTodoList = tasks[tl.id].filter(t => t.isDone === false)
                    }
                    if (tl.filter === "completed") {
                        tasksForTodoList = tasks[tl.id].filter(t => t.isDone === true)
                    }
                    return (
                        <TodoList
                            key={tl.id}
                            id={tl.id}
                            filter={tl.filter}
                            title={tl.title}
                            tasks={tasksForTodoList}
                            addTask={addTask}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            changeStatus={changeStatus}
                            removeTodoList={removeTodoList}
                        />
                    )
                })
            }

        </div>
    )
}

export default App;

