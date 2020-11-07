import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import { profileReducer } from './profile-reducer'
import { dialogsReducer } from './dialogs-reducer'
import { usersReducer } from './users-reducer'
import { authReducer } from './auth-reducer'
import  thunkMiddleware  from 'redux-thunk'

const rootReducer = combineReducers({
	profileState: profileReducer,
	dialogsState: dialogsReducer,
	usersState: usersReducer,
	authState: authReducer,
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>
// export type StoreReduxType = typeof store
//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export let store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

//@ts-ignore
window.__store__ = store
