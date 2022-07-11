// 导航守卫
import router from '@/router'
import store from '@/store'

const whiteList = ['/login', '/404'] // 定义白名单 所有不受权限控制的页面
router.beforeEach((to, from, next) => {
  if (store.getters.token) {
    // 如果有token
    if (to.path === '/login') {
      // 如果访问的是登录页
      next('/') // 跳到主页
    } else {
      // 只有放过的时候才去获取用户资料
      // 如果当前有用户资料的id, 表示已经有资料, 如果没有id才需要获取
      if (!store.getters.userId) {
        store.dispatch('user/getUserInfo')
        // 如果说后续需要根据用户资料获取数据的话, 这里必须改成同步
      }
      next()
    }
  } else {
    // 如果没有token
    if (whiteList.includes(to.path)) {
      // 表示要去的地址在白名单
      next()
    } else {
      next('/login')
    }

  }
})
