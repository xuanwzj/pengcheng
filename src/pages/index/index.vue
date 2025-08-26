<template>
  <view class="homepage">
    <!-- 沉浸式顶部大图区域 -->
    <view class="hero-banner">
      <image src="/static/product/新会陈皮红瓶.jpg" class="hero-bg-image" mode="aspectFill" />
      <view class="hero-overlay">
        <!-- 顶部导航条 -->
        <view class="top-nav">
          <view class="nav-left">
            <text class="brand-logo">潮汕传承</text>
          </view>
          <view class="nav-right">
            <view class="nav-btn" @tap="navigateToSearch">
              <text class="nav-icon">🔍</text>
            </view>
            <view class="nav-btn">
              <text class="nav-icon">👤</text>
            </view>
          </view>
        </view>
        
        <!-- 主标题区域 -->
        <view class="hero-content">
          <text class="hero-main-title">道地药材</text>
          <text class="hero-subtitle">传承千年养生智慧</text>
          <text class="hero-description">精选潮汕本地优质药材，古法工艺现代传承</text>
          <view class="hero-actions">
            <view class="primary-btn" @tap="navigateToMenu">
              <text class="btn-text">立即选购</text>
            </view>
            <view class="secondary-btn">
              <text class="btn-text">了解更多</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 主内容区域 -->
    <scroll-view class="main-scroll" scroll-y>
      <!-- 产品轮播大图 -->
      <view class="product-carousel-section">
        <swiper class="product-swiper" autoplay circular indicator-dots indicator-color="rgba(0,0,0,0.3)" indicator-active-color="var(--primary-color)">
          <swiper-item v-for="(product, index) in featuredCarousel" :key="index">
            <view class="carousel-slide" @tap="viewProduct(product)">
              <image :src="product.image" class="carousel-image" mode="aspectFill" />
              <view class="carousel-content">
                <view class="product-badge">{{ product.badge }}</view>
                <text class="product-carousel-name">{{ product.name }}</text>
                <text class="product-carousel-desc">{{ product.description }}</text>
                <view class="product-carousel-price">
                  <text class="price-symbol">¥</text>
                  <text class="price-value">{{ product.price }}</text>
                </view>
              </view>
            </view>
          </swiper-item>
        </swiper>
      </view>

      <!-- 快速导航卡片 -->
      <view class="quick-nav-section">
        <view class="nav-grid">
          <view 
            class="nav-card" 
            v-for="(nav, index) in quickNavs" 
            :key="index"
            @tap="navigateToCategory(nav)"
          >
            <view class="nav-image-container">
              <image :src="nav.image" class="nav-image" mode="aspectFill" />
            </view>
            <text class="nav-title">{{ nav.title }}</text>
            <text class="nav-subtitle">{{ nav.subtitle }}</text>
          </view>
        </view>
      </view>

      <!-- 精选推荐大卡片 -->
      <view class="featured-products-section">
        <view class="section-title-bar">
          <text class="section-main-title">精选推荐</text>
          <view class="title-more" @tap="navigateToMenu">
            <text class="more-text">查看全部</text>
            <text class="more-arrow">→</text>
          </view>
        </view>
        
        <view class="featured-cards">
          <view 
            class="featured-large-card" 
            v-for="(product, index) in featuredProducts.slice(0, 2)" 
            :key="index"
            @tap="viewProduct(product)"
          >
            <image :src="product.image" class="featured-card-image" mode="aspectFill" />
            <view class="featured-card-content">
              <view class="card-header">
                <text class="featured-card-name">{{ product.name }}</text>
                <text class="featured-card-price">¥{{ product.price }}</text>
              </view>
              <text class="featured-card-desc">{{ product.description }}</text>
              <view class="card-actions">
                <view class="add-to-cart-btn">
                  <text class="cart-btn-text">加入购物车</text>
                </view>
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

      <!-- 全部产品紧凑卡片 -->
      <view class="products-section">
        <view class="section-title-bar">
          <text class="section-main-title">热销产品</text>
          <view class="title-more" @tap="navigateToMenu">
            <text class="more-text">查看全部</text>
            <text class="more-arrow">→</text>
          </view>
        </view>
        
        <view class="products-compact-grid">
          <view 
            class="product-compact-item" 
            v-for="(product, index) in allProducts.slice(0, 6)" 
            :key="index"
            @tap="viewProduct(product)"
          >
            <view class="compact-card">
              <image :src="product.image" class="compact-image" mode="aspectFill" />
              <view class="compact-overlay">
                <view class="compact-content">
                  <text class="compact-name">{{ product.name }}</text>
                  <view class="compact-footer">
                    <text class="compact-price">¥{{ product.price }}</text>
                    <view class="compact-add-btn">
                      <text class="compact-add-text">购买</text>
                    </view>
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

