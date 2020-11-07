import React from 'react'
import {Profile} from './Profile'
import {connect} from 'react-redux'
import {AppStateType} from '../../Redux/redux-store'
import {getUserProfile, ProfileType} from '../../Redux/profile-reducer'
import {RouteComponentProps, withRouter} from 'react-router-dom'

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

type MapStateType = {
    profile: ProfileType | null
}

type MapDispatchType = {
    getUserProfile: Function
}

const mapState = (state: AppStateType): MapStateType => ({
    profile: state.profileState.profile,
})

let withUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect<MapStateType, MapDispatchType, {}, AppStateType>(
    mapState,
    {getUserProfile}
)(withUrlDataContainerComponent)
