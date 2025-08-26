<template>
  <view class="xicha-page">
    <!-- 喜茶风格的主视觉区域 -->
    <view class="hero-section">
      <!-- 状态栏占位 -->
      <view class="status-bar"></view>
      
      <!-- 顶部导航 -->
      <view class="top-nav">
        <view class="nav-left">
          <text class="brand-title">潮汕特产</text>
        </view>
        <view class="nav-right">
          <view class="search-btn" @tap="navigateToSearch">
            <text class="search-icon">🔍</text>
          </view>
        </view>
      </view>

      <!-- 主视觉轮播 -->
      <view class="hero-banner">
        <swiper class="hero-swiper" autoplay circular indicator-dots>
          <swiper-item v-for="(banner, index) in banners" :key="index">
            <view class="hero-item">
              <image :src="banner.image" class="hero-bg" mode="aspectFill" />
              <view class="hero-content">
                <text class="hero-title">{{ banner.title }}</text>
                <text class="hero-subtitle">{{ banner.subtitle }}</text>
                <view class="hero-btn" @tap="navigateToMenu">
                  <text class="btn-text">立即选购</text>
                </view>
              </view>
            </view>
          </swiper-item>
        </swiper>
      </view>
    </view>

    <!-- 主要内容区域 -->
    <scroll-view class="main-content" scroll-y>
      <!-- 分类导航 - 喜茶风格 -->
      <view class="category-section">
        <view class="category-grid">
          <view 
            class="category-card" 
            v-for="(category, index) in mainCategories" 
            :key="index"
            @tap="navigateToCategory(category)"
          >
            <view class="category-bg">
              <text class="category-emoji">{{ category.icon }}</text>
            </view>
            <text class="category-label">{{ category.name }}</text>
          </view>
        </view>
      </view>

      <!-- 精选商品 - 大卡片风格 -->
      <view class="featured-section">
        <view class="section-header">
          <text class="section-title">精选好物</text>
          <view class="more-link" @tap="navigateToMenu">
            <text class="more-text">查看全部</text>
            <text class="arrow">→</text>
          </view>
        </view>
        
        <view class="product-list">
          <view 
            class="product-card-large" 
            v-for="(product, index) in featuredProducts.slice(0, 4)" 
            :key="index"
            @tap="viewProduct(product)"
          >
            <view class="product-image-container">
              <image :src="product.image" class="product-image" mode="aspectFill" />
            </view>
            <view class="product-details">
              <text class="product-title">{{ product.name }}</text>
              <view class="price-row">
                <text class="price">¥{{ product.price }}</text>
                <view class="add-to-cart">
                  <text class="add-icon">+</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 底部间距 -->
      <view class="bottom-space"></view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 轮播图数据
const banners = ref([
  {
    image: '/static/sw1.jpg',
    title: '新会陈皮',
    subtitle: '传承百年工艺，药食同源'
  },
  {
    image: '/static/sw2.jpg',
    title: '佛手香黄',
    subtitle: '古法制作，开胃健脾'
  }
])

// 主要分类（精简到4个核心分类）
const mainCategories = ref([
  { name: '陈皮', icon: '🍊', id: 'chenpi' },
  { name: '佛手', icon: '🍋', id: 'foshou' },
  { name: '茶饮', icon: '🍵', id: 'tea' },
  { name: '礼盒', icon: '🎁', id: 'gift' }
])

// 精选商品（简化到4个）
const featuredProducts = ref([
  {
    id: 1,
    name: '新会老陈皮',
    price: 128,
    image: '/static/sw1.jpg'
  },
  {
    id: 2,
    name: '佛手老香黄',
    price: 68,
    image: '/static/sw2.jpg'
  },
  {
    id: 3,
    name: '八仙果茶',
    price: 52,
    image: '/static/sw1.jpg'
  },
  {
    id: 4,
    name: '陈皮礼盒装',
    price: 288,
    image: '/static/sw2.jpg'
  }
])

const navigateToSearch = () => {
  uni.switchTab({
    url: '/pages/menu/index'
  })
}

const scanCode = () => {
  uni.showToast({
    title: '扫码功能开发中',
    icon: 'none'
  })
}



