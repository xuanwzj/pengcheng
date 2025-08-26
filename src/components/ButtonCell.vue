<script setup lang="ts">
import VIcon from './VIcon.vue'

const {
  customClass,
  openType,
  leftIcon,
  title,
  description,
  value,
  rightIcon,
  isLink,
  border,
  pagePath,
  disabled,
  loading
} = defineProps<{
  customClass?: string
  openType?: string
  leftIcon?: string
  leftIconClass?: string
  title: string
  description?: string
  value?: string
  rightIcon?: string
  rightIconClass?: string
  isLink?: boolean
  border?: boolean
  pagePath?: string
  disabled?: boolean
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'click'): void
}>()

function handleClick() {
  // 小程序开放能力
  if (openType) {
    return
  }

  // 跳转页面
  else if (pagePath) {
    return uni.navigateTo({ url: pagePath })
  }

  emit('click')
}
</script>

<template>
  <button
    :open-type="openType"
    class="rounded-none bg-white p-4 active:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50"
    :class="[customClass]"
    :disabled="loading || disabled"
    :loading="loading"
    :style="{
      borderBottom: border ? '1px solid #f4f4f5' : 'none'
    }"
    @click="handleClick"
  >
    <div class="flex items-center gap-3">
      <VIcon v-if="leftIcon" :name="leftIcon" :custom-class="`text-[24px] ${leftIconClass}`" />

      <div class="flex min-w-0 flex-1 items-center gap-2 text-left">
        <div class="text-base font-medium" data-slot="title">{{ title }}</div>
        <div class="text-sm text-zinc-500" data-slot="description">{{ description }}</div>
      </div>

      <div class="flex items-center justify-between gap-1 text-zinc-600">
        <div class="text-sm text-zinc-600" data-slot="value">{{ value }}</div>
        <slot name="right" />
        <VIcon v-if="rightIcon" :name="rightIcon" :custom-class="`text-[24px] ${rightIconClass}`" />
        <VIcon v-if="isLink" name="chevron-right" :custom-class="`text-[24px] ${rightIconClass}`" />
      </div>
    </div>
  </button>
</template>
