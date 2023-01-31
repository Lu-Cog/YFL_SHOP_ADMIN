import request from './request'
import { filterAsyncRoutes } from '@/store/modules/permission'

/**
 * @description 文章分类 -- 列表
 */
export function categoryListApi() {
  return request.get('system/category/category/lst')
}
/**
 * @description 文章分类 -- 新增表单
 */
export function categoryCreateApi() {
  console.log('categoryCreateApi')
  return request.get('system/category/category/create/form')
}
/**
 * @description 文章分类 -- 编辑表单
 */
export function categoryUpdateApi(id) {
  return request.get(`system/category/category/update/form/${id}`)
}
/**
 * @description 文章分类 -- 删除
 */
export function categoryDeleteApi(id) {
  return request.delete(`system/category/category/delete/${id}`)
}
/**
 * @description 文章分类 -- 修改开启状态
 */
export function categoryStatuseApi(id, status) {
  return request.post(`system/category/category/status/${id}`, { status })
}
/**
 * @description 文章管理 -- 列表
 */
export function categoryLstApi(data) {
  return request.get('system/category/category/lst', data)
}
/**
 * @description 文章管理 -- 详情
 */
export function categoryDetailApi(id) {
  return request.get(`system/category/category/detail/${id}`)
}
/**
 * @description 文章管理 -- 添加
 */
export function categoryAddApi(data) {
  return request.post('system/category/category/create', data)
}
/**
 * @description 文章管理 -- 编辑
 */
export function categoryEditApi(data, id) {
  return request.post(`system/category/category/update/${id}`, data)
}
/**
 * @description 文章管理 -- 删除
 */
export function categoryDeleApi(id) {
  return request.delete(`system/category/category/delete/${id}`)
}
