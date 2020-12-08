import {axiosInstance} from './api';

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return axiosInstance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(res => res.data)
    },

    unfollow(userId: number) {
        return axiosInstance.delete(`follow/${userId}`)
            .then(res => res.data)
    },

    follow(userId: number) {
        return axiosInstance.post(`follow/${userId}`, {})
            .then(res => res.data)
    },
}