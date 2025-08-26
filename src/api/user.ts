import { request } from '@/utils'

export async function login(code: string) {
  return request<UserType>({
    url: `/wx/user/login/${code}`
  })
}

export function getUserInfo() {
  return request<UserType>({
    url: '/wx/user'
  })
}

export async function getPhoneNumber(openId: string, code: string) {
  return request<UserType>({
    url: `/wx/user/tel/${openId}/${code}`
  })
}
