import React, {ComponentType} from 'react'
import {connect} from 'react-redux'
import {AppStateType} from '../../redux/store'
import {follow, getUsers, setCurrentPage, unfollow, UsersType,} from '../../redux/users-reducer'
import {Users} from './Users'
import {Preloader} from '../../common/Preloader/Preloader'
import {compose} from 'redux';

type UsersContainerType = MapStateType & MapDispatchType

class UsersContainer extends React.Component<UsersContainerType> {

   componentDidMount() {
      this.props.getUsers(this.props.currentPage, this.props.pageSize)
   }

   onPageChanged = (p: number) => {
      this.props.getUsers(p, this.props.pageSize)
   }

   render() {
      return (
         <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users
               pageSize={this.props.pageSize}
               currentPage={this.props.currentPage}
               users={this.props.users}
               follow={this.props.follow}
               unfollow={this.props.unfollow}
               onPageChanged={this.onPageChanged}
               isFetching={this.props.isFetching}
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
   setCurrentPage: (currentPage: number) => void
   getUsers: (currentPage: number, pageSize: number) => void
   follow: (id: number) => void
   unfollow: (id: number) => void
}

const mapState = (state: AppStateType): MapStateType => ({
   users: state.usersState.users,
   totalUsersCount: state.usersState.totalUsersCount,
   pageSize: state.usersState.pageSize,
   currentPage: state.usersState.currentPage,
   isFetching: state.usersState.isFetching,
   followingInProgress: state.usersState.followingInProgress,
})

export default compose<ComponentType>(
   connect<MapStateType, MapDispatchType, {}, AppStateType>(
      mapState,
      {
         setCurrentPage, getUsers, follow, unfollow,
      }
   ),
)(UsersContainer)
