interface PaginationType<T> {
  code: number
  message: string | null
  size: number
  pages: number
  current: number
  total: number
  data: T[]
}

/**
 * 用户
 */
interface UserType {
  /** 用户ID */
  id: number
  /** OpenID */
  openId: string
  /** 账户余额 (分) */
  account: number
  /** 账户余额 (元) */
  accountText: string
  /** 手机号 */
  phone: string
  /** 头像 */
  photoUrl: string
  /** 用户类型 */
  type: string
  /** 创建时间 */
  createdAt: string
  /** 更新时间 */
  updatedAt: string
  /** 是否是新用户 */
  new?: boolean
}

/**
 * 设备场景信息
 */
interface DeviceSceneType {
  /** 场景ID */
  id: number
  /** 创建时间 */
  createTime: string
  /** 修改时间 */
  modifyTime: string
  /** 场景名称 */
  name: string
  /** 地址 */
  address: string
  /** 纬度 */
  latitude: number
  /** 经度 */
  longitude: number
  /** 备注 */
  notes: string | null
  /** 设备SN */
  sn: string
  /** 价格列表 */
  priceList: any[]
  /** 蓝牙名称 */
  bluetoothName: string
}

interface PreOrderType {
  /** 订单ID */
  orderNo: string
  /** 支付信息 */
  pay: {
    appId: string
    nonceStr: string
    packageVal: string
    signType: string
    paySign: string
    timeStamp: string
  }
}

interface RechargeOrderType {
  /** 订单ID */
  id: number
  /** 平台订单 */
  orderNo: string
  /** 微信订单号 */
  wxNo: string
  /** 支付宝订单号 */
  zfbNo: string
  /** 金额（分） */
  amount: number
  /** 订单状态 */
  orderState: string
  /** 用户ID */
  openId: string
  phone: string
  createTime: string
  updateTime: string
  note: string
  tradeType: string
  mchid: string
}

interface OrderType {
  /** 订单ID */
  id: number
  /** 平台订单 */
  orderNo: string
  /** 微信订单号 */
  wxNo: string
  /** 支付宝订单号 */
  zfbNo: string
  /** 金额（分） */
  amount: number
  /** 账户余额 */
  accountAmountBefore: number
  /** 账户余额 */
  accountAmountAfter: number
  /** 订单状态 */
  orderState: string
  /** 订单类型 */
  type: number
  /** 订单类型（支付状态） */
  orderType: string | null
  /** 设备SN */
  deviceSn: string
  /** 设备名称 */
  deviceName: string
  /** 模式 */
  mode: number
  /** 模式名称 */
  modeName: string
  /** 时长 */
  time: number
  /** 价格 */
  price: number
  /** 地址 */
  address: string
  /** 商户ID */
  mchid: string
  /** 用户ID */
  openId: string
  /** 手机号 */
  phone: string
  /** 创建时间 */
  createTime: string
  /** 更新时间 */
  updateTime: string
  /** 备注 */
  note: string
  /** 交易类型 */
  tradeType: string
}

interface AdType {
  id: number
  name: string
  url: string
  serialNumber: number
  createTime: string
  appId: string
}

/**
 * 提现记录
 */
interface WithdrawType {
  /** 平台订单号 */
  orderNo: string
  /** 平台商户转账订单号 */
  outBillNo: string
  /** 订单金额（分） */
  orderAmount: number
  /** 转账金额（分） */
  transferAmount: number
  /** 状态 */
  state: string
  /** 包信息 */
  packageInfo: string
  /** 创建时间 */
  createTime: string
}

/**
 * 提现申请响应
 */
interface WithdrawApplyResponse {
  /** 商户号 */
  mchId: string
  /** 商户AppID */
  appId: string
  /** 平台商户转账订单号 */
  outBillNo: string | null
  /** package信息 */
  packageInfo: string
  /** 状态 */
  state: string
}
