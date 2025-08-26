import { request, helper } from '@/utils'
import { useAppStore } from '@/store'

// 专门用于分页数据的请求函数
async function requestWithPagination<T>(options: UniApp.RequestOptions): Promise<T> {
  const baseURL = import.meta.env.VITE_API_URL
  const appStore = useAppStore()

  if (helper.isURL(baseURL)) {
    options.url = baseURL.replace(/\/$/, '') + options.url
  }

  options.header = {
    ...options.header,
    appId: import.meta.env.VITE_APP_ID,
    openId: helper.isValid(appStore.openId) ? appStore.openId : undefined
  }

  const response = await uni.request({
    ...options
  })

  const data = response.data as Any

  if (data.code === 200) {
    return data as T
  }

  throw new Error(data.msg || '服务器繁忙，请稍后再试')
}

// 充值订单查询
export async function rechargeOrders(input: {
  currentPage: number
  pageSize: number
}): Promise<PaginationType<RechargeOrderType>> {
  return requestWithPagination<PaginationType<RechargeOrderType>>({
    method: 'POST',
    url: '/wx/order/query/c',
    data: input
  })
}

// 治疗订单查询
export async function treatmentOrders(input: {
  currentPage: number
  pageSize: number
}): Promise<PaginationType<OrderType>> {
  return requestWithPagination<PaginationType<OrderType>>({
    method: 'POST',
    url: '/wx/order/query/z',
    data: {
      currentPage: input.currentPage,
      pageSize: input.pageSize
    }
  })
} 

// 查询订单
export async function getOrder(input: { orderNo: string }): Promise<OrderType> {
  return request<OrderType>({
    method: 'GET',
    url: `/wx/order/get/${input.orderNo}`
  })
}


// 查看提现列表
export async function getWithdrawList(input: {
  currentPage: number
  pageSize: number
}): Promise<PaginationType<WithdrawType>> {
  return requestWithPagination<PaginationType<WithdrawType>>({
    method: 'POST',
    url: '/wx/transfer/list',
    data: input
  })
}