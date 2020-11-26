import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AppStateType} from './store';
import {authAPI} from '../api/auth-api';
import {FormAction, stopSubmit} from 'redux-form';

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

export const authReducer = (state: AuthInitPageType = initializeState, action: ActionsType): AuthInitPageType => {
   switch (action.type) {
      case 'AUTH/SET-USER-DATA':
         return {...state,...action.data}
      default:
         return state
   }
}

//Action
export const setUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
   type: 'AUTH/SET-USER-DATA',
   data: {id, email, login, isAuth},
} as const)

//Thunk
export const getAuthUserData = (): ThunkType =>
   (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
   authAPI.me().then(data => {
      if (data.resultCode === 0) {
         let {id, email, login} = data.data
         dispatch(setUserData(id, email, login, true))
      }
   })
}

export const login = (email: string, password: string, rememberMe: boolean): ThunkType =>
   (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType | FormAction>) => {
   authAPI.login(email, password, rememberMe)
      .then(data => {
         if (data.resultCode === 0) {
            dispatch(getAuthUserData())
         } else {
            let messages = data.messages.length > 0 ? data.messages[0] : 'some error';
            dispatch(stopSubmit('login', {_error: messages}))
         }
      })
}

export const logout = (): ThunkType =>
   (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
   authAPI.logout()
      .then(response => {
         if (response.resultCode === 0) {
            dispatch(setUserData(null, null, null, false));
         }
      });
}

//Type
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsType>
type ActionsType = ReturnType<typeof setUserData>



