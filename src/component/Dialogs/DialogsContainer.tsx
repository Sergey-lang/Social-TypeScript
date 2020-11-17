import {addMessage, DialogInitPageType, updateNewMessageText} from '../../Redux/dialogs-reducer';
import {GlobalStateType} from '../../Redux/redux-store';
import {connect} from 'react-redux';
import {Dialogs} from './Dialogs';
import React, {ComponentType} from 'react';
import {withAuthRedirect} from '../../hoc/WithAuthRedirect';
import {compose} from 'redux';

export type mapDispatchType = {
   addMessage: () => void
   updateNewMessageText: (newMessageText: string) => void
}
export type MapStateType = {
   dialogsPage: DialogInitPageType
}
let mapState = (state: GlobalStateType): MapStateType => {
   return {
      dialogsPage: state.dialogsState,
   }
}

export default compose<ComponentType>(
   connect<MapStateType, mapDispatchType, {}, GlobalStateType>
   (mapState, {addMessage, updateNewMessageText}),
   withAuthRedirect
)(Dialogs)

