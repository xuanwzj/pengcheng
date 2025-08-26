<template>
  <view class="homepage">
    <!-- 大轮播区域 -->
    <view class="hero-carousel-section">
      <swiper 
        class="hero-swiper" 
        autoplay 
        circular 
        indicator-dots 
        indicator-color="rgba(255,255,255,0.5)" 
        indicator-active-color="#FFFFFF"
        interval="4000"
        duration="800"
      >
        <!-- 品牌介绍首屏 -->
        <swiper-item>
          <view class="hero-slide">
            <image src="/static/product/新会陈皮红瓶.jpg" class="hero-bg-image" mode="aspectFill" />
            <view class="hero-overlay">
              <view class="hero-content">
                <text class="hero-main-title">潮汕传承</text>
                <text class="hero-subtitle">传承千年制作工艺</text>
                <text class="hero-description">精选潮汕本地优质食材，古法工艺现代传承</text>
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
        </swiper-item>
        
        <!-- 产品轮播 -->
        <swiper-item v-for="(product, index) in featuredCarousel" :key="index">
          <view class="hero-slide" @tap="viewProduct(product)">
            <image :src="product.image" class="hero-bg-image" mode="aspectFill" />
            <view class="hero-overlay">
              <view class="product-hero-content">
                <view class="product-badge">{{ product.badge }}</view>
                <text class="product-hero-name">{{ product.name }}</text>
                <text class="product-hero-desc">{{ product.description }}</text>
                <view class="product-hero-price">
                  <text class="price-symbol">¥</text>
                  <text class="price-value">{{ product.price }}</text>
                </view>
                <view class="product-action">
                  <view class="product-btn">
                    <text class="btn-text">立即购买</text>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </swiper-item>
      </swiper>
    </view>

    <!-- 主内容区域 -->
    <scroll-view class="main-scroll" scroll-y>

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
                                  <view class="add-to-cart-btn" @tap.stop="addToSelection(product)">
                    <text class="cart-btn-text">添加到清单</text>
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
                    <view class="featured-btn" @tap.stop="addToSelection(product)">
                      <text class="btn-text">添加到清单</text>
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
          <text class="section-subtitle">按传统分类，各有特色</text>
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
                    <view class="compact-add-btn" @tap.stop="addToSelection(product)">
                      <text class="compact-add-text">选择</text>
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
    
    <!-- 浮动清单按钮 -->
    <view class="floating-cart-btn" @tap="toggleSelectedList" v-if="selectedCount > 0">
      <view class="cart-icon">📋</view>
      <view class="cart-count">{{ selectedCount }}</view>
    </view>
    
    <!-- 浮动联系按钮 -->
    <view class="floating-contact-btn" @tap="showContactOptions" :class="{ 'with-cart': selectedCount > 0 }">
      <view class="contact-icon">💬</view>
    </view>
    
    <!-- 选择清单弹窗 -->
    <view class="selection-modal" v-if="showSelectedList" @tap="showSelectedList = false">
      <view class="modal-content" @tap.stop>
        <view class="modal-header">
          <text class="modal-title">我的选择清单</text>
          <view class="modal-actions">
            <view class="share-btn" @tap="shareSelection">
              <text class="share-icon">📤</text>
              <text class="share-text">分享</text>
            </view>
            <view class="close-btn" @tap="showSelectedList = false">
              <text class="close-icon">✕</text>
            </view>
          </view>
        </view>
        
        <scroll-view class="modal-body" scroll-y>
          <view class="selected-item" v-for="item in selectedItems" :key="item.id">
            <image :src="item.image" class="item-image" mode="aspectFill" />
            <view class="item-info">
              <text class="item-name">{{ item.name }}</text>
              <text class="item-desc">{{ item.description }}</text>
              <view class="item-footer">
                <text class="item-price">¥{{ item.price }}</text>
                <text class="item-quantity">x{{ item.quantity }}</text>
              </view>
            </view>
            <view class="item-actions">
              <view class="remove-btn" @tap="removeFromSelection(item.id)">
                <text class="remove-icon">🗑️</text>
              </view>
            </view>
          </view>
        </scroll-view>
        
        <view class="modal-footer">
          <view class="total-info">
            <text class="total-text">共选择 {{ selectedCount }} 个商品</text>
          </view>
          <view class="footer-actions">
            <view class="clear-btn" @tap="selectedItems = []">
              <text class="btn-text">清空</text>
            </view>
            <view class="share-big-btn" @tap="shareSelection">
              <text class="btn-text">分享清单</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 联系选项弹窗 -->
    <view class="contact-modal" v-if="showContactModal" @tap="showContactModal = false">
      <view class="contact-modal-content" @tap.stop>
        <view class="contact-modal-header">
          <view class="modal-logo">
            <image src="/static/logo.png" class="logo-img" mode="aspectFit" />
            <text class="modal-title">联系我们</text>
          </view>
          <view class="close-contact-btn" @tap="showContactModal = false">
            <text class="close-icon">✕</text>
          </view>
        </view>
        
        <view class="contact-modal-body">
          <view class="contact-option" @tap="previewQRCode">
            <view class="option-icon">📱</view>
            <view class="option-info">
              <text class="option-title">微信扫码</text>
              <text class="option-desc">扫描二维码添加微信</text>
            </view>
            <view class="option-arrow">></view>
          </view>
          
          <view class="contact-option" @tap="copyWechatId">
            <view class="option-icon">📋</view>
            <view class="option-info">
              <text class="option-title">复制微信号</text>
              <text class="option-desc">chaoshan_techan</text>
            </view>
            <view class="option-arrow">></view>
          </view>
          
          <view class="qr-preview-section">
            <image src="/static/qrcode.png" class="qr-modal-img" mode="aspectFit" @tap="previewQRCode" />
            <text class="qr-hint">点击查看大图</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

