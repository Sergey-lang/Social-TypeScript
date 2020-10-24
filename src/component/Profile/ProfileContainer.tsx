import React from 'react';
import {Profile} from './Profile';
import axios from 'axios';
import {connect} from 'react-redux';
import {AppStateType} from '../../Redux/redux-store';
import {ProfileType, setUserProfile} from '../../Redux/profile-reducer';

type ProfileContainerType = MapStateType & MapDispatchType

export class ProfileContainer extends React.Component<ProfileContainerType> {

  componentDidMount() {
    axios.get<ProfileType>(`https://social-network.samuraijs.com/api/1.0/profile/2`)
      .then(response => {
        this.props.setUserProfile(response.data)
      })
  }

  render() {
    return (
      <Profile {...this.props} profile={this.props.profile}/>
    )
  }
}

type MapStateType = {
  profile: ProfileType | null
}

type MapDispatchType = {
  setUserProfile: (profile: ProfileType) => void
}

const mapState = (state: AppStateType): MapStateType => ({
  profile: state.profileState.profile
})

export default connect<MapStateType, MapDispatchType, {}, AppStateType>(mapState, {setUserProfile})(ProfileContainer)
