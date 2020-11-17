import React, {ComponentType} from 'react'
import {Profile} from './Profile'
import {connect} from 'react-redux'
import {GlobalStateType} from '../../Redux/redux-store'
import {getStatus, getUserProfile, ProfileType, updateProfileStatus} from '../../Redux/profile-reducer'
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
      this.props.getStatus(userId)
   }

   render() {
      return <Profile {...this.props}
                      profile={this.props.profile}
                      status={this.props.status}
                      updateProfileStatus={this.props.updateProfileStatus}
      />
   }
}

type MapDispatchType = {
   getUserProfile: (userId: number) => void
   getStatus: (userId: number) => void
   updateProfileStatus: (status: string) => void
}
type MapStateType = {
   profile: ProfileType | null
   status: string
}
const mapState = (state: GlobalStateType): MapStateType => ({
   profile: state.profileState.profile,
   status: state.profileState.status
})

export default compose<ComponentType>(
   connect<MapStateType, MapDispatchType, {}, GlobalStateType>(
      mapState,
      {getUserProfile, getStatus, updateProfileStatus}
   ),
   withRouter,
   withAuthRedirect
)(ProfileContainer)
