export enum DeviceStateEnum {
  /** 异常 */
  ABNORMAL = 0,
  /** 空闲 */
  IDLE = 1,
  /** 运行中 */
  RUNNING = 2,
  /** 自动维护 */
  AUTO_MAINTENANCE = 3,
  /** 手动维护 */
  MANUAL_MAINTENANCE = 4,
  /** 停用 */
  DISABLED = 5
}

export const DEVICE_STATES: Any = {
  [DeviceStateEnum.ABNORMAL]: {
    label: '异常',
    class: 'text-red-600 bg-red-50'
  },
  [DeviceStateEnum.IDLE]: {
    label: '空闲',
    class: 'text-green-600 bg-green-50'
  },
  [DeviceStateEnum.RUNNING]: {
    label: '运行中',
    class: 'text-blue-600 bg-blue-50'
  },
  [DeviceStateEnum.AUTO_MAINTENANCE]: {
    label: '自动维护',
    class: 'text-yellow-600 bg-yellow-50'
  },
  [DeviceStateEnum.MANUAL_MAINTENANCE]: {
    label: '手动维护',
    class: 'text-yellow-600 bg-yellow-50'
  },
  [DeviceStateEnum.DISABLED]: {
    label: '停用',
    class: 'text-gray-600 bg-gray-50'
  }
}
