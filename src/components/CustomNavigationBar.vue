<script setup lang="ts">
const { statusBarHeight, windowWidth } = uni.getWindowInfo()
const { left: menuButtonLeft } = uni.getMenuButtonBoundingClientRect()
</script>

<template>
  <div
    :style="{
      paddingTop: `${statusBarHeight}px`,
      paddingRight: `${windowWidth - menuButtonLeft}px`,
      height: `${statusBarHeight + 44}px`
    }"
  >
    <slot />
  </div>
</template>
