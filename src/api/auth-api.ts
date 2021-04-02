import {axiosInstance, APIResponseType, ResultCodeCaptcha, ResultCodes} from './api'

type MeResponseDataType = {
      id: number,
      email: string,
      login: string
}

type LoginResponseDataType = {
   userId: number
}

export const authAPI = {
   me() {
      return axiosInstance.get<APIResponseType<MeResponseDataType>>(`auth/me`)
          .then(res => res.data)
   },
   login(email: string, password: string, rememberMe: boolean = false, captcha: null | string = null) {
      return axiosInstance.post<APIResponseType<LoginResponseDataType, ResultCodeCaptcha | ResultCodes>>(`auth/login`, {email, password, rememberMe, captcha})
          .then(res => res.data)
   },
   logout() {
      return axiosInstance.delete(`auth/login`,)
          .then(res => res.data)
   },
}