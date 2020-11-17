import {axiosInstance} from './api';

export const profileAPI = {
   getProfile(userId: number) {
      return axiosInstance.get(`profile/${userId}`)
         .then(response => {
            return response.data
         })
   },
}