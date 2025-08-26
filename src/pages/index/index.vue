<template>
  <view class="homepage">
    <!-- 顶部导航 (包含安全区域) -->
    <!-- <view class="top-header">
      <view class="header-content">
        <view class="brand-section">
          <text class="brand-name">潮汕传承</text>
          <text class="brand-subtitle">道地药材 · 匠心工艺</text>
        </view>
        <view class="header-actions">
          <view class="search-btn" @tap="navigateToSearch">
            <text class="search-icon">🔍</text>
          </view>
        </view>
      </view>
    </view> -->

    <!-- 主内容区域 -->
    <scroll-view class="main-scroll" scroll-y>
      <!-- 主视觉大图轮播 -->
      <view class="hero-section">
        <swiper class="hero-swiper" autoplay circular indicator-dots indicator-color="rgba(255,255,255,0.5)" indicator-active-color="#ffffff">
          <swiper-item v-for="(banner, index) in heroBanners" :key="index">
            <view class="hero-slide">
              <image :src="banner.image" class="hero-img" mode="aspectFill" />
              <view class="hero-overlay">
                <view class="hero-content">
                  <text class="hero-title">{{ banner.title }}</text>
                  <text class="hero-subtitle">{{ banner.subtitle }}</text>
                  <view class="cta-button" @tap="navigateToMenu">
                    <text class="cta-text">立即购买</text>
                  </view>
                </view>
              </view>
            </view>
          </swiper-item>
        </swiper>
      </view>

      <!-- 品牌文化区域 -->
      <view class="heritage-section">
        <view class="heritage-bg">
          <view class="heritage-content">
            <view class="heritage-header">
              <text class="heritage-title">药食同源 · 现代传承</text>
              <text class="heritage-subtitle">汇聚潮汕道地药材，传承千年养生智慧</text>
            </view>
            <view class="heritage-features">
              <view class="heritage-item">
                <view class="heritage-icon-box">
                  <text class="heritage-icon">🌿</text>
                </view>
                <text class="heritage-text">道地药材</text>
                <text class="heritage-desc">精选潮汕本地优质原料</text>
              </view>
              <view class="heritage-item">
                <view class="heritage-icon-box">
                  <text class="heritage-icon">⚖️</text>
                </view>
                <text class="heritage-text">科学配比</text>
                <text class="heritage-desc">传统配方现代化工艺</text>
              </view>
              <view class="heritage-item">
                <view class="heritage-icon-box">
                  <text class="heritage-icon">✨</text>
                </view>
                <text class="heritage-text">匠心制作</text>
                <text class="heritage-desc">每一份都经过精心调制</text>
              </view>
              <view class="heritage-item">
                <view class="heritage-icon-box">
                  <text class="heritage-icon">🏆</text>
                </view>
                <text class="heritage-text">品质保证</text>
                <text class="heritage-desc">严格质检安全无忧</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 精选产品大图展示 -->
      <view class="featured-section">
        <view class="section-header">
          <view class="title-decoration">
            <view class="title-line"></view>
            <text class="section-title">道地精选</text>
            <view class="title-line"></view>
          </view>
          <text class="section-subtitle">精选潮汕道地药材，传承古法制作工艺</text>
        </view>
        
        <view class="featured-grid">
          <view 
            class="featured-item" 
            v-for="(product, index) in featuredProducts" 
            :key="index"
            @tap="viewProduct(product)"
          >
            <view class="featured-card">
              <image :src="product.image" class="featured-img" mode="aspectFill" />
              <view class="featured-overlay">
                <view class="featured-info">
                  <text class="featured-name">{{ product.name }}</text>
                  <text class="featured-desc">{{ product.description }}</text>
                  <view class="featured-price">
                    <text class="price-text">¥{{ product.price }}</text>
                    <view class="featured-btn">
                      <text class="btn-text">立即购买</text>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 产品分类大图 -->
      <view class="category-section">
        <view class="section-header">
          <view class="title-decoration">
            <view class="title-line"></view>
            <text class="section-title">分类精品</text>
            <view class="title-line"></view>
          </view>
          <text class="section-subtitle">按传统分类，各具功效</text>
        </view>
        <view class="category-grid">
          <view 
            class="category-item" 
            v-for="(category, index) in productCategories" 
            :key="index"
            @tap="navigateToCategory(category)"
          >
            <view class="category-card">
              <image :src="category.image" class="category-img" mode="aspectFill" />
              <view class="category-overlay">
                <text class="category-name">{{ category.name }}</text>
                <text class="category-desc">{{ category.description }}</text>
                <text class="category-count">{{ category.count }}款产品</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 全部产品大图瀑布流 -->
      <view class="products-section">
        <view class="section-header">
          <text class="section-title">全部产品</text>
          <view class="view-all" @tap="navigateToMenu">
            <text class="view-all-text">查看全部</text>
            <text class="arrow-icon">→</text>
          </view>
        </view>
        
        <view class="products-grid">
          <view 
            class="product-large-item" 
            v-for="(product, index) in allProducts" 
            :key="index"
            @tap="viewProduct(product)"
          >
            <view class="product-large-card">
              <image :src="product.image" class="product-large-img" mode="aspectFill" />
              <view class="product-large-info">
                <text class="product-large-name">{{ product.name }}</text>
                <view class="product-large-footer">
                  <text class="product-large-price">¥{{ product.price }}</text>
                  <view class="add-large-btn">
                    <text class="add-symbol">+</text>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 底部安全区域 -->
      <view class="safe-area-bottom"></view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 主视觉轮播大图