const navigateToCategory = (category) => {
  uni.switchTab({
    url: `/pages/menu/index?category=${category.id}`
  })
}

const navigateToMenu = () => {
  uni.switchTab({
    url: '/pages/menu/index'
  })
}

const viewProduct = (product) => {
  uni.showToast({
    title: `查看商品: ${product.name}`,
    icon: 'none'
  })
}
</script>

<style scoped>
/* 喜茶风格设计系统 */
.xicha-page {
  min-height: 100vh;
  background: #ffffff;
}

/* 主视觉区域 */
.hero-section {
  position: relative;
  background: linear-gradient(135deg, #00B14F 0%, #00A846 100%);
  min-height: 100vh;
}

.status-bar {
  height: 44rpx;
}

/* 顶部导航 */
.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32rpx;
  height: 88rpx;
}

.brand-title {
  font-size: 36rpx;
  font-weight: 700;
  color: white;
  letter-spacing: 2rpx;
}

.search-btn {
  width: 64rpx;
  height: 64rpx;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10rpx);
}

.search-icon {
  font-size: 28rpx;
  color: white;
}

/* 主视觉轮播 */
.hero-banner {
  padding: 0 32rpx;
  height: calc(100vh - 200rpx);
}

.hero-swiper {
  height: 100%;
  border-radius: 32rpx;
  overflow: hidden;
}

.hero-item {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  padding: 60rpx 40rpx;
}

.hero-title {
  font-size: 48rpx;
  font-weight: 700;
  margin-bottom: 16rpx;
  display: block;
  text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  font-size: 28rpx;
  opacity: 0.9;
  margin-bottom: 48rpx;
  display: block;
  line-height: 1.5;
}

.hero-btn {
  background: white;
  color: #00B14F;
  padding: 20rpx 48rpx;
  border-radius: 50rpx;
  display: inline-block;
  font-weight: 600;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.15);
}

.btn-text {
  font-size: 28rpx;
}

/* 主内容区域 */
.main-content {
  background: white;
  border-radius: 32rpx 32rpx 0 0;
  margin-top: -32rpx;
  position: relative;
  z-index: 3;
  min-height: 80vh;
}

/* 分类导航 - 喜茶风格 */
.category-section {
  padding: 48rpx 32rpx 32rpx;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24rpx;
}

.category-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24rpx 16rpx;
  transition: transform 0.3s ease;
}

.category-card:active {
  transform: scale(0.95);
}

.category-bg {
  width: 96rpx;
  height: 96rpx;
  background: linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%);
  border-radius: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 177, 79, 0.1);
}

.category-emoji {
  font-size: 40rpx;
}

.category-label {
  font-size: 24rpx;
  color: #333;
  font-weight: 500;
  text-align: center;
}

/* 精选商品 */
.featured-section {
  padding: 0 32rpx 48rpx;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32rpx;
}

.section-title {
  font-size: 36rpx;
  font-weight: 700;
  color: #333;
}

.more-link {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.more-text {
  font-size: 26rpx;
  color: #00B14F;
  font-weight: 500;
}

.arrow {
  font-size: 24rpx;
  color: #00B14F;
}

.product-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24rpx;
}

.product-card-large {
  background: white;
  border-radius: 24rpx;
  overflow: hidden;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.product-card-large:active {
  transform: translateY(-4rpx);
  box-shadow: 0 12rpx 40rpx rgba(0, 0, 0, 0.12);
}

.product-image-container {
  position: relative;
  padding-top: 75%; /* 4:3 aspect ratio */
  overflow: hidden;
}

.product-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.product-details {
  padding: 24rpx;
}

.product-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 16rpx;
  line-height: 1.4;
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: 32rpx;
  font-weight: 700;
  color: #00B14F;
}

.add-to-cart {
  width: 56rpx;
  height: 56rpx;
  background: #00B14F;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 16rpx rgba(0, 177, 79, 0.3);
}

.add-icon {
  font-size: 32rpx;
  font-weight: 600;
  color: white;
  line-height: 1;
}

.bottom-space {
  height: 120rpx;
}
</style>