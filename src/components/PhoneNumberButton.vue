<script setup lang="ts">
import { useRequest } from 'vue-request'

import { userApi } from '@/api'
import Loading from '@/components/Loading.vue'
import { useLogin } from '@/hooks'
import { useAppStore } from '@/store'
import { helper } from '@/utils'

const { customClass, pagePath } = defineProps<{
  customClass?: string
  pagePath: string
}>()

const appStore = useAppStore()
const { isLoggedIn, openId, user } = storeToRefs(appStore)

const openType = computed(() => {
  return isLoggedIn.value && helper.isValid(user.value?.phone) ? undefined : 'getPhoneNumber'
})

const { loading, run } = useRequest(
  async (event: Any) => {
    if (openType.value === 'getPhoneNumber' && event.type === 'tap') {
      return
    }

    if (!isLoggedIn.value) {
      await useLogin()
    }

    if (!helper.isValid(user.value?.phone)) {
      if (helper.isEmpty(event.detail.code)) {
        return
      }

      appStore.setUser(await userApi.getPhoneNumber(openId.value!, event.detail.code))
    }

    uni.navigateTo({
      url: pagePath
    })
  },
  {
    manual: true,
    onError: (error: any) => {
      // 提供更友好的错误提示
      uni.showToast({
        title: error.message || '操作失败，请重试',
        icon: 'none',
        duration: 2000
      })
    }
  }
)
</script>

<template>
  <button
    class="relative m-0 p-0 text-sm"
    :class="customClass"
    :open-type="openType"
    :disabled="loading"
    @getphonenumber="run"
    @click="run"
  >
    <div class="w-full" :class="{ 'opacity-0': loading }"><slot /></div>
    <Loading v-if="loading" custom-class="absolute inset-0 flex items-center justify-center" />
  </button>
</template>
