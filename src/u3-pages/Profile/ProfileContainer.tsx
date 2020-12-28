import React, {ComponentType} from 'react'
import {Profile} from './Profile'
import {connect} from 'react-redux'
import {AppStateType} from '../../u4-redux/store'
import {
   getStatusFromUser,
   getUserProfileData,
   ProfileType, savePhoto, saveProfileData,
   updateOwnProfileStatus
} from '../../u4-redux/profile-reducer'
import {RouteComponentProps, withRouter} from 'react-router-dom'
import {compose} from 'redux'

type PathParamsType = {
   userid: string
}
type OwnPropsType = MapStateType & MapDispatchType
type PropsType = RouteComponentProps<PathParamsType> & OwnPropsType

class ProfileContainer extends React.Component<PropsType> {

   updateProfile() {
      let id = Number(this.props.match.params.userid)
      let userId = id ? id : this.props.authorizedUserId
      if (!userId) {
         this.props.history.push('/login')
      }

      this.props.getUserProfileData(userId!)
      this.props.getStatusFromUser(userId!)
   }

   componentDidMount() {
      this.updateProfile()
   }

   componentDidUpdate(prevProps: Readonly<PropsType>, prevState: Readonly<{}>, snapshot?: any) {
      if (this.props.match.params.userid !== prevProps.match.params.userid) {
         this.updateProfile()
      }
   }

   render() {
      return <Profile {...this.props}
                      profile={this.props.profile}
                      status={this.props.status}
                      savePhoto={this.props.savePhoto}
                      isOwner={!this.props.match.params.userid}
                      updateOwnProfileStatus={this.props.updateOwnProfileStatus}
                      saveProfileData={this.props.saveProfileData}
      />
   }
}

type MapDispatchType = {
   getUserProfileData: (userId: number) => void
   getStatusFromUser: (userId: number) => void
   updateOwnProfileStatus: (status: string) => void
   savePhoto: (photo: File) => void
   saveProfileData: (profile: ProfileType) => void
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
    connect<MapStateType, MapDispatchType, {}, AppStateType>(mapState,
        {getUserProfileData, getStatusFromUser, updateOwnProfileStatus, savePhoto,saveProfileData}),
    withRouter,
)(ProfileContainer)
