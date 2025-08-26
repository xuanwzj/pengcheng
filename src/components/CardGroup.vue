<script setup lang="ts">
import VIcon from './VIcon.vue'

const { title, items } = defineProps<{
  title: string
  items: {
    value: string
    label: string
    icon?: string
    valueClass?: string
    labelClass?: string
  }[]
}>()
</script>

<template>
  <div class="card p-4">
    <div class="mb-3 font-medium">{{ title }}</div>
    <div class="flex flex-col gap-2">
      <div v-for="item in items" :key="item.label" class="grid grid-cols-3 gap-2 text-sm">
        <div class="text-zinc-500" :class="item.labelClass">{{ item.label }}</div>
        <div class="col-span-2 flex items-center justify-end gap-1" :class="item.valueClass">
          <VIcon v-if="item.icon" :name="item.icon" custom-class="size-5" />
          <span>{{ item.value }}</span>
        </div>
      </div>
    </div>
    <slot />
  </div>
</template>
