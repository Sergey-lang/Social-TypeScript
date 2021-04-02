import {DialogInitStateType, dialogsReducer, actions} from '../dialogs-reducer'


test('reducer should be add new message', () => {

   const startState: DialogInitStateType = {
      dialogs: [
         {id: 1, name: 'Dima Ivanov'},
      ],
      messages: [
         {id: 1, message: 'Detract yet delight written farther'},
      ],
   }

   const messageText = 'This is dialogs message for another user'

   const endState = dialogsReducer(startState, actions.addMessage(messageText))

   expect(endState.messages.length).toBe(2)
})
