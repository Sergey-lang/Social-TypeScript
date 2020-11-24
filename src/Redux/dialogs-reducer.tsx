import React from 'react';
import {ActionsTypes} from './actions';

const ADD_NEW_MESSAGE = 'ADD-NEW-MESSAGE'

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
}

export const dialogsReducer = (state: DialogInitPageType = initializeState,
                               action: ActionsTypes): DialogInitPageType => {
   switch (action.type) {
      case ADD_NEW_MESSAGE:
         return {
            ...state,
            messages: [...state.messages,{id: 5, message: action.dialogNewMessageText}]
         };
      default:
         return state
   }
}

type AddMessageACType = {
   type: typeof ADD_NEW_MESSAGE
   dialogNewMessageText: string
}
export const addMessage = (dialogNewMessageText: string): AddMessageACType =>
   ({type: ADD_NEW_MESSAGE, dialogNewMessageText})

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
}