// 产品轮播数据
const featuredCarousel = ref([
  {
    id: 1,
    name: '新会陈皮红瓶',
    description: '正宗新会陈皮，理气健脾',
    price: 128,
    image: '/static/product/新会陈皮红瓶.jpg',
    badge: '人气王'
  },
  {
    id: 2,
    name: '虎头蜂酒',
    description: '珍贵滋补，强身健体',
    price: 298,
    image: '/static/product/虎头蜂酒.jpg',
    badge: '限量版'
  },
  {
    id: 3,
    name: '川贝老陈皮',
    description: '止咳化痰，润肺清燥',
    price: 138,
    image: '/static/product/川贝老陈皮.jpg',
    badge: '新品'
  }
])

// 快速导航数据
const quickNavs = ref([
  {
    title: '陈皮系列',
    subtitle: '理气健脾',
    image: '/static/product/新会陈皮黄瓶.jpg',
    id: 'chenpi'
  },
  {
    title: '佛手系列',
    subtitle: '开胃消食',
    image: '/static/product/佛手老香黄.jpg',
    id: 'foshou'
  },
  {
    title: '果脯蜜饯',
    subtitle: '酸甜可口',
    image: '/static/product/黄皮鼓.jpg',
    id: 'guopu'
  },
  {
    title: '药膳酒类',
    subtitle: '滋补养生',
    image: '/static/product/桑葚酒.jpg',
    id: 'wine'
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
/* 现代沉浸式首页设计 */
.homepage {
  min-height: 100vh;
  background: var(--bg-primary);
}

/* 沉浸式顶部大图区域 */
.hero-banner {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.hero-bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6));
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
  padding-left: 32rpx;
  padding-right: 32rpx;
  padding-bottom: 80rpx;
}

/* 顶部导航条 */
.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 32rpx;
  z-index: 10;
  min-height: 88rpx;
}

.brand-logo {
  font-size: 42rpx;
  font-weight: 900;
  color: #FFFFFF;
  text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.5);
  letter-spacing: 3rpx;
}

.nav-right {
  display: flex;
  gap: 20rpx;
}

.nav-btn {
  width: 72rpx;
  height: 72rpx;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10rpx);
  border: 1rpx solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.nav-btn:active {
  transform: scale(0.9);
  background: rgba(255, 255, 255, 0.3);
}

.nav-icon {
  font-size: 32rpx;
  color: #FFFFFF;
}

/* 主标题区域 */
.hero-content {
  text-align: center;
  color: #FFFFFF;
  padding-bottom: 120rpx;
}

.hero-main-title {
  font-size: 96rpx;
  font-weight: 900;
  color: #FFFFFF;
  display: block;
  margin-bottom: 24rpx;
  text-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.5);
  letter-spacing: 8rpx;
  line-height: 1.1;
}

.hero-subtitle {
  font-size: 42rpx;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  display: block;
  margin-bottom: 20rpx;
  text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.5);
  letter-spacing: 4rpx;
}

.hero-description {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.9);
  display: block;
  margin-bottom: 60rpx;
  line-height: 1.5;
  text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.5);
  max-width: 600rpx;
  margin-left: auto;
  margin-right: auto;
}

