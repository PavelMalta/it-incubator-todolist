import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    const addItem = () => {
        const itemTitle = title.trim() //метод trim обрезает пробелы
        if (itemTitle) {               // если taskTitle true т.е не пробелы и не пусто , то рисуем таску
            props.addItem(itemTitle)
        } else {
            setError("Title is required!")
        }
        setTitle("")
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)  /* очищаем поле ввода от класса error*/
        setTitle(e.currentTarget.value)
    } //код для изменения содержимого инпут и записи его в тайтл
    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") addItem()
    }
    return (
        <div>
            <input
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPress}
                className={error ? "error" : ""}
            />
            <IconButton color={"primary"} onClick={addItem}><AddBox /></IconButton>
            {error && <div className={"error-message"}>{error}</div>}
        </div>
    )
}
