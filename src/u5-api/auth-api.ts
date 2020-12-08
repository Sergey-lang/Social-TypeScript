import {axiosInstance} from './api';

export const authAPI = {
    me() {
        return axiosInstance.get(`auth/me`)
            .then(res => res.data)
    },
    login(email: string, password: string, rememberMe: boolean) {
        return axiosInstance.post(`auth/login`, {email, password, rememberMe})
            .then(res => res.data)
    },

    logout() {
        return axiosInstance.delete(`auth/login`,)
            .then(res => res.data)
    },
}