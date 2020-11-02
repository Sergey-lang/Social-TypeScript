import React from 'react'
import {connect} from 'react-redux'
import {AppStateType} from '../../Redux/redux-store'
import {
    follow,
    toggleFollowingProgress,
    setCurrentPage,
    setUsers,
    setUsersTotalCount,
    toggleIsFetching,
    unfollow,
    UsersType,
} from '../../Redux/users-reducer'
import {Users} from './Users'
import {Preloader} from '../../common/Preloader/Preloader'
import {usersAPI} from '../../API/api';

type UsersContainerType = MapStateType & MapDispatchType

export class UsersContainer extends React.Component<UsersContainerType> {
    componentDidMount() {
        this.props.toggleIsFetching(true)
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize)
            .then(data => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(data.items)
                this.props.setUsersTotalCount(data.totalCount)
            })
    }

    onPageChanged = (p: number) => {
        this.props.setCurrentPage(p)
        this.props.toggleIsFetching(true)
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize)
            .then(data => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(data.items)
            })
    }

    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader/> : null}
                <Users
                    totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    users={this.props.users}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    onPageChanged={this.onPageChanged}
                    isFetching={this.props.isFetching}
                    toggleFollowingProgress={this.props.toggleFollowingProgress}
                    followingInProgress={this.props.followingInProgress}

                />
            </>
        )
    }
}

type MapStateType = {
    users: Array<UsersType>
    totalUsersCount: number
    pageSize: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
}

type MapDispatchType = {
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    setUsers: (users: Array<UsersType>) => void
    setCurrentPage: (currentPage: number) => void
    setUsersTotalCount: (totalCount: number) => void
    toggleIsFetching: (isFetching: boolean) => void
    toggleFollowingProgress: (isFetching: boolean, userId: number) => void
}

const mapState = (state: AppStateType): MapStateType => ({
    users: state.usersState.users,
    totalUsersCount: state.usersState.totalUsersCount,
    pageSize: state.usersState.pageSize,
    currentPage: state.usersState.currentPage,
    isFetching: state.usersState.isFetching,
    followingInProgress: state.usersState.followingInProgress,
})

export default connect<MapStateType, MapDispatchType, {}, AppStateType>(
    mapState,
    {
        follow,
        unfollow,
        setUsers,
        setCurrentPage,
        setUsersTotalCount,
        toggleIsFetching,
        toggleFollowingProgress,
    }
)(UsersContainer)
