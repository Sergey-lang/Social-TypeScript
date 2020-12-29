import {axiosInstance} from './api'

export const authAPI = {
   me() {
      return axiosInstance.get(`auth/me`)
          .then(res => res.data)
   },
   login(email: string, password: string, rememberMe: boolean = false, captcha: string | null = null) {
      return axiosInstance.post(`auth/login`, {email, password, rememberMe, captcha})
          .then(res => res.data)
   },
   logout() {
      return axiosInstance.delete(`auth/login`,)
          .then(res => res.data)
   },
}