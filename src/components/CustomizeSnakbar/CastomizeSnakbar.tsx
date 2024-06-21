import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {selectors} from "../../state/selectors";
import {setAppErrorAC} from "../../state/app-reducer";
export const CustomizedSnackbars = () => {
    const error = useAppSelector(selectors.getErrorSelector)
    const dispatch = useAppDispatch()

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppErrorAC(null))
    };

    return (
        <div>
            <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{width: '100%'}}
                >
                    {error}
                </Alert>
            </Snackbar>
        </div>
    );
}
