import React, {ComponentType} from 'react'
import s from './App.module.scss'
import HeaderContainer from '../pages/Header/HeaderContainer'
import {Redirect, Route, Switch, withRouter} from 'react-router-dom'
import {Preloader} from '../components/Preloader/Preloader'
import {initializeApp} from '../redux/app-reducer'
import {Page404} from '../pages/404/Page404'
import {AppStateType} from '../redux/store'
import {Main} from '../pages/Main/Main'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {withSuspense} from '../hoc/withSuspenseH';

type PropsType = MapStateType & MapDispatchToProps

const Login = React.lazy(
    () => import('../pages/Login/LoginPage').then(({LoginPage}) => ({default: LoginPage})),
);
const ProfileContainer = React.lazy(() => import('../pages/Profile/ProfileContainer'))
const DialogsContainer = React.lazy(() => import('../pages/Dialogs/DialogsContainer'))
const ChatPage = React.lazy(() => import('../pages/Chat/ChatPage'))
const UsersPage = React.lazy(
    () => import('../pages/Users/UsersContainer').then(({UsersPage}) => ({default: UsersPage})),
);

export const path = {
    PROFILE: '/profile',
    DIALOGS: '/dialogs',
    CHAT: '/chat',
    DEVELOPERS: '/developers',
    LOGIN: '/login',
}

class App extends React.Component<PropsType> {

    catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
        alert('Some error occurred')
    }

    componentDidMount() {
        this.props.initializeApp()
    }

    render() {

        if (this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div className={s.app}>
                <HeaderContainer/>
                <div className={s.container}>
                    <Main/>
                    <div className={s.content}>
                        <Switch>
                            <Route exact path="/" render={() => <Redirect to={path.PROFILE}/>}/>
                            <Route path={path.PROFILE + ':userid?'} render={withSuspense(ProfileContainer)}/>
                            <Route path={path.DIALOGS} render={withSuspense(DialogsContainer)}/>
                            <Route path={path.CHAT}  render={withSuspense(ChatPage)}/>
                            <Route path={path.DEVELOPERS} render={withSuspense(UsersPage)}/>
                            <Route path={path.LOGIN} render={withSuspense(Login)}/>
                            <Route render={withSuspense(Page404)}/>
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}

type MapDispatchToProps = {
    initializeApp: () => void
}

type MapStateType = {
    initialized: boolean
}

const mapStateToProps = (state: AppStateType): MapStateType => ({
    initialized: state.app.initialized
})

export default compose<ComponentType>(
    withRouter,
    connect<MapStateType, MapDispatchToProps, {}, AppStateType>(mapStateToProps, {initializeApp}),
)(App)
