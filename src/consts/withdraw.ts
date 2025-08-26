// 提现状态枚举
export enum WithdrawStateEnum {
  /** 全部 */
  ALL = 'ALL',
  /** 可提现 */
  WITHDRAWABLE = 'WITHDRAWABLE',
  /** 不可提现 */
  NON_WITHDRAWABLE = 'NON_WITHDRAWABLE'
}

// 提现状态选项
export const WITHDRAW_STATE_OPTIONS = [
  { label: '全部', value: WithdrawStateEnum.ALL },
  { label: '可提现', value: WithdrawStateEnum.WITHDRAWABLE },
  { label: '不可提现', value: WithdrawStateEnum.NON_WITHDRAWABLE }
]

// 提现状态配置 - 根据商家转账订单状态类型
export const WITHDRAW_STATES = {
  'ACCEPTED': {
    label: '转账已受理',
    class: 'text-blue-500',
    withdrawable: false,
    description: '转账已受理'
  },
  'PROCESSING': {
    label: '转账锁定资金中',
    class: 'text-yellow-500',
    withdrawable: false,
    description: '转账锁定资金中。如果一直停留在该状态，建议检查账户余额是否足够，如余额不足，可充值后再原单重试'
  },
  'WAIT_USER_CONFIRM': {
    label: '待收款用户确认',
    class: 'text-orange-500',
    withdrawable: true,
    description: '待收款用户确认。可拉起微信收款确认页面进行收款确认'
  },
  'TRANSFERING': {
    label: '转账中',
    class: 'text-blue-500',
    withdrawable: true,
    description: '转账中。可拉起微信收款确认页面再次重试确认收款'
  },
  'SUCCESS': {
    label: '转账成功',
    class: 'text-green-600',
    withdrawable: false,
    description: '转账成功'
  },
  'FAIL': {
    label: '转账失败',
    class: 'text-red-500',
    withdrawable: false,
    description: '转账失败'
  },
  'CANCELING': {
    label: '转账撤销中',
    class: 'text-gray-500',
    withdrawable: false,
    description: '商户撤销请求受理成功，该笔转账正在撤销中'
  },
  'CANCELLED': {
    label: '转账撤销完成',
    class: 'text-gray-500',
    withdrawable: false,
    description: '转账撤销完成'
  },
  'null': {
    label: '待提现',
    class: 'text-orange-500',
    withdrawable: true,
    description: '待提现，可进行提现操作'
  }
}

// 可提现的状态
export const WITHDRAWABLE_STATES = ['WAIT_USER_CONFIRM', 'TRANSFERING', 'null', null] 