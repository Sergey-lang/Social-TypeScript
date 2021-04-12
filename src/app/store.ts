import {Action, applyMiddleware, combineReducers, compose, createStore} from 'redux'
import thunkMiddleware, {ThunkAction} from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'
import {profileReducer} from '../redux/profile-reducer';
import {dialogsReducer} from '../redux/dialogs-reducer';
import {usersReducer} from '../redux/users-reducer';
import {authReducer} from '../redux/auth-reducer';
import {appReducer} from '../redux/app-reducer';
import {chatReducer} from '../redux/chat-reducer';
import createSagaMiddleware from 'redux-saga'
import {all} from 'redux-saga/effects';
import {usersWatcherSaga} from '../redux/redux-sagas/users-sagas';

const rootReducer = combineReducers({
   profileState: profileReducer,
   dialogsState: dialogsReducer,
   usersState: usersReducer,
   authState: authReducer,
   app: appReducer,
   form: formReducer,
   chat: chatReducer
})

export type AppStateType = ReturnType<typeof rootReducer>

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never

//AC get type of Action which can be object with 'key:string' ang function with (...args) which return something
//example! followSuccess: (userID: number) => ({type: 'USERS/FOLLOW', userID} as const)
export type InferActionsTypes<T extends { [key: string]: (...args: any) => any }> = ReturnType<PropertiesTypes<T>>

//Thunk...
export type BaseThunkType<A extends Action,R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const sagaMiddleware = createSagaMiddleware()

export let store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware,sagaMiddleware)))

sagaMiddleware.run(rootWatcher)

function* rootWatcher() {
   yield all([usersWatcherSaga()])
}
