/// <reference types='@dcloudio/types' />
import 'vue'

declare module '@vue/runtime-core' {
  type Hooks = App.AppInstance & Page.PageInstance

  interface ComponentCustomOptions extends Hooks {}
}

declare module 'vue' {
  type Hooks = App.AppInstance & Page.PageInstance
}

declare global {
  type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>
  type Required<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>

  type Any = any
  type AnyMap<K extends string | number | symbol = string, V = Any> = Record<K, V>

  type Timeout = ReturnType<typeof setTimeout>

  interface Route {
    path: string
    name?: string
    fullPath?: string
    query: Query
    [key: string]: Any
  }
}

// 蓝牙设备类型
interface BluetoothDevice {
  deviceId: string
  name?: string
  rssi: number
}

// 微信小程序 API
declare global {
  const wx: any
  const uni: any
}

export {}
