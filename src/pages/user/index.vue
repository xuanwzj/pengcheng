<script setup>
import { ref } from 'vue'

// 药食同源产品分类
const productCategories = ref([
  { name: '陈皮类', icon: '🍊', description: '传统食材，芳香怡人', action: 'chenpi' },
  { name: '佛手类', icon: '🙏', description: '香气清雅，口感独特', action: 'foshou' },
  { name: '果脯类', icon: '🍇', description: '酸甜可口，营养丰富', action: 'guopu' },
  { name: '药膳类', icon: '🥄', description: '传统工艺，精心制作', action: 'yaoshan' }
])

// 产品特色介绍
const productFeatures = ref([
  { name: '传统风味', icon: '🌿', description: '古法制作，口味纯正', action: 'tradition' },
  { name: '工艺精湛', icon: '🫁', description: '选材严格，制作精细', action: 'craft' },
  { name: '口感丰富', icon: '💧', description: '层次分明，回味悠长', action: 'taste' },
  { name: '营养价值', icon: '🍽️', description: '天然食材，营养均衡', action: 'nutrition' }
])

// 传统文化与现代应用
const cultureItems = ref([
  { name: '传统工艺', icon: '🏺', action: 'tradition' },
  { name: '现代研究', icon: '🔬', action: 'research' },
  { name: '食用指南', icon: '📖', action: 'guide' },
  { name: '联系我们', icon: '📞', action: 'contact' }
])



const handleCategoryClick = (category) => {
  const categoryInfo = {
    'chenpi': '陈皮是传统的药食同源食材，新会陈皮更是其中的上品，具有独特的芳香和风味。我们的陈皮系列产品采用传统工艺制作，保持原有的香气和口感。',
    'foshou': '佛手是传统的香料食材，气味芳香清雅。我们的佛手系列产品保持了其独特的香气和口感，可作为日常茶点享用。',
    'guopu': '传统果脯类食品，采用天然水果经传统工艺制作而成。保留了水果的天然风味，酸甜可口，是美味的休闲零食。',
    'yaoshan': '药膳是中华传统美食文化的重要组成部分，将食材精心搭配，既美味又具有独特的文化内涵。'
  }
  
  uni.showModal({
    title: category.name + '科普',
    content: categoryInfo[category.action] || '传承传统工艺，品味地道美食',
    showCancel: false,
    confirmText: '了解了'
  })
}

const handleFeatureClick = (feature) => {
  const featureInfo = {
    'tradition': '传统潮汕食品制作工艺历史悠久，注重选材和工序，每一步都凝聚着匠人精神。我们坚持传统制法，确保原汁原味。',
    'craft': '从原料选择到加工制作，每个环节都严格把控。采用传统工艺结合现代卫生标准，为您提供安全放心的食品。',
    'taste': '我们的产品层次丰富，有的酸甜可口，有的香气浓郁，有的回味悠长，每一种都有其独特的风味特色。',
    'nutrition': '选用优质天然食材，保留食物本身的营养成分。作为日常零食或茶点，为您的生活增添美味。'
  }
  
  uni.showModal({
    title: feature.name + '介绍',
    content: featureInfo[feature.action] || '传承传统工艺，追求品质美味',
    showCancel: false,
    confirmText: '了解了'
  })
}

const handleCultureClick = (item) => {
  const cultureInfo = {
    'tradition': '潮汕传统制作工艺历史悠久，注重选材、工序精细，每一步都体现着先辈的智慧。我们坚持传统工艺，确保产品的正宗品质。',
    'research': '现代科学研究证实了许多传统食材的营养价值和功能成分。我们结合传统经验与现代技术，为您提供更安全、更优质的产品。',
    'guide': '建议适量食用，因人而异。孕妇、儿童及特殊体质人群请咨询专业人士后食用。保持均衡饮食，配合适量运动。',
    'contact': '如有疑问或需要了解更多产品信息，欢迎联系我们。我们将为您提供专业的咨询服务。'
  }
  
  uni.showModal({
    title: item.name,
    content: cultureInfo[item.action] || '传承与创新并重，为您的健康保驾护航',
    showCancel: false,
    confirmText: '知道了'
  })
}

