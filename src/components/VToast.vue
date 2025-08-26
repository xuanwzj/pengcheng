<script setup lang="ts">
import VIcon from '@/components/VIcon.vue'
import { useToastStore } from '@/store/toast'

const toastStore = useToastStore()
</script>

<template>
  <Transition
    name="toast"
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 scale-95 translate-y-2"
    enter-to-class="opacity-100 scale-100 translate-y-0"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 scale-100 translate-y-0"
    leave-to-class="opacity-0 scale-95 translate-y-2"
  >
    <div
      v-if="toastStore.visible"
      class="fixed inset-0 z-[9999] flex items-center justify-center px-6"
      style="pointer-events: none"
    >
      <div
        class="flex max-w-sm flex-col items-center rounded-lg bg-black/80 px-6 py-4 text-center backdrop-blur-sm"
        style="pointer-events: auto"
      >
        <!-- 图标 -->
        <div v-if="toastStore.icon" class="mb-2">
          <VIcon
            v-if="toastStore.icon === 'success'"
            name="check-circle"
            custom-class="text-2xl text-white"
          />
          <VIcon
            v-else-if="toastStore.icon === 'error'"
            name="x-circle"
            custom-class="text-2xl text-white"
          />
          <VIcon
            v-else-if="toastStore.icon === 'loading'"
            name="loader"
            custom-class="text-2xl text-white animate-spin"
          />
          <VIcon v-else-if="toastStore.icon === 'none'" name="" custom-class="hidden" />
        </div>

        <!-- 文字内容 -->
        <div class="text-sm leading-relaxed text-white">
          {{ toastStore.title }}
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(10px);
}
</style>
