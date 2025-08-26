<script setup lang="ts">
import VIcon from './VIcon.vue'

const { customClass, label } = defineProps<{
  customClass?: string
  label?: string
}>()
</script>

<template>
  <div class="flex items-center justify-center gap-2" :class="customClass">
    <VIcon name="loading" custom-class="animate-spin text-[24px]" />
    <div v-if="label" class="text-sm" data-slot="label">{{ label }}</div>
  </div>
</template>
