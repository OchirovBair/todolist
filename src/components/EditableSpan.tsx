import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    changeTitleHandler:(title: string)=>void
}

export const EditableSpan = ({title, changeTitleHandler}: EditableSpanPropsType) => {
    const [isEdit, setIsEdit] = useState(false)
    const [inputValue,setInputValue] = useState(title)

    const onDoubleClickHandler = () => {
        setIsEdit(true)
    }
    const onBlurInputHandler = () => {
        setIsEdit(false)
        changeTitleHandler(inputValue.trim())
    }

    const onChangeInputHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    return (
        <>
            {isEdit ? <input value={inputValue} onChange={onChangeInputHandler} onBlur={onBlurInputHandler} autoFocus/> : <span onDoubleClick={onDoubleClickHandler}>{title}</span>}
        </>
    );
};