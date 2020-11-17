import {axiosInstance} from './api';

export const profileAPI = {
   getProfile(userId: number) {
      return axiosInstance.get(`profile/${userId}`)
         .then(res => {
            return res.data
         })
   },

   getStatus(userId: number) {
      return axiosInstance.get(`/profile/status/${userId}`)
         .then(res => {
            return res.data
         })
   },

   updateProfileStatus(status: string) {
      return axiosInstance.put<UpdateStatusType>(`/profile/status`, {status})
         .then(res => {
            return res.data
         })
   },
}

type UpdateStatusType = {
   resultCode: number
   messages: string
   data: any
}