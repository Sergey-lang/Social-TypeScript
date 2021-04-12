import {InferActionsTypes} from '../app/store';

let initializeState = {
   dialogs: [
      {id: 1, name: 'Stanislav Ivanov'},
      {id: 2, name: 'Egor Ivanov'},
      {id: 3, name: 'Sergey Ivanov'},
   ] as Array<DialogType>,
   messages: [
      {id: 1, message: 'Detract yet delight written farther'},
      {id: 2, message: 'An stairs as be lovers'},
      {id: 3, message: 'Unpleasant in in insensible favourable'},
   ] as Array<MessageType>,
}

export type DialogInitStateType = typeof initializeState
type ActionsTypes = InferActionsTypes<typeof actions>

export const dialogsReducer = (state: DialogInitStateType = initializeState,
                               action: ActionsTypes): DialogInitStateType => {
   switch (action.type) {
      case 'SN/DIALOGS/ADD-NEW-MESSAGE':
         return {
            ...state,
            messages: [...state.messages, {id: 5, message: action.dialogNewMessageText}]
         }
      default:
         return state
   }
}

//Action
export const actions = {
   addMessage: (dialogNewMessageText: string) =>
       ({type: 'SN/DIALOGS/ADD-NEW-MESSAGE', dialogNewMessageText} as const)
}

//Types

export type DialogType = {
   id: number
   name: string
}
export type MessageType = {
   id: number
   message: string
}

