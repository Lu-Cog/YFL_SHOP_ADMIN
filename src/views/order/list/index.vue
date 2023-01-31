<template>
  <!-- 设置右侧全屏遮罩 -->
  <div class="divBox" v-loading.fullscreen.lock="fullscreenLoading">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form size="small" inline label-width="100px">
            <el-form-item label="订单状态：">
              <el-radio-group v-model="tableFrom.status" type="button" @change="getList(1)">
                <el-radio-button label="">全部
                  {{
                    "(" + orderChartType.all ? orderChartType.all : 0 + ")"
                  }}
                </el-radio-button>
                <el-radio-button label="1">待付款
                  {{
                    "(" + orderChartType.unpaid
                      ? orderChartType.unpaid
                      : 0 + ")"
                  }}
                </el-radio-button>
                <el-radio-button label="2">待发货
                  {{
                    "(" + orderChartType.unshipped
                      ? orderChartType.unshipped
                      : 0 + ")"
                  }}
                </el-radio-button>
                <el-radio-button label="3">待收货
                  {{
                    "(" + orderChartType.untake
                      ? orderChartType.untake
                      : 0 + ")"
                  }}
                </el-radio-button>
                <!-- <el-radio-button
                  label="4"
                >待评价 {{ '(' +orderChartType.unevaluate?orderChartType.unevaluate:0+ ')' }}</el-radio-button> -->
                <el-radio-button label="5">交易完成
                  {{
                    "(" + orderChartType.complete
                      ? orderChartType.complete
                      : 0 + ")"
                  }}
                </el-radio-button>
                <el-radio-button label="6">已取消
                  {{
                    "(" + orderChartType.cancel
                      ? orderChartType.cancel
                      : 0 + ")"
                  }}
                </el-radio-button>
                <el-radio-button label="7">已退款
                  {{
                    "(" + orderChartType.refund
                      ? orderChartType.refund
                      : 0 + ")"
                  }}
                </el-radio-button>
                <el-radio-button label="8">已删除
                  {{
                    "(" + orderChartType.del ? orderChartType.del : 0 + ")"
                  }}
                </el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="下单时间：" class="width100">
              <el-radio-group v-model="tableFrom.date" type="button" class="mr20" size="small"
                @change="selectChange(tableFrom.date)">
                <el-radio-button v-for="(item, i) in fromList.fromTxt" :key="i" :label="item.val">{{ item.text }}
                </el-radio-button>
              </el-radio-group>
              <el-date-picker v-model="timeVal" value-format="yyyy/MM/dd" format="yyyy/MM/dd" size="small"
                type="daterange" placement="bottom-end" placeholder="自定义时间" style="width: 250px;"
                @change="onchangeTime" />
            </el-form-item>
            <el-form-item label="发货时间：" class="width100">
              <el-radio-group v-model="tableFrom.date2" type="button" class="mr20" size="small"
                @change="selectChange2(tableFrom.date2)">
                <el-radio-button v-for="(item, i) in fromList.fromTxt" :key="i" :label="item.val">{{ item.text }}
                </el-radio-button>
              </el-radio-group>
              <el-date-picker v-model="timeVal2" value-format="yyyy/MM/dd" format="yyyy/MM/dd" size="small"
                type="daterange" placement="bottom-end" placeholder="自定义时间" style="width: 250px;"
                @change="onchangeTime2" />
            </el-form-item>

            <br>
            <el-form-item label="审核状态：">
              <el-radio-group v-model="tableFrom.sh_status" type="button" @change="getList(1)">
                <el-radio-button label="">全部</el-radio-button>
                <el-radio-button label="0">未审核</el-radio-button>
                <el-radio-button label="1">审核通过</el-radio-button>
                <el-radio-button label="2">审核失败</el-radio-button>

              </el-radio-group>
            </el-form-item>

            <el-form-item label="打印状态：">
              <el-radio-group v-model="tableFrom.print_status" type="button" @change="getList(1)">
                <el-radio-button label="">全部</el-radio-button>
                <el-radio-button label="0">未打印</el-radio-button>
                <el-radio-button label="1">已打印</el-radio-button>
              </el-radio-group>
             </el-form-item>


            <el-form-item label="订单导出：">
              <el-button size="small"  type="primary" @click="exportOrder(1)">生成订单</el-button>
              <el-button size="small" type="primary" @click="exportOrder(2)">生成产品清单</el-button>

              <el-button size="small" style="margin-left: 50px;" type="primary" @click="exportOrder(4)">生成合伙人收益</el-button>
              <el-button size="small" type="primary" @click="exportOrder(3)">生成合伙人明细</el-button>
              <el-button size="small" type="primary" @click="exportOrder(5)">生成合伙人本月团队收益</el-button>
              <el-button size="small" style="margin-left: 50px;" type="primary" @click="getExportFileList">导出已生成列表</el-button>
            </el-form-item>

            <!-- <el-form-item label="商户名称：" style="display: inline-block;">
              <el-select
                v-model="tableFrom.mer_id"
                clearable
                filterable
                placeholder="请选择"
                class="selWidth"
                @change="getList(1)"
              >
                <el-option
                  v-for="item in merSelect"
                  :key="item.mer_id"
                  :label="item.mer_name"
                  :value="item.mer_id"
                />
              </el-select>
            </el-form-item> -->

            <br>
            <el-form-item label="关键字：" class="width100" style="display: inline-block;">
              <el-input v-model="tableFrom.keywords" placeholder="请输入订单号/收货人/联系方式" class="selWidth" size="small"
                @change="getList(1)">
                <el-button slot="append" icon="el-icon-search" size="small" @click="getList(1)" />
              </el-input>
            </el-form-item>
            <el-form-item label="用户信息：" class="width100" style="display: inline-block;">
              <el-input v-model="tableFrom.username" placeholder="请输入用户手机号/姓名" class="selWidth" size="small"
                @change="getList(1)">
                <el-button slot="append" icon="el-icon-search" size="small" @click="getList(1)" />
              </el-input>
            </el-form-item>
            <el-form-item label="活动类型：" style="display: inline-block;">
              <el-select v-model="tableFrom.activity_type" clearable filterable placeholder="请选择" class="selWidth"
                @change="getList(1)">
                <el-option v-for="item in activity" :key="item.type" :label="item.name" :value="item.type" />
              </el-select>

            </el-form-item>
          </el-form>


        </div>
        <cards-data :card-lists="cardLists" />
        <el-button size="mini" style="margin-left: 0px" @click="batchPrinting">批量打印</el-button>
      </div>
      <el-table v-loading="listLoading" :data="tableData.data" style="width: 100%" size="mini" class="table"
        highlight-current-row :cell-class-name="addTdClass" @selection-change="handleSelectionChange">
        <el-table-column key="2" type="selection" width="55" />
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品总价：">
                <span>{{ props.row.total_price | filterEmpty }}</span>
              </el-form-item>
              <el-form-item label="物流费用：">
                <span>{{ props.row.total_postage | filterEmpty }}</span>
              </el-form-item>
              <el-form-item label="下单时间：">
                <span>{{ props.row.create_time | filterEmpty }}</span>
              </el-form-item>

              <el-form-item label="买家备注：">
                <span>{{ props.row.mark | filterEmpty }}</span>
              </el-form-item>
              <el-form-item label="审核备注：">
                <span>{{ props.row.remark | filterEmpty }}</span>
              </el-form-item>
              <!-- <el-form-item label="总单号：">
                <span>{{ props.row.groupOrder ? props.row.groupOrder.group_order_sn : '' }}</span>
              </el-form-item> -->
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="订单编号" min-width="170">
          <template slot-scope="scope">
            <span style="display: block;" v-text="scope.row.order_sn" />
            <span v-show="scope.row.is_del > 0" style="color: #ED4014;display: block;">用户已删除</span>
          </template>
        </el-table-column>
        <el-table-column label="订单类型" min-width="90">
          <template slot-scope="scope">
            <span>{{
              scope.row.source ? "直播订单" : "普通订单"
            }}</span>
          </template>
          <!-- scope.row.order_type == 0 ? "普通订单" : "核销订单" -->
        </el-table-column>
        <!-- <el-table-column label="活动类型" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.activity_type === 1 ? "秒杀" : scope.row.activity_type === 2 ? "预售" : scope.row.activity_type === 3 ? "助力" : "--"}}</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column prop="uid" label="买家ID" min-width="100" /> -->
        <el-table-column prop="user.real_name" label="买家姓名" min-width="80" />
        <el-table-column prop="user.phone" label="买家账号" min-width="100" />
        <!-- <el-table-column label="商户名称" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.merchant ? scope.row.merchant.mer_name :'' }}</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column prop="mer_name" label="商户类别" min-width="90">
          <template slot-scope="scope">
            <span v-if="scope.row.merchant" class="spBlock">{{ scope.row.merchant.is_trader ? '自营' : '非自营' }}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="商品信息" min-width="330">
          <template slot-scope="scope">
            <div v-for="(val, i) in scope.row.orderProduct" :key="i" class="tabBox acea-row row-middle">
              <div class="demo-image__preview">
                <el-image :src="val.cart_info.product.image" :preview-src-list="[val.cart_info.product.image]" />
              </div>
              <span class="tabBox_tit">{{ val.cart_info.product.store_name + " | "
                }}{{ val.cart_info.productAttr.sku }}</span>
              <span class="tabBox_pice">
                {{
                  "￥" +
                    val.cart_info.productAttr.price +
                    " x " +
                    val.product_num
                }}
                <em v-if="val.refund_num < val.product_num && val.refund_num > 0"
                  style="color: red;font-style: normal;">(-{{ val.product_num - val.refund_num }})</em>
              </span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="订单金额" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.total_price }}</span>
          </template>
        </el-table-column>
        <el-table-column label="实际支付" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.pay_price }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="支付类型" min-width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.paid === 1">{{ scope.row.pay_type == 0 ? "余额支付" : (scope.row.pay_type == 1 || scope.row.pay_type == 2 || scope.row.pay_type == 3) ? "微信支付" : "支付宝支付" }}</span>
            <span v-else>--</span>
          </template>
        </el-table-column> -->
        <el-table-column label="支付状态" min-width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.paid == 0 ? "未支付" : (scope.row.paid == 1 ? "已支付":"部分支付") }}</span>
          </template>
        </el-table-column>
        <el-table-column label="订单状态" min-width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.is_del === 0">
              <span v-if="scope.row.status != -2">
                <span v-if="scope.row.paid === 0">待支付</span>
                <span v-else-if="scope.row.order_type === 0">{{
                  scope.row.status | orderStatusFilter
                }}</span>
                <span v-else>{{ scope.row.status | takeOrderStatusFilter }}</span>

              </span>
              <span v-else>已取消</span>
            </span>
            <span v-else>已删除</span>
          </template>
        </el-table-column>

        <el-table-column label="审核状态" min-width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.sh_status === 0">未审核</span>
            <span v-else-if="scope.row.sh_status === 1">成功</span>
            <span v-else>失败</span>
          </template>
        </el-table-column>

        <el-table-column label="打印状态" min-width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.print_status === 0">未打印</span>
            <span v-else>已打印</span>
          </template>
        </el-table-column>


        <el-table-column prop="serviceScore" label="下单时间" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.create_time }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="serviceScore" label="发货时间" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.delivery_time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="180" fixed="right" align="center">
          <!-- <template slot-scope="scope">
            <span v-for="(val, i ) in scope.row.orderProduct" :key="i">
              <el-button
                v-if="orderFilter(scope.row)"
                type="text"
                size="small"
                @click="onRefundDetail(scope.row.order_sn)"
              >查看退款单</el-button>
            </span>
          </template> -->

          <template slot-scope="scope">
            <!--<span v-for="(val, i ) in scope.row.orderProduct" :key="i">
                    <el-button v-if="orderFilter(scope.row) " type="text" size="small" @click="onRefundDetail(scope.row.order_sn)">查看退款单</el-button>
                </span>-->
            <el-button type="text" size="small" @click="onOrderDetails(scope.row.order_id)">查看</el-button>
            <el-button type="text" size="small" v-if="scope.row.paid === 0  && scope.row.status === 0 && scope.row.is_del === 0"
              @click="update(scope.row.order_id)"  >改单</el-button>
            <el-button type="text" size="small" class="mr10"
              v-if="scope.row.paid === 0 && scope.row.status === 0 && scope.row.is_del === 0"
              @click="onOrderPay(scope.row.order_id)">支付</el-button>
              <el-button type="text" v-if="false" size="small" class="mr10"
                @click="onOrderPay(scope.row.order_id,1)">重扣邮费</el-button>
            <el-button type="text" size="small" class="mr10" v-if="
                      scope.row.order_type == 0 &&
                        scope.row.status === 0 &&
                        scope.row.paid === 1 &&
                        scope.row.sh_status === 0 &&
                        scope.row.is_del === 0
                    " @click.native="sh_status(scope.row.order_id)">审核</el-button>

            <el-button type="text" size="small" class="mr10" v-if="
                scope.row.order_type == 0 &&
                  scope.row.status === 0 &&
                  scope.row.paid === 1 &&
                  scope.row.sh_status === 1
              " @click="send(scope.row.order_id)">发货</el-button>
            <!-- <el-button v-if="scope.row.order_type == 1 && scope.row.paid == 1 && scope.row.status == 0" type="text" size="small" class="mr10" @click="handleCancellation(scope.row.verify_code)">去核销</el-button> -->
            <!-- <el-button v-if="orderFilter(scope.row) " type="text" size="small" @click="onRefundDetail(scope.row.order_sn)">查看退款单</el-button> -->
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                &nbsp;&nbsp;更多
                <i class="el-icon-arrow-down el-icon--right" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <!-- <el-dropdown-item  @click.native="update(scope.row.order_id)">修改订单</el-dropdown-item> -->
                <el-dropdown-item @click.native="cancel(scope.row.order_id)">修改状态</el-dropdown-item>
                <el-dropdown-item v-if="scope.row.status >= 0" @click.native="tuikuan(scope.row.order_id)">取消并退款
                </el-dropdown-item>

                <el-dropdown-item @click.native="onOrderMark(scope.row.order_id)">添加备注</el-dropdown-item>
                <el-dropdown-item @click.native="onOrderLog(scope.row.order_id)">订单记录</el-dropdown-item>
                <el-dropdown-item v-if="scope.row.paid === 1 && scope.row.status >= 0"
                  @click.native="open(scope.row.order_id)">打印订单</el-dropdown-item>
                <!-- <el-dropdown-item v-if="scope.row.is_del !== 0" @click.native="handleDelete(scope.row, scope.$index)">删除订单</el-dropdown-item> -->

              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination :page-sizes="[20, 40, 60, 80]" :page-size="tableFrom.limit" :current-page="tableFrom.page"
          layout="total, sizes, prev, pager, next, jumper" :total="tableData.total" @size-change="handleSizeChange"
          @current-change="pageChange" />
      </div>
    </el-card>
    <!-- dayin -->
    <el-dialog :visible.sync="dialogFormVisible" :show-close="false" width="70%" top="5vh">
      <div id="print_demo">
        <div id="print_item" v-for="(item,index) in daYiInfo">
          <div class="title">深圳市翌芙莱化妆品有限公司 发货单</div>
          <div style="text-align: center;">
            <table cellspacing="0" border="1">
              <tr>
                <td class="w1">订单编号</td>
                <td colspan="6" class="w6">{{ item.order_sn }}</td>
                <td class="w1">下单日期</td>
                <td colspan="2" class="w2">{{ item.create_time }}</td>
              </tr>
              <tr>
                <td class="w1">客户名称</td>
                <td colspan="3" class="w3">{{ item.user.real_name }}</td>
                <td class="w">手机号</td>
                <td colspan="2" class="w2">{{ item.user.phone }}</td>
                <td class="w1">收货人姓名</td>
                <td colspan="2" class="w2">{{ item.real_name }}</td>
              </tr>
              <tr>
                <td class="w1">收货地址</td>
                <td colspan="6" class="w6">
                  {{ item.user_address }}
                </td>
                <td class="w1">收货人手机</td>
                <td colspan="2" class="w2">{{ item.user_phone }}</td>
              </tr>
              <tr>
                <td class="w1">订单备注</td>
                <td colspan="9" class="w9">{{ item.remark }}</td>
              </tr>
              <tr>
                <td colspan="3" class="w3">商品名称</td>
                <td colspan="2" class="w2">商品规格</td>
                <td class="w">单位</td>
                <td class="w">编码</td>
                <td class="w1">订购数量</td>
                <td colspan="2" class="w2">商品备注</td>
              </tr>

              <tr v-for="(value, key) in item.orderProduct" :key="key">
                <td colspan="3" class="w3">{{ value.store_name }}</td>
                <td colspan="2" class="w2">{{ value.sku }}</td>
                <td class="w">{{ value.unit_name }}</td>
                <td class="w">{{ value.bar_code }}</td>
                <td class="w1">{{ value.product_num }}</td>
                <td colspan="2" class="w2"></td>
              </tr>
              <tr>
                <td colspan="7" class="w7">商品合计数量</td>
                <td class="w1">{{ item.total_num }}</td>
                <td class="w">订单运费</td>
                <td class="w">{{ item.total_postage }}元</td>
              </tr>
              <tr>
                <td class="w">发货人</td>
                <td colspan="6" class="w6"></td>
                <td class="w1">收货人签名</td>
                <td colspan="2" class="w2"></td>
              </tr>
            </table>
          </div>
        </div>

      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" v-print="'#print_demo'" @click="printOrder()">打 印</el-button>
        <!-- <el-button type="primary" v-print="'#print_demo'" @click="printOrder(item.order_id)">打 印</el-button> -->
      </div>
    </el-dialog>
    <!--记录-->
    <el-dialog title="操作记录" :visible.sync="dialogVisible" width="700px">
      <el-table v-loading="LogLoading" border :data="tableDataLog.data" style="width: 100%">
        <el-table-column prop="order_id" align="center" label="订单ID" min-width="80" />
        <el-table-column prop="change_message" label="操作记录" align="center" min-width="280" />
        <el-table-column prop="change_time" label="操作时间" align="center" min-width="280" />
      </el-table>
      <div class="block">
        <el-pagination :page-sizes="[20, 40, 60, 80]" :page-size="tableFromLog.limit" :current-page="tableFromLog.page"
          layout="total, sizes, prev, pager, next, jumper" :total="tableDataLog.total"
          @size-change="handleSizeChangeLog" @current-change="pageChangeLog" />
      </div>
    </el-dialog>

    <!--详情-->
    <details-from ref="orderDetail" />
    <!--导出订单列表-->
    <file-list ref="exportList" />
  </div>
