import React, {ComponentType} from 'react'
import {Profile} from './Profile'
import {connect} from 'react-redux'
import {GlobalStateType} from '../../Redux/redux-store'
import {getUserProfile, ProfileType} from '../../Redux/profile-reducer'
import {RouteComponentProps, withRouter} from 'react-router-dom'
import {withAuthRedirect} from '../../hoc/WithAuthRedirect';
import {compose} from 'redux';

type PathParamsType = {
   userid: string
}
type OwnPropsType = MapStateType & MapDispatchType
type PropsType = RouteComponentProps<PathParamsType> & OwnPropsType

export class ProfileContainer extends React.Component<PropsType> {
   componentDidMount() {
      let userId = Number(this.props.match.params.userid)
      if (!userId) {
         userId = 2
      }
      this.props.getUserProfile(userId)
   }

   render() {
      return <Profile {...this.props} profile={this.props.profile}/>
   }
}

type MapDispatchType = {
   getUserProfile: (userId: number) => void
}
type MapStateType = {
   profile: ProfileType | null
}
const mapState = (state: GlobalStateType): MapStateType => ({
   profile: state.profileState.profile,
})

export default compose<ComponentType>(
   connect<MapStateType, MapDispatchType, {}, GlobalStateType>(
      mapState,
      {getUserProfile}
   ),
   withRouter,
   withAuthRedirect
)(ProfileContainer)
