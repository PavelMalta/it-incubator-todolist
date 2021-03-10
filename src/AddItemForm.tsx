import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

export type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    console.log('AddItemForm clicked')
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
       if (error !== null) {
           setError(null)
       }
        setTitle(e.currentTarget.value)
    } //код для изменения содержимого инпут и записи его в тайтл
    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") addItem()
    }
    return (
        <div>
            <TextField
                variant={"outlined"}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPress}
                error={!!error}
                helperText={error}
                label={"Title"}
            />
            <IconButton color={"primary"} onClick={addItem}><AddBox/></IconButton>
        </div>
    )
})