// 选择清单状态
const selectedItems = ref([])
const showSelectedList = ref(false)

// 联系功能状态
const showContactModal = ref(false)

// 计算选择的商品总数
const selectedCount = computed(() => selectedItems.value.length)

// 添加到选择清单
const addToSelection = (product) => {
  const existingItem = selectedItems.value.find(item => item.id === product.id)
  if (existingItem) {
    existingItem.quantity++
  } else {
    selectedItems.value.push({
      ...product,
      quantity: 1,
      selectedAt: Date.now()
    })
  }
  
  uni.showToast({
    title: '已添加到清单',
    icon: 'success',
    duration: 1500
  })
}

// 从选择清单移除
const removeFromSelection = (productId) => {
  const index = selectedItems.value.findIndex(item => item.id === productId)
  if (index > -1) {
    selectedItems.value.splice(index, 1)
  }
}

// 显示选择清单
const toggleSelectedList = () => {
  if (selectedCount.value === 0) {
    uni.showToast({
      title: '请先选择商品',
      icon: 'none'
    })
    return
  }
  showSelectedList.value = !showSelectedList.value
}

// 分享清单
const shareSelection = () => {
  if (selectedCount.value === 0) {
    uni.showToast({
      title: '清单为空，无法分享',
      icon: 'none'
    })
    return
  }
  
  // 这里可以实现截图分享功能
  uni.showModal({
    title: '分享清单',
    content: `您选择了${selectedCount.value}个商品，是否要截图分享给朋友？`,
    confirmText: '分享',
    success: (res) => {
      if (res.confirm) {
        // 实现截图功能
        captureAndShare()
      }
    }
  })
}

// 截图分享功能
const captureAndShare = () => {
  // 生成分享内容
  const shareContent = generateShareContent()
  
  // 显示分享内容
  uni.showModal({
    title: '分享清单',
    content: shareContent,
    confirmText: '复制分享',
    cancelText: '关闭',
    success: (res) => {
      if (res.confirm) {
        // 复制到剪贴板
        uni.setClipboardData({
          data: shareContent,
          success: () => {
            uni.showToast({
              title: '已复制到剪贴板',
              icon: 'success'
            })
          }
        })
      }
    }
  })
}

// 生成分享内容
const generateShareContent = () => {
  let content = `🍃 潮汕传承·道地特产 🍃\n\n我的选择清单：\n`
  
  selectedItems.value.forEach((item, index) => {
    content += `${index + 1}. ${item.name} ¥${item.price}`
    if (item.quantity > 1) {
      content += ` x${item.quantity}`
    }
    content += `\n`
  })
  
  content += `\n📋 共选择 ${selectedCount.value} 个商品\n`
  content += `🌟 传承千年制作工艺，药食同源\n`
  content += `📱 欢迎一起品尝潮汕传统美味！`
  
  return content
}

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
    description: '传统食材，温润清香',
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
    description: '传统食材，温润清香',
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
  addToSelection(product)
}

