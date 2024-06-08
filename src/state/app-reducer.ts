
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialAppStateType = typeof initialAppState
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type AppReducerActionsType = SetAppStatusActionType | SetAppErrorActionType

const initialAppState = {
    status: 'loading' as RequestStatusType,
    error: null as string | null
}

export const appReducer = (state=initialAppState, action:AppReducerActionsType):InitialAppStateType => {
    switch (action.type) {
        case "APP/SET-STATUS":
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        default:
            return state
    }
}


export const setAppStatusAC = (status: RequestStatusType) => ({type: "APP/SET-STATUS", status} as const)
export const setAppErrorAC = (error: string | null) => ({type: "APP/SET-ERROR", error} as const)