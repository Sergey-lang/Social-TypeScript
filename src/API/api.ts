import axios from 'axios'

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'be9a3549-d8d6-4d97-a73c-6593dde1f694'
    },
})

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return axiosInstance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },

    follow(userId: number) {
        return axiosInstance.delete(`follow/${userId}`)
            .then(response => {
                return response.data
            })
    },

    unfollow(userId: number) {
        return axiosInstance.post(`follow/${userId}`,{})
            .then(response => {
                return response.data
            })
    },
}

export const profileAPI = {
    getUsersId(userId: number) {
        return axiosInstance.get(`profile/${userId}`)
            .then(response => {
                return response.data
            })
    }
}