import React from 'react'
import {ActionsTypes, ThunkType} from './actions';
import {ThunkDispatch} from 'redux-thunk';
import {AppStateType} from './redux-store';
import {authAPI} from '../API/auth-api';
import {FormAction, stopSubmit} from 'redux-form';

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
         }
      default:
         return state
   }
}

type SetDataACType = {
   type: ActionsType.SET_USER_DATA,
   data: {
      id: number | null
      email: string | null
      login: string | null
      isAuth: boolean
   }
}
export const setUserData = (id: number | null, email: string | null ,login: string | null, isAuth: boolean): SetDataACType => ({
   type: ActionsType.SET_USER_DATA,
   data: {id, email, login, isAuth},
})

export const getAuthUserData = (): ThunkType => {
   return (dispatch: ThunkDispatch<AppStateType, unknown, ActionsTypes>) => {
      authAPI.me().then(data => {
         if (data.resultCode === 0) {
            let {id, email, login} = data.data
            dispatch(setUserData(id, email, login, true))
         }
      })
   }
}

export const login = (email: string, password: string, rememberMe: boolean): ThunkType => {
   return (dispatch: ThunkDispatch<AppStateType, unknown, ActionsTypes | FormAction>) => {
      authAPI.login(email, password, rememberMe)
         .then(data => {
            if (data.resultCode === 0) {
               debugger
               dispatch(getAuthUserData())
            } else {
               let messages = data.messages.length > 0 ? data.messages[0] : 'some error';
               dispatch(stopSubmit('login', {_error: messages}))
            }
         })
   }
}

export const logout = (): ThunkType => {
   return (dispatch: ThunkDispatch<AppStateType, unknown, ActionsTypes>) => {
      authAPI.logout()
         .then(response => {
            if (response.resultCode === 0) {
               dispatch(setUserData(null, null, null, false));
            }
         });
   }
}


