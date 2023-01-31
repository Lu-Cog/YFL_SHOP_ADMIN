import request from './request'

/**
 * @description 商品分类 -- 列表
 */
export function storeCategoryListApi() {
  return request.get('store/category/lst')
}
/**
 * @description 商品分类 -- 新增表单
 */
export function storeCategoryCreateApi() {
  return request.get('store/category/create/form')
}
/**
 * @description 商品分类 -- 编辑表单
 */
export function storeCategoryUpdateApi(id) {
  return request.get(`store/category/update/form/${id}`)
}
/**
 * @description 商品分类 -- 删除
 */
export function storeCategoryDeleteApi(id) {
  return request.delete(`store/category/delete/${id}`)
}
/**
 * @description 商品分类 -- 修改状态
 */
export function storeCategoryStatusApi(id, status) {
  return request.post(`store/category/status/${id}`, { status })
}
/**
 * @description 品牌分类 -- 列表
 */
export function brandCategoryListApi(data) {
  return request.get('store/brand/category/lst', data)
}
/**
 * @description 品牌分类 -- 新增表单
 */
export function brandCategoryCreateApi() {
  return request.get('store/brand/category/create/form')
}
/**
 * @description 品牌分类 -- 编辑表单
 */
export function brandCategoryUpdateApi(id) {
  return request.get(`store/brand/category/update/form/${id}`)
}
/**
 * @description 品牌分类 -- 删除
 */
export function brandCategoryDeleteApi(id) {
  return request.delete(`store/brand/category/delete/${id}`)
}
/**
 * @description 品牌分类 -- 修改状态
 */
export function brandCategoryStatusApi(id, status) {
  return request.post(`store/brand/category/status/${id}`, { status })
}
/**
 * @description 品牌 -- 列表
 */
export function brandListApi(data) {
  return request.get('store/brand/lst', data)
}
/**
 * @description 品牌 -- 新增表单
 */
export function brandCreateApi() {
  return request.get('store/brand/create/form')
}
/**
 * @description 品牌 -- 编辑表单
 */
export function brandUpdateApi(id) {
  return request.get(`store/brand/update/form/${id}`)
}
/**
 * @description 品牌 -- 删除
 */
export function brandDeleteApi(id) {
  return request.delete(`store/brand/delete/${id}`)
}
/**
 * @description 品牌列表 -- 修改状态
 */
export function brandStatusApi(id, status) {
  return request.post(`store/brand/status/${id}`, { status })
}
/**
 * @description 商品列表 -- 列表
 */
export function productLstApi(data) {
  return request.get(`store/product/lst`, data)
}

/**
 * @description 商品列表 -- 列表
 */
export function productLstMultApi(data) {
  return request.get(`store/product/list_mult`, data)
}
/**
 * @description 秒杀商品列表 -- 列表
 */
export function seckillProductLstApi(data) {
  return request.get(`seckill/product/lst`, data)
}
/**
 * @description 商品列表 -- 平台分类
 */
export function categoryListApi() {
  return request.get(`store/category/list`)
}

/**
 * @description 商品添加 -- 属性规则
 */
export function templateLsitApi() {
  return request.get(`/store/attr/template/list`)
}
/**
 * @description 属性规则 -- 删除
 */
export function attrDeleteApi(id) {
  return request.delete(`store/attr/template/${id}`)
}
/**
 * @description 属性规则 -- 添加
 */
export function attrCreatApi(data) {
  return request.post('store/attr/template/create', data)
}
/**
 * @description 商户分类 -- 列表
 */
export function merCategoryListApi() {
  return request.get(`system/merchant/category_lst`)
}
/**
 * @description 商品审核 -- 详情
 */
export function productDetailApi(id) {
  return request.get(`store/product/detail/${id}`)
}
/**
 * @description 秒杀商品审核 -- 详情
 */
