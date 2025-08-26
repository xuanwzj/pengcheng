import { defineStore } from 'pinia'

import { helper } from '@/utils'

export const useAppStore = defineStore(
  'app',
  () => {
    // 小程序 openId
    const openId = ref<string | undefined>(undefined)
    // 用户信息
    const user = ref<UserType | undefined>(undefined)
    // 首页广告
    const homeAds = ref<AdType[]>([])

    // 是否登录
    const isLoggedIn = computed(() => helper.isValid(openId.value))

    function setOpenId(value: string) {
      openId.value = value
    }

    function setUser(value: UserType) {
      user.value = {
        ...value,
        accountText: ((value.account || 0) / 100).toFixed(2)
      }
    }

    function setHomeAds(value: AdType[]) {
      homeAds.value = value
    }

    return {
      openId,
      user,
      isLoggedIn,
      homeAds,
      setOpenId,
      setUser,
      setHomeAds
    }
  },
  {
    persist: {
      storage: {
        getItem: uni.getStorageSync,
        setItem: uni.setStorageSync
      }
    }
  }
)
