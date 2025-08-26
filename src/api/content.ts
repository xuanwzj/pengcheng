import { request } from '@/utils'

// 首页广告
export async function homeAds() {
  return request<AdType[]>({
    url: '/wx/user/ad/list'
  })
}

// 加盟申请
export async function franchise(input: { userName: string; phoneNumber: string; content: string }) {
  return request({
    method: 'POST',
    url: '/wx/user/franchisee',
    data: input
  })
}

// 获取操作手册
export async function getOperationManual() {
  return request<any>({
    url: '/wx/user/manual',
    method: 'GET'
  })
} 