import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import TextField from '@mui/material/TextField';
import AddBoxIcon from '@mui/icons-material/AddBox'
import IconButton from '@mui/material/IconButton'


type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = memo(({addItem, disabled}: AddItemFormPropsType) => {
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
                <TextField label="Введите текст"
                           variant="outlined"
                           onChange={inputHandler}
                           onKeyUp={onKeyHandler}
                           error={error}
                           helperText={error ? 'Ошибка ввода' : ''}
                           value={value}
                           disabled={disabled}
                           size={'small'}/>
                <IconButton onClick={buttonHandler} color={'primary'} disabled={error || disabled}>
                    <AddBoxIcon/>
                </IconButton>
            </div>
        </div>
    );
});