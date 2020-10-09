import React from 'react';
import {ActionsTypes, DialogPageType, MessageType} from '../essences/essences';

const ADD_NEW_MESSAGE = 'ADD-NEW-MESSAGE'
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'

type AddMessageACType = {
    type: typeof ADD_NEW_MESSAGE
}
type UpdateNewMessageTextACType = {
    type: typeof UPDATE_NEW_MESSAGE_TEXT,
    newMessageText: string
}

let dialogsInitializeState: DialogPageType = {
    dialogs: [
        {id: 1, name: 'Dima Ivanov'},
        {id: 2, name: 'Egor Andreev'},
        {id: 3, name: 'Sergey Titov'},
    ],
    messages: [
        {id: 1, message: 'Detract yet delight written farther'},
        {id: 2, message: 'An stairs as be lovers'},
        {id: 3, message: 'Unpleasant in in insensible favourable'},
    ],
    newMessageText: ''
}

export const dialogsReducer = (state: DialogPageType = dialogsInitializeState,
                               action: ActionsTypes): DialogPageType => {
    switch (action.type) {
        case ADD_NEW_MESSAGE:
            const newMessage: MessageType = {
                id: 5,
                message: state.newMessageText
            }
            state.messages.push(newMessage)
            state.newMessageText = ''
            return state
        case UPDATE_NEW_MESSAGE_TEXT:
            state.newMessageText = action.newMessageText
            return state
        default:
            return state
    }
}

//ActionCreators
export const AddMessageAC = (): AddMessageACType =>
    ({type: ADD_NEW_MESSAGE}) as const

export const UpdateNewMessageTextAC = (text: string): UpdateNewMessageTextACType =>
    ({type: UPDATE_NEW_MESSAGE_TEXT, newMessageText: text}) as const


