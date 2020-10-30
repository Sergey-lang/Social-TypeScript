import React from 'react'
import {Profile} from './Profile'
import axios from 'axios'
import {connect} from 'react-redux'
import {AppStateType} from '../../Redux/redux-store'
import {ProfileType, setUserProfile} from '../../Redux/profile-reducer'
import {withRouter, RouteComponentProps} from 'react-router-dom'

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
        axios
            .get<ProfileType>(
                `https://social-network.samuraijs.com/api/1.0/profile/` + userId
            )
            .then((response) => {
                debugger
                this.props.setUserProfile(response.data)
            })
    }

    render() {
        return <Profile {...this.props} profile={this.props.profile}/>
    }
}

type MapStateType = {
    profile: ProfileType | null
}

type MapDispatchType = {
    setUserProfile: (profile: ProfileType) => void
}

const mapState = (state: AppStateType): MapStateType => ({
    profile: state.profileState.profile,
})

let withUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect<MapStateType, MapDispatchType, {}, AppStateType>(
    mapState,
    {setUserProfile}
)(withUrlDataContainerComponent)
