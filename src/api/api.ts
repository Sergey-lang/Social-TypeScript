import axios from 'axios'
import {UsersType} from '../redux/users-reducer'

export const axiosInstance = axios.create({
   withCredentials: true,
   baseURL: 'https://social-network.samuraijs.com/api/1.0/',
   headers: {
      'API-KEY': 'ec9092bf-d7c1-484e-b4e6-892ed49a92ea'
   },
})

export type APIResponseType<D = {}, RC = ResultCodes> = {
   data: D
   messages: string[]
   resultCode: RC
}

export enum ResultCodes {
   Success = 0,
   Error = 1,
}

export enum ResultCodeCaptcha {
   CaptchaIsRequired = 10
}

export type GetItemsType = {
   items: UsersType[]
   totalCount: number
   error: string | null
}
