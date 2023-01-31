import request from './request'

/**
 * @description 提现 -- 列表
 */
export function extractListApi(data) {
  return request.get('user/extract/lst', data)
}

/**
 * @description 提现 -- 审核
 */
export function extractStatusApi(id, data) {
  return request.post(`user/extract/status/${id}`, data)
}

/**
 * @description 充值记录 -- 列表
 */
export function rechargeListApi(data) {
  return request.get(`user/recharge/list`, data)
}

/**
 * @description 代理充值记录 -- 列表
 */
export function agentRechargeListApi(data) {
  return request.get(`user/recharge/agent_list`, data)
}


/**
 * @description 充值记录 -- 统计
 */
export function rechargeTotalApi() {
  return request.get(`user/recharge/total`)
}

/**
 * @description 充值记录 -- 统计
 */
export function rechargeDetailApi(id) {
  return request.get(`user/show/${id}`)
}

/**
 * @description 充值记录 -- 统计
 */
export function agentRechargeTotalApi() {
  return request.get(`user/recharge/agent_total`)
}
/**
 * @description 充值记录 -- 统计
 */
export function rechargeAgentTotalApi(data) {
  return request.get(`user/recharge/agent_total`, data)
}

/**
 * @description 充值 -- 导出
 */
export function exportOrderApi(data) {
  return request.get(`user/recharge/export`, data)
}


/**
 * @description 资金记录 -- 列表
 */
export function billListApi(data) {
  return request.get(`bill/list`, data)
}

/**
 * @description 资金记录 -- 记录类型
 */
export function billTypeApi() {
  return request.get(`bill/type`)
}

/**
 * @description 财务对账 -- 对账单列表
 */
export function reconciliationListApi(data) {
  return request.get(`merchant/order/reconciliation/lst`, data)
}

/**
 * @description 财务对账 -- 确认打款
 */
export function reconciliationStatusApi(id, data) {
  return request.post(`merchant/order/reconciliation/status/${id}`, data)
}

/**
 * @description 财务对账 -- 查看订单
 */
export function reconciliationOrderApi(id, data) {
  return request.get(`merchant/order/reconciliation/${id}/order`, data)
}

/**
 * @description 财务对账 -- 退款订单
 */
export function reconciliationRefundApi(id, data) {
  return request.get(`merchant/order/reconciliation/${id}/refund`, data)
}

/**
 * @description 财务对账 -- 备注
 */
export function reconciliationMarkApi(id) {
  return request.get(`merchant/order/reconciliation/mark/${id}/form`)
}
/**
 * @description 资金流水 -- 列表
 */
export function capitalFlowLstApi(data) {
  return request.get(`financial_record/list`, data)
}

/**
 * @description 资金流水 -- 列表
 */
export function billMerlistApi(data) {
  return request.get(`bill/mer_list`, data)
}

/**
 * @description 资金流水 -- 单项红冲
 */
export function orderSimpleTk(id) {
  return request.get(`bill/mer_list_tk/`+ id)
}
/**
 * @description 资金流水 -- 导出
 */
export function capitalFlowExportApi() {
  return request.get(`financial_record/export`)
}


/**
 * @description 添加充值
 */
export function dataServiceAddApi() {
  return request.get('user/recharge/add_form')
}

/**
 * @description 客服审核
 */
export function dataServiceUpdateApi(id) {
  return request.get('user/recharge/service_form/' + id)
}
/**
 * @description 财务审核
 */
export function dataAdminUpdateApi(id) {
  return request.get('user/recharge/admin_form/' + id)
}

/**
 * @description 财务红冲
 */
export function dataAdminUpdateHc(id) {
  return request.post('user/recharge/admin_update_hc/' + id)
}
