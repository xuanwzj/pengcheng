<script setup lang="ts">
import VIcon from '@/components/VIcon.vue'

// 移除设备相关逻辑，显示静态内容
</script>

<template>
  <div class="flex flex-col gap-2 px-4 py-4">
    <div class="text-2xl font-bold">戴宠光愈</div>
    <div class="flex items-center">
      <div class="flex items-center gap-1 rounded-full bg-[#f8f8f8]/80 p-2">
        <VIcon name="map-pin" custom-class="size-5" />
        <div class="text-sm font-semibold text-zinc-700">宠物激光治疗</div>
        <VIcon name="chevron-down" custom-class="size-5" />
      </div>
    </div>
  </div>
</template>
