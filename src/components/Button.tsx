import React from 'react';

type ButtonPropsType = {
    title: string
    callback: ()=>void
    isDisabled?:boolean
}

export const Button = ({title, callback, isDisabled=false}: ButtonPropsType) => {
    return (
        <button onClick={callback} disabled={isDisabled}>{title}</button>
    );
};