import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: InitialAppStateType = {
    status: "idle",
    error: null,
    isInitialized: false,
};

export const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppError(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        setAppStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setIsInitialized(state, action: PayloadAction<{ isInitialized: boolean }>) {
            state.isInitialized = action.payload.isInitialized
        }
    }
})

export const appReducer = slice.reducer
export const appActions = slice.actions
export const appName = slice.name




//types

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
export type InitialAppStateType = {
    status: RequestStatusType;
    isInitialized: boolean;
    error: string | null;
};


