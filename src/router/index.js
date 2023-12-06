import { createRouter, createWebHashHistory } from 'vue-router'
import i18n from '@/utils/createI18n'

const t = i18n.global.t

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',//买币
      name: 'index',
      component: () => import('@/views/home/index.vue')
    },
    {
      path: '/startPay2',
      name: 'home2',
      component: () => import('@/views/home/index2.vue')
    },
    {
      path: '/startPay',
      name: 'home',
      component: () => import('@/views/home/index.vue')
    },
    {
      path: '/sell',//售卖
      name: 'sell',
      component: () => import('@/views/sell/index.vue')
    },
    {
      path: '/supplier',
      name: 'supplier',
      component: () => import('@/views/supplier/index.vue')
    },
    {
      path: '/blackSupplier',
      name: 'blackSupplier',
      component: () => import('@/views/supplier/black.vue')
    },
    /**
     * 状态，该状态只有成功不合理
     */
    {
      path: '/status/:type',
      name: 'status',
      component: () => import('@/views/status/index.vue')
    },
    /**
     * 页面响应结果
     */
    {
      path: '/result/:status',
      name: 'result',
      component: () => import('@/views/result/index.vue')
    },
    {
      path: '/transak',
      name: 'transak',
      component: () => import('@/views/transak/index.vue')
    },
    {
      path: '/stripe',
      name: 'stripe',
      component: () => import('@/views/stripe/index.vue')
    },
    {
      path: '/stripe/status/:loca/:color',
      name: 'stripeStatus',
      component: () => import('@/views/stripe/status.vue')
    },
    {
      path: '/err/:code',
      name: 'err',
      component: () => import('@/views/err/index.vue')
    },
  ]
})

router.beforeEach((to, from, next) => {
  document.title = t('router.' + to.name || 'default')
  next()
})

export default router
