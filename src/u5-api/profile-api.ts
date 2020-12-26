import {axiosInstance} from './api'

export const profileAPI = {
   getProfile(userId: number) {
      return axiosInstance.get(`profile/${userId}`)
          .then(res => res.data)
   },

   getUserStatus(userId: number) {
      return axiosInstance.get(`profile/status/${userId}`)
          .then(res => res)
   },

   updateOwnProfileStatus(status: string) {
      return axiosInstance.put<UpdateStatusType>(`profile/status`, {status})
          .then(res => res.data)
   },
   savePhoto(photoFile: File) {
      const formData = new FormData()
      formData.append('image', photoFile)
      return axiosInstance.put(`profile/photo`, formData, {
         headers: {
            'Content-Type': 'multipart/form-data'
         }
      }).then(res => res.data)
   },
}

type UpdateStatusType = {
   resultCode: number
   messages: string
   data: any
}