import {axiosInstance, ResultCodes} from './api'


type MeResponseType = {
   data: {
      id: number,
      email: string,
      login: string
   }
   resultCode: ResultCodes
   messages: string[]
}

export const authAPI = {
   me() {
      return axiosInstance.get<MeResponseType>(`auth/me`)
          .then(res => res.data)
   },
   login(email: string, password: string, rememberMe: boolean = false, captcha: null | string = null) {
      return axiosInstance.post(`auth/login`, {email, password, rememberMe, captcha})
          .then(res => res.data)
   },
   logout() {
      return axiosInstance.delete(`auth/login`,)
          .then(res => res.data)
   },
}