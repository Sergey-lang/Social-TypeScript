import {addMessage, DialogInitPageType, updateNewMessageText} from '../../Redux/dialogs-reducer';
import {AppStateType} from '../../Redux/redux-store';
import {connect} from 'react-redux';
import {Dialogs} from './Dialogs';
import React from 'react';

export type MapStateType = {
    dialogsPage: DialogInitPageType
    isAuth: boolean
}
export type mapDispatchType = {
    addMessage: () => void
    updateNewMessageText: (newMessageText: string) => void
}

let mapState = (state: AppStateType): MapStateType => {
    return {
        dialogsPage: state.dialogsState,
        isAuth: state.authState.isAuth
    }
}

export const DialogsContainer = connect<MapStateType, mapDispatchType, {}, AppStateType>
(mapState, {addMessage, updateNewMessageText})(Dialogs)
