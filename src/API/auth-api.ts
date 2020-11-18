import {axiosInstance} from './api';

export const authAPI = {
   me() {
      return axiosInstance.get(`auth/me`)
         .then(response => {
            return response.data
         })
   },
   loginMe(email: string, password: string, rememberMe: boolean, captcha: boolean) {
      return axiosInstance.post(`auth/login`, {email, password, rememberMe, captcha})
   },

   logoutMe() {
      return axiosInstance.delete(`auth/login`,)
   },
}