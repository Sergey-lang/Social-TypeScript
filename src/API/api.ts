import axios from 'axios'

export const axiosInstance = axios.create({
   withCredentials: true,
   baseURL: 'https://social-network.samuraijs.com/api/1.0/',
   headers: {
      'API-KEY': 'be9a3549-d8d6-4d97-a73c-6593dde1f694'
   },
})
