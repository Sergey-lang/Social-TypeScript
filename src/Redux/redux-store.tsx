import { combineReducers, createStore } from 'redux'
import { profileReducer } from './profile-reducer'
import { dialogsReducer } from './dialogs-reducer'
import { usersReducer } from './users-reducer'
import { authReducer } from './auth-reducer'

const rootReducer = combineReducers({
	profileState: profileReducer,
	dialogsState: dialogsReducer,
	usersState: usersReducer,
	authState: authReducer,
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>
// export type StoreReduxType = typeof store

export let store = createStore(rootReducer)

//@ts-ignore
window.__store__ = store
