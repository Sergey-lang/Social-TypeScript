import {axiosInstance} from './api';

export const authAPI = {
   me() {
      return axiosInstance.get(`auth/me`)
         .then(response => {
            return response.data
         })
   }
}