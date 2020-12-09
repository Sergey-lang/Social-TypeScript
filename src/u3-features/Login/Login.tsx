import React, {FC} from 'react'
import s from './Login.module.css'
import {Field, InjectedFormProps, reduxForm, WrappedFieldProps} from 'redux-form'
import {connect} from 'react-redux'
import {Input} from '../../u2-components/FormControl/FormControl'
import {required} from '../../utils/validator'
import {Redirect} from 'react-router-dom'
import {login} from '../../u4-redux/auth-reducer'
import {AppStateType} from '../../u4-redux/store'

type LoginFormOwnProps = {
   captchaUrl?: string
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
          {CreateField('email', 'email', Input, [required])}
          {CreateField('password', 'password', Input, [required], {type: 'password'})}
          {CreateField(null, 'rememberMe', Input, [], {type: 'checkbox'}, 'remember me')}
          <div>
             <button>Login</button>
          </div>
          {error && <div className={s.formSummaryError}>{error}</div>}
          <div>
          </div>
       </form>
   )
}

export const CreateField = (placeholder: string | null, name: string, component: FC<WrappedFieldProps>, validators: Array<any>, props = {}, text = '') => (
    <div>
       <Field placeholder={placeholder} name={name} component={component} validate={validators} {...props}/>
       {text}
    </div>
)

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'})(LoginForm)

type LoginFormValuesType = {
   // captcha?: boolean
   email: string
   password: string
   rememberMe: boolean
}

type OwnProps = {}

export const Login: React.FC<MapStateType & MapDispatchType & OwnProps> = (props) => {
   const onSubmit = (formData: LoginFormValuesType) => {
      props.login(formData.email, formData.password, formData.rememberMe)
   }

   if (props.isAuth) {
      return <Redirect to={'/profile'}/>
   }

   return (
       <div className={s.login}>
          <h1>Login</h1>
          <LoginReduxForm onSubmit={onSubmit}/>
       </div>

   )
}

type MapStateType = {
   captchaUrl?: string | null
   isAuth: boolean
}

type MapDispatchType = {
   login: (email: string,
           password: string,
           rememberMe: boolean
           // captcha?: boolean
   ) => void
}

const mapState = (state: AppStateType): MapStateType => ({
   isAuth: state.authState.isAuth
   // captcha?: boolean
})


export default connect<MapStateType, MapDispatchType, OwnProps, AppStateType>(mapState, {login})(Login)
