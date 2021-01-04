import React from 'react'
import {InjectedFormProps, reduxForm} from 'redux-form'
import {connect} from 'react-redux'
import {createField, Input} from '../../u2-components/FormControl/FormControl'
import {required} from '../../utils/validator'
import {Redirect} from 'react-router-dom'
import {login} from '../../u4-redux/auth-reducer'
import {AppStateType} from '../../u4-redux/store'

import s from './Login.module.css'

type LoginFormOwnProps = {
   captchaUrl: string | null
}

export const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType,
    LoginFormOwnProps> & LoginFormOwnProps>
    = ({
          handleSubmit,
          error,
          captchaUrl
       }) => {
   return (
       <form onSubmit={handleSubmit}>
          <p>Use test data</p>
          <p>Email: free@samuraijs.com</p>
          <p>Password: free</p>
          {createField('email', 'email', Input, [required])}
          {createField('password', 'password', Input, [required], {type: 'password'})}
          {createField(null, 'rememberMe', Input, [], {type: 'checkbox'}, 'remember me')}
          <div>
             {/*captchaUrl without '&&' check don't work! Because null*/}
             {captchaUrl && <img src={captchaUrl && captchaUrl} alt="captcha"/>}
          </div>
          <div>
             {captchaUrl && createField('Symbol of captcha', 'captcha', Input, [required], {})}
          </div>
          <div>
             <button>Login</button>
          </div>
          {error && <div className={s.formSummaryError}>{error}</div>}
          <div>
          </div>
       </form>
   )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'})(LoginForm)

type LoginFormValuesType = {
   captcha: string | null //this type name have to match with field name 'captcha'
   email: string
   password: string
   rememberMe: boolean
}

type OwnProps = {}

export const Login: React.FC<MapStateType & MapDispatchType & OwnProps> = (props) => {

   const onSubmit = (formData: LoginFormValuesType) => {
      props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
   }

   if (props.isAuth) {
      return <Redirect to={'/profile'}/>
   }

   return (
       <div className={s.login}>
          <h1>Login</h1>
          <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
       </div>

   )
}

type MapStateType = {
   captchaUrl: string | null
   isAuth: boolean
}

type MapDispatchType = {
   login: (email: string,
           password: string,
           rememberMe: boolean,
           captcha: string | null
   ) => void
}

const mapState = (state: AppStateType): MapStateType => ({
   isAuth: state.authState.isAuth,
   captchaUrl: state.authState.captchaUrl
})


export default connect<MapStateType, MapDispatchType, OwnProps, AppStateType>(mapState, {login})(Login)
