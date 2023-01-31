import Layout from '@/layout'
import { roterPre } from '@/settings'
const cmsRouter =
    {
      path: `${roterPre}/cms`,
      name: 'cms',
      meta: {
        icon: 'dashboard',
        title: '内容'
      },
      alwaysShow: true,
      component: Layout,
      children: [
        {
          path: 'article',
          name: 'article',
          meta: {
            title: '文章管理',
            noCache: true
          },
          component: () => import('@/views/cms/article/index')
        },
        {
          path: 'articleCategory',
          name: 'articleCategory',
          meta: {
            title: '文章分类',
            noCache: true
          },
          component: () => import('@/views/cms/articleCategory/index')
        },
        {
          path: 'article/addArticle/:id?',
          component: () => import('@/views/cms/addArticle/index'),
          name: 'EditArticle',
          meta: { title: '文章添加', noCache: true, activeMenu: `${roterPre}/cms/article` },
          hidden: true
        },
        {
          path: 'category',
          name: 'category',
          meta: {
            title: '通用分类',
            noCache: true
          },
          component: () => import('@/views/cms/category/index')
        },
        {
          path: 'articleSchool',
          name: 'articleSchool',
          meta: {
            title: '商学院文章',
            noCache: true
          },
          component: () => import('@/views/cms/school/index')
        },
        {
          path: 'addSchool/:id?',
          component: () => import('@/views/cms/addSchool/index'),
          name: 'EditArticleSchool',
          meta: { title: '文章添加', noCache: true, activeMenu: `${roterPre}/cms/article` },
          hidden: true
        },
        {
          path: 'articlePromote',
          name: 'articlePromote',
          meta: {
            title: '推广文案',
            noCache: true
          },
          component: () => import('@/views/cms/promote/index')
        },
        {
          path: 'addPromote/:id?',
          component: () => import('@/views/cms/addPromote/index'),
          name: 'EditArticlePromote',
          meta: { title: '文章添加', noCache: true, activeMenu: `${roterPre}/cms/articlePromote` },
          hidden: true
        },


      ]
    }

export default cmsRouter