// 显示联系选项
const showContactOptions = () => {
  showContactModal.value = true
}

// 预览二维码
const previewQRCode = () => {
  uni.previewImage({
    urls: ['/static/qrcode.png'],
    current: '/static/qrcode.png'
  })
}

// 复制微信号
const copyWechatId = () => {
  const wechatId = 'chaoshan_techan' // 这里可以替换为实际的微信号
  uni.setClipboardData({
    data: wechatId,
    success: () => {
      uni.showToast({
        title: '微信号已复制',
        icon: 'success'
      })
      showContactModal.value = false
    }
  })
}
</script>

<style scoped>
/* 现代沉浸式首页设计 */
.homepage {
  min-height: 100vh;
  background: var(--bg-primary);
}

/* 大轮播区域 */
.hero-carousel-section {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.hero-swiper {
  height: 100%;
}

.hero-slide {
  position: relative;
  height: 100%;
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
  bottom: 80rpx;
  background: linear-gradient(rgba(0, 0, 0, 0.1), transparent 40%, rgba(0, 0, 0, 0.6));
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
  padding-left: 32rpx;
  padding-right: 32rpx;
  padding-bottom: 120rpx;
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
  padding: 0;
  margin: 0;
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

/* 产品轮播内容样式 */
.product-hero-content {
  text-align: center;
  color: #FFFFFF;
  padding: 0;
  margin: 0;
  position: relative;
}

.product-badge {
  display: inline-block;
  background: var(--accent-color);
  color: #FFFFFF;
  padding: 8rpx 20rpx;
  border-radius: 20rpx;
  font-size: 22rpx;
  font-weight: 600;
  box-shadow: 0 4rpx 12rpx rgba(230, 126, 34, 0.4);
  margin-bottom: 20rpx;
}

.product-hero-name {
  font-size: 64rpx;
  font-weight: 900;
  color: #FFFFFF;
  display: block;
  margin-bottom: 20rpx;
  text-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.5);
  letter-spacing: 4rpx;
  line-height: 1.1;
}

.product-hero-desc {
  font-size: 32rpx;
  color: rgba(255, 255, 255, 0.95);
  display: block;
  margin-bottom: 30rpx;
  text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.5);
  letter-spacing: 2rpx;
}

.product-hero-price {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 8rpx;
  margin-bottom: 40rpx;
}

.product-action {
  display: flex;
  justify-content: center;
}

.product-btn {
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  padding: 24rpx 48rpx;
  border-radius: 50rpx;
  transition: all 0.3s ease;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.2);
}

.product-btn:active {
  transform: translateY(2rpx) scale(0.98);
  background: rgba(255, 255, 255, 1);
}

.product-btn .btn-text {
  color: #333;
  font-weight: 600;
  font-size: 28rpx;
}

/* 主滚动区域 */
.main-scroll {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, #FFFFFF 20%);
  margin-top: -120rpx;
  border-radius: 40rpx 40rpx 0 0;
  position: relative;
  z-index: 2;
  backdrop-filter: blur(20rpx);
  box-shadow: 0 -12rpx 48rpx rgba(0, 0, 0, 0.08);
  min-height: calc(100vh - 120rpx);
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
  padding: 60rpx 32rpx 40rpx;
  background: transparent;
}

.nav-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
}

.nav-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%);
  border-radius: 28rpx;
  padding: 40rpx 24rpx;
  text-align: center;
  backdrop-filter: blur(20rpx);
  box-shadow: 0 12rpx 40rpx rgba(0, 0, 0, 0.06);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  border: 1rpx solid rgba(255, 255, 255, 0.5);
  position: relative;
  overflow: hidden;
}

.nav-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent 0%, rgba(212, 165, 116, 0.1) 50%, transparent 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.nav-card:active {
  transform: translateY(-8rpx) scale(0.98);
  box-shadow: 0 20rpx 60rpx rgba(0, 0, 0, 0.1);
}

