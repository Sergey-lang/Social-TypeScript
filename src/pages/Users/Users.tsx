import React, {useEffect} from 'react'
import {User} from './User/User'
import {useDispatch, useSelector} from 'react-redux';
import {FilterType, follow, unfollow} from '../../redux/users-reducer'
import {Paginator} from '../../components/Paginator/Paginator'
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from '../../redux/users-selectors';
import {useHistory} from 'react-router-dom';
import * as queryString from 'querystring';

import s from './Users.module.scss'
import {UsersPageHeader} from './UsersPageHeader/UsersPageHeader';
import {path} from '../../app/App';
import {requestUsersAction} from '../../redux/redux-sagas/users-sagas';

type QueryParamsType = { term?: string, page?: string, friend?: string };

export const Users: React.FC =
    (props) => {
        const followingInProgress = useSelector(getFollowingInProgress)
        const totalUsersCount = useSelector(getTotalUsersCount)
        const currentPage = useSelector(getCurrentPage)
        const pageSize = useSelector(getPageSize)
        const filter = useSelector(getUsersFilter)
        const users = useSelector(getUsers)

        const dispatch = useDispatch()
        const history = useHistory()

        //this effect get first url params and set it to redux
        useEffect(() => {
            //read url params from location and convert it to object using 'queryString'
            //there is excess '?'. delete it use 'substring'
            const parsed = queryString
                .parse(history.location.search.substring(1)) as QueryParamsType

            let actualPage = currentPage
            let actualFilter = filter

            //if has actual value in url we can assign it 'actualPage' and convert string pageNumber to number
            //after that this value go to request
            if (!!parsed.page) actualPage = Number(parsed.page)
            //we can't change filter mutable
            if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}

            //check empty url
            switch (parsed.friend) {
                case 'null':
                    actualFilter = {...actualFilter, friend: null}
                    break
                case 'true':
                    actualFilter = {...actualFilter, friend: true}
                    break
                case 'false':
                    actualFilter = {...actualFilter, friend: false}
                    break
            }

            dispatch(requestUsersAction(actualPage, pageSize, actualFilter))
        }, [])

        // this effect get filter from redux after changing and push settings to url from search(term,friend)
        // url setting has dependency = filter, currentPage
        useEffect(() => {

            const query: QueryParamsType = {}
            //if term doesn't empty
            if (!!filter.term) query.term = filter.term
            //add friend if !== null - default value in API
            if (filter.friend !== null) query.friend = String(filter.friend)
            //add currentPage if !== 1 - default value in API
            if (currentPage !== 1) query.page = String(currentPage)

            history.push({
                pathname: path.DEVELOPERS,
                search: queryString.stringify(query)
            })
        }, [filter, currentPage])

        const onPageChanged = (currentPage: number) => {
            dispatch(requestUsersAction(currentPage, pageSize, filter))
        }
        const onFilterChanged = (filter: FilterType) => {
            dispatch(requestUsersAction(1, pageSize, filter))
        }
        const followUser = (id: number) => {
            dispatch(follow(id))
        }
        const unfollowUser = (id: number) => {
            dispatch(unfollow(id))
        }

        return (
            <div className={s.usersPageWrapper}>
                <UsersPageHeader onFilterChanged={onFilterChanged}/>
                <div>
                    <Paginator currentPage={currentPage}
                               onPageChanged={onPageChanged}
                               pageSize={pageSize}
                               totalItemsCount={totalUsersCount}
                    />
                    <div className={s.centralUsersMeta}>
                        <div className={s.row}>
                            {users.map(u => <User key={u.id}
                                                  user={u}
                                                  follow={followUser}
                                                  unfollow={unfollowUser}
                                                  followingInProgress={followingInProgress}/>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

