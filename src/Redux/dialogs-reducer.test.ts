import {AddMessageAC, DialogsInitializeStateType, dialogsReducer} from './dialogs-reducer';

test('reducer should be add new message', () => {

    type StartStateType = DialogsInitializeStateType

    const startState: StartStateType = {
        dialogs: [
            {id: 1, name: 'Dima Ivanov'},
        ],
        messages: [
            {id: 1, message: 'Detract yet delight written farther'},
        ],
        newMessageText: ''
    }

    const endState = dialogsReducer(startState, AddMessageAC())

    expect(endState.messages.length).toBe(2)
});

test('reducer should be change new message', () => {

    type StartSateType = DialogsInitializeStateType

    const newTestMessageText: string = 'New text added to new state'
    const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'

    const UpdateNewMessageTextAC = (newTestMessageText: string) =>
        ({type: UPDATE_NEW_MESSAGE_TEXT, newMessageText: newTestMessageText}) as const


    const startState: StartSateType = {
        dialogs: [
            {id: 1, name: 'Dima Ivanov'},
        ],
        messages: [
            {id: 1, message: 'Old message'},
        ],
        newMessageText: ''
    }

    const endState = dialogsReducer(startState, UpdateNewMessageTextAC(newTestMessageText))

    expect(endState.newMessageText).toBe('New text added to new state')
    expect(endState.newMessageText.trim().length).toBe(27)
});