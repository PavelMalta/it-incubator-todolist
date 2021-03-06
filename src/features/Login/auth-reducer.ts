import {Dispatch} from 'redux'
import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from '../../app/app-reducer'
import {authAPI, AuthLoginType} from "../../api/todolists-api";

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: AuthLoginType) => async (dispatch: Dispatch<ActionsType>) => {
    try {
        dispatch(setAppStatusAC('loading'))
        let res = await authAPI.login(data)
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
        } else {
            if (res.data.messages.length) {
                dispatch(setAppErrorAC(res.data.messages[0]))
            } else {
                dispatch(setAppErrorAC('Some error occurred'))
            }
        }
    } catch (err) {
        dispatch(setAppErrorAC(err.message))
        dispatch(setAppStatusAC('failed'))
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

export const logoutTC = () => async (dispatch: Dispatch<ActionsType>) => {
    try {
        dispatch(setAppStatusAC('loading'))
        let res = await authAPI.logout()

        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(false))
        } else {
            if (res.data.messages.length) {
                dispatch(setAppErrorAC(res.data.messages[0]))
            } else {
                dispatch(setAppErrorAC('Some error occurred'))
            }
        }
    } catch (err) {
        dispatch(setAppErrorAC(err.message))
        dispatch(setAppStatusAC('failed'))
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}


// types
export type SetIsLoggedInActionType = ReturnType<typeof setIsLoggedInAC>
type ActionsType = SetIsLoggedInActionType | SetAppStatusActionType | SetAppErrorActionType