const heroBanners = ref([
  {
    image: '/static/product/新会陈皮红瓶.jpg',
    title: '新会陈皮',
    subtitle: '百年传承工艺，药食同源精品'
  },
  {
    image: '/static/product/佛手老香黄300.jpg',
    title: '佛手老香黄',
    subtitle: '古法制作，开胃健脾良品'
  },
  {
    image: '/static/product/黄皮鼓500g.jpg',
    title: '黄皮鼓',
    subtitle: '清热解毒，生津止渴佳品'
  },
  {
    image: '/static/product/桑葚酒.jpg',
    title: '桑葚酒',
    subtitle: '养血滋阴，润燥通便'
  }
])

// 精选产品大图展示
const featuredProducts = ref([
  {
    id: 1,
    name: '新会陈皮红瓶',
    description: '百年传承，药食同源',
    price: 128,
    image: '/static/product/新会陈皮红瓶.jpg'
  },
  {
    id: 2,
    name: '佛手老香黄',
    description: '古法制作，开胃健脾',
    price: 68,
    image: '/static/product/佛手老香黄300.jpg'
  },
  {
    id: 3,
    name: '黄皮鼓500g',
    description: '清热解毒，生津止渴',
    price: 52,
    image: '/static/product/黄皮鼓500g.jpg'
  },
  {
    id: 4,
    name: '桑葚酒',
    description: '养血滋阴，润燥通便',
    price: 188,
    image: '/static/product/桑葚酒.jpg'
  },
  {
    id: 5,
    name: '虎头蜂酒',
    description: '珍贵滋补，强身健体',
    price: 298,
    image: '/static/product/虎头蜂酒.jpg'
  },
  {
    id: 6,
    name: '川贝老陈皮',
    description: '止咳化痰，润肺清燥',
    price: 138,
    image: '/static/product/川贝老陈皮.jpg'
  }
])

