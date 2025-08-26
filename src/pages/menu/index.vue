<template>
  <view class="heytea-menu-page">
    <!-- 喜茶式顶部区域 -->
    <view class="top-section">
      <!-- 状态栏占位 -->
      <view class="status-bar"></view>
      
      <!-- 门店信息栏 -->
      <view class="store-info">
        <view class="store-left">
          <text class="service-type">到店取</text>
          <text class="divider">|</text>
          <text class="delivery-type">喜外送</text>
        </view>
        <view class="store-right">
          <view class="search-btn" @tap="showSearchModal">
            <text class="search-icon">🔍</text>
          </view>
        </view>
      </view>
      
      <!-- 门店名称 -->
      <view class="store-name">
        <text class="store-title">潮汕特产店</text>
        <text class="store-distance">距离您0.5km</text>
      </view>
      
      <!-- slogan -->
      <view class="store-slogan">
        <text class="slogan-text">authentic chaoshan products, by tradition</text>
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
            <view class="category-indicator" v-if="activeCategory === index"></view>
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
  { name: '时令上新', id: 'new' },
  { name: '人气推荐榜', id: 'hot' },
  { name: '超级植物茶', id: 'plant-tea' },
  { name: '鲜果茶', id: 'fruit-tea' },
  { name: '千百抹茶', id: 'matcha' },
  { name: '灵感茗茶', id: 'inspiration-tea' },
  { name: '波波牛乳茶', id: 'milk-tea' },
  { name: '灵感茶点', id: 'tea-snacks' }
])

// 商品数据
const products = ref([
  {
    id: 1,
    name: '芭乐雪霸茶王',
    description: '时令白芭乐+九窨雪霸茶王+芭乐云顶，芭乐灵感茶特调',
    price: 21,
    sales: 1580,
    image: '/static/sw1.jpg',
    category: 'new',
    isNew: true,
    tags: ['咖啡因黄灯', '含乳制品、茶']
  },
  {
    id: 2,
    name: '网纹瓜瓜冰浆',
    description: '当季牛三网纹瓜+新鲜小青瓜+茶园灿糯米，网纹瓜一藤一个喝足了',
    price: 22,
    sales: 2340,
    image: '/static/sw2.jpg',
    category: 'new',
    isNew: true,
    tags: ['上新', '0咖啡因', '不含茶']
  },
  {
    id: 3,
    name: '马黛活力纤体冰',
    description: '南美马黛茶+蜂蜜雪衣残羽花甘蓝+薄荷，纤体瓶夏日版，温和醒神',
    price: 22,
    sales: 890,
    image: '/static/sw1.jpg',
    category: 'plant-tea',
    tags: ['咖啡因绿灯', '含马黛茶']
  },
  {
    id: 4,
    name: '新会老陈皮',
    description: '陈香醇厚，理气健脾，传统工艺制作',
    price: 128,
    sales: 1120,
    image: '/static/sw2.jpg',
    category: 'inspiration-tea',
    tags: ['传统工艺', '药食同源']
  },
  {
    id: 5,
    name: '佛手老香黄',
    description: '古法工艺，开胃健脾，咸香可口',
    price: 68,
    sales: 756,
    image: '/static/sw1.jpg',
    category: 'inspiration-tea',
    tags: ['古法制作', '开胃健脾']
  },
  {
    id: 6,
    name: '陈皮普洱茶',
    description: '陈皮与普洱完美融合，润肺止咳',
    price: 88,
    sales: 1890,
    image: '/static/sw2.jpg',
    category: 'inspiration-tea',
    tags: ['润肺止咳', '含茶叶']
  }
])

// 热门推荐商品
const hotProducts = ref([
  {
    id: 101,
    name: '芭乐雪霸茶王',
    description: '时令白芭乐+九窨雪霸茶王+芭乐云顶，芭乐灵感茶特调',
    price: 21,
    image: '/static/sw1.jpg',
    tags: ['咖啡因黄灯', '含乳制品、茶']
  },
  {
    id: 102,
    name: '新会老陈皮',
    description: '陈香醇厚，理气健脾，传统工艺制作',
    price: 128,
    image: '/static/sw2.jpg',
    tags: ['传统工艺', '药食同源']
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
/* 喜茶风格点单页面 */
.heytea-menu-page {
  min-height: 100vh;
  background: #000000;
  display: flex;
  flex-direction: column;
  color: white;
}

/* 顶部区域 */
.top-section {
  background: #000000;
  padding: 0 32rpx;
}

.status-bar {
  height: 44rpx;
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
  color: white;
}

.divider {
  font-size: 24rpx;
  color: #666;
}

.delivery-type {
  font-size: 28rpx;
  color: #999;
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
  color: white;
}

/* 门店名称 */
.store-name {
  margin: 16rpx 0;
}

.store-title {
  font-size: 32rpx;
  font-weight: 600;
  color: white;
  display: block;
  margin-bottom: 8rpx;
}

.store-distance {
  font-size: 24rpx;
  color: #999;
  display: block;
}

/* slogan */
.store-slogan {
  padding: 16rpx 0 24rpx;
}

.slogan-text {
  font-size: 26rpx;
  color: #999;
  font-style: italic;
}

/* 主要内容区域 */
.main-container {
  flex: 1;
  display: flex;
  background: white;
  border-radius: 32rpx 32rpx 0 0;
  overflow: hidden;
}

/* 左侧分类导航 */
.left-sidebar {
  width: 200rpx;
  background: #f8f9fa;
  border-right: 1rpx solid #e5e5e5;
}

.category-sidebar {
  height: calc(100vh - 300rpx);
}

.category-item {
  position: relative;
  padding: 32rpx 24rpx;
  background: #f8f9fa;
  border-bottom: 1rpx solid #eee;
  transition: all 0.2s ease;
}

.category-item.active {
  background: white;
  border-right: 4rpx solid #ff6b35;
}

.category-item:active {
  background: #e9ecef;
}

.category-name {
  font-size: 24rpx;
  color: #333;
  font-weight: 500;
  text-align: center;
  line-height: 1.4;
  word-break: break-all;
}

.category-item.active .category-name {
  color: #ff6b35;
  font-weight: 600;
}

.category-indicator {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4rpx;
  height: 32rpx;
  background: #ff6b35;
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
  border-bottom: 1rpx solid #f0f0f0;
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
  color: #ff6b35;
}

.spec-button {
  background: #333;
  color: white;
  padding: 12rpx 24rpx;
  border-radius: 24rpx;
  font-size: 24rpx;
  font-weight: 500;
}

.spec-text {
  font-size: 24rpx;
}

/* 推荐区域 */
.recommend-section {
  padding: 32rpx;
  background: #f8f9fa;
  margin-top: 20rpx;
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
  color: #ff6b35;
}

.recommend-spec-btn {
  background: #333;
  color: white;
  padding: 8rpx 16rpx;
  border-radius: 16rpx;
}

.rec-spec-text {
  font-size: 20rpx;
}

.bottom-space {
  height: 120rpx;
}
</style>