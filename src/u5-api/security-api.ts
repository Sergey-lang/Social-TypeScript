import {axiosInstance} from './api';

export const securityAPI = {
    getCaptchaUrl() {
        return axiosInstance.get(`security/get-captcha-url`)
            .then(res => res.data)
    },
}