import React, {memo} from 'react';
import Button, {ButtonProps} from '@mui/material/Button';

type MiuButtonPropsType = {} & ButtonProps
// interface IMiuButtonPropsType extends ButtonProps {} - можно и так писать

export const MiuButton = memo(({variant, onClick, title, ...rest}: MiuButtonPropsType) => {
    return (
        <Button variant={variant}
                onClick={onClick}
                {...rest}>
            {title}
        </Button>
    );
})