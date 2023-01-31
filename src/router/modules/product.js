import Layout from '@/layout'
import {
	roterPre
} from '@/settings'
const productRouter = {
	path: `${roterPre}/product`,
	name: 'product',
	meta: {
		icon: 'dashboard',
		title: '商品管理'
	},
	alwaysShow: true,
	component: Layout,
	children: [{
			path: 'classify',
			name: 'ProductClassify',
			meta: {
				title: '商品分类',
				noCache: true
			},
			component: () => import('@/views/product/productClassify')
		},
		{
			path: 'examine',
			name: 'ProductExamine',
			meta: {
				title: '商品管理',
				noCache: true
			},
			component: () => import('@/views/product/productExamine/index.vue')
		},
		{
			path: 'instock',
			name: 'ProductInstock',
			meta: {
				title: '入库操作',
				noCache: true,
				activeMenu: `${roterPre}/product/instock`
			},
			component: () => import('@/views/product/productInstock/index.vue')
		},
		{
			path: 'outstock',
			name: 'ProductOutstock',
			meta: {
				title: '出库操作',
				noCache: true
			},
			component: () => import('@/views/product/productInstock/index.vue')
		},
		{
			path: 'info',
			name: 'ProductInfo',
			meta: {
				title: '单据详情',
				noCache: true
			},
			component: () => import('@/views/product/productInstock/info.vue')
		},
		{
			path: 'instockAdd',
			name: 'ProductInstockAdd',
			meta: {
				title: '添加表单',
				// noCache: true
			},
			component: () => import('@/views/product/productInstock/add.vue')
		},
		{
			path: 'attr',
			name: `ProductAttr`,
			meta: {
				title: '商品规格',
				noCache: true
			},
			component: () => import('@/views/product/productAttr')
		},
		{
			path: 'attr',
			name: `ProductAttr`,
			meta: {
				title: '优惠券',
				noCache: true
			},
			component: () => import('@/views/product/productAttr')
		},

		{
			path: 'addProduct/:id?/:edit?',
			component: () => import('@/views/product/addProduct/index'),
			name: 'AddProduct',
			meta: {
				title: '商品添加',
				noCache: true,
				activeMenu: `${roterPre}/product/examine`
			},
			hidden: true
		},

		{
			path: 'comment',
			name: 'ProductComment',
			meta: {
				title: '评论管理',
				noCache: true
			},
			component: () => import('@/views/product/productComment/index.vue')
		},



		{
			path: 'band',
			name: 'ProductBand',
			meta: {
				title: '品牌管理',
				noCache: true
			},
			component: () => import('@/views/product/band/index'),
			children: [{
					path: 'brandList',
					name: 'BrandList',
					meta: {
						title: '品牌列表',
						noCache: true
					},
					component: () => import('@/views/product/band/bandList')
				},
				{
					path: 'brandClassify',
					name: 'BrandClassify',
					meta: {
						title: '品牌分类',
						noCache: true
					},
					component: () => import('@/views/product/band/bandClassify')
				}
			]
		}
	]
}

export default productRouter
