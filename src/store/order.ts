import { defineStore } from 'pinia'

export const useOrderStore = defineStore('order', () => {
  // 订单列表
  const orders = ref<OrderType[]>([])

  function setOrders(value: OrderType[]) {
    orders.value = value
  }

  function appendOrders(value: OrderType[]) {
    orders.value = orders.value.concat(value)
  }

  function updateOrder(orderNo: string, updates: Partial<OrderType>) {
    const index = orders.value.findIndex(t => t.orderNo === orderNo)

    if (index > -1) {
      orders.value[index] = {
        ...orders.value[index],
        ...updates
      }
    }
  }

  return {
    orders,
    setOrders,
    appendOrders,
    updateOrder
  }
})
