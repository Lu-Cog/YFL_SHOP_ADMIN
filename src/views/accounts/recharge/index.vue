<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button size="small" type="primary" class="mb20" @click="onAdd">添加充值</el-button>
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
            <el-form-item label="充值类型：">
              <el-radio-group v-model="tableFrom.pay_type" type="button" size="small" @change="getList(1)">
                <el-radio-button label="">全部</el-radio-button>
                <el-radio-button label="1">线下充值</el-radio-button>
                <el-radio-button label="2">线上充值</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="审核状态：">
              <el-radio-group v-model="tableFrom.status" type="button" size="small" @change="getList(1)">
                <el-radio-button label="">全部</el-radio-button>
                <el-radio-button label="0">未审核</el-radio-button>
                <el-radio-button label="1">客服拒绝</el-radio-button>
                <el-radio-button label="2">客服通过</el-radio-button>
                <el-radio-button label="3">财务拒绝</el-radio-button>
                <el-radio-button label="4">充值完成</el-radio-button>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="收款方式：">
              <el-select v-model="tableFrom.money_way" @change="getList(1)">
                <el-option v-for="(item, index) in tableData.money_way" :key="index" :label="item.label"
                  :value="item.value" />
              </el-select>
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
               }" class="spBlock">{{ scope.row.pay_type==1?"线下充值":"线上充值" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="uid" label="用户ID" min-width="70" />
        <el-table-column prop="phone" label="用户账号" min-width="100" />
        <el-table-column prop="real_name" label="真实姓名" min-width="80" />
        <!-- <el-table-column
          prop="order_id"
          label="订单号"
          min-width="180"
        /> -->
        <el-table-column prop="price_to" label="主账户" min-width="100" />
        <el-table-column sortable :sort-method="
            (a, b) => {
              return a.price - b.price;
            }
          " label="充值金额" min-width="120" prop="price" />
        <el-table-column sortable label="返点金额" :sort-method="
            (a, b) => {
              return a.give_price - b.give_price;
            }
          " min-width="120" prop="give_price" />
        <el-table-column prop="money_way" label="收款" min-width="80" />
        <el-table-column label="充值凭证" min-width="80">
          <template slot-scope="scope">
            <div v-if="scope.row.image" class="demo-image__preview">
              <el-image :src="scope.row.image" :preview-src-list="[scope.row.image]" />
            </div>
          </template>
        </el-table-column>

        <el-table-column label="充值日期" min-width="150">
          <template slot-scope="scope">
            <span class="spBlock">{{ scope.row.pay_time || "无" }}</span>
          </template>
        </el-table-column>

        <el-table-column label="红冲" width="100">
          <template slot-scope="scope">
            <span :style="{
                 color:
                   (scope.row.hc_bill_id  > 0||scope.row.hc_bill_id  == -1) ? '#f00' : ''
               }"
              class="spBlock">{{ scope.row.hc_bill_id>0?"红冲"+scope.row.hc_bill_id:(scope.row.hc_bill_id==-1?"被红冲"+scope.row.recharge_id:"") }}</span>
          </template>
        </el-table-column>
        <el-table-column label="审核状态" min-width="100">
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
        <el-table-column prop="service_name" label="客服" min-width="130" />
        <el-table-column prop="service_mark" label="客服备注" min-width="130" />
        <el-table-column prop="admin_name" label="财务" min-width="130" />
        <el-table-column prop="audit_mark" label="财务备注" min-width="130" />
        <el-table-column label="提交日期" min-width="150">
          <template slot-scope="scope">
            <span class="spBlock">{{ scope.row.create_time || "无" }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" min-width="130" fixed="right" align="center">
          <template slot-scope="scope">

            <div  v-if="scope.row.status == 0 && scope.row.pay_type==1 ">
              <el-button type="text" size="small" class="mr10" @click="onServiceEdit(scope.row.recharge_id)">客服审核
              </el-button>
            </div>

            <div v-else-if="scope.row.status == 2 && scope.row.pay_type==1">
              <el-button type="text" size="small" class="mr10" @click="onAdminEdit(scope.row.recharge_id)">财务审核
              </el-button>
            </div>

            <div v-else-if="scope.row.status == 4 && scope.row.hc_bill_id == 0  && scope.row.pay_type==1 ">
              <el-button type="text" size="small" class="mr10" @click="onAdminHonchong(scope.row.recharge_id)">执行红冲
              </el-button>
            </div>
            <div>
              <el-button type="text" size="small" class="mr10" @click="getListPop(scope.row.phone)">查账</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <div class="block">
        <el-pagination :page-sizes="[20, 40, 60, 80]" :page-size="tableFrom.limit" :current-page="tableFrom.page"
          layout="total, sizes, prev, pager, next, jumper" :total="tableData.total" @size-change="handleSizeChange"
          @current-change="pageChange" />
      </div>
    </el-card>
    <el-dialog title="充值明细" :visible.sync="dialogTableVisible1" width="62%">
      <el-table :data="tableData1">
        <el-table-column property="phone" label="用户账户" width="200"></el-table-column>
        <el-table-column property="real_name" label="姓名" width="80"></el-table-column>
        <el-table-column label="充值类型" min-width="80">
          <template slot-scope="scope">
            <span :style="{
                 color:
                   (scope.row.pay_type  == 2) ? '#f00' : ''
               }" class="spBlock">{{ scope.row.pay_type==1?"线下充值":"线上充值" }}</span>
          </template>
        </el-table-column>
        <el-table-column property="price_to" label="主账户" width="100"></el-table-column>
        <el-table-column property="price" label="充值金额" width="150"></el-table-column>
        <el-table-column property="give_price" label="返点金额" width="150"></el-table-column>
        <el-table-column property="money_way" label="收款" width="100"></el-table-column>
        <el-table-column property="pay_time" label="充值时间" width="200"></el-table-column>
        <el-table-column label="红冲" width="100">
          <template slot-scope="scope">
            <span :style="{
                color:
                  (scope.row.hc_bill_id  > 0||scope.row.hc_bill_id  == -1) ? '#f00' : ''
              }"
              class="spBlock">{{ scope.row.hc_bill_id>0?"红冲"+scope.row.hc_bill_id:(scope.row.hc_bill_id==-1?"被红冲"+scope.row.recharge_id:"") }}</span>
          </template>
        </el-table-column>

        <el-table-column label="审核状态" width="100">
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

      </el-table>
    </el-dialog>

    <!-- 添加/审核弹窗 -->
    <el-dialog top="5vh" title="财务放款审核" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form :model="form">
        <el-form-item label="订单号" :label-width="formLabelWidth">
          <el-input style="width: 25rem;" v-model="form.order_no" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="充值时间" :label-width="formLabelWidth">
          <el-date-picker  v-model="form.time" type="datetime" placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="充值凭证" :label-width="formLabelWidth">
          <div class="upLoadPicBox" @click="modalPicTap('1')" title="750*750px">
            <div v-if="form.image" class="pictrue">
              <img :src="form.image" />
            </div>
            <div v-else class="upLoad">
              <i class="el-icon-camera cameraIconfont" />
            </div>
          </div>
        </el-form-item>
        <el-form-item label="收款方式" :label-width="formLabelWidth">
          <el-select v-model="form.selectLabel" placeholder="请选择">
            <el-option v-for="(item,index) in select" :key='item.value' :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="充值本金账户" :label-width="formLabelWidth">
          <el-select v-model="form.select1Label" placeholder="请选择">
            <el-option v-for="(item,index) in select" :key='item.value' :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="充值金额" :label-width="formLabelWidth">
          <el-input style="width: 28%;" v-model="form.price" disabled></el-input>
        </el-form-item>
        <el-form-item label="充值返点账户" :label-width="formLabelWidth">
          <el-select v-model="form.select2Label" placeholder="请选择">
            <el-option v-for="(item,index) in select" :key='item.value' :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="返点比例" :label-width="formLabelWidth">
          <el-select v-model="form.select3Label" placeholder="请选择">
            <el-option v-for="(item,index) in select" :key='item.value' :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="返点账户金额" :label-width="formLabelWidth">
          <el-input style="width: 28%;" v-model="form.fprice" disabled></el-input>
        </el-form-item>
        <el-form-item label="客户的备注" :label-width="formLabelWidth">
          <el-input style="width: 80%;" type="textarea" :rows="2" placeholder="请输入内容" v-model="form.textarea1">
          </el-input>
        </el-form-item>
        <el-form-item label="客服审核备注" :label-width="formLabelWidth">
          <el-input style="width: 80%;" type="textarea" :rows="2" placeholder="请输入内容" v-model="form.textarea2"></el-input>
        </el-form-item>
        <el-form-item label="财务审核备注" :label-width="formLabelWidth">
          <el-input style="width: 80%;" type="textarea" :rows="2" placeholder="请输入内容" v-model="form.textarea3"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="chargeAndShenHe(0)" type="success" >添 加</el-button>
        <el-button @click="chargeAndShenHe(1)" type="danger">拒 绝</el-button>
        <el-button @click="chargeAndShenHe(2)" type="info">退 回</el-button>
        <el-button @click="chargeAndShenHe(3)" type="success" >审 核</el-button>
      </div>
    </el-dialog>
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
          paid: "",
          is_scan: 0, //非扫码付款
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
        this.$refs.exportList.exportFileList("recharge");
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

      // 添加
      onAdd() {
        // this.dialogFormVisible = true
        this.$modalForm(dataServiceAddApi()).then(() => this.getList());
      },
      // 客服审核
      onServiceEdit(id) {
        this.$modalForm(dataServiceUpdateApi(id)).then(() => this.getList());
      },
      // 财务审核
      onAdminEdit(id) {
        this.$modalForm(dataAdminUpdateApi(id)).then(() => this.getList());
      },
      //添加充值和审核-提交
      chargeAndShenHe(type){
        this.dialogFormVisible = false
      },
      // 红冲
      onAdminHonchong(id) {
        let that = this;
        this.$confirm('针对此笔订单红冲，您确认执行吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          dataAdminUpdateHc(id)
            .then(res => {
              this.$message.success(res.message);
              this.listLoading = false;
              this.getList(1);
            })
            .catch(res => {
              this.$message.error(res.message);
              this.listLoading = false;
            });


        }).catch(action => {
          that.loading = false;
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })

      },
      // 统计
      getStatistics() {
        this.StatisticsLoading = true;
        rechargeAgentTotalApi({"is_scan":0})
          .then(res => {
            const stat = res.data;
            // this.cardLists = [
            //   { name: '充值总金额', count: stat.totalPayPrice, icon: 'el-icon-s-goods' },
            //   { name: '充值退款金额', count: stat.totalRefundPrice, icon: 'el-icon-s-order' },
            //   { name: '小程序充值金额', count: stat.totalRoutinePrice, icon: 'el-icon-s-cooperation' },
            //   { name: '公众号充值金额', count: stat.totalWxPrice, icon: 'el-icon-s-finance' }
            // ]
            this.cardLists = [{
              name: "线上+线下充值总金额",
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
