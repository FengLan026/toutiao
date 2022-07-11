/***
* 路由
***/
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import("@/views/Login")
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import('@/views/Channels')
  },
  {
    path: '/forum',
    name: 'Forum',
    component: () => import('@/views/Forum')
  },
  {
    path: '/video',
    name: 'Video',
    component: () => import('@/views/Video')
  },
  {
    path: '/my',
    name: 'My',
    component: () => import('@/views/My'),
  },
  {
    path: '/info',
    name: 'Info',
    component: () => import('@/views/My/info.vue'),
    children: [
      {
        path: 'collections',
        name: 'Collections',
        component: () => import('@/views/My/collections.vue')
      },
      {
        path: 'history',
        name: 'History',
        component: () => import('@/views/My/history.vue')
      },
    ]
  },
  {
    path: '/edit',
    name: 'Edit',
    component: () => import('@/views/My/edit.vue')
  },

  {
    path: '/art',
    name: 'Art',
    component: () => import('@/views/Channels/Detail')
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }), // 管理滚动行为 如果出现滚动 切换就让 让页面回到顶部
  routes
})

const router = createRouter()

// 重置路由
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
