import {addMessage, DialogInitPageType} from '../../redux/dialogs-reducer';
import {AppStateType} from '../../redux/store';
import {connect} from 'react-redux';
import {Dialogs} from './Dialogs';
import {ComponentType} from 'react';
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