.hero-actions {
  display: flex;
  gap: 32rpx;
  justify-content: center;
  align-items: center;
}

.primary-btn {
  background: var(--primary-color);
  padding: 28rpx 56rpx;
  border-radius: 50rpx;
  transition: all 0.3s ease;
  box-shadow: 0 8rpx 24rpx rgba(212, 165, 116, 0.4);
}

.primary-btn:active {
  transform: translateY(2rpx) scale(0.98);
  box-shadow: 0 4rpx 16rpx rgba(212, 165, 116, 0.6);
}

.secondary-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 2rpx solid rgba(255, 255, 255, 0.5);
  padding: 28rpx 56rpx;
  border-radius: 50rpx;
  backdrop-filter: blur(10rpx);
  transition: all 0.3s ease;
}

.secondary-btn:active {
  transform: translateY(2rpx) scale(0.98);
  background: rgba(255, 255, 255, 0.3);
}

.btn-text {
  font-size: 32rpx;
  font-weight: 600;
  color: #FFFFFF;
  text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.3);
}

/* 主滚动区域 */
.main-scroll {
  background: var(--bg-primary);
  margin-top: -120rpx;
  border-radius: 40rpx 40rpx 0 0;
  position: relative;
  z-index: 2;
  box-shadow: 0 -12rpx 32rpx rgba(0, 0, 0, 0.1);
}

/* 产品轮播区域 */
.product-carousel-section {
  padding: 60rpx 0 40rpx;
}

.product-swiper {
  height: 480rpx;
  padding: 0 24rpx;
}

.carousel-slide {
  position: relative;
  border-radius: 32rpx;
  overflow: hidden;
  box-shadow: 0 16rpx 48rpx rgba(0, 0, 0, 0.15);
  height: 100%;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 60rpx 32rpx 32rpx;
  color: #FFFFFF;
}

.product-badge {
  position: absolute;
  top: -40rpx;
  right: 20rpx;
  background: var(--accent-color);
  color: #FFFFFF;
  padding: 8rpx 20rpx;
  border-radius: 20rpx;
  font-size: 22rpx;
  font-weight: 600;
  box-shadow: 0 4rpx 12rpx rgba(230, 126, 34, 0.4);
}

.product-carousel-name {
  font-size: 36rpx;
  font-weight: 700;
  margin-bottom: 12rpx;
  display: block;
  text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.5);
}

.product-carousel-desc {
  font-size: 26rpx;
  opacity: 0.9;
  margin-bottom: 20rpx;
  display: block;
  text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.5);
}

.product-carousel-price {
  display: flex;
  align-items: baseline;
  gap: 4rpx;
}

.price-symbol {
  font-size: 28rpx;
  font-weight: 600;
  color: var(--heritage-gold);
}

.price-value {
  font-size: 42rpx;
  font-weight: 800;
  color: var(--heritage-gold);
  text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.5);
}

/* 快速导航卡片 */
.quick-nav-section {
  padding: 40rpx 32rpx;
}

.nav-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24rpx;
}

.nav-card {
  background: var(--bg-card);
  border-radius: 24rpx;
  padding: 32rpx 24rpx;
  text-align: center;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1rpx solid var(--border-light);
}

.nav-card:active {
  transform: translateY(-4rpx) scale(0.98);
  box-shadow: 0 12rpx 32rpx rgba(0, 0, 0, 0.12);
}

.nav-image-container {
  width: 120rpx;
  height: 120rpx;
  border-radius: 20rpx;
  overflow: hidden;
  margin: 0 auto 20rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);
}

.nav-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.nav-title {
  font-size: 28rpx;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8rpx;
  display: block;
}

.nav-subtitle {
  font-size: 22rpx;
  color: var(--text-secondary);
  font-weight: 500;
}

/* 精选推荐大卡片 */
.featured-products-section {
  padding: 40rpx 32rpx;
}

.section-title-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32rpx;
}

