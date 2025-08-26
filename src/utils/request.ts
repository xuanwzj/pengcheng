import { useAppStore } from '@/store'

import { helper } from './helper'

interface RequestOptions extends UniApp.RequestOptions {
  baseURL?: string
  retry?: number
}

const DEFAULT_BASE_URL = import.meta.env.VITE_API_URL

export async function request<T>(options: RequestOptions): Promise<T> {
  const baseURL = options.baseURL || DEFAULT_BASE_URL
  const appStore = useAppStore()

  if (helper.isURL(baseURL)) {
    options.url = baseURL.replace(/\/$/, '') + options.url
  }

  options.header = {
    ...options.header,
    appId: import.meta.env.VITE_APP_ID,
    openId: helper.isValid(appStore.openId) ? appStore.openId : undefined
  }

  const response = await uni.request({
    ...options
  })

  const data = response.data as Any

  if (data.code === 200) {
    return data.data as T
  }

  throw new Error(data.msg || '服务器繁忙，请稍后再试')
}
