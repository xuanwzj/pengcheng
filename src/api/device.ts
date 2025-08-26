import { helper, request } from '@/utils'

export async function getDeviceScene(scene: string) {
  return request<DeviceSceneType>({
    url: `/wx/device/scene/${scene}`
  })
}
