let initializeState: DialogInitPageType = {
   dialogs: [
      {id: 1, name: 'Stanislav Ivanov'},
      {id: 2, name: 'Egor Ivanov'},
      {id: 3, name: 'Sergey Ivanov'},
   ],
   messages: [
      {id: 1, message: 'Detract yet delight written farther'},
      {id: 2, message: 'An stairs as be lovers'},
      {id: 3, message: 'Unpleasant in in insensible favourable'},
   ],
}

export const dialogsReducer = (state: DialogInitPageType = initializeState,
                               action: ActionsType): DialogInitPageType => {
   switch (action.type) {
      case 'ADD-NEW-MESSAGE':
         return {...state,
            messages: [...state.messages, {id: 5, message: action.dialogNewMessageText}]
         };
      default:
         return state
   }
}

//Action
export const addMessage = (dialogNewMessageText: string) =>
   ({type: 'ADD-NEW-MESSAGE', dialogNewMessageText} as const)

//Types
type ActionsType = ReturnType<typeof addMessage>
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

