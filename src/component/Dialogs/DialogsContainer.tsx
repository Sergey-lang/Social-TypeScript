import React from 'react';
import {AddMessageAC, UpdateNewMessageTextAC} from '../../Redux/dialogs-reducer';
import {Dialogs} from './Dialogs';
import {StoreContext} from '../../StoreContext';

export const DialogsContainer: React.FC = (props) => {
    return (
        <StoreContext.Consumer>
            {
                (store) => {
                    let state = store.getState()

                    const sendMessage = () => {
                        store.dispatch(AddMessageAC())
                    }
                    const changingMessageText = (newMessageText: string) => {
                        store.dispatch(UpdateNewMessageTextAC(newMessageText))
                    }
                    return (
                        <Dialogs dialogsPage={state.dialogsReducer}
                                 sendMessageCallback={sendMessage}
                                 changingMessageTextCallback={changingMessageText}
                        />
                    )
                }
            }
        </StoreContext.Consumer>
    )
}