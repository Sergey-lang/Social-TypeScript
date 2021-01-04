import axios from 'axios'

export const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'ec9092bf-d7c1-484e-b4e6-892ed49a92ea'
    },
})

export enum ResultCodes {
    Success = 0,
    Error = 1,
    CaptchaIsRequired= 10
}