const navigateToProducts = () => {
  uni.switchTab({
    url: '/pages/menu/index'
  })
}

// 显示二维码大图
const showQRCode = () => {
  uni.previewImage({
    urls: ['/static/qrcode.png'],
    current: '/static/qrcode.png'
  })
}

// 复制微信号
const copyWechat = () => {
  const wechatId = 'chaoshan_techan' // 这里可以替换为实际的微信号
  uni.setClipboardData({
    data: wechatId,
    success: () => {
      uni.showToast({
        title: '微信号已复制',
        icon: 'success'
      })
    }
  })
}
</script>

<template>
  <view class="xicha-user-page">
    <!-- 类似菜单页的顶部设计 -->
    <view class="top-section">
      <!-- 自定义导航栏 (包含安全区域) -->
      <view class="custom-nav">
        <text class="nav-title">传统文化</text>
      </view>
      
      <!-- 品牌信息栏 -->
      <view class="brand-info">
        <view class="brand-left">
          <text class="brand-type">文化传承</text>
          <text class="divider">|</text>
          <text class="heritage-type">工艺科普</text>
        </view>
      </view>
      
      <!-- 品牌名称 -->
      <view class="brand-name">
        <text class="brand-title">潮汕传承·道地特产</text>
        <text class="brand-desc">传承千年制作工艺</text>
      </view>
      
      <!-- 品牌标语 -->
      <view class="brand-slogan">
        <text class="slogan-text">authentic chaoshan heritage · traditional culture</text>
      </view>
    </view>

    <!-- 主要内容区域 -->
    <view class="main-content">
      <!-- 产品分类科普卡片 -->
      <view class="category-card">
        <view class="card-header">
          <text class="card-title">产品分类</text>
          <view class="more-link" @tap="navigateToProducts">
            <text class="more-text">查看全部</text>
            <text class="arrow-icon">→</text>
          </view>
        </view>
        
        <view class="category-grid">
          <view 
            class="category-item" 
            v-for="(category, index) in productCategories" 
            :key="index" 
            @tap="handleCategoryClick(category)"
          >
            <view class="category-icon-wrapper">
              <text class="category-icon">{{ category.icon }}</text>
            </view>
            <text class="category-label">{{ category.name }}</text>
            <text class="category-desc">{{ category.description }}</text>
          </view>
        </view>
      </view>

      <!-- 功效科普卡片 -->
      <view class="benefits-card">
        <view class="card-header">
          <text class="card-title">产品特色</text>
          <text class="card-subtitle">传统工艺 · 匠心制作</text>
        </view>
        
        <view class="benefits-grid">
          <view 
            class="benefit-item" 
            v-for="(feature, index) in productFeatures" 
            :key="index" 
            @tap="handleFeatureClick(feature)"
          >
            <view class="benefit-icon-bg">
              <text class="benefit-icon">{{ feature.icon }}</text>
            </view>
            <text class="benefit-label">{{ feature.name }}</text>
            <text class="benefit-desc">{{ feature.description }}</text>
          </view>
        </view>
      </view>

      <!-- 文化传承卡片 -->
      <view class="culture-card">
        <view class="culture-list">
          <view 
            class="culture-item" 
            v-for="(item, index) in cultureItems" 
            :key="index" 
            @tap="handleCultureClick(item)"
          >
            <view class="culture-left">
              <view class="culture-icon-wrapper">
                <text class="culture-icon">{{ item.icon }}</text>
              </view>
              <text class="culture-label">{{ item.name }}</text>
            </view>
            <view class="culture-arrow">
              <text class="arrow-right">></text>
            </view>
          </view>
        </view>
      </view>

      <!-- 联系店主卡片 -->
      <view class="contact-card">
        <view class="contact-header">
          <view class="logo-section">
            <image src="/static/logo.png" class="brand-logo" mode="aspectFit" />
            <view class="logo-info">
              <text class="contact-title">联系店主</text>
              <text class="contact-subtitle">扫码添加微信，获取更多优惠</text>
            </view>
          </view>
        </view>
        
        <view class="contact-content">
          <view class="qr-section" @tap="showQRCode">
            <image src="/static/qrcode.png" class="qr-preview" mode="aspectFit" />
            <view class="qr-info">
              <text class="qr-title">微信扫一扫</text>
              <text class="qr-desc">点击查看大图</text>
            </view>
          </view>
          
          <view class="contact-actions">
            <view class="action-btn primary" @tap="showQRCode">
              <text class="btn-icon">📱</text>
              <text class="btn-text">扫码联系</text>
            </view>
            <view class="action-btn secondary" @tap="copyWechat">
              <text class="btn-icon">📋</text>
              <text class="btn-text">复制微信号</text>
            </view>
          </view>
        </view>
      </view>
      
      <!-- 底部间距 -->
      <view class="bottom-space"></view>
    </view>
  </view>
