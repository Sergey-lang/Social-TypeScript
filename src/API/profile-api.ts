import {axiosInstance} from './api';

export const profileAPI = {
   getProfile(userId: number) {
      return axiosInstance.get(`profile/${userId}`)
         .then(response => {
            return response.data
         })
   },

   getStatus(userId: number) {
      return axiosInstance.get(`/profile/status/${userId}`)
         .then(response => {
            return response.data
         })
   },

   updateStatus(status: string) {
      return axiosInstance.put(`/profile/status`,{status})
         .then(response => {
            return response.data
         })
   },
}