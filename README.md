# 戴宠光愈

## 开发要求

* Node.js >= 20
* 包管理 pnpm >= 10

## 开发

### 安装 pnpm

```shell
$ npm i -g pnpm
```

### 安装依赖

```shell
$ pnpm i
```

### 启动开发

```
$ pnpm dev:mp-weixin
```

### 打包

```
$ pnpm build:mp-weixin
```

## 环境变量

| 名称         | 说明          |
|--------------|---------------|
| VITE_API_URL | API 地址      |
| VITE_APP_ID  | 小程序 App ID |

## 文件结构

```
.
├── api // API
├── components // 自定义组件
├── consts // 常量
├── custom-tab-bar // 微信小程序 自定义 tabbar
├── hooks
├── main.css
├── main.ts
├── manifest.json // uniapp 小程序配置
├── pages // 页面
├── pages.json // 页面配置
├── static // 静态文件
├── store // 全局状态
└── utils
```

## 页面

| 页面             | 路径                       |
|------------------|----------------------------|
| 首页             | /page/index/index          |
| 我的             | /page/user/index           |
| 设备列表         | /page/device/index         |
| 操作说明         | /page/help/index           |
| 洗护设备（支付） | /page/checkout/index       |
| 充值             | /page/recharge/index       |
| 充值订单         | /page/recharge/order/index |
| 治疗记录         | /page/order/index          |
| 订单详情         | /page/order/detail/index   |
| 加盟合作         | /page/franchise/index      |

## 全局状态

| 名称      | 说明                       |
|-----------|----------------------------|
| app.ts    | 用户信息、openId、首页广告 |
| device.ts | 设备列表                   |
| order.ts  | 自助(洗宠)订单             |

## 参考文档

* 微信小程序 https://developers.weixin.qq.com/miniprogram/dev/framework/
* UniApp https://uniapp.dcloud.net.cn/
* Vue3 https://cn.vuejs.org/guide/introduction.html
* 全局状态管理 Pinia https://pinia.vuejs.org/zh/
* vue-request https://www.attojs.com/guide/introduction.html