import {addMessage, DialogInitPageType} from '../../Redux/dialogs-reducer';
import {AppStateType} from '../../Redux/redux-store';
import {connect} from 'react-redux';
import {Dialogs} from './Dialogs';
import React, {ComponentType} from 'react';
import {withAuthRedirect} from '../../hoc/WithAuthRedirect';
import {compose} from 'redux';

export type mapDispatchType = {
   addMessage: (dialogNewMessageText: any) => void
}
export type MapStateType = {
   dialogsPage: DialogInitPageType
}
let mapState = (state: AppStateType): MapStateType => ({dialogsPage: state.dialogsState})

export default compose<ComponentType>(
   connect<MapStateType, mapDispatchType, {}, AppStateType>
   (mapState, {addMessage}),
   withAuthRedirect
)(Dialogs)

