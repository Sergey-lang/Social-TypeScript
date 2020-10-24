import {addMessage, DialogInitPageType, updateNewMessageText} from '../../Redux/dialogs-reducer';
import {AppStateType} from '../../Redux/redux-store';
import {connect} from 'react-redux';
import {Dialogs} from './Dialogs';
import React from 'react';
import {Dispatch} from 'redux';

type MapStateType = {
  dialogsPage: DialogInitPageType
}
type mapDispatchType = {
  sendMessage: () => void
  changingMessageText: (newMessageText: string) => void
}

let mapState = (state: AppStateType): MapStateType => {
  return {
    dialogsPage: state.dialogsState
  }
}

let mapDispatch = (dispatch: Dispatch): mapDispatchType => {
  return {
    sendMessage: () => {
      dispatch(addMessage())
    },
    changingMessageText: (newMessageText: string) => {
      dispatch(updateNewMessageText(newMessageText))
    }
  }
}

export const DialogsContainer = connect(mapState, mapDispatch)(Dialogs)
