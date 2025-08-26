<script setup lang="ts">
const { icon, title, pagePath } = defineProps<{
  icon: string
  title: string
  pagePath?: string
}>()

function handleClick() {
  if (!pagePath) {
    return uni.showToast({
      title: '敬请期待',
      icon: 'none'
    })
  }

  uni.navigateTo({
    url: pagePath
  })
}
</script>

<template>
  <button
    class="card flex flex-col items-center gap-2 px-5 py-3 shadow-sm active:bg-zinc-100"
    @click="handleClick"
  >
    <img :src="icon" class="mt-1 h-12 w-12 rounded-lg object-cover" />
    <span class="text-xl font-semibold">{{ title }}</span>
  </button>
</template>
