import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import {AppRootStateType} from "../state/store";

// Use throughout your app instead of plain useDispatch and useSelector
// export const useAppDispatch = () => useDispatch<AppDispatch>() //для санок
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector