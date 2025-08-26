<script setup lang="ts">
import ButtonCell from './ButtonCell.vue'
import VIcon from './VIcon.vue'

const { customClass, modelValue, options } = defineProps<{
  customClass?: string
  modelValue: string | number
  options: {
    title: string
    description?: string
    icon?: string
    iconClass?: string
    value: string | number
  }[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

function handleChange(value: string | number) {
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="card" :class="customClass">
    <ButtonCell
      v-for="(row, index) in options"
      :key="row.value"
      :title="row.title"
      :description="row.description"
      :left-icon="row.icon"
      :left-icon-class="row.iconClass"
      :border="index < options.length - 1"
      @click="handleChange(row.value)"
    >
      <template #right>
        <div
          class="flex size-6 items-center justify-center rounded-full border"
          :class="[
            modelValue === row.value ? 'border-[#00b0b0] bg-[#00b0b0]' : 'border-zinc-300 bg-white'
          ]"
        >
          <VIcon name="check" custom-class="size-4 text-white" />
        </div>
      </template>
    </ButtonCell>
  </div>
</template>