.nav-card:active::before {
  opacity: 1;
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
  background: transparent;
}

.section-title-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40rpx;
  padding: 0 8rpx;
}

.section-main-title {
  font-size: 44rpx;
  font-weight: 800;
  color: #2C2C2C;
  letter-spacing: 2rpx;
  position: relative;
}

.section-main-title::after {
  content: '';
  position: absolute;
  bottom: -8rpx;
  left: 0;
  width: 60rpx;
  height: 4rpx;
  background: linear-gradient(90deg, var(--primary-color) 0%, var(--accent-color) 100%);
  border-radius: 2rpx;
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
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.8) 100%);
  border-radius: 32rpx;
  overflow: hidden;
  backdrop-filter: blur(20rpx);
  box-shadow: 0 16rpx 48rpx rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  border: 1rpx solid rgba(255, 255, 255, 0.6);
  position: relative;
}

.featured-large-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, transparent 0%, rgba(212, 165, 116, 0.05) 50%, transparent 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
}

.featured-large-card:active {
  transform: translateY(-8rpx) scale(0.98);
  box-shadow: 0 24rpx 64rpx rgba(0, 0, 0, 0.12);
}

.featured-large-card:active::before {
  opacity: 1;
}

.featured-card-image {
  width: 100%;
  height: 360rpx;
  object-fit: cover;
}

.featured-card-content {
  padding: 32rpx;
  position: relative;
  z-index: 2;
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

/* 浮动清单按钮 */
.floating-cart-btn {
  position: fixed;
  right: 32rpx;
  bottom: 120rpx;
  width: 120rpx;
  height: 120rpx;
  background: var(--primary-color);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8rpx 24rpx rgba(212, 165, 116, 0.4);
  z-index: 1000;
  transition: all 0.3s ease;
}

.floating-cart-btn:active {
  transform: scale(0.95);
  box-shadow: 0 4rpx 16rpx rgba(212, 165, 116, 0.6);
}

.cart-icon {
  font-size: 40rpx;
  color: #FFFFFF;
  margin-bottom: 4rpx;
}

.cart-count {
  position: absolute;
  top: -8rpx;
  right: -8rpx;
  min-width: 36rpx;
  height: 36rpx;
  background: #FF4444;
  border-radius: 18rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20rpx;
  color: #FFFFFF;
  font-weight: 600;
  padding: 0 8rpx;
}

/* 浮动联系按钮 */
.floating-contact-btn {
  position: fixed;
  right: 32rpx;
  bottom: 120rpx;
  width: 100rpx;
  height: 100rpx;
  background: var(--accent-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8rpx 24rpx rgba(230, 126, 34, 0.4);
  z-index: 999;
  transition: all 0.3s ease;
}

.floating-contact-btn.with-cart {
  bottom: 260rpx;
}

.floating-contact-btn:active {
  transform: scale(0.95);
  box-shadow: 0 4rpx 16rpx rgba(230, 126, 34, 0.6);
}

.contact-icon {
  font-size: 36rpx;
  color: #FFFFFF;
}

/* 选择清单弹窗 */
.selection-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-end;
  z-index: 2000;
}

.modal-content {
  width: 100%;
  max-height: 80vh;
  background: #FFFFFF;
  border-radius: 24rpx 24rpx 0 0;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32rpx;
  border-bottom: 1rpx solid #F0F0F0;
}

.modal-title {
  font-size: 36rpx;
  font-weight: 700;
  color: #333;
}

.modal-actions {
  display: flex;
  align-items: center;
  gap: 24rpx;
}

.share-btn {
  display: flex;
  align-items: center;
  gap: 8rpx;
  padding: 12rpx 20rpx;
  background: var(--primary-color);
  border-radius: 20rpx;
}

.share-icon {
  font-size: 24rpx;
  color: #FFFFFF;
}

.share-text {
  font-size: 24rpx;
  color: #FFFFFF;
  font-weight: 600;
}

.close-btn {
  width: 48rpx;
  height: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F5F5F5;
  border-radius: 50%;
}

.close-icon {
  font-size: 24rpx;
  color: #666;
}

.modal-body {
  flex: 1;
  padding: 0 32rpx;
  max-height: 50vh;
}

.selected-item {
  display: flex;
  align-items: center;
  padding: 24rpx 0;
  border-bottom: 1rpx solid #F5F5F5;
}

.selected-item:last-child {
  border-bottom: none;
}

.item-image {
  width: 120rpx;
  height: 120rpx;
  border-radius: 16rpx;
  margin-right: 24rpx;
}

.item-info {
  flex: 1;
}

.item-name {
  font-size: 28rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 8rpx;
  display: block;
}

.item-desc {
  font-size: 24rpx;
  color: #666;
  margin-bottom: 12rpx;
  display: block;
}

.item-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-price {
  font-size: 28rpx;
  font-weight: 600;
  color: var(--accent-color);
}

.item-quantity {
  font-size: 24rpx;
  color: #999;
  font-weight: 500;
}

.item-actions {
  margin-left: 16rpx;
}

.remove-btn {
  width: 48rpx;
  height: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #FFF2F2;
  border-radius: 50%;
}

.remove-icon {
  font-size: 20rpx;
}

.modal-footer {
  padding: 32rpx;
  border-top: 1rpx solid #F0F0F0;
  background: #FAFAFA;
}

.total-info {
  margin-bottom: 24rpx;
}

.total-text {
  font-size: 28rpx;
  color: #333;
  font-weight: 600;
}

.footer-actions {
  display: flex;
  gap: 16rpx;
}

.clear-btn {
  flex: 1;
  padding: 24rpx;
  background: #F5F5F5;
  border-radius: 16rpx;
  text-align: center;
}

.share-big-btn {
  flex: 2;
  padding: 24rpx;
  background: var(--primary-color);
  border-radius: 16rpx;
  text-align: center;
}

.clear-btn .btn-text {
  font-size: 28rpx;
  color: #666;
  font-weight: 600;
}

.share-big-btn .btn-text {
  font-size: 28rpx;
  color: #FFFFFF;
  font-weight: 600;
}

/* 联系弹窗 */
.contact-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2001;
  padding: 32rpx;
}

