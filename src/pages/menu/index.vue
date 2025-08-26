<template>
  <view class="heytea-menu-page">
    <!-- 喜茶式顶部区域 -->
    <view class="top-section">
      <!-- 自定义导航栏 (包含安全区域) -->
      <view class="custom-nav">
        <text class="nav-title">道地特产</text>
      </view>
      
      <!-- 门店信息栏 -->
      <view class="store-info">
        <view class="store-left">
          <text class="service-type">南门蓬城老店</text>
          <text class="divider">|</text>
          <text class="service-type">到店取</text>
        </view>
        <view class="store-right">
          <view class="search-btn" @tap="showSearchModal">
            <text class="search-icon">🔍</text>
          </view>
        </view>
      </view>
      
      <!-- 门店名称 -->
      <view class="store-name">
        <text class="store-title">潮汕传承·道地药材</text>
        <text class="store-distance">传承千年制作工艺</text>
      </view>
      
      <!-- slogan -->
      <view class="store-slogan">
        <text class="slogan-text">authentic chaoshan heritage · traditional wellness</text>
      </view>
    </view>

    <!-- 主要内容区域 - 左右分栏布局 -->
    <view class="main-container">
      <!-- 左侧分类导航 -->
      <view class="left-sidebar">
        <scroll-view class="category-sidebar" scroll-y>
          <view 
            v-for="(category, index) in categories" 
            :key="index"
            :class="['category-item', { active: activeCategory === index }]"
            @tap="selectCategory(index)"
          >
            <text class="category-name">{{ category.name }}</text>
          </view>
        </scroll-view>
      </view>
      
      <!-- 右侧商品列表 -->
      <view class="right-content">
        <!-- 分类标题 -->
        <view class="category-header" v-if="currentCategory">
          <text class="category-title">{{ currentCategory.name }}</text>
        </view>
        
        <!-- 商品列表 -->
        <scroll-view class="product-list" scroll-y>
          <view 
            class="product-item" 
            v-for="(product, index) in filteredProducts" 
            :key="index"
            @tap="viewProduct(product)"
          >
            <!-- 商品图片 -->
            <view class="product-image-container">
              <image :src="product.image" class="product-image" mode="aspectFill" />
              <!-- 新品标签 -->
              <view class="new-badge" v-if="product.isNew">
                <text class="badge-text">上新</text>
              </view>
            </view>
            
            <!-- 商品信息 -->
            <view class="product-content">
              <view class="product-header">
                <text class="product-name">{{ product.name }}</text>
                <!-- 商品标签 -->
                <view class="product-tags" v-if="product.tags">
                  <view 
                    class="product-tag" 
                    v-for="tag in product.tags" 
                    :key="tag"
                  >
                    <text class="tag-text">{{ tag }}</text>
                  </view>
                </view>
              </view>
              
              <text class="product-desc">{{ product.description }}</text>
              
              <!-- 价格和规格 -->
              <view class="product-footer">
                <text class="product-price">¥{{ product.price }}</text>
                <view class="spec-button">
                  <text class="spec-text">选规格</text>
                </view>
              </view>
            </view>
          </view>
          
          <!-- 推荐区域 -->
          <view class="recommend-section" v-if="activeCategory === 0">
            <view class="recommend-header">
              <text class="recommend-title">人气推荐榜</text>
            </view>
            <view 
              class="recommend-item" 
              v-for="(item, index) in hotProducts" 
              :key="'hot-' + index"
              @tap="viewProduct(item)"
            >
              <view class="recommend-image-container">
                <image :src="item.image" class="recommend-image" mode="aspectFill" />
              </view>
              <view class="recommend-content">
                <text class="recommend-name">{{ item.name }}</text>
                <view class="recommend-tags">
                  <view 
                    class="recommend-tag" 
                    v-for="tag in item.tags" 
                    :key="tag"
                  >
                    <text class="rec-tag-text">{{ tag }}</text>
                  </view>
                </view>
                <text class="recommend-desc">{{ item.description }}</text>
                <view class="recommend-footer">
                  <text class="recommend-price">¥{{ item.price }}</text>
                  <view class="recommend-spec-btn">
                    <text class="rec-spec-text">选规格</text>
                  </view>
                </view>
              </view>
            </view>
          </view>
          
          <!-- 底部间距 -->
          <view class="bottom-space"></view>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeCategory = ref(0)

