import React from 'react';
import {AddMessageAC, UpdateNewMessageTextAC} from '../../Redux/dialogs-reducer';
import {StoreReduxType} from '../../Redux/redux-store';
import {Dialogs} from './Dialogs';

type AddMessageType = {
    store: StoreReduxType
}

export const DialogsContainer: React.FC<AddMessageType> = (props) => {
    let dialogsPage = props.store.getState().dialogsReducer

    const sendMessage = () => {
        props.store.dispatch(AddMessageAC())
    }
    const changingMessageText= (newMessageText: string) => {
        props.store.dispatch(UpdateNewMessageTextAC(newMessageText))
    }

    return (
        <Dialogs dialogsPage={dialogsPage}
                 sendMessageCallback={sendMessage}
                 changingMessageTextCallback={changingMessageText}
        />
    )
}