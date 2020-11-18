import React from 'react';
import s from './Login.module.css';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {connect} from 'react-redux';


type LoginFormValuesType = {
   email?: string,
   password?: string,
   rememberMe?: boolean,
   captcha?: boolean
}

type LoginFormOwnProps = {
   captchaUrl?: string
}

export const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = (
   {
      handleSubmit,
      captchaUrl,
   }) => {
   return (
      <form onSubmit={handleSubmit}>
         <div>
            <Field placeholder={'Login'} name={'login'} component={'input'}/>
         </div>
         <div>
            <Field placeholder={'Password'} name={'password'} component={'input'}/>
         </div>
         <div>
            <Field type={'checkbox'} name={'rememberMe'} component={'input'}/>Remember me
         </div>
         <div>
            <button>Login</button>
         </div>
      </form>
   )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'})(LoginForm)

export const Login: React.FC = (props) => {
   const onSubmit = (formData: any) => {
      console.log(formData)
   }
   return (
      <div className={s.login}>
         <h1>Login</h1>
         <LoginReduxForm onSubmit={onSubmit}/>
      </div>
   )
}

// type MapStateType = {
//    captchaUrl: string | null
//    isAuth: boolean
// }

// type MapDispatchType = {
//    login: (email: string, password: string, rememberMe: boolean, captcha: boolean) => void
// }

