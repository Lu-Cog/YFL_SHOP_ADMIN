import request from './request'

/**
 * @description 订单 -- 列表
 */
export function orderListApi(data) {
  return request.get('order/lst', data)
}

export function orderMerListApi(data) {
  return request.get('merchant/order/clst/0', data)
}

/**
 * @description 订单 -- 表头
 */
export function chartApi() {
  return request.get('order/chart')
}

/**
 * @description 订单 -- 编辑
 */
export function orderUpdateApi(id) {
  return request.get(`store/order/update/${id}/form`)
}


export function categoryTypeApi(data) {
  return request.get(`store/product/list_jxs_type`,data)
}

/**
 * @description 订单 -- 发货
 */
export function orderDeliveryApi(id) {
  return request.get(`store/order/delivery/${id}/form`)
}


export function updateJxssApi(oid,data) {
  return request.post(`store/product/update_jxs/${oid}`,data)
}
/**
 * @description 订单 -- 详情
 */
export function orderDetailApi(id) {
  return request.get(`order/detail/${id}`)
}

export function orderLstDetailApi(id) {
  return request.get(`order/lst_detail/${id}`)
}

/**
 * @description 订单 -- 记录
 */
export function orderLogApi(id, data) {
  return request.get(`store/order/log/${id}`, data)
}

/**
 * @description 订单 -- 审核弹窗
 */
export function orderShFormApi(id) {
  return request.get(`order/sh_status/${id}`)
}

/**
 * @description 订单 -- 取消弹窗
 */
export function orderUpdateFormApi(id) {
  return request.get(`order/update_status/${id}`)
}

/**
 * @description 订单 -- 取消
 */
export function onOrderUpdateApi(id, data) {
  return request.get(`order/update_do/${id}`, data)
}
/**
 * @description 订单 -- 支付
 */
export function orderPayApi(id,data) {
  return request.get(`order/admin_pay/${id}`,data)
}

/**
 * @description 订单 -- 退款
 */
export function orderTkApi(id) {
  return request.get(`order/refund/tuikuan/${id}`)
}

export function orderMerTkApi(id) {
  return request.get(`merchant/order/refund/tuikuan/${id}`)
}

/**
 * @description 订单 -- 备注from
 */
export function orderRemarkApi(id) {
  return request.get(`store/order/remark/${id}/form`)
}

/**
 * @description 订单 -- 删除
 */
export function orderDeleteApi(id) {
  return request.post(`store/order/delete/${id}`)
}
/**
 * @description 订单 -- 打印
 */
export function orderPrintApi(id) {
  return request.get(`store/order/printer/${id}`)
}

/**
 * @description 退款订单 -- 列表
 */
export function refundorderListApi(data) {
  return request.get('order/refund/lst', data)
}

/**
 * @description 获取物流信息
 */
export function getExpress(id) {
  return request.get(`order/express/${id}`)
}
/**
 * @description 导出订单
 */
export function exportOrderApi(data,type=1) {
  if(type == 1){
    return request.get(`order/excel`,  data )
  }else if(type == 2){
    return request.get(`order/excel_product`,  data )
  }else if(type == 3||type ==4 || type ==5){
    return request.get(`order/excel_partner`,  data )
  }
}
/**
 * @description 导出文件列表
 */
export function exportFileLstApi(data) {
  return request.get(`excel/lst`, data)
}
/**
 * @description 下载
 */
export function downloadFileApi(id) {
  return request.get(`excel/download/${id}`)
}
/**
 * @description 核销订单 -- 表头
 */
export function takeChartApi() {
  return request.get('order/takechart')
}
/**
 * @description 核销订单 -- 列表
 */
export function takeOrderListApi(data) {
  return request.get('order/takelst', data)
}

/**
 * @description 核销订单 -- 列表
 */
export function deleteGoodsApi(oid,gid,data) {
  return request.get(`order/update_goods_del/${oid}/${gid}`,data)
}

/**
 * @description 核销订单 -- 列表
 */
export function updateGoodsApi(oid,data) {
  return request.post(`order/update_goods/${oid}`,data)
}
/**
 * @description 商品列表 -- 列表
 */
export function productLstApi() {
  return request.get(`order/product/lst`)
}

/**
 * @description 新增订单 -- 列表
 */
export function addGoodsApi(oid,data) {
  return request.post(`order/add_goods/${oid}`,data)
}


/**
 * @description 商品添加 -- 属性规则
 */
export function templateLsitApi(id) {
  return request.get(`order/attr/template/list/${id}`)
}
