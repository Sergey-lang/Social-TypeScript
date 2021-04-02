import {compose} from 'redux'
import {Profile} from './Profile'
import {connect} from 'react-redux'
import {
   getStatusFromUser, getUserProfileData, ProfileType,
   savePhoto, saveProfileData, updateOwnProfileStatus
} from '../../redux/profile-reducer'
import React, {ComponentType} from 'react'
import {AppStateType} from '../../redux/store'
import {RouteComponentProps, withRouter} from 'react-router-dom'


type PathParamsType = {
   userid: string
}
type OwnPropsType = MapStateType & MapDispatchType
type PropsType = RouteComponentProps<PathParamsType> & OwnPropsType

class ProfileContainer extends React.Component<PropsType> {

   updateProfile() {
      let id = +this.props.match.params.userid
      let userId: number | null = id ? id : this.props.authorizedUserId
      if (!userId) {
         //todo:replace push redirect
         this.props.history.push('/login')
      }

      this.props.getUserProfileData(userId as number)
      this.props.getStatusFromUser(userId as number)
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
        {getUserProfileData, getStatusFromUser, updateOwnProfileStatus, savePhoto, saveProfileData}),
    withRouter,
)(ProfileContainer)
