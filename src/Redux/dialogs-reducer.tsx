import React from 'react';
import {ActionsTypes} from '../essences/essences';

const ADD_NEW_MESSAGE = 'ADD-NEW-MESSAGE'
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'

export type DialogType = {
    id: number
    name: string
}
export type MessageType = {
    id: number
    message: string
}
export type DialogInitPageType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    newMessageText: string
}

let initializeState: DialogInitPageType = {
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

export const dialogsReducer = (state: DialogInitPageType = initializeState,
                               action: ActionsTypes): DialogInitPageType => {
    switch (action.type) {
        case ADD_NEW_MESSAGE:
            const newMessage: MessageType = {
                id: 5,
                message: state.newMessageText
            }
            return {
                ...state,
                messages: [...state.messages, newMessage],
                newMessageText: ''
            }
        case UPDATE_NEW_MESSAGE_TEXT:
            return {
                ...state,
                newMessageText: action.newMessageText
            }
        default:
            return state
    }
}

type AddMessageACType = {
    type: typeof ADD_NEW_MESSAGE
}
export const addMessage = (): AddMessageACType =>
    ({type: ADD_NEW_MESSAGE}) as const
type UpdateNewMessageTextACType = {
    type: typeof UPDATE_NEW_MESSAGE_TEXT,
    newMessageText: string
}
export const updateNewMessageText = (text: string): UpdateNewMessageTextACType =>
    ({type: UPDATE_NEW_MESSAGE_TEXT, newMessageText: text}) as const