.contact-modal-content {
  width: 100%;
  max-width: 560rpx;
  background: #FFFFFF;
  border-radius: 24rpx;
  overflow: hidden;
  box-shadow: 0 24rpx 64rpx rgba(0, 0, 0, 0.2);
}

.contact-modal-header {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%);
  padding: 32rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}

.modal-logo {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.logo-img {
  width: 48rpx;
  height: 48rpx;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12rpx;
  padding: 4rpx;
}

.modal-title {
  font-size: 32rpx;
  font-weight: 700;
  color: white;
}

.close-contact-btn {
  width: 48rpx;
  height: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  transition: all 0.3s ease;
}

.close-contact-btn:active {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(0.95);
}

.close-contact-btn .close-icon {
  font-size: 24rpx;
  color: white;
}

.contact-modal-body {
  padding: 32rpx;
}

.contact-option {
  display: flex;
  align-items: center;
  padding: 24rpx 0;
  border-bottom: 1rpx solid #F0F0F0;
  transition: all 0.3s ease;
}

.contact-option:last-of-type {
  border-bottom: none;
  margin-bottom: 24rpx;
}

.contact-option:active {
  background: #F8F9FA;
  margin: 0 -16rpx;
  padding-left: 16rpx;
  padding-right: 16rpx;
  border-radius: 12rpx;
}

.option-icon {
  width: 64rpx;
  height: 64rpx;
  background: var(--primary-color);
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 24rpx;
  font-size: 28rpx;
  color: white;
}

.option-info {
  flex: 1;
}

.option-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 4rpx;
  display: block;
}

.option-desc {
  font-size: 24rpx;
  color: #666;
  display: block;
}

.option-arrow {
  font-size: 24rpx;
  color: #CCC;
  margin-left: 16rpx;
}

.qr-preview-section {
  text-align: center;
  padding: 24rpx;
  background: #F8F9FA;
  border-radius: 16rpx;
}

.qr-modal-img {
  width: 200rpx;
  height: 200rpx;
  background: white;
  border-radius: 16rpx;
  padding: 16rpx;
  margin-bottom: 16rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.qr-modal-img:active {
  transform: scale(0.95);
}

.qr-hint {
  font-size: 24rpx;
  color: #666;
  display: block;
}
</style>