// 产品分类大图
const productCategories = ref([
  {
    name: '陈皮类',
    count: 8,
    image: '/static/product/新会陈皮红瓶.jpg',
    id: 'chenpi',
    description: '百年传承，药食同源'
  },
  {
    name: '佛手类',
    count: 6,
    image: '/static/product/佛手老香黄300.jpg',
    id: 'foshou',
    description: '古法制作，开胃健脾'
  },
  {
    name: '果脯类',
    count: 15,
    image: '/static/product/黄皮鼓.jpg',
    id: 'guopu',
    description: '天然果味，健康零食'
  },
  {
    name: '酒类',
    count: 5,
    image: '/static/product/虎头蜂酒.jpg',
    id: 'wine',
    description: '滋补养生，传统酿造'
  },
  {
    name: '蜜饯类',
    count: 10,
    image: '/static/product/秘制话梅.jpg',
    id: 'mijian',
    description: '酸甜可口，开胃生津'
  },
  {
    name: '药膳类',
    count: 6,
    image: '/static/product/冰糖枇杷膏.jpg',
    id: 'yaoshan',
    description: '药食同源，养生保健'
  }
])

// 全部产品
const allProducts = ref([
  {
    id: 1,
    name: '新会陈皮红瓶',
    price: 128,
    image: '/static/product/新会陈皮红瓶.jpg'
  },
  {
    id: 2,
    name: '新会陈皮黄瓶',
    price: 118,
    image: '/static/product/新会陈皮黄瓶.jpg'
  },
  {
    id: 3,
    name: '佛手老香黄300g',
    price: 68,
    image: '/static/product/佛手老香黄300.jpg'
  },
  {
    id: 4,
    name: '佛手老香黄',
    price: 88,
    image: '/static/product/佛手老香黄.jpg'
  },
  {
    id: 5,
    name: '黄皮鼓500g',
    price: 52,
    image: '/static/product/黄皮鼓500g.jpg'
  },
  {
    id: 6,
    name: '黄皮鼓250g',
    price: 28,
    image: '/static/product/黄皮鼓250g.jpg'
  },
  {
    id: 7,
    name: '黄皮鼓',
    price: 48,
    image: '/static/product/黄皮鼓.jpg'
  },
  {
    id: 8,
    name: '桑葚酒',
    price: 188,
    image: '/static/product/桑葚酒.jpg'
  },
  {
    id: 9,
    name: '虎头蜂酒',
    price: 298,
    image: '/static/product/虎头蜂酒.jpg'
  },
  {
    id: 10,
    name: '杨梅酒',
    price: 128,
    image: '/static/product/杨梅酒.jpg'
  },
  {
    id: 11,
    name: '香黄陈皮',
    price: 58,
    image: '/static/product/香黄陈皮.jpg'
  },
  {
    id: 12,
    name: '老香黄粒',
    price: 65,
    image: '/static/product/老香黄粒.jpg'
  },
  {
    id: 13,
    name: '香黄橄榄',
    price: 36,
    image: '/static/product/香黄橄榄.jpg'
  },
  {
    id: 14,
    name: '丁香橄榄',
    price: 39,
    image: '/static/product/丁香橄榄.jpg'
  },
  {
    id: 15,
    name: '新享老菜脯',
    price: 78,
    image: '/static/product/新享老菜脯.jpg'
  },
  {
    id: 16,
    name: '新亨老菜脯',
    price: 75,
    image: '/static/product/新亨老菜脯1.jpg'
  },
  {
    id: 17,
    name: '皱堂仙埔鸟梨脯',
    price: 68,
    image: '/static/product/皱堂仙埔鸟梨脯.jpg'
  },
  {
    id: 18,
    name: '老香椽',
    price: 55,
    image: '/static/product/老香椽.jpg'
  },
  {
    id: 19,
    name: '冰糖枇杷膏',
    price: 55,
    image: '/static/product/冰糖枇杷膏.jpg'
  },
  {
    id: 20,
    name: '枇杷膏',
    price: 45,
    image: '/static/product/枇杷膏.jpg'
  },
  {
    id: 21,
    name: '红糖佛手粒',
    price: 48,
    image: '/static/product/红糖佛手粒.jpg'
  },
  {
    id: 22,
    name: '陈皮',
    price: 88,
    image: '/static/product/陈皮.jpg'
  },
  {
    id: 23,
    name: '竹盐黄皮干',
    price: 35,
    image: '/static/product/竹盐黄皮干.jpg'
  },
  {
    id: 24,
    name: '竹盐枇杷干',
    price: 38,
    image: '/static/product/竹盐枇杷干.jpg'
  },
  {
    id: 25,
    name: '柠檬',
    price: 25,
    image: '/static/product/柠檬.jpg'
  },
  {
    id: 26,
    name: '陈皮葡萄梅',
    price: 38,
    image: '/static/product/陈皮葡萄梅.jpg'
  },
  {
    id: 27,
    name: '川贝老陈皮',
    price: 138,
    image: '/static/product/川贝老陈皮.jpg'
  },
  {
    id: 28,
    name: '黑糖陈醋老陈皮',
    price: 128,
    image: '/static/product/黑糖陈醋老陈皮.jpg'
  },
  {
    id: 29,
    name: '红糖姜片',
    price: 42,
    image: '/static/product/红糖姜片.jpg'
  },
  {
    id: 30,
    name: '秘制话梅',
    price: 25,
    image: '/static/product/秘制话梅.jpg'
  },
  {
    id: 31,
    name: '红糖陈醋姜片',
    price: 45,
    image: '/static/product/红糖陈醋姜片.jpg'
  },
  {
    id: 32,
    name: '盐津药桔',
    price: 42,
    image: '/static/product/盐津药桔.jpg'
  },
  {
    id: 33,
    name: '甘草黄皮',
    price: 32,
    image: '/static/product/甘草黄皮.jpg'
  },
  {
    id: 34,
    name: '老药桔',
    price: 58,
    image: '/static/product/老药桔.jpg'
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
/* 现代大气首页设计 */
.homepage {
  min-height: 100vh;
  background: var(--bg-primary);
}

/* 顶部导航 */
.top-header {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%);
  backdrop-filter: blur(20rpx);
  padding: 0 32rpx;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
  box-shadow: 0 8rpx 32rpx rgba(212, 165, 116, 0.2);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 88rpx;
}

.brand-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.brand-name {
  font-size: 42rpx;
  font-weight: 900;
  color: #FFFFFF;
  letter-spacing: 4rpx;
  margin-bottom: 4rpx;
  text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.15);
}

.brand-subtitle {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.95);
  letter-spacing: 3rpx;
  font-weight: 500;
}

