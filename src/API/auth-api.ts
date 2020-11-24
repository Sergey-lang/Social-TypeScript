import {axiosInstance} from './api';

export const authAPI = {
   me() {
      return axiosInstance.get(`auth/me`)
         .then(response => {
            return response.data
         })
   },
   login(email: string, password: string, rememberMe: boolean) {
      return axiosInstance.post(`auth/login`, {email, password, rememberMe})
         .then(response => {
            return response.data
         })
   },

   logout() {
      return axiosInstance.delete(`auth/login`,)
         .then(response => {
            return response.data
         })
   },
}