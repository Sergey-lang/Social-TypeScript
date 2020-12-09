import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import {profileReducer} from './profile-reducer'
import {dialogsReducer} from './dialogs-reducer'
import {usersReducer} from './users-reducer'
import {authReducer} from './auth-reducer'
import thunkMiddleware from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'
import {appReducer} from './app-reducer'

const rootReducer = combineReducers({
   profileState: profileReducer,
   dialogsState: dialogsReducer,
   usersState: usersReducer,
   authState: authReducer,
   app: appReducer,
   form: formReducer,
})

export type AppStateType = ReturnType<typeof rootReducer>

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export let store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

