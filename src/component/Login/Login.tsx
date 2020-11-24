import React from 'react';
import s from './Login.module.css';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {Input} from '../../common/FormControl/FormControl';
import {required} from '../../Utils/validator';
import {Redirect} from 'react-router-dom';
import {login} from '../../Redux/auth-reducer';
import {AppStateType} from '../../Redux/redux-store';

type LoginFormOwnProps = {
   captchaUrl?: string
}

export const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, error, captchaUrl}) => {

   return (
      <form onSubmit={handleSubmit}>
         <div>
            <Field placeholder={'email'}
                   name={'email'}
                   component={Input}
                   validate={[required]}
            />
         </div>
         <div>
            <Field type={'password'}
                   placeholder={'Password'}
                   name={'password'}
                   component={Input}
                   validate={[required]}
            />
         </div>
         <div>
            <Field type={'checkbox'}
                   name={'rememberMe'}
                   component={Input}
                   validate={[required]}
            />
            Remember me
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
   // captcha?: boolean
   email: string
   password: string
   rememberMe: boolean
}

// type LoginFormValuesTypeKeys = keyof LoginFormValuesType

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


export default connect<MapStateType, MapDispatchType, OwnProps, AppStateType>(mapState, {login})(Login);
