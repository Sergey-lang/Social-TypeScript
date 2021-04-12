import {call, put, takeEvery} from 'redux-saga/effects';
import {actions, FilterType} from '../users-reducer';
import {usersAPI} from '../../api/users-api';
import {GetItemsType} from '../../api/api';

export function* requestUsersWorkerSaga(action: ReturnType<typeof requestUsersAction>) {
    yield put(actions.toggleIsFetching(true));
    yield put(actions.setCurrentPage(action.requestPage));
    yield put(actions.setFilter(action.filter));

    const data:GetItemsType = yield call(usersAPI.getUsers, action.requestPage, action.pageSize, action.filter.term, action.filter.friend)

    yield put(actions.setUsers(data.items));
    yield put(actions.toggleIsFetching(false));
    yield put(actions.setUsersTotalCount(data.totalCount));
}

export const requestUsersAction = (requestPage: number, pageSize: number, filter: FilterType) => ({
    type: 'USER/REQUEST-USERS',
    requestPage,
    pageSize,
    filter
} as const)

export function* usersWatcherSaga() {
    yield takeEvery('USER/REQUEST-USERS', requestUsersWorkerSaga)
}
