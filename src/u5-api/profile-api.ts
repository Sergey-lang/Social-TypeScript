import {axiosInstance, APIResponseType} from './api'
import {ProfileType} from '../u4-redux/profile-reducer'
import {PhotosType} from '../u4-redux/users-reducer'

type SavePhotoResponseDataType = {
   photos: PhotosType
}

export const profileAPI = {
   getProfile(userId: number) {
      return axiosInstance.get<ProfileType>(`profile/${userId}`)
          .then(res => res.data)
   },

   getUserStatus(userId: number) {
      return axiosInstance.get<string>(`profile/status/${userId}`)
          .then(res => res.data)
   },

   updateOwnProfileStatus(status: string) {
      return axiosInstance.put<APIResponseType>(`profile/status`, {status})
          .then(res => res.data)
   },

   savePhoto(photoFile: File) {
      const formData = new FormData()
      formData.append('image', photoFile)
      return axiosInstance.put<APIResponseType<SavePhotoResponseDataType>>(`profile/photo`, formData, {
         headers: {
            'Content-Type': 'multipart/form-data'
         }
      }).then(res => res.data)
   },

   saveProfile(profile: ProfileType) {
      return axiosInstance.put<APIResponseType<ProfileType>>(`profile/`, profile)
          .then(res => res.data)
   },
}