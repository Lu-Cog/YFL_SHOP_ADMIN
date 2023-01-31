import request from './request'

/**
 * @description 文章分类 -- 列表
 */
export function articleListApi(data) {
  return request.get('system/category/article/lst', data)
}
/**
 * @description 文章分类 -- 新增表单
 */
export function articleCreateApi() {
  // return request.get('system/article/category/create/form')
  return request.get('system/category/article/create/form')
}
/**
 * @description 文章分类 -- 编辑表单
 */
export function articleUpdateApi(id) {
  // return request.get(`system/article/category/update/form/${id}`)
  return request.get(`system/category/article/update/form/${id}`)
}
/**
 * @description 文章分类 -- 删除
 */
export function articleDeleteApi(id) {
  // return request.delete(`system/article/category/delete/${id}`)
  return request.delete(`system/category/article/delete/${id}`)
}
/**
 * @description 文章分类 -- 修改开启状态
 */
export function articleStatuseApi(id, status) {
  // return request.post(`system/article/category/status/${id}`, { status })
  return request.post(`system/category/article/status/${id}`, { status })
}
/**
 * @description 文章管理 -- 列表
 */
export function articleLstApi(data) {
  return request.get('system/article/article/lst', data)
}
/**
 * @description 文章管理 -- 详情
 */
export function articleDetailApi(id) {
  return request.get(`system/article/article/detail/${id}`)
}
/**
 * @description 文章管理 -- 添加
 */
export function articleAddApi(data) {
  return request.post('system/article/article/create', data)
}
/**
 * @description 文章管理 -- 编辑
 */
export function articleEditApi(data, id) {
  return request.post(`system/article/article/update/${id}`, data)
}
/**
 * @description 文章管理 -- 删除
 */
export function articleDeleApi(id) {
  return request.delete(`system/article/article/delete/${id}`)
}


/**
 * @description 分类 -- 列表
 */
export function categoryListApi(data) {
  return request.get('system/category/category/lst',data)
}
/**
 * @description 分类 -- 新增表单
 */
export function categoryCreateApi() {
  return request.get('system/category/category/create/form')
}
/**
 * @description 分类 -- 编辑表单
 */
export function categoryUpdateApi(id) {
  return request.get(`system/category/category/update/form/${id}`)
}
/**
 * @description 分类 -- 删除
 */
export function categoryDeleteApi(id) {
  return request.delete(`system/category/category/delete/${id}`)
}
/**
 * @description 分类 -- 修改开启状态
 */
export function categoryStatuseApi(id, status) {
  return request.post(`system/category/category/status/${id}`, { status })
}




/**
 * @description 文章管理 -- 列表
 */
export function articleSchoolLstApi(data) {
  return request.get('system/article/school/lst', data)
}
/**
 * @description 文章管理 -- 详情
 */
export function articleSchoolDetailApi(id) {
  return request.get(`system/article/school/detail/${id}`)
}
/**
 * @description 文章管理 -- 添加
 */
export function articleSchoolAddApi(data) {
  return request.post('system/article/school/create', data)
}
/**
 * @description 文章管理 -- 编辑
 */
export function articleSchoolEditApi(data, id) {
  return request.post(`system/article/school/update/${id}`, data)
}
/**
 * @description 文章管理 -- 删除
 */
export function articleSchoolDeleApi(id) {
  return request.delete(`system/article/school/delete/${id}`)
}


/**
 * @description
 */
export function articleGetTempKeysApi(data) {
  return request.get(`system/article/school/temp_key`, data)
}

/**
 * 推广文案
 *
 *
 *
 */

/**
 * @description 文章管理 -- 列表
 */
export function articlePromoteLstApi(data) {
  return request.get('system/article/promote/lst', data)
}
/**
 * @description 文章管理 -- 详情
 */
export function articlePromoteDetailApi(id) {
  return request.get(`system/article/promote/detail/${id}`)
}
/**
 * @description 文章管理 -- 添加
 */
export function articlePromoteAddApi(data) {
  return request.post('system/article/promote/create', data)
}
/**
 * @description 文章管理 -- 编辑
 */
export function articlePromoteEditApi(data, id) {
  return request.post(`system/article/promote/update/${id}`, data)
}
/**
 * @description 文章管理 -- 删除
 */
export function articlePromoteDeleApi(id) {
  return request.delete(`system/article/promote/delete/${id}`)
}
/**
 * @description
 */
export function productGetTempKeysApi(data) {
  return request.get(`store/product/temp_key`, data)
}