</template>

<script>
  import {
    orderListApi,
    chartApi,
    orderUpdateApi,
    orderDeliveryApi,
    orderDetailApi,
    orderLogApi,
    orderPayApi,
    orderTkApi,
    orderUpdateFormApi,
    orderShFormApi,
    onOrderUpdateApi,
    orderDeleteApi,
    orderRemarkApi,
    orderPrintApi,
    exportOrderApi,
    orderCancellationApi,
    orderHeadListApi
  } from "@/api/order";
  import {
    merSelectApi
  } from "@/api/product";
  import detailsFrom from "./orderDetail";
  import cardsData from "@/components/cards/index";
  import fileList from "@/components/exportFile/fileList";
  import {
    fromList
  } from "@/libs/constants.js";
  export default {
    components: {
      detailsFrom,
      cardsData,
      fileList
    },
    data() {
      return {
        fullscreenLoading:false,  //遮罩
        daYiInfo: [],
        daYiUser: [],
        fileVisible: false,
        daYiGoods: [],
        dialogFormVisible: false,
        orderId: 0,
        print_id: 0,  //打印ID，可能是多个
        tableData: {
          data: [],
          total: 0
        },
        activity: [{
            name: "普通订单",
            type: 0
          },
          // {name: "秒杀订单",type: 1},
          // {name: "预售订单",type: 2},
          {
            name: "活动订单",
            type: 3
          }
        ],
        listLoading: true,
        tableFrom: {
          order_sn: this.$route.query.order_sn ? this.$route.query.order_sn : "",
          keywords: "",
          username: "",
          status: "",
          sh_status: "",
          print_status: "",
          date: "",
          date2: "",
          mer_id: "",
          excel_type: 0,  //导出类型
          page: 1,
          limit: 20,
          is_trader: "",
          activity_type: ""
        },
        orderChartType: {},
        timeVal: [],
        timeVal2: [],
        fromList: fromList,
        selectionList: [],
        ids: "",
        tableFromLog: {
          page: 1,
          limit: 10
        },
        tableFromCancel: {
          paid: 0,
          status: -2,
          remark: ""
        },
        tableDataLog: {
          data: [],
          total: 0
        },
        LogLoading: false,
        dialogVisible: false,
        cardLists: [],
        orderDatalist: null,
        merSelect: [],
        multipleSelection:[],
        order_ids:[]
      };
    },
    mounted() {
      if (this.$route.query.hasOwnProperty("order_sn")) {
        this.tableFrom.order_sn = this.$route.query.order_sn;
      } else {
        this.tableFrom.order_sn = "";
      }
      this.getMerSelect();
      this.getList();
    },
    // 被缓存接收参数
    activated() {
      if (this.$route.query.hasOwnProperty("order_sn")) {
        this.tableFrom.order_sn = this.$route.query.order_sn;
      } else {
        this.tableFrom.order_sn = "";
      }
      // this.headerList();
      this.getMerSelect();
      this.getList();
    },
    methods: {
      handleSelectionChange(val) {
          this.multipleSelection = val
          const data = []
          this.multipleSelection.map((item) => {
              data.push(item.order_id)
          })
          this.order_ids = data
      },
      batchPrinting() {
        if (this.multipleSelection.length === 0) return this.$message.warning('请先选择订单')
        this.$confirm('此操作打印, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '暂未开通!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      },
      getExportFileList() {
        this.fileVisible = true;
        this.$refs.exportList.exportFileList("order");
      },
      // 导出
      exportOrder(type = 1) {

        this.tableFrom.excel_type = type;
        exportOrderApi(this.tableFrom, type)
          .then(res => {
            /*this.$message.success(res.message);
            this.fileVisible = true;
            this.$refs.exportList.exportFileList();*/
            const h = this.$createElement;
            this.$msgbox({
              title: "提示",
              message: h("p", null, [
                h("span", null, '文件正在生成中，请稍后点击"'),
                h("span", {
                  style: "color: teal"
                }, "导出已生成列表"),
                h("span", null, '"查看~ ')
              ]),
              confirmButtonText: "我知道了"
            }).then(action => {});
          })
          .catch(res => {
            this.$message.error(res.message);
          });
      },
      open(id) {
        orderDetailApi(id).then(res => {
          this.daYiInfo = [res.data];
          if(this.daYiInfo.length==1){
            this.print_id = this.daYiInfo[0]["order_id"];
          }
          // this.daYiGoods = res.data.orderProduct;
          // this.daYiUser = res.data.user;
        });
        this.dialogFormVisible = true;
      },

      // 订单筛选
      orderFilter(item) {
        let status = false;
        item.orderProduct.forEach(el => {
          if (el.refund_num > 0 && el.refund_num < el.product_num) {
            status = true;
          }
        });
        return status;
      },
      // 表格某一行添加特定的样式
      addTdClass(val) {
        if (val.row.status > 0 && val.row.paid == 1) {
          for (let i = 0; i < val.row.orderProduct.length; i++) {
            if (
              val.row.orderProduct[i].refund_num > 0 &&
              val.row.orderProduct[i].refund_num <
              val.row.orderProduct[i].product_num
            ) {
              return "row-bg";
            }
          }
        } else {
          return " ";
        }
      },
      // 商户列表；
      getMerSelect() {
        merSelectApi()
          .then(res => {
            this.merSelect = res.data;
          })
          .catch(res => {
            this.$message.error(res.message);
          });
      },
      // 编辑
      edit(id) {
        this.$modalForm(orderUpdateApi(id)).then(() => this.getList(""));
      },
      // 发货
      send(id) {
        this.$modalForm(orderDeliveryApi(id)).then(() => this.getList(""));
      },
      // 取消
      cancel(id) {
        this.$modalForm(orderUpdateFormApi(id)).then(() => this.getList(""));
      },
      update(id){
        this.$router.push(`update/${id}`)
      },
      // 审核
      sh_status(id) {
        this.$modalForm(orderShFormApi(id)).then(() => this.getList(""));
      },
      // 详情
      onOrderDetails(id) {
        this.orderId = id;
        this.$refs.orderDetail.dialogVisible = true;
        this.$refs.orderDetail.onOrderDetails(id);
      },

      // 支付 onleyDev 是否只扣邮费
      onOrderPay(id,onleyDev=0) {
        this.$confirm('确定要发起支付吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          //开启遮罩
          this.fullscreenLoading = true;

          orderPayApi(id,{onleyDev:onleyDev})
            .then(res => {

              //关闭遮罩
              this.fullscreenLoading = false;
              this.LogLoading = false;
              this.$message.success(res.message);
              this.getList();
            })
            .catch(res => {
              this.$message.error(res.message);
              this.LogLoading = false;
            });

        }).catch(() => {
          that.loading = false
        })
      },

      // 退款
      tuikuan(id) {
        this.$confirm('确定要执行退款吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          //开启遮罩
          this.fullscreenLoading = true;

          orderTkApi(id)
            .then(res => {
              //关闭遮罩
              this.fullscreenLoading = false;

              this.LogLoading = false;
              this.$message.success(res.message);
              this.getList();
            })
            .catch(res => {
              this.$message.error(res.message);
              this.LogLoading = false;
            });

        }).catch(() => {
          that.loading = false
        })
      },
      // 退款详情页
      onRefundDetail(sn) {
        console.log(sn, "sn");
        this.$router.push({
          path: "refund",
          query: {
            sn: sn
          }
        });
      },

      // 取消订单（未支付）
      onOrderUpdateApi(id) {
        onOrderUpdateApi(id, this.tableFromCancel)
          .then(res => {
            console.log(res);
            this.LogLoading = false;
            this.$message.success(res.message);
            this.getList();
          })
          .catch(res => {
            this.$message.error(res.message);
            this.LogLoading = false;
          });
      },
      // 订单记录
      onOrderLog(id) {
        this.dialogVisible = true;
        this.LogLoading = true;
        orderLogApi(id, this.tableFromLog)
          .then(res => {
            this.tableDataLog.data = res.data.list;
            this.tableDataLog.total = res.data.count;
            this.LogLoading = false;
          })
          .catch(res => {
            this.$message.error(res.message);
            this.LogLoading = false;
          });
      },
      // 去核销
      handleCancellation(code) {
        this.$confirm("确定核销此订单?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            orderCancellationApi(code)
              .then(res => {
                this.$message.success(res.message);
                this.getList("");
              })
              .catch(res => {
                this.$message.error(res.message);
                this.LogLoading = false;
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消核销"
            });
          });
      },
      // 打印订单
      printOrder() {
        orderPrintApi(this.print_id)
          .then(res => {
            this.$message.success(res.message);
            this.tableFrom.page = 1;
            this.getList("");
          })
          .catch(res => {
            this.$message.error(res.message);
            this.dialogFormVisible = false
          });
        this.dialogFormVisible = false
      },
      // 订单删除
      handleDelete(row, idx) {
        if (row.is_del === 1) {
          this.$modalSure().then(() => {
            orderDeleteApi(row.order_id)
              .then(({
                message
              }) => {
                this.$message.success(message);
                this.tableData.data.splice(idx, 1);
              })
              .catch(({
                message
              }) => {
                this.$message.error(message);
              });
          });
        } else {
          this.$confirm(
            "您选择的的订单存在用户未删除的订单，无法删除用户未删除的订单！",
            "提示", {
              confirmButtonText: "确定",
              type: "error"
            }
          );
        }
      },
      // 备注
      onOrderMark(id) {
        this.$modalForm(orderRemarkApi(id)).then(() => this.getList(""));
      },
      pageChangeLog(page) {
        this.tableFromLog.page = page;
        this.getList();
      },
      handleSizeChangeLog(val) {
        this.tableFromLog.limit = val;
        this.getList();
      },
      // 选择时间
      selectChange(tab) {
        this.tableFrom.date = tab;
        this.tableFrom.page = 1;
        this.timeVal = [];
        this.getList();
      },
      selectChange2(tab) {
        this.tableFrom.date2 = tab;
        this.tableFrom.page = 1;
        this.timeVal2 = [];
        this.getList();
      },
      // 具体日期
      onchangeTime(e) {
        this.timeVal = e;
        this.tableFrom.date = e ? this.timeVal.join("-") : "";
        this.tableFrom.page = 1;
        this.getList();
      },
      onchangeTime2(e) {
        this.timeVal2 = e;
        this.tableFrom.date2 = e ? this.timeVal2.join("-") : "";
        this.tableFrom.page = 1;
        this.getList();
      },
      // 列表
      getList(num) {
        //先刷新统计数据
        this.headerList();

        this.listLoading = true;
        this.tableFrom.page = num ? num : this.tableFrom.page;
        orderListApi(this.tableFrom)
          .then(res => {
            this.tableData.data = res.data.list;
            this.tableData.total = res.data.count;
            this.cardLists = res.data.stat;
            this.listLoading = false;
          })
          .catch(res => {
            this.$message.error(res.message);
            this.listLoading = false;
          });
      },
      pageChange(page) {
        this.tableFrom.page = page;
        this.getList();
      },
      handleSizeChange(val) {
        this.tableFrom.limit = val;
        this.getList();
      },
      headerList() {
        chartApi()
          .then(res => {
            this.orderChartType = res.data;
          })
          .catch(res => {
            this.$message.error(res.message);
          });
      }
    }
  };
</script>



<style lang="scss" scoped>
  #print_item{
    min-height: 70vh;
  }
  .demo-table-expand {
    /deep/ label {
      width: 83px !important;
    }
  }

  .selWidth {
    width: 300px;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409eff;
    font-size: 12px;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }

  .tabBox_tit {
    width: 60%;
    font-size: 12px !important;
    margin: 0 2px 0 10px;
    letter-spacing: 1px;
    padding: 5px 0;
    box-sizing: border-box;
  }

  /deep/.row-bg {
    .cell {
      color: red !important;
    }
  }

  .title {
    text-align: center;
    font-weight: 700;
    font-size: 20px;
    padding: 20px 0;
  }

  td {
    height: 24px;
    border-top: none;
    border-left: none;
  }

  tr td:last-child {
    border-right: none;
  }

  tr:last-child td {
    border-bottom: none;
  }

  td.w {
    width: 10%;
  }

  table {
    width: 98%;
  }

  td.w6 {
    width: 56%;
  }

  td.w2 {
    width: 20%;
  }

  td.w3 {
    width: 26%;
  }

  td.w9 {
    width: 88%;
  }

  td.w7 {
    width: 68%;
  }

  td.w1 {
    width: 12%;
  }
</style>
