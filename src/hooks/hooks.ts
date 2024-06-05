import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import {AppRootStateType} from "../state/store";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export const useAppDispatch = useDispatch<AppDispatchType>