</template>

<style scoped>
/* 统一风格用户页面 */
.xicha-user-page {
  min-height: 100vh;
  background: var(--bg-primary);
}

/* 顶部区域 - 统一品牌风格 */
.top-section {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%);
  padding-bottom: 32rpx;
  position: relative;
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
  font-size: 32rpx;
  font-weight: 700;
  color: #FFFFFF;
}

/* 品牌信息栏 */
.brand-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16rpx 32rpx;
}

.brand-left {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.brand-type, .heritage-type {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.95);
  font-weight: 500;
}

.divider {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 8rpx;
}

/* 品牌名称 */
.brand-name {
  padding: 24rpx 32rpx 16rpx;
}

.brand-title {
  font-size: 40rpx;
  font-weight: 800;
  color: #FFFFFF;
  margin-bottom: 8rpx;
  display: block;
  letter-spacing: 2rpx;
}

.brand-desc {
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
}

/* 品牌标语 */
.brand-slogan {
  padding: 0 32rpx 32rpx;
}

.slogan-text {
  font-size: 22rpx;
  color: rgba(255, 255, 255, 0.85);
  font-style: italic;
  letter-spacing: 1rpx;
  font-weight: 400;
}

/* 主要内容区域 */
.main-content {
  padding: 32rpx 32rpx 32rpx;
}

