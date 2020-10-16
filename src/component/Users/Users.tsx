import React from 'react';
import s from './Users.module.css'
import avatar from '../../asets/images/icons8_user.png';
import {UsersType} from '../../Redux/users-reducer';
import axios from 'axios'

type UsersPageType = {
    users: Array<UsersType>
    totalUsersCount: number
    pageSize: number
    currentPage: number

    follow: (userID: number) => void
    unfollow: (userID: number) => void
    setUsers: (users: Array<UsersType>) => void
    setCurrentPage: (currentPage: number) => void
    setUsersTotalCount: (totalCount: number) => void
}

type GetUsersResponseType = {
    items: Array<UsersType>
    totalCount: number
    error: string | null
}

export class Users extends React.Component<UsersPageType> {

    componentDidMount() {
        axios.get<GetUsersResponseType>(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setUsersTotalCount(response.data.totalCount)
            })
    }

    onPageChanged = (p: number) => {
        this.props.setCurrentPage(p)
        axios.get<GetUsersResponseType>(`https://social-network.samuraijs.com/api/1.0/users?page=${p}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
            })
    }

    render() {
        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize)
        let pages = []
        for (let i = 505; i <= 525; i++) {
            pages.push(i)
        }
        return (
            <div className={s.users_container}>
                <div className={s.users_headline}>Users</div>
                <div>
                    <div className={s.users_page_num}>
                        {pages.map(p => {
                            return <span key={Math.random()}
                                         className={this.props.currentPage === p ? `${s.selected} ${s.totalCount}` : s.totalCount}
                                         onClick={() => this.onPageChanged(p)}
                            >{p}</span>
                        })}
                    </div>
                    <div className={s.users_page}>
                        {this.props.users.map(u => <div className={s.user} key={u.id}>
                            <div className={s.avatar}>
                                <img alt={'avatar'} src={u.photos.large != null
                                    ? u.photos.large
                                    : avatar}/>
                            </div>
                            <div className={s.description}>
                                <div className={s.user_name}>{u.name}</div>
                                <div className={s.status}>User status: {u.status}</div>
                                <div className={s.status}>User id: {u.id}</div>
                            </div>
                            {
                                u.followed ? <button
                                        onClick={(e) => {
                                            this.props.follow(u.id)
                                        }}
                                        className={s.btn}>follow</button>
                                    : <button
                                        onClick={(e) => {
                                            this.props.unfollow(u.id)
                                        }}
                                        className={` ${s.btn} ${s.unfollow}`}>unfollow</button>
                            }
                        </div>)}
                    </div>
                </div>
            </div>
        )
    }
}



