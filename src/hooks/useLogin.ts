import { userApi } from '@/api'
import { useAppStore } from '@/store'
import { Logger } from '@/utils'

// 防重复调用标志
let isLoggingIn = false

export async function useLogin() {
  // 防止重复调用
  if (isLoggingIn) {
    Logger.log('登录正在进行中，跳过重复调用')
    return
  }

  const appStore = useAppStore()

  try {
    isLoggingIn = true
    Logger.log('用户登录中...')

    // 如果未登录，则登录
    if (!appStore.isLoggedIn) {
      // 获取微信登录code
      const result = await uni.login()

      if (result.code) {
        const user = await userApi.login(result.code)
        appStore.setOpenId(user.openId)
        appStore.setUser(user)
      } else {
        throw new Error('获取微信登录code失败')
      }
      
      Logger.log('用户登录成功')
    }

    // 获取用户信息
    Logger.log('获取用户信息中...')
    const userInfo = await userApi.getUserInfo()
    appStore.setUser(userInfo)
    Logger.log('获取用户信息成功')

  } catch (err) {
    Logger.error('用户登录失败', err)
    
    // 登录失败时，确保清理状态
    if (appStore.isLoggedIn) {
      // 可以考虑清理登录状态，或者重试
    }
    
    // 对于网络或服务器错误，提供更友好的错误信息
    if (err instanceof Error) {
      if (err.message.includes('服务器繁忙')) {
        throw new Error('登录服务暂时不可用，请稍后重试')
      } else if (err.message.includes('网络')) {
        throw new Error('网络连接异常，请检查网络后重试')
      }
    }
    
    throw err
  } finally {
    isLoggingIn = false
  }
}