/* 产品分类卡片 */
.category-card {
  background: white;
  border-radius: 20rpx;
  padding: 32rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.category-card:active {
  transform: translateY(-4rpx);
  box-shadow: 0 12rpx 32rpx rgba(0, 0, 0, 0.12);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24rpx;
}

.card-title {
  font-size: 32rpx;
  font-weight: 700;
  color: #333;
}

.card-subtitle {
  font-size: 24rpx;
  color: #d4965a;
  font-weight: 500;
}

.more-link {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.more-text {
  font-size: 24rpx;
  color: #d4965a;
  font-weight: 500;
}

.arrow-icon {
  font-size: 20rpx;
  color: #d4965a;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24rpx;
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20rpx;
  transition: transform 0.3s ease;
  text-align: center;
}

.category-item:active {
  transform: scale(0.95);
}

.category-icon-wrapper {
  margin-bottom: 12rpx;
}

.category-icon {
  font-size: 48rpx;
  display: block;
}

.category-label {
  font-size: 26rpx;
  color: #333;
  font-weight: 600;
  margin-bottom: 8rpx;
}

.category-desc {
  font-size: 20rpx;
  color: #888;
  text-align: center;
  line-height: 1.4;
}

/* 功效科普卡片 */
.benefits-card {
  background: white;
  border-radius: 20rpx;
  padding: 32rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.benefits-card:active {
  transform: translateY(-4rpx);
  box-shadow: 0 12rpx 32rpx rgba(0, 0, 0, 0.12);
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24rpx;
}

.benefit-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20rpx;
  transition: transform 0.3s ease;
  text-align: center;
}

.benefit-item:active {
  transform: scale(0.95);
}

.benefit-icon-bg {
  width: 80rpx;
  height: 80rpx;
  background: linear-gradient(135deg, #f9f7f3 0%, #f5f2e9 100%);
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12rpx;
  box-shadow: 0 4rpx 16rpx rgba(212, 150, 90, 0.1);
}

.benefit-icon {
  font-size: 36rpx;
}

.benefit-label {
  font-size: 24rpx;
  color: #333;
  font-weight: 600;
  margin-bottom: 8rpx;
}

.benefit-desc {
  font-size: 20rpx;
  color: #888;
  text-align: center;
  line-height: 1.4;
}

/* 文化传承卡片 */
.culture-card {
  background: white;
  border-radius: 20rpx;
  padding: 0;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;
}

.culture-card:active {
  transform: translateY(-4rpx);
  box-shadow: 0 12rpx 32rpx rgba(0, 0, 0, 0.12);
}

.culture-list {
  display: flex;
  flex-direction: column;
}

.culture-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32rpx;
  border-bottom: 1rpx solid #f5f5f5;
  transition: background-color 0.2s ease;
}

.culture-item:last-child {
  border-bottom: none;
}

.culture-item:active {
  background-color: #f8f9fa;
}

.culture-left {
  display: flex;
  align-items: center;
}

.culture-icon-wrapper {
  width: 64rpx;
  height: 64rpx;
  background: #f5f2e9;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20rpx;
}

.culture-icon {
  font-size: 28rpx;
}

.culture-label {
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
}

.culture-arrow {
  display: flex;
  align-items: center;
}

.arrow-right {
  font-size: 24rpx;
  color: #ccc;
}

/* 联系店主卡片 */
.contact-card {
  background: white;
  border-radius: 20rpx;
  padding: 0;
  margin-bottom: 24rpx;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;
}

.contact-card:active {
  transform: translateY(-4rpx);
  box-shadow: 0 12rpx 32rpx rgba(0, 0, 0, 0.12);
}

.contact-header {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%);
  padding: 32rpx;
  color: white;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 24rpx;
}

.brand-logo {
  width: 80rpx;
  height: 80rpx;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16rpx;
  padding: 8rpx;
}

.logo-info {
  flex: 1;
}

.contact-title {
  font-size: 32rpx;
  font-weight: 700;
  color: white;
  margin-bottom: 8rpx;
  display: block;
}

.contact-subtitle {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.4;
}

.contact-content {
  padding: 32rpx;
}

.qr-section {
  display: flex;
  align-items: center;
  padding: 24rpx;
  background: #F8F9FA;
  border-radius: 16rpx;
  margin-bottom: 24rpx;
  transition: all 0.3s ease;
}

.qr-section:active {
  background: #E9ECEF;
  transform: scale(0.98);
}

.qr-preview {
  width: 120rpx;
  height: 120rpx;
  background: white;
  border-radius: 12rpx;
  padding: 8rpx;
  margin-right: 24rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.qr-info {
  flex: 1;
}

.qr-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 8rpx;
  display: block;
}

.qr-desc {
  font-size: 24rpx;
  color: #666;
  display: block;
}

.contact-actions {
  display: flex;
  gap: 16rpx;
}

.action-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20rpx 16rpx;
  border-radius: 16rpx;
  transition: all 0.3s ease;
}

.action-btn.primary {
  background: var(--primary-color);
  color: white;
}

.action-btn.secondary {
  background: #F8F9FA;
  color: #333;
  border: 2rpx solid #E9ECEF;
}

.action-btn:active {
  transform: scale(0.95);
}

.action-btn.primary:active {
  background: var(--primary-dark);
}

.action-btn.secondary:active {
  background: #E9ECEF;
}

.btn-icon {
  font-size: 32rpx;
  margin-bottom: 8rpx;
  display: block;
}

.btn-text {
  font-size: 24rpx;
  font-weight: 600;
}

.action-btn.primary .btn-text {
  color: white;
}

.action-btn.secondary .btn-text {
  color: #333;
}

.bottom-space {
  height: constant(safe-area-inset-bottom);
  height: env(safe-area-inset-bottom);
  min-height: 120rpx;
}
</style>