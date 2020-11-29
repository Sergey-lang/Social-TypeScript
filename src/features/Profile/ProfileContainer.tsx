import React, {ComponentType} from 'react'
import {Profile} from './Profile'
import {connect} from 'react-redux'
import {AppStateType} from '../../redux/store'
import {getStatusFromUser, getUserProfileData, ProfileType, updateOwnProfileStatus} from '../../redux/profile-reducer'
import {RouteComponentProps, withRouter} from 'react-router-dom'
import {compose} from 'redux';

type PathParamsType = {
   userid: string
}
type OwnPropsType = MapStateType & MapDispatchType
type PropsType = RouteComponentProps<PathParamsType> & OwnPropsType

class ProfileContainer extends React.Component<PropsType> {

   componentDidMount() {

      let id = Number(this.props.match.params.userid)
      let userId = id ? id : this.props.authorizedUserId
      if(!userId) {
            this.props.history.push('/login')
      }

      this.props.getUserProfileData(userId!)
      this.props.getStatusFromUser(userId!)
   }

   render() {
      return <Profile {...this.props}
                      profile={this.props.profile}
                      status={this.props.status}
                      updateOwnProfileStatus={this.props.updateOwnProfileStatus}
      />
   }
}

type MapDispatchType = {
   getUserProfileData: (userId: number) => void
   getStatusFromUser: (userId: number) => void
   updateOwnProfileStatus: (status: string) => void
}
type MapStateType = {
   profile: ProfileType | null
   status: string
   authorizedUserId: number | null
   isAuth: boolean
}
const mapState = (state: AppStateType): MapStateType => ({
   profile: state.profileState.profile,
   status: state.profileState.status,
   authorizedUserId: state.authState.id,
   isAuth: state.authState.isAuth
})

export default compose<ComponentType>(
   connect<MapStateType, MapDispatchType, {}, AppStateType>(
      mapState,
      {getUserProfileData, getStatusFromUser, updateOwnProfileStatus}
   ),
   withRouter,
)(ProfileContainer)
