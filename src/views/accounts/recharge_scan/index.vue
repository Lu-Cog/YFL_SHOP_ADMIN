<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- <el-button size="small" type="primary" class="mb20" @click="onAdd">添加充值</el-button> -->
        <div class="container">
          <el-form size="small" label-width="100px">
            <el-form-item label="提交日期：" class="width100">
              <el-radio-group v-model="tableFrom.date" type="button" class="mr20" size="small"
                @change="selectChange(tableFrom.date)">
                <el-radio-button v-for="(item, i) in fromList.fromTxt" :key="i" :label="item.val">{{ item.text }}
                </el-radio-button>
              </el-radio-group>
              <el-date-picker v-model="timeVal" value-format="yyyy/MM/dd" format="yyyy/MM/dd" size="small"
                type="daterange" placement="bottom-end" placeholder="自定义时间" style="width: 250px;"
                @change="onchangeTime" />

              <el-button style="margin-left: 20px;" size="small" type="primary" @click="exportOrder">生成列表</el-button>
              <el-button size="small" type="primary" @click="getExportFileList">导出已生成列表</el-button>

              </el-form-item>
            </el-form-item>

            <el-form-item label="关键字：" class="width100">
              <el-input v-model="tableFrom.keyword" placeholder="输入充值单号或手机号" class="selWidth" size="small"
                @change="getList(1)">
                <el-button slot="append" icon="el-icon-search" size="small" @click="getList(1)" />
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <cards-data :card-lists="cardLists" />
      </div>
      <el-table v-loading="listLoading" :data="tableData.data" style="width: 100%" size="mini" class="table"
        highlight-current-row>

        <el-table-column prop="order_id" label="充值单号" min-width="190" />
        <el-table-column label="充值类型" min-width="80">
          <template slot-scope="scope">
            <span :style="{
                 color:
                   (scope.row.pay_type  == 2) ? '#f00' : ''
               }" class="spBlock">扫码付款</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="real_name" label="真实姓名" min-width="80" /> -->

        <el-table-column prop="money_way" label="收款" min-width="120" />
        <el-table-column prop="price" label="金额" min-width="120" />

        <el-table-column label="支付状态" min-width="100">
          <template slot-scope="scope"  >
            <template v-if="scope.row.pay_type==1">
              <span :style="{
                  color:
                    scope.row.status == 1 || scope.row.status == 3 ? '#f00' : ''
                }" class="spBlock">{{ scope.row.status | rechargeStatusFilter}}</span>
            </template>
            <template  v-else>
              <span style="color:#f00" class="spBlock">已支付</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="mark" label="用户备注" min-width="130" />
        <el-table-column prop="service_mark" label="客服备注" min-width="130" />

        <el-table-column label="支付日期" min-width="150">
          <template slot-scope="scope">
            <span class="spBlock">{{ scope.row.pay_time || "无" }}</span>
          </template>
        </el-table-column>

      </el-table>

      <div class="block">
        <el-pagination :page-sizes="[20, 40, 60, 80]" :page-size="tableFrom.limit" :current-page="tableFrom.page"
          layout="total, sizes, prev, pager, next, jumper" :total="tableData.total" @size-change="handleSizeChange"
          @current-change="pageChange" />
      </div>
    </el-card>

  <!--导出订单列表-->
    <file-list ref="exportList" />
  </div>
</template>

