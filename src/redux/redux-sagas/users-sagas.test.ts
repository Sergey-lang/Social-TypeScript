import {requestUsersWorkerSaga} from './users-sagas';
import {call, put} from 'redux-saga/effects';
import {actions} from '../users-reducer';
import {GetItemsType} from '../../api/api';
import {usersAPI} from '../../api/users-api';

test('requestUsersWorkerSaga success', () => {
    const filter = {term: '', friend: null};

    const gen = requestUsersWorkerSaga({type: 'USER/REQUEST-USERS', pageSize: 5, filter: filter, requestPage: 5})
    expect(gen.next().value).toEqual(put(actions.toggleIsFetching(true)))
    expect(gen.next().value).toEqual(put(actions.setCurrentPage(5)))
    expect(gen.next().value).toEqual(put(actions.setFilter(filter)))
    expect(gen.next().value).toEqual(call(usersAPI.getUsers, 5, 5, filter.term, filter.friend))

    const fakeApiResponse: GetItemsType = {
        error: '',
        items: [
            {
                id: 5,
                followed: false,
                name: 'Name',
                status: 'test',
                photos: {large: '4545', small: '54'}
            }
        ],
        totalCount: 10
    }

    expect(gen.next(fakeApiResponse).value).toEqual(put(actions.setUsers(fakeApiResponse.items)))
    expect(gen.next().value).toEqual(put(actions.toggleIsFetching(false)))
    expect(gen.next().value).toEqual(put(actions.setUsersTotalCount(fakeApiResponse.totalCount)))
})
