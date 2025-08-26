<script setup lang="ts">
import Loading from './Loading.vue'

const { customClass, openType, pagePath, disabled, loading } = defineProps<{
  customClass?: string
  customStyle?: string
  openType?: string
  pagePath?: string
  disabled?: boolean
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'click', event: Any): void
}>()

function handleClick(event: Any) {
  if (disabled || loading || openType) {
    // 禁用或加载中 或者 小程序开放能力
  }

  // 跳转页面
  else if (pagePath) {
    uni.navigateTo({
      url: pagePath
    })
  }

  // 点击事件
  else {
    emit('click', event)
  }
}

function hanleGetPhoneNumber(event: Any) {
  if (openType === 'getPhoneNumber') {
    emit('click', event)
  }
}

function handleChooseAvatar(event: Any) {
  if (openType === 'chooseAvatar') {
    emit('click', event)
  }
}

function handleAgreePrivacyAuthorization(event: Any) {
  if (openType === 'agreePrivacyAuthorization') {
    emit('click', event)
  }
}
</script>

<template>
  <button
    class="relative m-0 p-0 text-sm"
    :class="customClass"
    :open-type="openType"
    :style="customStyle"
    @click.stop="handleClick"
    @getphonenumber="hanleGetPhoneNumber"
    @chooseavatar="handleChooseAvatar"
    @agreeprivacyauthorization="handleAgreePrivacyAuthorization"
  >
    <div data-slot="content" :class="{ 'opacity-0': loading }"><slot /></div>
    <Loading v-if="loading" custom-class="absolute inset-0 flex items-center justify-center" />
  </button>
</template>
