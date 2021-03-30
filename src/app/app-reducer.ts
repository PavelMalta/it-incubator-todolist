import {Dispatch} from "redux";
import {authAPI} from "../api/todolists-api";
import {setIsLoggedInAC, SetIsLoggedInActionType} from "../features/Login/auth-reducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'succeeded' as RequestStatusType,
    error: null as null | string,
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

type ActionsType = SetAppStatusActionType | SetAppErrorActionType
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>


export const setAppStatusAC = (status: RequestStatusType) => {
    return {type: 'APP/SET-STATUS', status} as const
}

export const setAppErrorAC = (error: null | string) => {
    return {type: 'APP/SET-ERROR', error} as const
}

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then( res => {
        debugger
        if (res.data.resultCode === 0 ) {
            dispatch(setIsLoggedInAC(true))
        } else {

        }
    })
}