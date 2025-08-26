export function useCustomTabBar(tabBarIndex: number) {
  onShow(() => {
    const curPage: Any = getCurrentPages()[0]

    if (typeof curPage.getTabBar === 'function' && curPage.getTabBar()) {
      curPage.getTabBar().setData({
        selected: tabBarIndex
      })
    }
  })
}
