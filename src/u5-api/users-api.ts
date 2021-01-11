import {axiosInstance, GetItemsType, APIResponseType} from './api'

export const usersAPI = {
   getUsers(currentPage: number, pageSize: number, term: string = '', friend: null | boolean = null) {
      return axiosInstance.get<GetItemsType>
      (`users?page=${currentPage}&count=${pageSize}&term=${term}`+(friend === null ? '':`&friend=${friend}`))
          .then(res => res.data)
   },

   follow(userId: number) {
      return axiosInstance.post<APIResponseType>(`follow/${userId}`, {})
          .then(res => res.data)
   },

   unfollow(userId: number) {
      return axiosInstance.delete(`follow/${userId}`)
          .then(res => res.data) as Promise<APIResponseType>
   },
}