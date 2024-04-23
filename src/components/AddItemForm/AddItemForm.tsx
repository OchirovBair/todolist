import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';



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
                <TextField id="standard-basic" label="Введите текст" variant="standard" onChange={inputHandler} onKeyUp={onKeyHandler} value={value}/>
                {/*<input value={value} onChange={inputHandler} onKeyUp={onKeyHandler}/>*/}
                <Button onClick={buttonHandler} disabled={error} variant={'contained'} children={'+'} size={'small'}/>
            </div>
            {error && <span style={{color: 'red'}}>Ошибка ввода</span>}
        </div>
    );
};