<script>
  import {
    agentRechargeListApi,
    dataAdminUpdateHc,
    rechargeAgentTotalApi,
    dataServiceUpdateApi,
    dataAdminUpdateApi,
    dataServiceAddApi,
    exportOrderApi,
  } from "@/api/accounts";
  import cardsData from "@/components/cards/index";
  import {
    fromList
  } from "@/libs/constants.js";
  import {
    userUpdateApi
  } from "@/api/user";
  import fileList from "@/components/exportFile/fileList";
  export default {
    name: "AccountsRecharge",
    components: {
      cardsData,
      fileList
    },
    data() {
      return {
        value1: '',
        dialogTableVisible: false,
        dialogTableVisible1: false,
        cardLists: [],
        timeVal: [],
        tableData1: [],
        tableData: {
          data: [],
          money_way: [],
          total: 0
        },
        listLoading: true,
        tableFrom: {
          paid: 1,
          is_scan: 1, //扫码付款
          date: "",
          money_way: "",
          keyword: "",
          pay_type: "",
          status: "",
          page: 1,
          limit: 20
        },
        dialogFormVisible: false,
        select: [{
          value:'1',
          label: '111'
        },
        {
          value:'2',
          label: '222'
        }],
        form: {
          order_no: '',
          time: '',
          image: '',
          selectLabel:'',
          price:'',
          select1Label:'',
          select2Label:'',
          select3Label:"",
          fprice:'',
          textarea1:'',
          textarea2:'',
          textarea3:''
        },
        fromList: fromList,
        formLabelWidth: '120px'
      };
    },
    mounted() {
      this.getList();
      this.getStatistics();
    },
    methods: {
      // 点击商品图
      modalPicTap(tit) {
        const _this = this;
        const attr = [];
        this.$modalUpload(function(img) {
          _this.form.image = img[0];
        }, tit);
      },
      getExportFileList() {
        this.fileVisible = true;
        this.$refs.exportList.exportFileList("recharge_scan");
      },
      // 导出
      exportOrder() {
        exportOrderApi(this.tableFrom)
          .then(res => {
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
      // 选择时间
      selectChange(tab) {
        this.tableFrom.date = tab;
        this.timeVal = [];
        this.tableFrom.page = 1;
        this.getList();
      },
      // 具体日期
      onchangeTime(e) {
        this.timeVal = e;
        this.tableFrom.date = e ? this.timeVal.join("-") : "";
        this.tableFrom.page = 1;
        this.getList();
      },
      // 列表
      getList(num) {
        this.listLoading = true;
        this.tableFrom.page = num ? num : this.tableFrom.page;
        agentRechargeListApi(this.tableFrom)
          .then(res => {
            this.tableData.data = res.data.list;
            this.tableData.money_way = res.data.money_way;
            this.tableData.total = res.data.count;
            this.listLoading = false;
          })
          .catch(res => {
            this.$message.error(res.message);
            this.listLoading = false;
          });
      },
      getListPop(phone) {
        this.dialogTableVisible1 = true
        this.listLoading = true;
        this.tableFrom.page = 1;
        agentRechargeListApi({
            keyword: phone
          })
          .then(res => {
            this.tableData1 = res.data.list;
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

      // 客服审核
      onServiceEdit(id) {
        this.$modalForm(dataServiceUpdateApi(id)).then(() => this.getList());
      },
      // 财务审核
      onAdminEdit(id) {
        this.$modalForm(dataAdminUpdateApi(id)).then(() => this.getList());
      },
     // 统计
      getStatistics() {
        this.StatisticsLoading = true;
        rechargeAgentTotalApi({"is_scan":1})
          .then(res => {
            const stat = res.data;
            // this.cardLists = [
            //   { name: '充值总金额', count: stat.totalPayPrice, icon: 'el-icon-s-goods' },
            //   { name: '充值退款金额', count: stat.totalRefundPrice, icon: 'el-icon-s-order' },
            //   { name: '小程序充值金额', count: stat.totalRoutinePrice, icon: 'el-icon-s-cooperation' },
            //   { name: '公众号充值金额', count: stat.totalWxPrice, icon: 'el-icon-s-finance' }
            // ]
            this.cardLists = [{
              name: "扫码付款总金额",
              count: parseInt(stat.totalPayPrice),
              icon: "el-icon-s-goods"
            }];

            this.StatisticsLoading = false;
          })
          .catch(res => {
            this.$message.error(res.message);
            this.StatisticsLoading = false;
          });
      }
    }
  };
</script>

<style scoped>
  .selWidth {
    width: 300px;
  }
</style>
