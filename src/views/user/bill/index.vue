<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form size="small" label-width="100px">
            <el-form-item label="时间选择：" class="width100">
              <el-radio-group v-model="tableFrom.date" type="button" class="mr20" size="small"
                @change="selectChange(tableFrom.date)">
                <el-radio-button v-for="(item,i) in fromList.fromTxt" :key="i" :label="item.val">{{ item.text }}
                </el-radio-button>
              </el-radio-group>
              <el-date-picker v-model="timeVal" value-format="yyyy/MM/dd" format="yyyy/MM/dd" size="small"
                type="daterange" placement="bottom-end" placeholder="自定义时间" style="width: 250px;"
                @change="onchangeTime" />
            </el-form-item>

              <el-form-item label="选择账户：" class="width100">
                <el-select v-model="tableFrom.account" filterable placeholder="请选择" class="selWidth" @change="getList(1)">
                  <el-option label="全部" value="" />
                  <el-option
                    v-for="(item,i) in accountList"
                    :key="i"
                    :label="item"
                    :value="i"
                  />
                </el-select>
              </el-form-item>
           <!-- <el-form-item label="关键字：" class="width100">
              <el-input v-model="tableFrom.keyword" placeholder="微信昵称/姓名/订单号" class="selWidth" size="small"
                @change="getList(1)">
                <el-button slot="append" icon="el-icon-search" size="small" @click="getList(1)" />
              </el-input>
            </el-form-item> -->
          </el-form>
        </div>
        <cards-data :card-lists="cardLists" />
      </div>


      <el-table v-loading="listLoading" :data="tableData.data" style="width: 100%" size="mini" class="table"
        highlight-current-row>
        <!-- <el-table-column prop="bill_id" label="ID" width="60" /> -->
        <el-table-column prop="order_sn" label="关联订单号" min-width="150" />
        <el-table-column prop="uid" label="用户ID" min-width="80" />
        <el-table-column prop="real_name" label="用户姓名" min-width="100" />
        <el-table-column prop="phone" label="手机号" min-width="100" />

        <el-table-column label="账户" min-width="100">
          <template slot-scope="scope">
            <span class="spBlock">{{ scope.row.account | getAccountName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="金额" min-width="100">
          <template slot-scope="scope">
            <span class="spBlock">{{ scope.row.number  }}</span>
          </template>
        </el-table-column>
        <el-table-column label="赠送比例" min-width="120">
          <template slot-scope="scope">
            <span class="spBlock">{{ scope.row.gift_ratio==0?"无":scope.row.gift_ratio+"%" }}</span>
          </template>
        </el-table-column>
        <el-table-column label="类型" min-width="100">
          <template slot-scope="scope">
            <span class="spBlock">{{ scope.row.type | getBillType }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="描述" min-width="180" />
        <el-table-column prop="create_time" label="交易时间" min-width="180" />
      </el-table>
      <div class="block">
        <el-pagination :page-sizes="[20, 40, 60, 80]" :page-size="tableFrom.limit" :current-page="tableFrom.page"
          layout="total, sizes, prev, pager, next, jumper" :total="tableData.total" @size-change="handleSizeChange"
          @current-change="pageChange" />
      </div>
    </el-card>
  </div>
</template>

<script>
  import {
    billMerlistApi,
    rechargeDetailApi
  } from '@/api/accounts'
  import cardsData from '@/components/cards/index'
  import {
    fromList
  } from '@/libs/constants.js'
  import { formateDate, moneyAct ,getAccountAll } from "@/utils/index.js";
  export default {
    name: 'AccountsBill',
    components: {
      cardsData
    },
    data() {
      return {
        cardLists: [],
        timeVal: [],
        tableData: {
          data: [],
          total: 0
        },
        listLoading: true,
        tableFrom: {
          uid: '',
          date: '',
          keyword: '',
          account: '',
          page: 1,
          limit: 20
        },
        accountList:[],
        fromList: fromList,
        uid: ''
      }
    },
    mounted() {
      this.uid = this.$route.params.id;
      this.accountList = getAccountAll(0)
      this.getList()
      this.getStatistics()
    },
    methods: {
      // 选择时间
      selectChange(tab) {
        this.tableFrom.date = tab
        this.timeVal = []
        this.tableFrom.page = 1;
        this.getList()
      },
      // 具体日期
      onchangeTime(e) {
        this.timeVal = e
        this.tableFrom.date = e ? this.timeVal.join('-') : ''
        this.tableFrom.page = 1;
        this.getList()
      },
      // 列表
      getList(num) {
        this.listLoading = true
        this.tableFrom.page = num ? num : this.tableFrom.page;
        this.tableFrom.uid = this.uid;
        billMerlistApi(this.tableFrom).then(res => {
          this.tableData.data = res.data.list
          this.tableData.total = res.data.count
          this.listLoading = false
        }).catch((res) => {
          this.$message.error(res.message)
          this.listLoading = false
        })
      },
      pageChange(page) {
        this.tableFrom.page = page
        this.getList()
      },
      handleSizeChange(val) {
        this.tableFrom.limit = val
        this.getList()
      },
      // 统计
      getStatistics() {
        this.StatisticsLoading = true
        rechargeDetailApi(this.uid).then(res => {
          const total = res.data.total_price
          const stat = res.data.account_info
          this.cardLists = [{
              name: '总金额',
              count: moneyAct(total),
              icon: 'el-icon-s-goods'
            }, {
              name: '保证金',
              count: moneyAct(stat.margin.value),
              icon: 'el-icon-s-goods'
            },
            {
              name: '首批款',
              count: moneyAct(stat.first_batch.value),
              icon: 'el-icon-s-order'
            },
            {
              name: '现金账户',
              count: moneyAct(stat.now_money.value),
              icon: 'el-icon-s-cooperation'
            },
            {
              name: '活动现金',
              count: moneyAct(stat.activity_principal.value),
              icon: 'el-icon-s-finance'
            },
            {
              name: '返点账户',
              count: moneyAct(stat.activity_bonus.value),
              icon: 'el-icon-s-finance'
            },
            {
              name: '奖励账户',
              count: moneyAct(stat.reward_account.value),
              icon: 'el-icon-s-finance'
            },
            {
              name: '老代理',
              count: moneyAct(stat.especially.value),
              icon: 'el-icon-s-finance'
            },
            {
              name: 'YBK账户',
              count: moneyAct(stat.ybk.value),
              icon: 'el-icon-s-finance'
            },
            {
              name: '佣金账户',
              count: moneyAct(stat.brokerage_price.value),
              icon: 'el-icon-s-finance'
            }
          ]
          this.StatisticsLoading = false
        }).catch((res) => {
          this.$message.error(res.message)
          this.StatisticsLoading = false
        })
      }
    }
  }
</script>

<style scoped>
  .selWidth {
    width: 300px;
  }
</style>
