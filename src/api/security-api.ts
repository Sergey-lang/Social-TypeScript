import {axiosInstance} from './api'

type GetCaptchaUrlResponseType = {
   url: string
}

export const securityAPI = {
   getCaptchaUrl() {
      return axiosInstance.get<GetCaptchaUrlResponseType>(`security/get-captcha-url`)
          .then(res => res.data)
   },
}