import { useAppDispatch, useAppSelector } from "hooks/hooks";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { selectors } from "utils/selectors";
import {appActions} from "app/appSlice";
export const CustomizedSnackbars = () => {
  const error = useAppSelector(selectors.getError);
  const dispatch = useAppDispatch();

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(appActions.setAppError({error: null}));
  };

  return (
    <div>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};
