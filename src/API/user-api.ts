import {axiosInstance} from './api';

export const usersAPI = {
   getUsers(currentPage: number, pageSize: number) {
      return axiosInstance.get(`users?page=${currentPage}&count=${pageSize}`)
         .then(response => {
            return response.data
         })
   },

   unfollow(userId: number) {
      return axiosInstance.delete(`follow/${userId}`)
         .then(response => {
            return response.data
         })
   },

   follow(userId: number) {
      return axiosInstance.post(`follow/${userId}`, {})
         .then(response => {
            return response.data
         })
   },
}