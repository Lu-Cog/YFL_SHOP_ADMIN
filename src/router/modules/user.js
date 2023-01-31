import Layout from '@/layout'
import {
  roterPre
} from '@/settings'
const userRouter = {
  path: `${roterPre}/user`,
  name: 'user',
  meta: {
    title: '用户管理'
  },
  alwaysShow: true,
  component: Layout,
  children: [{
      path: 'group',
      component: () => import('@/views/user/group'),
      name: 'UserGroup',
      meta: {
        title: '用户等级',
        noCache: true
      }
    },
    {
      path: 'createActivity/:id?',
      name: 'CreateActivity',
      meta: {
        title: '添加用户等级',
        noCache: true,
        activeMenu: `${roterPre}/user/group`
      },
      component: () => import('@/views/user/group/createEditActivity')
    },

    {
      path: 'bill/:id?',
      name: 'Bill',
      meta: {
        title: '账户管理',
        noCache: true,
        activeMenu: `${roterPre}/user/list`
      },
      component: () => import('@/views/user/bill/index')
    },
    {
      path: 'editActivity/:id?',
      name: 'EditActivity',
      meta: {
        title: '编辑用户等级',
        noCache: true,
        activeMenu: `${roterPre}/user/group`
      },
      component: () => import('@/views/user/group/createEditActivity')
    },
    {
      path: 'label',
      component: () => import('@/views/user/label'),
      name: 'UserLabel',
      meta: {
        title: '用户标签',
        noCache: true
      }
    },
    {
      path: 'addmerchant',
      name: 'addMerchant',
      meta: {
        title: '添加商户',
        noCache: true,
        activeMenu: `${roterPre}/user/merList`
      },
      component: () => import('@/views/user/addmerchant/index')
    },
    {
      path: 'editmerchant/:id',
      name: 'editMerchant',
      meta: {
        title: '编辑商户',
        noCache: true,
        activeMenu: `${roterPre}/user/merList`
      },
      component: () => import('@/views/user/addmerchant/index')
    },
    {
      path: 'list',
      component: () => import('@/views/user/list'),
      name: 'UserList',
      meta: {
        title: '用户列表',
        noCache: true
      }
    },
    {
      path: 'merList',
      component: () => import('@/views/user/merList'),
      name: 'UserMerList',
      meta: {
        title: '加盟商列表',
        noCache: true
      }
    }
  ]
}

export default userRouter
