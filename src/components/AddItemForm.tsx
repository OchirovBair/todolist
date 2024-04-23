import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "./Button";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = ({addItem}: AddItemFormPropsType) => {
    const [value, setValue] = useState('')
    const [error, setError] = useState(false)

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newItem = e.currentTarget.value
        setValue(newItem)
        setError(false)
    }

    const buttonHandler = () => {
        if (value.trim() === '') {
            setError(true)
        } else {
            addItem(value)
            setValue('')
        }
    }

    const onKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            buttonHandler()
        }
    }

    return (
        <div>
            <div>
                <input value={value} onChange={inputHandler} onKeyUp={onKeyHandler}/>
                <Button title={'+'} callback={buttonHandler} isDisabled={error}/>
            </div>
            {error && <span style={{color: 'red'}}>Ошибка ввода</span>}
        </div>
    );
};