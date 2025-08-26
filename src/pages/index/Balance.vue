<script setup lang="ts">
import PhoneNumberButton from '@/components/PhoneNumberButton.vue'
import VIcon from '@/components/VIcon.vue'
import { useAppStore } from '@/store'

const appStore = useAppStore()
const { user } = storeToRefs(appStore)
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-3">
      <div class="flex size-12 items-center justify-center rounded-full bg-zinc-200">
        <VIcon name="user" custom-class="text-[24px] text-[#00b0b0]" />
      </div>
      <span class="text-base font-medium">余额: ¥{{ user?.accountText || 0 }}</span>
    </div>

    <PhoneNumberButton
      custom-class="rounded-full bg-[#00b0b0] px-8 py-2 text-base font-medium text-white"
      page-path="/pages/recharge/index"
    >
      充值
    </PhoneNumberButton>
  </div>
</template>
