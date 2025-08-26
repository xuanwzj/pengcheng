<script setup>
import { Logger } from './utils'

onLaunch(async options => {
  Logger.log('onLaunch', options)
  // 应用启动逻辑
})
</script>

<template>
  <view>
    <router-view />
  </view>
</template>