.search-btn {
  width: 64rpx;
  height: 64rpx;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  backdrop-filter: blur(10rpx);
  border: 1rpx solid rgba(255, 255, 255, 0.3);
}

.search-btn:active {
  transform: scale(0.95);
  background: rgba(255, 255, 255, 0.3);
}

.search-icon {
  font-size: 26rpx;
  color: var(--bg-primary);
}

/* 主滚动区域 */
.main-scroll {
  padding-top: calc(88rpx + constant(safe-area-inset-top));
  padding-top: calc(88rpx + env(safe-area-inset-top));
  height: 100vh;
  background: #ffffff;
}

/* 主视觉大图轮播 */
.hero-section {
  margin-bottom: 0;
}

.hero-swiper {
  height: 600rpx;
}

.hero-slide {
  position: relative;
  height: 100%;
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  padding: 60rpx 40rpx 40rpx;
}

.hero-content {
  color: white;
}

.hero-title {
  font-size: 48rpx;
  font-weight: 800;
  margin-bottom: 16rpx;
  display: block;
  line-height: 1.2;
  text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  font-size: 30rpx;
  opacity: 0.9;
  margin-bottom: 40rpx;
  display: block;
  line-height: 1.4;
  text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.3);
}

.cta-button {
  display: inline-block;
  background: #ffffff;
  color: #333333;
  padding: 24rpx 48rpx;
  border-radius: 40rpx;
  font-weight: 600;
  transition: all 0.2s ease;
  box-shadow: 0 8rpx 20rpx rgba(255, 255, 255, 0.3);
}

.cta-button:active {
  transform: scale(0.95);
  background: #f5f5f5;
}

.cta-text {
  font-size: 30rpx;
}