.section-main-title {
  font-size: 40rpx;
  font-weight: 800;
  color: var(--text-primary);
  letter-spacing: 2rpx;
}

.title-more {
  display: flex;
  align-items: center;
  gap: 8rpx;
  padding: 12rpx 20rpx;
  background: var(--bg-secondary);
  border-radius: 20rpx;
  transition: all 0.2s ease;
}

.title-more:active {
  transform: scale(0.95);
  background: var(--bg-hover);
}

.more-text {
  font-size: 24rpx;
  color: var(--text-secondary);
  font-weight: 500;
}

.more-arrow {
  font-size: 22rpx;
  color: var(--primary-color);
  font-weight: 600;
}

.featured-cards {
  display: flex;
  flex-direction: column;
  gap: 32rpx;
}

.featured-large-card {
  background: var(--bg-card);
  border-radius: 28rpx;
  overflow: hidden;
  box-shadow: 0 12rpx 36rpx rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1rpx solid var(--border-light);
}

.featured-large-card:active {
  transform: translateY(-6rpx);
  box-shadow: 0 16rpx 48rpx rgba(0, 0, 0, 0.15);
}

.featured-card-image {
  width: 100%;
  height: 360rpx;
  object-fit: cover;
}

.featured-card-content {
  padding: 32rpx;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16rpx;
}

.featured-card-name {
  font-size: 32rpx;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.3;
  flex: 1;
}

.featured-card-price {
  font-size: 36rpx;
  font-weight: 800;
  color: var(--accent-color);
  margin-left: 16rpx;
}

.featured-card-desc {
  font-size: 26rpx;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 24rpx;
}

.card-actions {
  display: flex;
  justify-content: flex-end;
}

.add-to-cart-btn {
  background: var(--primary-color);
  color: #FFFFFF;
  padding: 20rpx 40rpx;
  border-radius: 24rpx;
  transition: all 0.3s ease;
  box-shadow: 0 6rpx 18rpx rgba(212, 165, 116, 0.3);
}

.add-to-cart-btn:active {
  transform: translateY(2rpx) scale(0.98);
  box-shadow: 0 4rpx 12rpx rgba(212, 165, 116, 0.4);
}

.cart-btn-text {
  font-size: 26rpx;
  font-weight: 600;
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

/* 紧凑产品卡片网格 */
.products-section {
  padding: 40rpx 32rpx;
  background: var(--bg-secondary);
}

.products-compact-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16rpx;
  margin-top: 32rpx;
}

.product-compact-item {
  transition: transform 0.3s ease;
}

.product-compact-item:active {
  transform: scale(0.98);
}

.compact-card {
  position: relative;
  border-radius: 20rpx;
  overflow: hidden;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  aspect-ratio: 1;
}

.compact-card:hover {
  transform: translateY(-4rpx);
  box-shadow: 0 12rpx 32rpx rgba(0, 0, 0, 0.15);
}

.compact-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.compact-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 40rpx 20rpx 20rpx;
}

.compact-content {
  color: #FFFFFF;
}

.compact-name {
  font-size: 26rpx;
  font-weight: 600;
  margin-bottom: 12rpx;
  display: block;
  text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.5);
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.compact-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.compact-price {
  font-size: 28rpx;
  font-weight: 700;
  color: var(--heritage-gold);
  text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.5);
}

.compact-add-btn {
  background: var(--primary-color);
  padding: 8rpx 16rpx;
  border-radius: 16rpx;
  transition: all 0.2s ease;
  box-shadow: 0 4rpx 12rpx rgba(212, 165, 116, 0.4);
}

.compact-add-btn:active {
  transform: scale(0.95);
  background: var(--primary-dark);
}

.compact-add-text {
  font-size: 22rpx;
  font-weight: 600;
  color: #FFFFFF;
}

.safe-area-bottom {
  height: constant(safe-area-inset-bottom);
  height: env(safe-area-inset-bottom);
  min-height: 60rpx;
  background: #ffffff;
}
</style>