import router, { constantRoutes, asyncRoutes } from '@/router'

const usePermissionStore = defineStore('permission', {
  state: () => ({
    routes: []
  }),
  actions: {
    setRoutes(routes) {
      this.routes = constantRoutes.concat(routes)
    },
    generateRoutes(menuList) {
      return new Promise((resolve) => {
        let accessedRoutes = filterAsyncRoutes(asyncRoutes, menuList)
        this.setRoutes(accessedRoutes)
        resolve(accessedRoutes)
      })
    }
  }
})

function hasPermission(menuList, route) {
  if (route.meta && route.meta.menuId) {
    return menuList.includes(route.meta.menuId)
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes
 * @param menuList
 */
function filterAsyncRoutes(routes, menuList) {
  const res = []
  routes.forEach((route) => {
    const tmp = { ...route }
    if (hasPermission(menuList, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, menuList)
      }
      res.push(tmp)
    }
  })
  return res
}

export default usePermissionStore
