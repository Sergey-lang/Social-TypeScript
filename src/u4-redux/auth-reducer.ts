import {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {AppStateType} from './store'
import {authAPI} from '../u5-api/auth-api'
import {FormAction, stopSubmit} from 'redux-form'
import {securityAPI} from '../u5-api/security-api'
import {ResultCodes} from '../u5-api/api'

export type AuthInitPageType = {
   id: number | null
   email: string | null
   login: string | null
   isAuth: boolean
   captchaUrl: string | null
}

let initializeState: AuthInitPageType = {
   id: null,
   email: null,
   login: null,
   isAuth: false,
   captchaUrl: null
}

export const authReducer = (state: AuthInitPageType = initializeState, action: ActionsType): AuthInitPageType => {
   switch (action.type) {
      case 'AUTH/SET-USER-DATA':
      case 'AUTH/GET-CAPTCHA-URL':
         return {...state, ...action.data}
      default:
         return state
   }
}

//Action
export const setUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
   type: 'AUTH/SET-USER-DATA',
   data: {id, email, login, isAuth},
} as const)

export const getCaptchaUrlSuccess = (captchaUrl: string) => ({
   type: 'AUTH/GET-CAPTCHA-URL',
   data: {captchaUrl},
} as const)

//Thunk
export const getAuthUserData = (): ThunkType =>
    async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
       const meData = await authAPI.me()
       if (meData.resultCode === ResultCodes.Success) {
          let {id, email, login} = meData.data
          dispatch(setUserData(id, email, login, true))
       }
    }

export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null = null): ThunkType =>
    async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType | FormAction>) => {
       const data = await authAPI.login(email, password, rememberMe, captcha)
       if (data.resultCode === ResultCodes.Success) {
          dispatch(getAuthUserData())
       } else {
          //captcha = result code 10
          if (data.resultCode === ResultCodes.CaptchaIsRequired) {
             dispatch(getCaptchaUrl())
          }
          //incorrect form value
          let messages = data.messages.length > 0 ? data.messages[0] : 'some error'
          dispatch(stopSubmit('login', {_error: messages}))
       }
    }

export const getCaptchaUrl = (): ThunkType =>
    async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
       const data = await securityAPI.getCaptchaUrl()
       const captchaUrl: string = data.url
       dispatch(getCaptchaUrlSuccess(captchaUrl))
    }

export const logout = (): ThunkType =>
    async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
       const response = await authAPI.logout()
       if (response.resultCode === ResultCodes.Success) {
          dispatch(setUserData(null, null, null, false))
       }
    }

//Type
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsType>
type ActionsType = ReturnType<typeof setUserData> | ReturnType<typeof getCaptchaUrlSuccess>



