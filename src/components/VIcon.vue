<script setup lang="ts">
import type { CSSProperties } from 'vue'

const { name, customClass, style } = defineProps<{
  customClass?: string
  name: string
  style?: CSSProperties
}>()
</script>

<template>
  <div
    class="mcicon"
    :class="`mcicon-${name} ${customClass}`"
    style="line-height: 1"
    :style="style"
  />
</template>
