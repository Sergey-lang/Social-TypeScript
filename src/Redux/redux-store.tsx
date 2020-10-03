import {combineReducers, createStore} from 'redux';
import {profileReducer} from './profile-reducer';
import {dialogsReducer} from './dialogs-reducer';

type RootReducerType = typeof rootReducer

const rootReducer = combineReducers({
    profileReducer,
    dialogsReducer,
})


export type AppStateType = ReturnType<RootReducerType>//using in index for rerender

export let store = createStore(rootReducer)//create store with reducers,which contain part of store(init state)

export type StoreReduxType = typeof store //hard type for store

