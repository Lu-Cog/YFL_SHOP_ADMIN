import Layout from '@/layout'
import { roterPre } from '@/settings'
const accountsRouter =
  {
    path: `${roterPre}/accounts`,
    name: 'accounts',
    meta: {
      icon: '',
      title: '财务'
    },
    alwaysShow: true,
    component: Layout,
    children: [
      {
        path: 'extract',
        name: 'AccountsExtract',
        meta: {
          title: '提现管理',
          noCache: true
        },
        component: () => import('@/views/accounts/extract/index')
      },
      {
        path: 'bill',
        name: 'AccountsBill',
        meta: {
          title: '充值记录',
          noCache: true
        },
        component: () => import('@/views/accounts/bill/index')
      },
      {
        path: 'capital',
        name: 'AccountsCapital',
        meta: {
          title: '资金记录',
          noCache: true
        },
        component: () => import('@/views/accounts/capital/index')
      },
      {
        path: 'reconciliation',
        name: 'AccountsReconciliation',
        meta: {
          title: '财务对账',
          noCache: true
        },
        component: () => import('@/views/accounts/reconciliation/index')
      },
      {
        path: 'reconciliation/order/:id/:type?',
        name: 'ReconciliationOrder',
        component: () => import('@/views/merchant/list/record'),
        meta: {
          title: '查看订单',
          noCache: true,
          activeMenu: `${roterPre}/accounts/reconciliation`
        },
        hidden: true
      },
      {
        path: 'capitalFlow',
        name: 'AccountsCapitalFlow',
        meta: {
          title: '资金流水',
          noCache: true
        },
        component: () => import('@/views/accounts/capitalFlow/index')
      },
      {
        path: 'recharge',
        name: 'AccountsRecharge',
        meta: {
          title: '商户充值',
          noCache: true
        },
        component: () => import('@/views/accounts/recharge/index')
      },
      {
        path: 'selcard',
        name: 'AccountsCollection',
        meta: {
          title: '设置收款账户',
          noCache: true
        },
        component: () => import('@/views/accounts/collection/index')
      },
      {
        path: 'recharge_scan',
        name: 'AccountsRecharge',
        meta: {
          title: '扫码收款',
          noCache: true
        },
        component: () => import('@/views/accounts/recharge_scan/index')
      },


    ]
  }

export default accountsRouter
