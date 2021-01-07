import React, {ComponentType} from 'react'
import s from './App.module.scss'
import HeaderContainer from '../u3-pages/00-Header/HeaderContainer'
import {Route, withRouter, Switch, Redirect} from 'react-router-dom'
import {AppStateType} from '../u4-redux/store'
import {connect} from 'react-redux'
import {initializeApp} from '../u4-redux/app-reducer'
import {compose} from 'redux'
import {Preloader} from '../u2-components/Preloader/Preloader'
import {withSuspense} from '../u7-hoc/withSuspense'
import {Main} from '../u3-pages/01-Main/Main'
import {Page404} from '../u3-pages/404/Page404'

type PropsType = MapStateType & MapDispatchToProps

const Login = React.lazy(() => import('../u3-pages/Login/Login'))
const ProfileContainer = React.lazy(() => import('../u3-pages/Profile/ProfileContainer'))
const DialogsContainer = React.lazy(() => import('../u3-pages/Dialogs/DialogsContainer'))
const UsersContainer = React.lazy(() => import('../u3-pages/Users/UsersContainer'))

class App extends React.Component<PropsType> {

   catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
      alert('Some error occurred')
   }

   componentDidMount() {
      this.props.initializeApp()
      // window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
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
                      <Route exact path="/" render={() => <Redirect to='/profile'/>}/>
                      <Route path="/profile/:userid?" render={withSuspense(ProfileContainer)}/>
                      <Route path="/dialogs" render={withSuspense(DialogsContainer)}/>
                      <Route path="/users" render={withSuspense(UsersContainer)}/>
                      <Route path="/login" render={withSuspense(Login)}/>
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