// 分类数据
const categories = ref([
  { name: '新品上架', id: 'new' },
  { name: '人气推荐', id: 'hot' },
  { name: '陈皮系列', id: 'chenpi' },
  { name: '佛手系列', id: 'foshou' },
  { name: '果脯蜜饯', id: 'guopu' },
  { name: '药膳酒类', id: 'wine' },
  { name: '传统茶品', id: 'tea' },
  { name: '传统糕点', id: 'pastry' }
])

// 商品数据
const products = ref([
  {
    id: 1,
    name: '新会陈皮红瓶',
    description: '新会正宗陈皮，陈香醇厚，理气健脾，传统工艺制作',
    price: 128,
    sales: 1580,
    image: '/static/product/新会陈皮红瓶.jpg',
    category: 'new',
    isNew: true,
    tags: ['新品', '理气健脾', '药食同源']
  },
  {
    id: 2,
    name: '佛手老香黄300g',
    description: '古法制作佛手柑，咸香回甘，传统经典',
    price: 68,
    sales: 2340,
    image: '/static/product/佛手老香黄300.jpg',
    category: 'new',
    isNew: true,
    tags: ['新装上市', '传统经典', '古法制作']
  },
  {
    id: 3,
    name: '黄皮鼓500g',
    description: '精选潮汕黄皮，酸甜可口，天然美味',
    price: 52,
    sales: 890,
    image: '/static/product/黄皮鼓500g.jpg',
    category: 'guopu',
    tags: ['酸甜可口', '天然美味', '潮汕特产']
  },
  {
    id: 4,
    name: '新会陈皮黄瓶',
    description: '优质新会陈皮，香气清雅，口感纯正',
    price: 118,
    sales: 1120,
    image: '/static/product/新会陈皮黄瓶.jpg',
    category: 'chenpi',
    tags: ['香气清雅', '口感纯正', '新会正宗']
  },
  {
    id: 5,
    name: '桑葚酒',
    description: '精选桑葚酿制，口感甘甜，香气清香',
    price: 188,
    sales: 756,
    image: '/static/product/桑葚酒.jpg',
    category: 'wine',
    tags: ['口感甘甜', '香气清香', '精选桑葚']
  },
  {
    id: 6,
    name: '虎头蜂酒',
    description: '珍贵虎头蜂浸制，传统工艺，口感醇厚',
    price: 298,
    sales: 1890,
    image: '/static/product/虎头蜂酒.jpg',
    category: 'wine',
    tags: ['传统工艺', '口感醇厚', '珍贵食材']
  },
  {
    id: 7,
    name: '川贝老陈皮',
    description: '川贝配陈皮，传统搭配，温润香甜，经典组合',
    price: 138,
    sales: 1345,
    image: '/static/product/川贝老陈皮.jpg',
    category: 'chenpi',
    tags: ['温润香甜', '传统搭配', '经典组合']
  },
  {
    id: 8,
    name: '香黄橄榄',
    description: '潮汕特色橄榄，咸香回甘，天然美味',
    price: 36,
    sales: 876,
    image: '/static/product/香黄橄榄.jpg',
    category: 'guopu',
    tags: ['咸香回甘', '天然美味', '潮汕特色']
  },
  {
    id: 9,
    name: '丁香橄榄',
    description: '丁香调味橄榄，香气浓郁，口感层次丰富',
    price: 39,
    sales: 567,
    image: '/static/product/丁香橄榄.jpg',
    category: 'guopu',
    tags: ['香气浓郁', '层次丰富', '精选橄榄']
  },
  {
    id: 10,
    name: '红糖姜片',
    description: '古法红糖配生姜，甘甜温润，传统制作',
    price: 42,
    sales: 1234,
    image: '/static/product/红糖姜片.jpg',
    category: 'tea',
    tags: ['甘甜温润', '传统制作', '古法配方']
  }
])

// 热门推荐商品
const hotProducts = ref([
  {
    id: 101,
    name: '新会陈皮红瓶',
    description: '新会正宗陈皮，陈香醇厚，理气健脾，传统工艺制作',
    price: 128,
    image: '/static/product/新会陈皮红瓶.jpg',
    tags: ['理气健脾', '药食同源', '人气王']
  },
  {
    id: 102,
    name: '虎头蜂酒',
    description: '珍贵虎头蜂浸制，强身健体，滋补养生，口感醇厚',
    price: 298,
    image: '/static/product/虎头蜂酒.jpg',
    tags: ['强身健体', '滋补养生', '珍贵药材']
  },
  {
    id: 103,
    name: '佛手老香黄300g',
    description: '古法制作佛手柑，咸香回甘，传统经典',
    price: 68,
    image: '/static/product/佛手老香黄300.jpg',
    tags: ['传统经典', '古法制作', '经典口味']
  }
])

