import React from 'react'
import {Profile} from './Profile'
import {connect} from 'react-redux'
import {AppStateType} from '../../Redux/redux-store'
import {getUserProfile, ProfileType} from '../../Redux/profile-reducer'
import {Redirect, RouteComponentProps, withRouter} from 'react-router-dom'

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
        if (!this.props.isAuth) return <Redirect to={'/login'}/>

        return <Profile {...this.props} profile={this.props.profile}/>
    }
}

type MapStateType = {
    profile: ProfileType | null
    isAuth: boolean
}

type MapDispatchType = {
    getUserProfile: (userId: number) => void
}

const mapState = (state: AppStateType): MapStateType => ({
    profile: state.profileState.profile,
    isAuth: state.authState.isAuth
})

let withUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect<MapStateType, MapDispatchType, {}, AppStateType>(
    mapState,
    {getUserProfile}
)(withUrlDataContainerComponent)
