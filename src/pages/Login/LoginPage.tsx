import React from 'react'
import {createField, Input} from '../../components/FormControl/FormControl'
import {Redirect} from 'react-router-dom'
import {required} from '../../utils/validator'
import {login} from '../../redux/auth-reducer'
import {useDispatch, useSelector} from 'react-redux'
import {InjectedFormProps, reduxForm} from 'redux-form'
import s from './LoginPage.module.scss'
import {path} from '../../app/App';
import { Button } from '../../components/Button/Button'
import {AppStateType} from '../../app/store';

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
        <form onSubmit={handleSubmit} className={s.form}>
            <div className={s.testData}>
                <p>Use test data</p>
                <p>Email: free@samuraijs.com</p>
                <p>Password: free</p>
            </div>

            <div className={s.inputWrapper}>
                {createField('Email', 'email', Input, [required])}
            </div>
            <div className={s.inputWrapper}>
                {createField('Password', 'password', Input, [required], {type: 'password'})}
            </div>
            <div className={s.checkboxWrapper}>
                {createField(null, 'rememberMe', Input, [], {type: 'checkbox'}, '')}
                <span>Remember me</span>
            </div>
            <div>
                {/*captchaUrl without '&&' check don't work! Because null*/}
                {captchaUrl && <img src={captchaUrl && captchaUrl} alt="captcha"/>}
            </div>
            <div>
                {captchaUrl && createField('Symbol of captcha', 'captcha', Input, [required], {})}
            </div>
            <div>
                <Button className={s.loginBtn}>Login</Button>
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

export const LoginPage: React.FC = () => {

    const captchaUrl = useSelector((state: AppStateType) => state.authState.captchaUrl)
    const isAuth = useSelector((state: AppStateType) => state.authState.isAuth)
    const dispatch = useDispatch()


    const onSubmit = (formData: LoginFormValuesType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }

    if (isAuth) {
        return <Redirect to={path.PROFILE}/>
    }

    return (
        <div className={s.login}>
            <div className={s.singIn}>
                <h1 className={s.pageName}>Login</h1>
                <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
            </div>
        </div>

    )
}
