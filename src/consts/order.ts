export const ORDER_STATE_OPTIONS = [
  { label: '全部', value: 'ALL' },
  { label: '待付款', value: 'NOTPAY' },
  { label: '已支付', value: 'SUCCESS' }
]

export enum OrderStateEnum {
  /** 全部 */
  ALL = 'ALL',
  /** 支付成功 */
  SUCCESS = 'SUCCESS',
  /** 转入退款 */
  REFUND = 'REFUND',
  /** 未支付 */
  NOTPAY = 'NOTPAY',
  /** 已关闭 */
  CLOSED = 'CLOSED',
  /** 已撤销（付款码支付） */
  REVOKED = 'REVOKED',
  /** 用户支付中（付款码支付） */
  USERPAYING = 'USERPAYING',
  /** 支付失败(其他原因，如银行返回失败) */
  PAYERROR = 'PAYERROR',
  /** 已接收，等待扣款 */
  ACCEPT = 'ACCEPT'
}

export const ORDER_STATES: Any = {
  [OrderStateEnum.SUCCESS]: {
    label: '已支付',
    class: 'text-green-600',
    detailClass: 'from-green-50'
  },
  [OrderStateEnum.REFUND]: {
    label: '转入退款',
    class: 'text-blue-500',
    detailClass: 'from-blue-50'
  },
  [OrderStateEnum.NOTPAY]: {
    label: '未支付',
    class: 'text-yellow-500',
    detailClass: 'from-yellow-50'
  },
  [OrderStateEnum.CLOSED]: {
    label: '已关闭',
    class: 'text-red-500',
    detailClass: 'from-red-50'
  },
  [OrderStateEnum.REVOKED]: {
    label: '已撤销',
    class: 'text-zinc-800',
    detailClass: 'from-zinc-50'
  },
  [OrderStateEnum.USERPAYING]: {
    label: '支付中',
    class: 'text-yellow-500',
    detailClass: 'from-yellow-50'
  },
  [OrderStateEnum.PAYERROR]: {
    label: '支付失败',
    class: 'text-red-500',
    detailClass: 'from-red-50'
  },
  [OrderStateEnum.ACCEPT]: {
    label: '已接收',
    class: 'text-green-600',
    detailClass: 'from-green-50'
  }
}

export enum OrderPayMethodEnum {
  /** 微信支付 */
  WECHATPAY = 1,
  /** 支付宝 */
  ALIPAY = 2,
  /** 账户余额 */
  ACCOUNT = 3
}

export const ORDER_PAY_METHODS = {
  [OrderPayMethodEnum.WECHATPAY]: {
    value: '微信支付',
    icon: 'wechatpay'
  },
  [OrderPayMethodEnum.ALIPAY]: {
    value: '支付宝',
    icon: 'alipay'
  },
  [OrderPayMethodEnum.ACCOUNT]: {
    value: '账户余额',
    icon: 'wallet'
  }
}
