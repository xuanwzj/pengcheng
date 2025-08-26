<script setup lang="ts">
import { helper } from '@/utils'

const { title, description, icon, pagePath } = defineProps<{
  customClass?: string
  title: string
  description: string
  icon: string
  pagePath?: string
}>()

const emit = defineEmits<{
  (e: 'click', event: Any): void
}>()

function handleClick(event: Any) {
  if (helper.isValid(pagePath)) {
    return uni.navigateTo({
      url: pagePath!
    })
  }

  emit('click', event)
}
</script>

<template>
  <button
    class="card flex items-center p-5 active:bg-zinc-100"
    :class="customClass"
    @click="handleClick"
  >
    <div class="flex min-w-0 flex-1 flex-col text-left">
      <span class="text-2xl font-semibold">{{ title }}</span>
      <span class="text-sm text-zinc-500">{{ description }}</span>
    </div>
    <img :src="icon" class="size-14" />
  </button>
</template>