/* 现代文化区域 */
.heritage-section {
  position: relative;
  padding: 0;
  overflow: hidden;
}

.heritage-bg {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 50%, var(--primary-light) 100%);
  position: relative;
}

.heritage-bg::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  opacity: 0.6;
}

.heritage-content {
  position: relative;
  z-index: 1;
  padding: 100rpx 32rpx;
  text-align: center;
}

.heritage-header {
  margin-bottom: 80rpx;
}

.heritage-title {
  font-size: 56rpx;
  font-weight: 900;
  color: #FFFFFF;
  margin-bottom: 24rpx;
  display: block;
  letter-spacing: 6rpx;
  text-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.2);
  line-height: 1.2;
}

.heritage-subtitle {
  font-size: 32rpx;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 24rpx;
  display: block;
  line-height: 1.5;
  letter-spacing: 3rpx;
  text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.15);
  font-weight: 500;
}

.heritage-features {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40rpx;
  margin-top: 60rpx;
}

.heritage-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40rpx 24rpx;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 24rpx;
  backdrop-filter: blur(15rpx);
  border: 1rpx solid rgba(255, 255, 255, 0.25);
  transition: all 0.3s ease;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.15);
}

.heritage-item:active {
  transform: translateY(-8rpx) scale(0.98);
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 12rpx 32rpx rgba(0, 0, 0, 0.2);
}

.heritage-icon-box {
  width: 80rpx;
  height: 80rpx;
  background: var(--heritage-gold);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20rpx;
  box-shadow: 0 4rpx 12rpx rgba(255, 215, 0, 0.3);
}

.heritage-icon {
  font-size: 40rpx;
  filter: drop-shadow(1rpx 1rpx 2rpx rgba(0, 0, 0, 0.3));
}

.heritage-text {
  font-size: 28rpx;
  font-weight: 700;
  color: var(--heritage-gold);
  margin-bottom: 8rpx;
  letter-spacing: 2rpx;
  text-shadow: 1rpx 1rpx 2rpx rgba(0, 0, 0, 0.3);
}

.heritage-desc {
  font-size: 22rpx;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  line-height: 1.4;
  letter-spacing: 1rpx;
  text-shadow: 1rpx 1rpx 2rpx rgba(0, 0, 0, 0.3);
}

/* 精选产品大图展示 */
.featured-section {
  padding: 80rpx 24rpx;
  background: var(--bg-secondary);
}

.section-header {
  text-align: center;
  margin-bottom: 60rpx;
}

.title-decoration {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20rpx;
  gap: 24rpx;
}

.title-line {
  width: 60rpx;
  height: 3rpx;
  background: linear-gradient(90deg, var(--accent-color) 0%, var(--heritage-gold) 100%);
  border-radius: 2rpx;
}

.section-title {
  font-size: 48rpx;
  font-weight: 900;
  color: var(--text-primary);
  letter-spacing: 4rpx;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -8rpx;
  left: 50%;
  transform: translateX(-50%);
  width: 40rpx;
  height: 4rpx;
  background: var(--heritage-gold);
  border-radius: 2rpx;
}

.section-subtitle {
  font-size: 30rpx;
  color: var(--text-secondary);
  font-weight: 400;
  letter-spacing: 2rpx;
  line-height: 1.5;
}

.featured-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24rpx;
  margin-top: 32rpx;
}

.featured-item {
  transition: transform 0.3s ease;
}

.featured-item:active {
  transform: scale(0.98);
}

.featured-card {
  position: relative;
  border-radius: 24rpx;
  overflow: hidden;
  box-shadow: 0 12rpx 32rpx rgba(0, 0, 0, 0.12);
  background: #ffffff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.featured-card:hover {
  transform: translateY(-8rpx);
  box-shadow: 0 16rpx 40rpx rgba(0, 0, 0, 0.16);
}

.featured-img {
  width: 100%;
  height: 400rpx;
  object-fit: cover;
}

.featured-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 40rpx 24rpx 24rpx;
}

.featured-info {
  color: white;
}

