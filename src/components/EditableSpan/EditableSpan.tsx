import React, { ChangeEvent, memo, useState } from "react";
import TextField from "@mui/material/TextField";

type EditableSpanPropsType = {
  title: string;
  changeTitleHandler: (title: string) => void;
  disabled?: boolean;
};

export const EditableSpan = memo(
  ({ title, changeTitleHandler, disabled }: EditableSpanPropsType) => {
    const [isEdit, setIsEdit] = useState(false);
    const [inputValue, setInputValue] = useState(title);

    const onDoubleClickHandler = () => {
      if (!disabled) {
        setIsEdit(true);
      }
    };
    const onBlurInputHandler = () => {
      setIsEdit(false);
      changeTitleHandler(inputValue.trim());
    };

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.currentTarget.value);
    };

    return (
      <>
        {isEdit ? (
          // ? <input value={inputValue} onChange={onChangeInputHandler} onBlur={onBlurInputHandler} autoFocus/>
          <TextField
            id="outlined-basic"
            variant="outlined"
            onChange={onChangeInputHandler}
            onBlur={onBlurInputHandler}
            autoFocus
            size={"small"}
            value={inputValue}
          />
        ) : (
          <span onDoubleClick={onDoubleClickHandler} style={disabled ? { opacity: 0.5 } : {}}>
            {title}
          </span>
        )}
      </>
    );
  },
);
