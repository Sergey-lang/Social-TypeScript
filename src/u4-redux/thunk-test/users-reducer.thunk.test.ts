import {actions, follow, unfollow} from '../users-reducer';
import {usersAPI} from '../../u5-api/users-api';
import {APIResponseType, ResultCodes} from '../../u5-api/api';

jest.mock('../../u5-api/users-api');

//create const with fake API.
//We need to check than was request to server
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

//create fake dispatch and getState
const dispatchMock = jest.fn();
const getStateMock = jest.fn();

//clear mocks
beforeEach(()=>{
    dispatchMock.mockClear()
    getStateMock.mockClear()
    usersAPIMock.follow.mockClear()
    usersAPIMock.unfollow.mockClear()
})

const result: APIResponseType = {
    resultCode: ResultCodes.Success,
    messages: [],
    data: {}
};

usersAPIMock.follow.mockReturnValue(Promise.resolve(result));
usersAPIMock.unfollow.mockReturnValue(Promise.resolve(result));

//3 called dispatch in thunk for user with id = 1
test('success follow thunk', async () => {
    const thunk = follow(1);

    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1));
});

test('success unfollow thunk', async () => {
    const thunk = unfollow(2);

    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 2));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(2));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 2));
});