// 公共过滤器
export function filterEmpty(val) {
  let _result = '-'
  if (!val) {
    return _result
  }
  _result = val
  return _result
}
export function filterYesOrNo(value) {
  return value ? '是' : '否'
}

export function filterShowOrHide(value) {
  return value ? '显示' : '不显示'
}

export function filterShowOrHideForFormConfig(value) {
  return value === '‘0’' ? '显示' : '不显示'
}

export function filterYesOrNoIs(value) {
  return value ? '否' : '是'
}

/**
 * @description 公众号回复类型
 */
export function keywordStatusFilter(status) {
  const statusMap = {
    'text': '文字消息',
    'image': '图片消息',
    'news': '图文消息',
    'voice': '声音消息'
  }
  return statusMap[status]
}

/**
 * @description 订单对账类型
 */
export function reconciliationFilter(value) {
  return value > 0 ? '已对账' : '未对账'
}

/**
 * @description 订单支付类型
 */
export function payTypeFilter(status) {
  const statusMap = {
    '0': '余额',
    '1': '微信',
    '2': '微信',
    '3': '微信',
    '4': '支付宝',
    '5': '支付宝'
  }
  return statusMap[status]
}

 export function getAccountName(name){

    if(name == "" || name == undefined) return "";
    const arr = {
      margin:"保证金",
      first_batch:"首批账户",
      now_money:"现金账户",
      activity_principal:"活动本金",
      activity_bonus:"返点账户",
      reward_account:"奖励账户",
      especially:"老代理",
      ybk:"YBK",
      brokerage_price:"佣金账户",
    };
    return arr[name];
  }

 export function getBillType(name){
   if(name == "" || name == undefined) return "";
   const arr = {
     1:"充值",
     2:"系统充值",
     3:"系统扣款",
     4:"批发货款",
     5:"批发运费",
     6:"批发退货款",
     7:"批发退运费",
   };
   return arr[name];
 }
/**
 * @description 订单支付类型
 */
export function rechargeTypeFilter(status) {
  const statusMap = {
    'h5': '微信',
    'wechat': '微信',
    'routine': '小程序'
  }
  return statusMap[status]
}

/**
 * @description 退款单状态
 */
export function orderRefundFilter(status) {
  const statusMap = {
    '0': ':待审核',
    '-1': '审核未通过',
    '1': '待退货',
    '2': '待收货',
    '3': '已退款'
  }
  return statusMap[status]
}
/**
 * @description 优惠券使用类型
 */
export function couponUseTypeFilter(status) {
  const statusMap = {
    0: '领取',
    1: '赠送券',
    2: '领取'
  }
  return statusMap[status]
}
/**
 * @description 提现方式
 */
export function extractTypeFilter(status) {
  const statusMap = {
    0: '银行卡',
    1: '微信',
    2: '支付宝',
    3: '已退款'
  }
  return statusMap[status]
}

/**
 * @description 提现方式
 */
export function extractStatusFilter(status) {
  const statusMap = {
    '0': '审核中',
    '-1': '已拒绝',
    '1': '已通过'
  }
  return statusMap[status]
}

/**
 * @description 支付状态
 */
export function payStatusFilter(status) {
  const statusMap = {
    '0': '未审核',
    '1': '客服审核不通过',
    '2': '客服审核通过',
    '3': '财务审核不通过',
    '4': '财务审核通过',
  }
  return statusMap[status]
}

/**
 * @description 商家支付状态
 */
export function rechargeStatusFilter(status) {
  const statusMap = {
    0: '待客服审核',
    1: '客服拒绝',
    2: '待财务审核',
    3: '财务拒绝',
    4: '充值完成',
  }
  return statusMap[status]
}


/**
 * @description 订单状态
 */
export function orderStatusFilter(status) {
  const statusMap = {
    '0': '待发货',
    '1': '待收货',
    '2': '待评价',
    '3': '已完成',
    '-1': '已退款',
    '-2': '已取消',
    '10': '待付尾款',
    '11': '尾款过期未付'
  }
  return statusMap[status]
}
/**
 * @description 自提订单状态
 */
export function takeOrderStatusFilter(status) {
  const statusMap = {
    '0': '待提货',
    '1': '待提货',
    '2': '待评价',
    '3': '已完成',
    '-1': '已退款',
    '-2': '已取消'
  }
  return statusMap[status]
}
/**
 * @description 转账状态
 */
export function accountStatusFilter(status) {
  const statusMap = {
    0: '未转账',
    1: '已转账'
  }
  return statusMap[status]
}

/**
 * @description 对账状态
 */
export function reconciliationStatusFilter(status) {
  const statusMap = {
    0: '未确认',
    1: '已拒绝',
    2: '已确认'
  }
  return statusMap[status]
}

/**
 * @description 优惠券类型
 */
export function couponTypeFilter(status) {
  const statusMap = {
    0: '店铺券',
    1: '商品券'
  }
  return statusMap[status]
}

/**
 * @description 是否开启
 */
export function filterOpen(value) {
  return value ? '开启' : '未开启'
}
/**
 * @description 直播状态
 */
export function broadcastStatusFilter(status) {
  const statusMap = {
    101: '直播中',
    102: '未开始',
    103: '已结束',
    104: '禁播',
    105: '暂停',
    106: '异常',
    107: '已过期'
  }
  return statusMap[status]
}
/**
 * @description 直播审核状态
 */
export function liveReviewStatusFilter(status) {
  const statusMap = {
    '0': '未审核',
    '1': '微信审核中',
    '2': '审核通过',
    '-1': '审核未通过'
  }
  return statusMap[status]
}
/**
 * @description 直播间类型
 */
export function broadcastType(type) {
  const typeMap = {
    0: '手机直播',
    1: '推流'
  }
  return typeMap[type]
}
/**
 * @description 直播显示类型
 */
export function broadcastDisplayType(type) {
  const typeMap = {
    0: '竖屏',
    1: '横屏'
  }
  return typeMap[type]
}
/**
 * @description 是否关闭点赞、评论
 */
export function filterClose(value) {
  return value ? '✖' : '✔'
}
/**
 * @description 资金明细订单类型
 */
export function transactionTypeFilter(type) {
  const typeMap = {
    'sys_accoubts': '财务对账',
    'refund_order': '退款订单',
    'brokerage_one': '一级分佣',
    'brokerage_two': '二级分佣',
    'refund_brokerage_one': '返还一级分佣',
    'refund_brokerage_two': '返还二级分佣',
    'order': '订单支付'
  }
  return typeMap[type]
}
/**
 * @description 导出订单状态
 */
export function exportOrderStatusFilter(status) {
  const statusMap = {
    '0': '正在导出，请稍后再来',
    '1': '完成',
    '2': '失败'
  }
  return statusMap[status]
}
/**
 * @description 秒杀状态
 */
export function seckillStatusFilter(status) {
  const statusMap = {
    '0': '未开始',
    '1': '正在进行',
    '-1': '已结束'
  }
  return statusMap[status]
}
