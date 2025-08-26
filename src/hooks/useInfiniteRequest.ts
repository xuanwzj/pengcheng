import type { WatchSource } from 'vue'
import { useRequest } from 'vue-request'

interface FetchParams {
  currentPage: number
  pageSize: number
}

type FetchFunc<T> = (params: FetchParams & AnyMap) => Promise<PaginationType<T>>

interface UseInfiniteRequestOptions {
  pageSize?: number
}

export function useInfiniteRequest<T>(
  fetchFunc: FetchFunc<T>,
  params: WatchSource<AnyMap>,
  options?: UseInfiniteRequestOptions
) {
  const currentPage = ref(1)
  const pageSize = ref(options?.pageSize || 10)
  const data = ref<T[]>([])
  const hasMore = ref(true)

  const { loading, run } = useRequest(
    async () => {
      const res = await fetchFunc({
        currentPage: currentPage.value,
        pageSize: pageSize.value,
        ...unref(params)
      })

      // 如果接口没有返回 pages 字段，则根据 total 和 size 计算
      if (res.pages === undefined && res.total !== undefined && res.size !== undefined) {
        res.pages = Math.ceil(res.total / res.size)
      }

      if (currentPage.value === 1) {
        data.value = res.data as T[]
      } else {
        data.value.push(...(res.data as Any[]))
      }

      hasMore.value = res.current < res.pages

      return res
    },
    {
      refreshDeps: [currentPage, pageSize],
      onSuccess: () => {
        uni.stopPullDownRefresh()
      }
    }
  )

  watch(params, () => {
    data.value = []
    currentPage.value = 1
    hasMore.value = true

    run()
  })

  onPullDownRefresh(() => {
    const currentPageNum = currentPage.value

    currentPage.value = 1
    hasMore.value = true

    if (currentPageNum <= 1) {
      run()
    }
  })

  onReachBottom(() => {
    if (hasMore.value) {
      currentPage.value++
    }
  })

  return {
    currentPage,
    data,
    loading,
    hasMore
  }
}
