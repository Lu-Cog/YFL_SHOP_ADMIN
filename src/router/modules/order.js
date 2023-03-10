import Layout from '@/layout'
import { roterPre } from '@/settings'
const orderRouter =
  {
    path: `${roterPre}/order`,
    name: 'order',
    meta: {
      icon: 'dashboard',
      title: '订单'
    },
    alwaysShow: true,
    component: Layout,
    redirect: `${roterPre}/order`,
    children: [
      {
        path: 'list',
        name: 'OrderList',
        meta: {
          title: '订单管理'
        },
        component: () => import('@/views/order/list/index')
      },
      {
        path: 'clist',
        name: 'OrderClist',
        meta: {
          title: 'C端订单管理'
        },
        component: () => import('@/views/order/clist/index')
      },
      {
        path: 'update/:id?',
        name: 'updateOrder',
        meta: {
          title: '修改订单',
          activeMenu: `${roterPre}/order/list`
        },
        component: () => import('@/views/order/list/updateOrder')
      },
      {
        path: 'refund',
        name: 'OrderRefund',
        meta: {
          title: '退款单'
        },
        component: () => import('@/views/order/refund/index')
      },
      {
        path: 'cancellation',
        name: 'OrderCancellation',
        meta: {
          title: '核销订单'
        },
        component: () => import('@/views/order/orderCancellate/index')
      }
    ]
  }

export default orderRouter
