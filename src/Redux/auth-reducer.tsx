import React from 'react'
import {ActionsTypes, ThunkType} from '../essences/essences'
import {ThunkDispatch} from 'redux-thunk';
import {AppStateType} from './redux-store';
import {authAPI} from '../API/api';

enum ActionsType {
    SET_USER_DATA = 'AUTH/SET-USER-DATA',
}

export type AuthInitPageType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

let initializeState: AuthInitPageType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
}

export const authReducer = (state: AuthInitPageType = initializeState, action: ActionsTypes): AuthInitPageType => {
    switch (action.type) {
        case ActionsType.SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true,
            }
        default:
            return state
    }
}

type SetDataACType = {
    type: ActionsType.SET_USER_DATA, data: {
        id: number
        email: string
        login: string
    }
}
export const setUserData = (id: number, email: string, login: string): SetDataACType => ({
    type: ActionsType.SET_USER_DATA,
    data: {id, email, login},
})

export const getAuthUserData = (): ThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, ActionsTypes>) => {
        authAPI.me().then(data => {
            if (data.resultCode === 0) {
                let {id, email, login} = data.data
                dispatch(setUserData(id, email, login))
            }
        })
    }
}
