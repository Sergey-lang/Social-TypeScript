import {ThunkDispatch} from 'redux-thunk'
import {AppStateType, BaseThunkType, InferActionsType} from './store'
import {authAPI} from '../u5-api/auth-api'
import {FormAction, stopSubmit} from 'redux-form'
import {securityAPI} from '../u5-api/security-api'
import {ResultCodeCaptcha, ResultCodes} from '../u5-api/api'

let initializeState = {
   id: null as (number | null),
   email: null as string | null,
   login: null as string | null,
   isAuth: false,
   captchaUrl: null as string | null
}
export type AuthInitPageType  = typeof initializeState
type ActionsTypes = InferActionsType<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>

export const authReducer = (state: AuthInitPageType = initializeState, action: ActionsTypes): AuthInitPageType => {
   switch (action.type) {
      case 'SN/AUTH/SET-USER-DATA':
      case 'SN/AUTH/GET-CAPTCHA-URL':
         return {...state, ...action.data}
      default:
         return state
   }
}

//Action
export const actions = {
   setUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
      type: 'SN/AUTH/SET-USER-DATA',
      data: {id, email, login, isAuth},
   } as const),
   getCaptchaUrlSuccess: (captchaUrl: string) => ({
      type: 'SN/AUTH/GET-CAPTCHA-URL',
      data: {captchaUrl},
   } as const)
}

//Thunk
export const getAuthUserData = (): ThunkType =>
    async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsTypes>) => {
       const meData = await authAPI.me()
       if (meData.resultCode === ResultCodes.Success) {
          let {id, email, login} = meData.data
          dispatch(actions.setUserData(id, email, login, true))
       }
    }

export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null = null): ThunkType =>
    async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsTypes | FormAction>) => {
       const data = await authAPI.login(email, password, rememberMe, captcha)
       if (data.resultCode === ResultCodes.Success) {
          dispatch(getAuthUserData())
       } else {
          //captcha = result code 10
          if (data.resultCode === ResultCodeCaptcha.CaptchaIsRequired) {
             dispatch(getCaptchaUrl())
          }
          //incorrect form value
          let messages = data.messages.length > 0 ? data.messages[0] : 'some error'
          dispatch(stopSubmit('login', {_error: messages}))
       }
    }

export const getCaptchaUrl = (): ThunkType =>
    async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsTypes>) => {
       const data = await securityAPI.getCaptchaUrl()
       const captchaUrl: string = data.url
       dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
    }

export const logout = (): ThunkType =>
    async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsTypes>) => {
       const response = await authAPI.logout()
       if (response.resultCode === ResultCodes.Success) {
          dispatch(actions.setUserData(null, null, null, false))
       }
    }


