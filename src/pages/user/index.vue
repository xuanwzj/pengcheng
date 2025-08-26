<script setup>
import { ref } from 'vue'

const orderTypes = ref([
  { name: '待付款', icon: '💰', count: 2 },
  { name: '待发货', icon: '📦', count: 0 },
  { name: '待收货', icon: '🚚', count: 1 },
  { name: '已完成', icon: '✅', count: 0 }
])

const quickActions = ref([
  { name: '我的收藏', icon: '❤️', action: 'favorites' },
  { name: '收货地址', icon: '📍', action: 'address' },
  { name: '优惠券', icon: '🎫', action: 'coupons' },
  { name: '积分商城', icon: '🏆', action: 'points' }
])

const serviceItems = ref([
  { name: '客服中心', icon: '💬', action: 'service' },
  { name: '意见反馈', icon: '📝', action: 'feedback' },
  { name: '关于我们', icon: 'ℹ️', action: 'about' },
  { name: '设置', icon: '⚙️', action: 'settings' }
])



const navigateToOrders = () => {
  uni.showModal({
    title: '订单查看',
    content: '这是一个纯展示小程序，订单功能仅供参考',
    showCancel: false,
    confirmText: '知道了'
  })
}

const navigateToOrderDetail = (type) => {
  uni.showModal({
    title: type.name,
    content: '这是一个纯展示小程序，订单功能仅供参考',
    showCancel: false,
    confirmText: '知道了'
  })
}

const handleToolClick = (tool) => {
  uni.showModal({
    title: tool.name,
    content: '这是一个纯展示小程序，功能仅供参考',
    showCancel: false,
    confirmText: '知道了'
  })
}

const handleRecommendClick = (item) => {
  uni.switchTab({
    url: '/pages/menu/index'
  })
}

const navigateToCustomerService = () => {
  uni.showToast({
    title: '客服电话：400-888-8888',
    icon: 'none',
    duration: 3000
  })
}
</script>

<template>
  <view class="xicha-user-page">
    <!-- 喜茶风格头部区域 -->
    <view class="header-section">
      <!-- 自定义导航栏 (包含安全区域) -->
      <view class="custom-nav">
        <text class="nav-title">我的</text>
      </view>
      
      <!-- 用户信息卡片 -->
      <view class="user-card">
        <view class="avatar-container">
          <view class="avatar-wrapper">
            <image src="/static/default-avatar.png" class="user-avatar" mode="aspectFill" />
            <view class="avatar-border"></view>
          </view>
        </view>
        
        <view class="user-info">
          <text class="user-name">潮汕特产</text>
          <text class="user-desc">传承百年工艺，药食同源</text>
        </view>
        
        <view class="vip-badge">
          <text class="vip-text">正宗品质</text>
        </view>
      </view>
    </view>

    <!-- 主要内容区域 -->
    <view class="main-content">
      <!-- 订单状态卡片 -->
      <view class="order-card">
        <view class="card-header">
          <text class="card-title">我的订单</text>
          <view class="more-link" @tap="navigateToOrders">
            <text class="more-text">查看全部</text>
            <text class="arrow-icon">→</text>
          </view>
        </view>
        
        <view class="order-grid">
          <view 
            class="order-item" 
            v-for="(type, index) in orderTypes" 
            :key="index" 
            @tap="navigateToOrderDetail(type)"
          >
            <view class="order-icon-wrapper">
              <text class="order-icon">{{ type.icon }}</text>
              <view class="order-badge" v-if="type.count > 0">
                <text class="badge-count">{{ type.count }}</text>
              </view>
            </view>
            <text class="order-label">{{ type.name }}</text>
          </view>
        </view>
      </view>

      <!-- 快捷功能卡片 -->
      <view class="actions-card">
        <view class="actions-grid">
          <view 
            class="action-item" 
            v-for="(action, index) in quickActions" 
            :key="index" 
            @tap="handleToolClick(action)"
          >
            <view class="action-icon-bg">
              <text class="action-icon">{{ action.icon }}</text>
            </view>
            <text class="action-label">{{ action.name }}</text>
          </view>
        </view>
      </view>

      <!-- 服务中心卡片 -->
      <view class="service-card">
        <view class="service-list">
          <view 
            class="service-item" 
            v-for="(service, index) in serviceItems" 
            :key="index" 
            @tap="handleToolClick(service)"
          >
            <view class="service-left">
              <view class="service-icon-wrapper">
                <text class="service-icon">{{ service.icon }}</text>
              </view>
              <text class="service-label">{{ service.name }}</text>
            </view>
            <view class="service-arrow">
              <text class="arrow-right">></text>
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
/* 喜茶风格用户页面 */
.xicha-user-page {
  min-height: 100vh;
  background: #fafafa;
}