.featured-name {
  font-size: 32rpx;
  font-weight: 700;
  margin-bottom: 8rpx;
  display: block;
  text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.5);
}

.featured-desc {
  font-size: 24rpx;
  opacity: 0.9;
  margin-bottom: 20rpx;
  display: block;
  text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.5);
}

.featured-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price-text {
  font-size: 32rpx;
  font-weight: 800;
  color: #ffeb3b;
  text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.5);
}

.featured-btn {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10rpx);
  padding: 12rpx 24rpx;
  border-radius: 20rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.3);
}

.btn-text {
  font-size: 24rpx;
  color: white;
  font-weight: 600;
}

/* 产品分类大图 */
.category-section {
  padding: 80rpx 24rpx;
  background: linear-gradient(135deg, var(--bg-tertiary) 0%, var(--bg-secondary) 100%);
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24rpx;
  margin-top: 32rpx;
}

.category-item {
  transition: all 0.3s ease;
}

.category-item:active {
  transform: scale(0.98);
}

.category-card {
  position: relative;
  border-radius: 24rpx;
  overflow: hidden;
  box-shadow: 0 12rpx 32rpx rgba(0, 0, 0, 0.12);
  background: #ffffff;
}

.category-img {
  width: 100%;
  height: 220rpx;
  object-fit: cover;
}

.category-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 40rpx 20rpx 20rpx;
  text-align: center;
}

.category-name {
  font-size: 30rpx;
  font-weight: 700;
  color: white;
  margin-bottom: 6rpx;
  display: block;
  text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.5);
}

.category-desc {
  font-size: 20rpx;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 4rpx;
  display: block;
  text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.5);
}

.category-count {
  font-size: 20rpx;
  color: rgba(255, 255, 255, 0.8);
  text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.5);
}

/* 全部产品大图瀑布流 */
.products-section {
  padding: 60rpx 24rpx;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
}

.view-all {
  display: flex;
  align-items: center;
  gap: 8rpx;
  padding: 12rpx 24rpx;
  background: #f5f5f5;
  border-radius: 20rpx;
  transition: all 0.2s ease;
}

.view-all:active {
  transform: scale(0.95);
  background: #f0f0f0;
}

.view-all-text {
  font-size: 26rpx;
  color: #666666;
  font-weight: 500;
}

.arrow-icon {
  font-size: 24rpx;
  color: #999999;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24rpx;
  margin-top: 32rpx;
}

.product-large-item {
  transition: transform 0.3s ease;
}

.product-large-item:active {
  transform: scale(0.98);
}

.product-large-card {
  background: #ffffff;
  border-radius: 24rpx;
  overflow: hidden;
  box-shadow: 0 12rpx 32rpx rgba(0, 0, 0, 0.12);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-large-card:hover {
  transform: translateY(-6rpx);
  box-shadow: 0 16rpx 40rpx rgba(0, 0, 0, 0.16);
}

.product-large-img {
  width: 100%;
  height: 300rpx;
  object-fit: cover;
}

.product-large-info {
  padding: 24rpx;
}

.product-large-name {
  font-size: 28rpx;
  font-weight: 600;
  color: #333333;
  margin-bottom: 16rpx;
  line-height: 1.3;
  height: auto;
}

.product-large-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-large-price {
  font-size: 32rpx;
  font-weight: 700;
  color: #ff6b35;
}

.add-large-btn {
  width: 56rpx;
  height: 56rpx;
  background: #ff6b35;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  box-shadow: 0 4rpx 12rpx rgba(255, 107, 53, 0.3);
}

.add-large-btn:active {
  transform: scale(0.9);
  background: #ff5722;
}

.add-symbol {
  font-size: 28rpx;
  font-weight: 600;
  color: #ffffff;
  line-height: 1;
}

.safe-area-bottom {
  height: constant(safe-area-inset-bottom);
  height: env(safe-area-inset-bottom);
  min-height: 60rpx;
  background: #ffffff;
}
</style>