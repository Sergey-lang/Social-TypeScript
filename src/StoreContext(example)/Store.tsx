import {ProfilePageInitType, profileReducer} from '../Redux/profile-reducer';
import {DialogInitPageType, dialogsReducer} from '../Redux/dialogs-reducer';
import {ActionsTypes} from '../essences/essences';


export type RootStateType = {
    profilePage: ProfilePageInitType
    dialogPage: DialogInitPageType
}
export type StoreType = {
    _state: RootStateType
    getState: () => RootStateType
    subscriber: (observerCallback: () => void) => void
    _callSubscriber: () => void
    dispatch: (action: ActionsTypes) => void
}

export const store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hello I am props.', likeCount: 21},
                {id: 2, message: 'I am very handsome props', likeCount: 10},
                {id: 3, message: 'I go out from mypost component', likeCount: 5},
            ],
            newPostText: '',
            profile: {}
        },
        dialogPage: {
            dialogs: [
                {id: 1, name: 'Dima Ivanov'},
                {id: 2, name: 'Egor Andreev'},
                {id: 3, name: 'Sergey Titov'},
                {id: 4, name: 'Anton Serov'},
                {id: 5, name: 'Mariya Vinogradova'},
                {id: 6, name: 'Alex Moroz'},
            ],
            messages: [
                {id: 1, message: 'Detract yet delight written farther'},
                {id: 2, message: 'An stairs as be lovers'},
                {id: 3, message: 'Unpleasant in in insensible favourable'},
                {id: 4, message: 'Called though excuse'},
                {id: 5, message: 'Called though.'},
                {id: 6, message: 'Ha-ha-ha...come on.'},],
            newMessageText: ''
        },
    },
    _callSubscriber() {
        console.log('state changed')
    },

    getState() {
        return this._state
    },
    subscriber(observerCallback:any) {
        this._callSubscriber = observerCallback
    },

    dispatch(action:any) {
        // this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogPage = dialogsReducer(this._state.dialogPage, action)

        this._callSubscriber()
    },
}






