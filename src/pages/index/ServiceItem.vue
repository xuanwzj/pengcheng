<script setup lang="ts">
import PhoneNumberButton from '@/components/PhoneNumberButton.vue'

const { title, description, icon, pagePath } = defineProps<{
  title: string
  description: string
  icon: string
  pagePath?: string
}>()

function handleClick() {
  if (!pagePath) {
    return uni.showToast({
      title: '敬请期待',
      icon: 'none'
    })
  }
}
</script>

<template>
  <PhoneNumberButton
    custom-class="card p-5 active:bg-zinc-100"
    :page-path="pagePath!"
    @click="handleClick"
  >
    <div class="flex w-full items-center">
      <div class="flex min-w-0 flex-1 flex-col text-left">
        <span class="text-2xl font-semibold">{{ title }}</span>
        <span class="text-sm text-zinc-500">{{ description }}</span>
      </div>
      <img :src="icon" class="-mr-1.5 size-16" />
    </div>
  </PhoneNumberButton>
</template>
