import request from './request'

/**
 * @description 物流公司 -- 列表
 */
export function expressListApi(data) {
  return request.get('store/express/lst', data)
}
/**
 * @description 物流公司 -- 新增表单
 */
export function expressCreateApi() {
  return request.get('store/express/create/form')
}
/**
 * @description 物流公司 -- 编辑表单
 */
export function expressUpdateApi(id) {
  return request.get(`store/express/update/form/${id}`)
}
/**
 * @description 物流公司 -- 删除
 */
export function expressDeleteApi(id) {
  return request.delete(`store/express/delete/${id}`)
}
/**
 * @description 物流公司 -- 修改开启状态
 */
export function expressStatuseApi(id, is_show) {
  return request.post(`store/express/status/${id}`, { is_show })
}


/**
 * @description 运费模板 -- 城市
 */
export function cityList() {
  return request.get('system/city/lst')
}
/**
 * @description 运费模板 -- 列表
 */
export function templateListApi(data) {
  return request.get('store/shipping/lst', data)
}
/**
 * @description 运费模板 -- 新增
 */
export function templateCreateApi(data) {
  return request.post('store/shipping/create', data)
}
/**
 * @description 运费模板 -- 编辑
 */
export function templateUpdateApi(id, data) {
  return request.post(`store/shipping/update/${id}`, data)
}
/**
 * @description 运费模板 -- 详情
 */
export function templateDetailApi(id) {
  return request.get(`/store/shipping/detail/${id}`)
}
/**
 * @description 运费模板 -- 删除
 */
export function templateDeleteApi(id) {
  return request.delete(`store/shipping/delete/${id}`)
}
