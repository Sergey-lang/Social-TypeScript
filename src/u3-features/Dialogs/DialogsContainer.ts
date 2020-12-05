import {addMessage, DialogInitPageType} from '../../u4-redux/dialogs-reducer';
import {AppStateType} from '../../u4-redux/store';
import {connect} from 'react-redux';
import {Dialogs} from './Dialogs';
import {ComponentType} from 'react';
import {withAuthRedirect} from '../../u7-hoc/WithAuthRedirect';
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

