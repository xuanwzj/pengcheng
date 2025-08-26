<script setup lang="ts">
// 临时使用固定图片，注释掉原先的接口请求
const homeAds = ref([
  {
    id: 1,
    url: '/static/sw1.jpg'
  },
  {
    id: 2,
    url: '/static/sw2.jpg'
  }
])
</script>

<template>
  <div class="px-4">
    <swiper
      class="card aspect-[16/9] h-auto w-full bg-white"
      circular
      autoplay
      indicator-dots
      indicator-color="#fff"
      indicator-active-color="#00b0b0"
      easing-function="easeInOutCubic"
      interval="6000"
    >
      <swiper-item v-for="ad in homeAds" :key="ad.id" class="h-full w-full">
        <img :src="ad.url" class="h-full w-full" mode="widthFix" />
      </swiper-item>
    </swiper>
  </div>
</template>
