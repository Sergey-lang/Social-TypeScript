import React from 'react';
import {connect} from 'react-redux';
import {AppStateType} from '../../Redux/redux-store';
import {
    follow,
    setCurrentPage,
    setUsers,
    setUsersTotalCount,
    toggleIsFetching,
    unfollow,
    UsersType
} from '../../Redux/users-reducer';
import axios from 'axios';
import {Users} from './Users';
import {Preloader} from '../../common/Preloader/Preloader';

type UsersResponseType = {
    items: Array<UsersType>
    totalCount: number
    error: string | null
}

type UsersContainerType = MapStateType & MapDispatchType

export class UsersContainer extends React.Component<UsersContainerType> {

    componentDidMount() {
        this.props.toggleIsFetching(true)
        axios.get<UsersResponseType>(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(response.data.items)
                this.props.setUsersTotalCount(response.data.totalCount)
            })
    }

    onPageChanged = (p: number) => {
        this.props.setCurrentPage(p)
        this.props.toggleIsFetching(true)
        axios.get<UsersResponseType>(`https://social-network.samuraijs.com/api/1.0/users?page=${p}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(response.data.items)
            })
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   users={this.props.users}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   onPageChanged={this.onPageChanged}
            />
        </>
    }
}

type MapStateType = {
    users: Array<UsersType>
    totalUsersCount: number
    pageSize: number
    currentPage: number
    isFetching: boolean
}

type MapDispatchType = {
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    setUsers: (users: Array<UsersType>) => void
    setCurrentPage: (currentPage: number) => void
    setUsersTotalCount: (totalCount: number) => void
    toggleIsFetching: (isFetching: boolean) => void
}

const mapState = (state: AppStateType): MapStateType => ({
    users: state.usersState.users,
    totalUsersCount: state.usersState.totalUsersCount,
    pageSize: state.usersState.pageSize,
    currentPage: state.usersState.currentPage,
    isFetching: state.usersState.isFetching,
})

export default connect<MapStateType, MapDispatchType, {}, AppStateType>(mapState,
    {follow, unfollow, setUsers, setCurrentPage, setUsersTotalCount, toggleIsFetching})(UsersContainer)
