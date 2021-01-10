import React, {ComponentType} from 'react'
import {connect} from 'react-redux'
import {AppStateType} from '../../u4-redux/store'
import {FilterType, follow, requestUsers, unfollow, UsersType} from '../../u4-redux/users-reducer'
import {Users} from './Users'
import {Preloader} from '../../u2-components/Preloader/Preloader'
import {compose} from 'redux'
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers, getUsersFilter
} from '../../u4-redux/users-selectors'

type UsersContainerType = MapStateType & MapDispatchType

class UsersContainer extends React.Component<UsersContainerType> {

    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize, '')
    }

    onPageChanged = (p: number) => {
        const {pageSize, filter} = this.props
        this.props.requestUsers(p, this.props.pageSize, filter.term)
    }

    onFilterChanged = (filter: FilterType) => {
        const {pageSize, currentPage} = this.props
        this.props.requestUsers(currentPage, pageSize, filter.term)
    }

    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader/> : null}
                <Users
                    pageSize={this.props.pageSize}
                    totalUsersCount={this.props.totalUsersCount}
                    currentPage={this.props.currentPage}
                    users={this.props.users}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    onPageChanged={this.onPageChanged}
                    isFetching={this.props.isFetching}
                    followingInProgress={this.props.followingInProgress}
                    onFilterChanged={this.onFilterChanged}
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
    filter: FilterType
}

type MapDispatchType = {
    requestUsers: (requestPage: number, pageSize: number, term: string) => void
    follow: (id: number) => void
    unfollow: (id: number) => void
}

const mapState = (state: AppStateType): MapStateType => ({
    users: getUsers(state),
    totalUsersCount: getTotalUsersCount(state),
    pageSize: getPageSize(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
    filter: getUsersFilter(state)
})

export default compose<ComponentType>(
    connect<MapStateType, MapDispatchType, {}, AppStateType>(
        mapState,
        {requestUsers, follow, unfollow}
    ),
)(UsersContainer)