// 当前分类
const currentCategory = computed(() => {
  return categories.value[activeCategory.value]
})

// 筛选商品
const filteredProducts = computed(() => {
  if (activeCategory.value === 0) {
    // 时令上新 - 显示新品
    return products.value.filter(product => product.isNew)
  } else if (activeCategory.value === 1) {
    // 人气推荐榜 - 按销量排序
    return products.value.sort((a, b) => b.sales - a.sales)
  } else {
    // 其他分类
    const categoryId = categories.value[activeCategory.value].id
    return products.value.filter(product => product.category === categoryId)
  }
})

// 选择分类
const selectCategory = (index) => {
  activeCategory.value = index
}

// 显示搜索弹窗
const showSearchModal = () => {
  uni.showToast({
    title: '搜索功能开发中',
    icon: 'none'
  })
}

// 查看商品详情
const viewProduct = (product) => {
  uni.showModal({
    title: product.name,
    content: `${product.description}\n\n价格：¥${product.price}`,
    showCancel: false,
    confirmText: '知道了'
  })
}
</script>

<style scoped>
/* 现代暖色调特产页面 */
.heytea-menu-page {
  min-height: 100vh;
  background: var(--bg-primary);
  display: flex;
  flex-direction: column;
  color: var(--text-primary);
}

/* 顶部区域 */
.top-section {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%);
  padding: 0 32rpx;
  color: #FFFFFF;
}

/* 自定义导航栏 (包含安全区域) */
.custom-nav {
  height: 88rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 32rpx;
  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
}

.nav-title {
  font-size: 36rpx;
  font-weight: 800;
  color: #FFFFFF;
  text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.15);
}

/* 门店信息栏 */
.store-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 0;
}

.store-left {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.service-type {
  font-size: 28rpx;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
}

.divider {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.7);
}

.delivery-type {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.8);
}

.store-right {
  display: flex;
  gap: 20rpx;
}

.search-btn {
  width: 56rpx;
  height: 56rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-icon {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.9);
}

/* 门店名称 */
.store-name {
  margin: 16rpx 0;
}

.store-title {
  font-size: 36rpx;
  font-weight: 700;
  color: #FFFFFF;
  display: block;
  margin-bottom: 8rpx;
  text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.15);
}

.store-distance {
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.9);
  display: block;
}

/* slogan */
.store-slogan {
  padding: 16rpx 0 24rpx;
}

.slogan-text {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.85);
  font-style: italic;
  font-weight: 500;
  letter-spacing: 1rpx;
}

/* 主要内容区域 */
.main-container {
  flex: 1;
  display: flex;
  background: var(--bg-primary);
  border-radius: 32rpx 32rpx 0 0;
  overflow: hidden;
  margin-top: 16rpx;
  box-shadow: 0 -8rpx 32rpx rgba(0, 0, 0, 0.1);
}

/* 左侧分类导航 */
.left-sidebar {
  width: 200rpx;
  background: var(--bg-secondary);
  border-right: 1rpx solid var(--border-light);
}

.category-sidebar {
  height: calc(100vh - 300rpx);
}

.category-item {
  position: relative;
  padding: 32rpx 24rpx;
  background: var(--bg-secondary);
  border-bottom: 1rpx solid var(--border-light);
  transition: all 0.3s ease;
}

.category-item.active {
  background: var(--bg-primary);
  border-right: 4rpx solid var(--primary-color);
  box-shadow: 2rpx 0 8rpx rgba(212, 165, 116, 0.15);
}

.category-item:active {
  background: var(--bg-hover);
}

.category-name {
  font-size: 26rpx;
  color: var(--text-secondary);
  font-weight: 500;
  text-align: center;
  line-height: 1.4;
  word-break: break-all;
}

.category-item.active .category-name {
  color: var(--primary-color);
  font-weight: 700;
}



/* 右侧内容区域 */
.right-content {
  flex: 1;
  background: white;
}

