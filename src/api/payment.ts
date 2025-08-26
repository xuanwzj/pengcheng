import { request } from '@/utils'

// 充值预订单
export async function rechargePreorder(input: { openid: string; amount: number }) {
  return request<PreOrderType>({
    method: 'POST',
    url: '/wx/order/preOrder/recharge',
    data: input
  })
}

// 支付预订单
export async function payPreorder(input: {
  openid: string
  deviceSn: string
  mode: number
  amount: number
  orderNo?: string
}) {
  return request<PreOrderType>({
    method: 'POST',
    url: '/wx/order/preOrder/pet',
    data: input
  })
}

// 支付订单
export async function payOrder(input: { orderNo: string }) {
  return request<PreOrderType>({
    method: 'POST',
    url: `/wx/order/repay/pet/${input.orderNo}`
  })
}

// 账户支付
export async function payWithAccount(input: {
  openid: string
  deviceSn: string
  mode: number
  amount: number
  orderNo: string
}) {
  return request<OrderType>({
    url: '/wx/order/pay/account',
    method: 'POST',
    data: input
  })
}

// 蓝牙设备预订单
export async function createPreOrder(input: {
  openId: string
  deviceSn: string
  devicePriceId: number
}) {
  return request<PreOrderType>({
    method: 'POST',
    url: '/wx/order/preOrder/z',
    data: input
  })
}

// 申请提现
export async function applyWithdraw(input: { outBillNo: string }) {
  return request<WithdrawApplyResponse>({
    method: 'GET',
    url: `/wx/transfer/apply/${input.outBillNo}`
  })
}

// 余额下单
export async function balanceOrder(input: { openId: string; deviceSn: string; devicePriceId: number }) {
  return request<PreOrderType>({
    method: 'POST',
    url: '/wx/order/balance/order/z',
    data: input
  })
}
