import {actions, DialogInitStateType} from '../../redux/dialogs-reducer'
import {connect} from 'react-redux'
import {Dialogs} from './Dialogs'
import {ComponentType} from 'react'
import {withAuthRedirect} from '../../hoc/withAuthRedirect'
import {compose} from 'redux'
import {AppStateType} from '../../app/store';

export type mapDispatchType = {
   addMessage: (dialogNewMessageText: any) => void
}
export type MapStateType = {
   dialogsPage: DialogInitStateType
}

let mapState = (state: AppStateType): MapStateType => ({dialogsPage: state.dialogsState})

export default compose<ComponentType>(
    connect<MapStateType, mapDispatchType, {}, AppStateType>
    (mapState, {addMessage: actions.addMessage}),
    withAuthRedirect
)(Dialogs)