export function seckillProductDetailApi(id) {
  return request.get(`seckill/product/detail/${id}`)
}
/**
 * @description 商品审核 -- 表单提交
 */
export function productStatusApi(data) {
  return request.post(`store/product/status`, data)
}
/**
 * @description 秒杀商品审核 -- 表单提交
 */
export function seckillProductStatusApi(data) {
  return request.post(`seckill/product/status`, data)
}
/**
 * @description 商品列表 -- 列表表头
 */
export function lstFilterApi() {
  return request.get(`store/product/lst_filter`)
}
/**
 * @description 秒杀商品列表 -- 列表表头
 */
export function seckillLstFilterApi() {
  return request.get(`seckill/product/lst_filter`)
}
/**
 * @description 商品评论 -- 列表
 */
export function replyListApi(data) {
  return request.get(`store/reply/lst`, data)
}
/**
 * @description 商品评论 -- 添加
 */
export function replyCreateApi(id) {
  return request.get(id ? `store/reply/create/form/${id}` : `store/reply/create/form`)
}
/**
 * @description 商品评论 -- 删除
 */
export function replyDeleteApi(id) {
  return request.delete(`store/reply/delete/${id}`)
}
/**
 * @description 商品评论商品列表 -- 列表
 */
export function goodLstApi(data) {
  return request.get(`store/product/list`, data)
}
/**
 * @description 商户总
 */
export function merSelectApi() {
  return request.get(`store/product/mer_select`)
}
/**
 * @description 秒杀商户总
 */
export function seckillMerSelectApi() {
  return request.get(`seckill/product/mer_select`)
}
/**
 * @description 商品下架
 */
export function productOffApi(data) {
  return request.post(`store/product/status`, data)
}
/**
 * @description 秒杀商品下架
 */
export function seckillProductOffApi(data) {
  return request.post(`seckill/product/status`, data)
}
/**
 * @description 商品编辑
 */
export function productUpdateApi(id, data) {
  return request.post(`store/product/update/${id}`, data)
}
/**
 * @description 秒杀商品编辑
 */
export function seckillProductUpdateApi(id, data) {
  return request.post(`seckill/product/update/${id}`, data)
}
/**
 * @description 商品列表 -- 显示隐藏
 */
export function changeApi(id, status) {
  return request.post(`store/product/change/${id}`, { status })
}
/**
 * @description 秒杀商品列表 -- 显示隐藏
 */
export function seckillChangeApi(id, status) {
  return request.post(`seckill/product/change/${id}`, { status })
}
/**
 * @description 商品列表 -- 虚拟库存
 */
export function toVirtualSalesApi(id) {
  return request.get(`store/product/ficti/form/${id}`)
}
/**
 * @description 预售 -- 列表
 */
export function preSaleProListApi(data) {
  return request.get(`store/product/presell/lst`, data)
}
/**
 * @description 预售商品 -- 详情(编辑和查看)
 */
export function preSaleProDetailApi(id) {
  return request.get(`store/product/presell/get/${id}`)
}
/**
 * @description 预售商品 -- 详情(审核)
 */
export function presellProDetailApi(id) {
  return request.get(`store/product/presell/detail/${id}`)
}
/**
 * @description 预售商品 -- 编辑
 */
export function presellUpdateApi(id,data) {
  return request.post(`store/product/presell/update/${id}`,data)
}
/**
 * @description 预售商品审核 -- 表单提交
 */
export function presellProductStatusApi(data) {
  return request.post(`store/product/presell/status`, data)
}
/**
 * @description 预售商品列表 -- 显示状态（上下架）
 */
export function presellStatusApi(id, status) {
  return request.post(`store/product/presell/is_show/${id}`, { status })
}
/**
 * @description 申请管理 -- 预售协议详情
 */
export function preSellAgreeInfo() {
  return request.get(`store/product/presell/agree`)
}
/**
 * @description 申请管理 -- 预售协议保存
 */