/* 头部区域 */
.header-section {
  background: linear-gradient(135deg, #f5f2e9 0%, #e8e2d4 100%);
  padding-bottom: 40rpx;
  position: relative;
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
  color: #3d3d3d;
}

/* 用户信息卡片 */
.user-card {
  display: flex;
  align-items: center;
  padding: 32rpx;
  margin: 0 32rpx;
  background: white;
  border-radius: 24rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
  position: relative;
  top: 20rpx;
}

.avatar-container {
  position: relative;
  margin-right: 24rpx;
}

.avatar-wrapper {
  position: relative;
}

.user-avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  background: #f0f0f0;
}

.avatar-border {
  position: absolute;
  top: -6rpx;
  left: -6rpx;
  width: 132rpx;
  height: 132rpx;
  border: 3rpx solid #d4965a;
  border-radius: 50%;
  opacity: 0.3;
}

.user-info {
  flex: 1;
}

.user-name {
  font-size: 32rpx;
  font-weight: 700;
  color: #333;
  margin-bottom: 8rpx;
  display: block;
}

.user-desc {
  font-size: 24rpx;
  color: #888;
  display: block;
}

.vip-badge {
  background: linear-gradient(135deg, #d4965a 0%, #c8834a 100%);
  padding: 8rpx 16rpx;
  border-radius: 16rpx;
}

.vip-text {
  font-size: 20rpx;
  color: white;
  font-weight: 600;
}

/* 主要内容区域 */
.main-content {
  padding: 60rpx 32rpx 32rpx;
}

/* 订单卡片 */
.order-card {
  background: white;
  border-radius: 20rpx;
  padding: 32rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
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

.order-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24rpx;
}

.order-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16rpx;
  transition: transform 0.3s ease;
}

.order-item:active {
  transform: scale(0.95);
}

.order-icon-wrapper {
  position: relative;
  margin-bottom: 12rpx;
}

.order-icon {
  font-size: 48rpx;
  display: block;
}

.order-badge {
  position: absolute;
  top: -8rpx;
  right: -8rpx;
  min-width: 32rpx;
  height: 32rpx;
  background: #FF4444;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.badge-count {
  font-size: 20rpx;
  color: white;
  font-weight: 600;
  padding: 0 8rpx;
}

.order-label {
  font-size: 22rpx;
  color: #666;
  text-align: center;
}

/* 快捷功能卡片 */
.actions-card {
  background: white;
  border-radius: 20rpx;
  padding: 32rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24rpx;
}

.action-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16rpx;
  transition: transform 0.3s ease;
}

.action-item:active {
  transform: scale(0.95);
}

.action-icon-bg {
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

.action-icon {
  font-size: 36rpx;
}

.action-label {
  font-size: 22rpx;
  color: #666;
  text-align: center;
}

/* 服务中心卡片 */
.service-card {
  background: white;
  border-radius: 20rpx;
  padding: 0;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.service-list {
  display: flex;
  flex-direction: column;
}

.service-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32rpx;
  border-bottom: 1rpx solid #f5f5f5;
  transition: background-color 0.2s ease;
}

.service-item:last-child {
  border-bottom: none;
}

.service-item:active {
  background-color: #f8f9fa;
}

.service-left {
  display: flex;
  align-items: center;
}

.service-icon-wrapper {
  width: 64rpx;
  height: 64rpx;
  background: #f5f2e9;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20rpx;
}

.service-icon {
  font-size: 28rpx;
}

.service-label {
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
}

.service-arrow {
  display: flex;
  align-items: center;
}

.arrow-right {
  font-size: 24rpx;
  color: #ccc;
}

.bottom-space {
  height: constant(safe-area-inset-bottom);
  height: env(safe-area-inset-bottom);
  min-height: 120rpx;
}
</style>