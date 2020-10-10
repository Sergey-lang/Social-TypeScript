import {AddMessageAC, UpdateNewMessageTextAC} from '../../Redux/dialogs-reducer';
import {AppStateType} from '../../Redux/redux-store';
import {connect} from 'react-redux';
import {Dialogs} from './Dialogs';
import React from 'react';
import {DialogPageType} from '../../essences/essences';
import {Dispatch} from 'redux';

type MapStateType = {
    dialogsPage: DialogPageType
}
type mapDispatchType = {
    sendMessage: () => void
    changingMessageText: (newMessageText: string) => void
}

let mapState = (state: AppStateType): MapStateType => {
    return {
        dialogsPage: state.dialogsReducer
    }
}

let mapDispatch = (dispatch: Dispatch): mapDispatchType => {
    return {
        sendMessage: () => {
            dispatch(AddMessageAC())
        },
        changingMessageText: (newMessageText: string) => {
            dispatch(UpdateNewMessageTextAC(newMessageText))
        }
    }
}

export const DialogsContainer = connect(mapState, mapDispatch)(Dialogs)
