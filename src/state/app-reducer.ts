//

//
// const initialAppState = {
//     status: 'loading' as RequestStatusType,
//     error: null as string | null
// }
//
// export const appReducer = (state=initialAppState, action:AppReducerActionsType):InitialAppStateType => {
//     switch (action.type) {
//         case "APP/SET-STATUS":
//             return {...state, status: action.status}
//         case "APP/SET-ERROR":
//             return {...state, error: action.error}
//         default:
//             return state
//     }
// }
//
//
// export const setAppStatusAC = (status: RequestStatusType) => ({type: "APP/SET-STATUS", status} as const)
// export const setAppErrorAC = (error: string | null) => ({type: "APP/SET-ERROR", error} as const)


const initialState: InitialAppStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

export const appReducer = (state: InitialAppStateType = initialState, action: AppReducerActionsType): InitialAppStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case "APP/SET-IS-INIT":
            return {...state, isInitialized: action.isInitialized}
        default:
            return {...state}
    }
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialAppStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    isInitialized: boolean
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
}

export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setIsInitAC = (isInitialized: boolean) => ({type: 'APP/SET-IS-INIT', isInitialized} as const)

// export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
// export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
// export type setIsInitActionType = ReturnType<typeof setIsInitAC>

export type AppReducerActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | setIsInitActionType

export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type setIsInitActionType = ReturnType<typeof setIsInitAC>