export function preSellAgreeUpdate(data) {
  return request.post(`store/product/presell/agree`,data)
}

/**
 * @description 抢多多 -- 添加抢多多商品
 */
export function assistCreateProApi(data) {
  return request.post(`store/product/assistadmin/create`, data)
}
/**
 * @description 抢多多 -- 编辑抢多多商品
 */
export function assistUpdateProApi(id, data) {
  return request.post(`store/product/assistadmin/update/${id}`, data)
}
/**
 * @description 助力 -- 列表
 */
export function assistProListApi(data) {
  return request.get(`store/product/assist/lst`, data)
}


export function assistProListJApi(data) {
  return request.get(`store/product/list_jxs`, data)
}

/**
 * @description 助力列表 -- 详情(编辑和查看)
 */
export function assistProUpdateApi(id) {
  return request.get(`store/product/assist/get/${id}`)
}

/**
 * @description 助力列表 -- 详情(编辑和查看)
 */
export function assistDUpdateApi(id) {
  return request.get(`store/product/assist/detail/${id}`)
}
/**
 * @description 助力列表 -- 详情(审核)
 */
export function assistProDetailApi(id) {
  return request.get(`store/product/assist/detail/${id}`)
}

/**
 * @description 助力商品列表 -- 删除
 */
export function assistDeleteApi(id) {
  return request.delete(`store/product/assist/delete/${id}`)
}

/**
 * @description 助力商品审核 -- 表单提交
 */
export function assistProductStatusApi(data) {
  return request.post(`store/product/assist/status`, data)
}
/**
 * @description 助力商品列表 -- 显示状态（上下架）
 */
export function assistStatusApi(id, status) {
  return request.post(`store/product/assist/is_show/${id}`, { status })
}
/**
 * @description 助力活动 -- 列表
 */
export function assistListApi(data) {
  return request.get(`store/product/assist/set/lst`, data)
}

/**
 * @description 助力活动 -- 批量发货
 */
export function assistSetDeliveryApi(data) {
  return request.post(`store/product/assist/set/delivery`, data)
}

/**
 * @description 导出订单
 */
export function exportOrderApi(data) {
  return request.get(`store/product/assist/set/excel`,  data )
}

/**
 * @description 助力活动列表 -- 查看详情
 */
export function assistDetailApi(id, data) {
  return request.get(`store/product/assist/set/detail/${id}`, data)
}
/**
 * @description 助力商品 -- 详情(编辑和查看)
 */
export function assistReviewDetailApi(id) {
  return request.get(`store/product/assist/get/${id}`)
}
/**
 * @description 助力商品 -- 详情(编辑和查看)
 */
export function assistProductUpdateApi(id,data) {
  return request.post(`store/product/assist/update/${id}`,data)
}


/**
 * @description 助力商品 -- 详情(编辑和查看)
 */
export function assistUpdateOneApi(id,data) {
  return request.post(`store/product/assist/update_one/${id}`,data)
}
/**
 * @description 商品列表 -- 品牌分类
 */
export function categoryBrandListApi() {
  return request.get(`store/brand/lst`)
}

/**
 * @description 商品列表 -- 运费模板筛选
 */
export function shippingListApi() {
  return request.get(`store/shipping/list`)
}
/**
 * @description 配置状态
 */
export function productConfigApi() {
  return request.get(`store/product/config`)
}
/**
 * @description 商品列表 -- 商户分类
 */
export function categorySelectApi() {
  return request.get(`store/category/select`)
}
/**
 * @description 属性规则 -- 列表
 */
export function templateListApi(data) {
  return request.get('store/attr/template/lst', data)
}
/**
 * @description 属性规则 -- 编辑
 */
export function attrEdittApi(id, data) {
  return request.post(`store/attr/template/${id}`, data)
}
/**
 * @description 商品列表 -- 添加
 */
export function productCreateApi(data) {
  return request.post(`store/product/create`, data)
}