/* 分类标题 */
.category-header {
  padding: 24rpx 32rpx;
  background: white;
  border-bottom: 1rpx solid #f5f2e9;
  position: sticky;
  top: 0;
  z-index: 10;
}

.category-title {
  font-size: 32rpx;
  font-weight: 700;
  color: #333;
}

/* 商品列表 */
.product-list {
  height: calc(100vh - 350rpx);
  background: white;
}

.product-item {
  display: flex;
  padding: 32rpx;
  border-bottom: 1rpx solid #f0f0f0;
  transition: background-color 0.2s ease;
}

.product-item:active {
  background-color: #f8f9fa;
}

/* 商品图片 */
.product-image-container {
  position: relative;
  width: 160rpx;
  height: 160rpx;
  border-radius: 16rpx;
  overflow: hidden;
  margin-right: 24rpx;
  flex-shrink: 0;
}

.product-image {
  width: 100%;
  height: 100%;
}

.new-badge {
  position: absolute;
  top: 8rpx;
  left: 8rpx;
  background: linear-gradient(135deg, #4ade80 0%, #16a34a 100%);
  color: white;
  padding: 4rpx 12rpx;
  border-radius: 12rpx;
}

.badge-text {
  font-size: 20rpx;
  font-weight: 600;
}

/* 商品信息 */
.product-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-header {
  margin-bottom: 12rpx;
}

.product-name {
  font-size: 28rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 12rpx;
  line-height: 1.4;
  display: block;
}

.product-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8rpx;
}

.product-tag {
  background: #f0f0f0;
  border-radius: 12rpx;
  padding: 4rpx 8rpx;
}

.tag-text {
  font-size: 20rpx;
  color: #666;
}

.product-desc {
  font-size: 24rpx;
  color: #666;
  line-height: 1.5;
  margin-bottom: 16rpx;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-price {
  font-size: 32rpx;
  font-weight: 700;
  color: var(--accent-color);
}

.spec-button {
  background: var(--primary-color);
  color: white;
  padding: 12rpx 24rpx;
  border-radius: 24rpx;
  font-size: 24rpx;
  font-weight: 500;
  transition: all 0.2s ease;
  box-shadow: 0 4rpx 12rpx rgba(212, 165, 116, 0.3);
}

.spec-button:active {
  transform: scale(0.95);
  background: var(--primary-dark);
}

.spec-text {
  font-size: 24rpx;
}

/* 推荐区域 */
.recommend-section {
  padding: 32rpx;
  background: var(--bg-tertiary);
  margin-top: 20rpx;
  border-radius: 24rpx;
  margin: 20rpx;
}

.recommend-header {
  margin-bottom: 24rpx;
}

.recommend-title {
  font-size: 32rpx;
  font-weight: 700;
  color: #333;
}

.recommend-item {
  display: flex;
  padding: 24rpx;
  background: white;
  border-radius: 16rpx;
  margin-bottom: 16rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
}

.recommend-image-container {
  width: 120rpx;
  height: 120rpx;
  border-radius: 12rpx;
  overflow: hidden;
  margin-right: 20rpx;
  flex-shrink: 0;
}

.recommend-image {
  width: 100%;
  height: 100%;
}

.recommend-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.recommend-name {
  font-size: 26rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 8rpx;
}

.recommend-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6rpx;
  margin-bottom: 8rpx;
}

.recommend-tag {
  background: #f0f0f0;
  border-radius: 8rpx;
  padding: 2rpx 6rpx;
}

.rec-tag-text {
  font-size: 18rpx;
  color: #666;
}

.recommend-desc {
  font-size: 22rpx;
  color: #666;
  line-height: 1.4;
  margin-bottom: 12rpx;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.recommend-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.recommend-price {
  font-size: 28rpx;
  font-weight: 700;
  color: var(--accent-color);
}

.recommend-spec-btn {
  background: var(--primary-color);
  color: white;
  padding: 8rpx 16rpx;
  border-radius: 16rpx;
  transition: all 0.2s ease;
}

.recommend-spec-btn:active {
  transform: scale(0.95);
  background: var(--primary-dark);
}

.rec-spec-text {
  font-size: 20rpx;
}

.bottom-space {
  height: constant(safe-area-inset-bottom);
  height: env(safe-area-inset-bottom);
  min-height: 120rpx;
}
</style>