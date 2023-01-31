import Layout from '@/layout'
import {
  roterPre
} from '@/settings'
const marketingRouter = {
  path: `${roterPre}/marketing`,
  name: 'marketing',
  meta: {
    title: '营销'
  },
  alwaysShow: true,
  component: Layout,
  redirect: 'noRedirect',
  children: [{
      path: 'coupon',
      name: 'Coupon',
      meta: {
        title: '优惠券',
        noCache: true
      },
      redirect: 'noRedirect',
      component: () => import('@/views/marketing/coupon/index'),
      children: [{
          path: 'list',
          name: 'CouponList',
          meta: {
            title: '优惠劵列表',
            noCache: true
          },
          component: () => import('@/views/marketing/coupon/couponList/index')
        },
        {
          path: 'user',
          name: 'CouponUser',
          meta: {
            title: '会员领取记录',
            noCache: true
          },
          component: () => import('@/views/marketing/coupon/couponUser/index')
        },
        {
          path: 'creatCoupon/:id?',
          name: 'CreatCoupon',
          meta: {
            title: '添加优惠劵',
            noCache: true,
            activeMenu: `${roterPre}/marketing/coupon/list`
          },
          component: () => import('@/views/marketing/coupon/couponList/creatCoupon')
        }
      ]
    },
    {
      path: 'activity',
      name: 'Activity',
      meta: {
        title: '活动',
        noCache: true
      },
      redirect: 'noRedirect',
      component: () => import('@/views/marketing/activity/index'),
      children: [{
          path: 'list',
          name: 'CouponList',
          meta: {
            title: '活动列表',
            noCache: true
          },
          component: () => import('@/views/marketing/activity/activityList/index')
        },

        {
          path: 'createActivity/:id?',
          name: 'CreateActivity',
          meta: {
            title: '添加活动',
            noCache: true,
            activeMenu: `${roterPre}/marketing/activity/list`
          },
          component: () => import('@/views/marketing/activity/activityList/createEditActivity')
        },

        {
          path: 'editActivity/:id?',
          name: 'editActivity',
          meta: {
            title: '编辑活动',
            noCache: true,
            activeMenu: `${roterPre}/marketing/activity/list`
          },
          component: () => import('@/views/marketing/activity/activityList/createEditActivity')
        },

        {
          path: 'messageMerchant/:id?',
          name: 'messageMerchant',
          meta: {
            title: '管理商户',
            noCache: true,
            activeMenu: `${roterPre}/marketing/activity/list`
          },
          component: () => import('@/views/marketing/activity/activityList/messageMerchant/messageMerchant')
        }
      ]
    },
    {
      path: 'recharge',
      name: 'Recharge',
      meta: {
        title: '活动',
        noCache: true
      },
      redirect: 'noRedirect',
      component: () => import('@/views/marketing/recharge/index'),
      children: [{
          path: 'list',
          name: 'Rechargelist',
          meta: {
            title: '充值活动列表',
            noCache: true
          },
          component: () => import('@/views/marketing/recharge/rechargeList/index')
        },

        {
          path: 'createRActivity/:id?',
          name: 'CreateRActivity',
          meta: {
            title: '添加充值活动',
            noCache: true,
            activeMenu: `${roterPre}/marketing/recharge/list`
          },
          component: () => import('@/views/marketing/recharge/rechargeList/createEditActivity')
        },

        {
          path: 'editRActivity/:id?',
          name: 'editRActivity',
          meta: {
            title: '编辑充值活动',
            noCache: true,
            activeMenu: `${roterPre}/marketing/recharge/list`
          },
          component: () => import('@/views/marketing/recharge/rechargeList/createEditActivity')
        }
      ]
    },
    {
      path: 'studio2',
      name: 'Studio2',
      meta: {
        title: '直播间',
        noCache: true
      },
      redirect: 'noRedirect',
      component: () => import('@/views/marketing/studio2/index'),
      children: [
        {
          path: 'list',
          name: 'StudioList',
          meta: {
            title: '直播间列表',
            noCache: true
          },
          component: () => import('@/views/marketing/studio2/studioList/index')
        },
        {
          path: 'creatStudio',
          name: 'CreatStudio',
          meta: {
            title: '创建直播间',
            noCache: true
          },
          component: () => import('@/views/marketing/studio2/studioList/creatStudio')
        }
      ]
    },
    {
      path: 'broadcast2',
      name: 'Broadcast2',
      meta: {
        title: '直播',
        noCache: true
      },
      redirect: 'noRedirect',
      component: () => import('@/views/marketing/broadcast2/index'),
      children: [
        {
          path: 'list',
          name: 'BroadcastList',
          meta: {
            title: '直播商品列表',
            noCache: true
          },
          component: () => import('@/views/marketing/broadcast2/broadcastList/index')
        },
        {
          path: 'addProduct',
          name: 'BroadcastProduct',
          meta: {
            title: '创建直播商品',
            noCache: true
          },
          component: () => import('@/views/marketing/broadcast2/broadcastList/addProduct')
        }
      ]
    },

    {
      path: 'studio',
      name: 'Studio',
      meta: {
        title: '直播间',
        noCache: true
      },
      redirect: 'noRedirect',
      component: () => import('@/views/marketing/studio/index'),
      children: [{
        path: 'list',
        name: 'StudioList',
        meta: {
          title: '直播间列表',
          noCache: true
        },
        component: () => import('@/views/marketing/studio/studioList/index')
      }]
    },
    {
      path: 'promoter',
      name: 'Promoter',
      meta: {
        title: '推广人',
        noCache: true
      },
      redirect: 'noRedirect',
      component: () => import('@/views/marketing/promoter/index'),
      children: [{
        path: 'zblist',
        name: 'zblist',
        meta: {
          title: '推广人',
          noCache: true
        },
        component: () => import('@/views/marketing/promoter/index')
      }]
    },
    {
      path: 'broadcast',
      name: 'Broadcast',
      meta: {
        title: '直播',
        noCache: true
      },
      redirect: 'noRedirect',
      component: () => import('@/views/marketing/broadcast/index'),
      children: [{
        path: 'list',
        name: 'BroadcastList',
        meta: {
          title: '直播商品列表',
          noCache: true
        },
        component: () => import('@/views/marketing/broadcast/broadcastList/index')
      }]
    },
    {
      path: 'seckill',
      name: 'Seckill',
      meta: {
        title: '秒杀管理',
        noCache: true
      },
      redirect: 'noRedirect',
      component: () => import('@/views/marketing/seckill/index'),
      children: [{
          path: 'seckillConfig',
          name: 'SeckillConfig',
          meta: {
            title: '秒杀配置',
            noCache: true
          },
          component: () => import('@/views/marketing/seckill/seckillConfig/index')
        },
        {
          path: 'list',
          name: 'SpikeList',
          meta: {
            title: '秒杀列表',
            noCache: true
          },
          component: () => import('@/views/marketing/seckill/seckillGoods/index.vue')
        }
      ]
    },
    {
      path: 'presell',
      name: 'preSell',
      meta: {
        title: '预售商品管理',
        noCache: true
      },
      redirect: 'noRedirect',
      component: () => import('@/views/marketing/seckill/index'),
      children: [{
          path: 'list',
          name: `preSaleList`,
          meta: {
            title: '预售商品',
            noCache: true
          },
          component: () => import('@/views/marketing/preSale/index')
        },
        {
          path: 'agreement',
          name: `preSaleAgreement`,
          meta: {
            title: '预售协议',
            noCache: true
          },
          component: () => import('@/views/marketing/preSale/agreement')
        }
      ]
    },
    {
      path: 'assist',
      name: 'assist',
      meta: {
        title: '助力活动商品',
        noCache: true
      },
      redirect: 'noRedirect',
      component: () => import('@/views/marketing/assist/index'),
      children: [{
          path: 'goods_list',
          name: `assistProductList`,
          meta: {
            title: '助力活动商品',
            noCache: true
          },
          component: () => import('@/views/marketing/assist/assist_goods/index')
        },
        {
          path: 'messageMerchantQdd/:id?',
          name: 'messageMerchantQdd',
          meta: {
            title: '管理商户',
            noCache: true,
            activeMenu: `${roterPre}/marketing/assist/goods_list`
          },
          component: () => import('@/views/marketing/assist/assist_goods/messageMerchant/messageMerchant')
        },
        {
          path: 'create/:id?/:edit?',
          name: `assistProductList`,
          meta: {
            title: '助力活动商品',
            noCache: true
          },
          component: () => import('@/views/marketing/assist/assist_goods/create')
        },
        {
          path: 'list',
          name: `assist`,
          meta: {
            title: '助力活动列表',
            noCache: true
          },
          component: () => import('@/views/marketing/assist/assist_list/index')
        },
        // 添加这项会报错

      ]
    }
  ]
}

export default marketingRouter
