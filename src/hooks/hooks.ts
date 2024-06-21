import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import {AppRootStateType, AppThunkDispatchType} from "../state/store";


export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export const useAppDispatch = useDispatch<AppThunkDispatchType>
