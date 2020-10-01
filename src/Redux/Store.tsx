import {profileReducer} from './profile-reducer';
import {dialogsReducer} from './dialogs-reducer';
import {StoreType} from '../essences/essences';

export const store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hello I am props.', likeCount: 21},
                {id: 2, message: 'I am very handsome props', likeCount: 10},
                {id: 3, message: 'I go out from mypost component', likeCount: 5},
            ],
            newPostText: '',
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
    subscriber(observerCallback) {
        this._callSubscriber = observerCallback
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogPage = dialogsReducer(this._state.dialogPage, action)

        this._callSubscriber()
    },
}






