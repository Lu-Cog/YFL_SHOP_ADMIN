import Layout from '@/layout'
import { roterPre } from '@/settings'
const maintainRouter =
  {
    path: `${roterPre}/maintain`,
    name: 'maintain',
    meta: {
      title: '安全维护'
    },
    alwaysShow: true,
    component: Layout,
    children: [
      {
        path: 'dataBackup',
        name: 'DataBackup',
        meta: {
          title: '数据备份',
          noCache: true
        },
        component: () => import('@/views/maintain/dataBackup/index')
      },

    ]
  }

export default maintainRouter
