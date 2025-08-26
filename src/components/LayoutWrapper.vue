<template>
  <view class="layout-wrapper">
    <!-- 统一顶部导航 -->
    <view class="navbar">
      <view class="navbar-content">
        <view class="navbar-left">
          <view class="menu-toggle" @tap="toggleSidebar">
            <text class="mcicon mcicon-navigation"></text>
          </view>
          <text class="navbar-title">潮汕特产</text>
        </view>
        <view class="navbar-right">
          <view class="nav-action" @tap="toggleSearch">
            <text class="mcicon mcicon-search"></text>
          </view>
          <view class="nav-action" @tap="goToUser">
            <text class="mcicon mcicon-user"></text>
          </view>
        </view>
      </view>
      
      <!-- 搜索栏 -->
      <view class="search-bar" v-if="showSearch">
        <view class="search-input-wrapper">
          <text class="mcicon mcicon-search search-icon"></text>
          <input 
            placeholder="搜索潮汕特产..." 
            class="search-input"
            v-model="searchKeyword"
            @confirm="onSearch"
            focus
          />
          <view class="search-close" @tap="closeSearch">
            <text class="mcicon mcicon-close"></text>
          </view>
        </view>
      </view>
    </view>

    <!-- 侧边栏 -->
    <view class="sidebar" :class="{ 'sidebar-open': showSidebar }">
      <view class="sidebar-header">
        <text class="sidebar-title">商品分类</text>
        <view class="sidebar-close" @tap="closeSidebar">
          <text class="mcicon mcicon-close"></text>
        </view>
      </view>
      
      <scroll-view class="sidebar-content" scroll-y>
        <view 
          v-for="(category, index) in categories" 
          :key="index"
          :class="['category-item', { active: activeCategory === index }]"
          @tap="selectCategory(index)"
        >
          <view class="category-icon">{{ category.icon }}</view>
          <text class="category-name">{{ category.name }}</text>
          <view class="category-indicator" v-if="activeCategory === index"></view>
        </view>
      </scroll-view>
    </view>

    <!-- 侧边栏遮罩 -->
    <view 
      class="sidebar-overlay" 
      v-if="showSidebar"
      @tap="closeSidebar"
    ></view>

    <!-- 主内容区域 -->
    <view class="main-content" :style="{ paddingTop: navbarHeight }">
      <slot></slot>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const emit = defineEmits(['categoryChange', 'search'])

const showSidebar = ref(false)
const showSearch = ref(false)
const activeCategory = ref(0)
const searchKeyword = ref('')
const navbarHeight = ref('120rpx')

const categories = ref([
  { name: '全部商品', id: 'all', icon: '🏠' },
  { name: '陈皮系列', id: 'chenpi', icon: '🍊' },
  { name: '佛手系列', id: 'foshou', icon: '🍋' },
  { name: '养生茶饮', id: 'tea', icon: '🍵' },
  { name: '传统小食', id: 'snacks', icon: '🥜' },
  { name: '养生佳酿', id: 'wine', icon: '🍶' },
  { name: '礼盒套装', id: 'gift', icon: '🎁' }
])

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value
}

const closeSidebar = () => {
  showSidebar.value = false
}

const toggleSearch = () => {
  showSearch.value = !showSearch.value
  if (!showSearch.value) {
    searchKeyword.value = ''
  }
}

const closeSearch = () => {
  showSearch.value = false
  searchKeyword.value = ''
}

const selectCategory = (index) => {
  activeCategory.value = index
  emit('categoryChange', {
    index,
    category: categories.value[index]
  })
  closeSidebar()
}

const onSearch = () => {
  if (searchKeyword.value.trim()) {
    emit('search', searchKeyword.value)
    closeSearch()
  }
}

const goToUser = () => {
  uni.switchTab({
    url: '/pages/user/index'
  })
}

onMounted(() => {
  // 计算导航栏高度
  const systemInfo = uni.getSystemInfoSync()
  const statusBarHeight = systemInfo.statusBarHeight || 44
  navbarHeight.value = `${statusBarHeight + 88}rpx`
})
</script>

<style scoped>
.layout-wrapper {
  position: relative;
  min-height: 100vh;
  background: var(--bg-secondary);
}

/* 统一导航栏 */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: var(--bg-primary);
  border-bottom: 1rpx solid var(--border-light);
  box-shadow: var(--shadow-sm);
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 32rpx;
  padding-top: calc(20rpx + var(--status-bar-height, 44rpx));
}

.navbar-left {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.menu-toggle {
  width: 64rpx;
  height: 64rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  font-size: 32rpx;
  transition: all 0.2s ease;
}

.menu-toggle:active {
  color: var(--primary-color);
  transform: scale(0.95);
}

.navbar-title {
  font-size: 36rpx;
  font-weight: bold;
  color: var(--text-primary);
}

.navbar-right {
  display: flex;
  gap: 24rpx;
}

.nav-action {
  width: 64rpx;
  height: 64rpx;
  background: var(--bg-tertiary);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  font-size: 32rpx;
  transition: all 0.2s ease;
}

.nav-action:active {
  transform: scale(0.95);
  background: var(--bg-hover);
  color: var(--primary-color);
}

/* 搜索栏 */
.search-bar {
  padding: 0 32rpx 24rpx;
}

.search-input-wrapper {
  display: flex;
  align-items: center;
  background: var(--bg-tertiary);
  border-radius: var(--radius-full);
  padding: 20rpx 32rpx;
}

.search-icon {
  font-size: 32rpx;
  color: var(--text-light);
  margin-right: 16rpx;
}

.search-input {
  flex: 1;
  font-size: 28rpx;
  color: var(--text-primary);
}

.search-close {
  color: var(--text-light);
  font-size: 24rpx;
  padding: 8rpx;
  margin-left: 16rpx;
}

/* 侧边栏 */
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 320rpx;
  background: var(--bg-primary);
  border-right: 1rpx solid var(--border-light);
  box-shadow: var(--shadow-lg);
  z-index: 999;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.sidebar.sidebar-open {
  transform: translateX(0);
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32rpx 32rpx 24rpx;
  padding-top: calc(32rpx + var(--status-bar-height, 44rpx));
  border-bottom: 1rpx solid var(--border-light);
}

.sidebar-title {
  font-size: 32rpx;
  font-weight: bold;
  color: var(--text-primary);
}

.sidebar-close {
  width: 48rpx;
  height: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-light);
  font-size: 24rpx;
  border-radius: var(--radius-full);
  background: var(--bg-tertiary);
}

.sidebar-content {
  flex: 1;
  padding: 24rpx 0;
}

.category-item {
  position: relative;
  display: flex;
  align-items: center;
  padding: 24rpx 32rpx;
  border-bottom: 1rpx solid var(--border-light);
  transition: all 0.2s ease;
}

.category-item:last-child {
  border-bottom: none;
}

.category-item.active {
  background: rgba(45, 55, 72, 0.05);
  color: var(--primary-color);
}

.category-item:active {
  background: var(--bg-hover);
}

.category-icon {
  font-size: 32rpx;
  margin-right: 20rpx;
  flex-shrink: 0;
}

.category-name {
  font-size: 28rpx;
  font-weight: 500;
  color: var(--text-primary);
}

.category-item.active .category-name {
  color: var(--primary-color);
}

.category-indicator {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 6rpx;
  height: 40rpx;
  background: var(--primary-color);
  border-radius: 3rpx 0 0 3rpx;
}

/* 侧边栏遮罩 */
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;
}

/* 主内容区域 */
.main-content {
  min-height: 100vh;
  transition: all 0.3s ease;
}
</style>