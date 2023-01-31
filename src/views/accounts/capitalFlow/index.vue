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
              <el-form-item label="关键字：" class="width100">
              <el-input v-model="tableFrom.keyword" placeholder="用户ID/手机号/订单号" class="selWidth" size="small"
                @change="getList(1)">
                <el-button slot="append" icon="el-icon-search" size="small" @click="getList(1)" />
              </el-input>
            </el-form-item>
          </el-form>
        </div>
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
            <span class="spBlock">{{ scope.row.number }}</span>
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
        <el-table-column
          label="操作"
          min-width="130"
          fixed="right"
          align="center"
        >
          <template slot-scope="scope">
          <div v-if="false">
          <el-button
            type="text"
            size="small"
            class="mr10"
            @click="orderSimpleTk(scope.row.bill_id)"
            >此笔红冲</el-button >
           </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          :page-sizes="[20, 40, 60, 80]"
          :page-size="tableFrom.limit"
          :current-page="tableFrom.page"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.total"
          @size-change="handleSizeChange"
          @current-change="pageChange"
        />
      </div>
    </el-card>
    <!--导出订单列表-->
    <!-- <file-list ref="exportList" /> -->
  </div>
</template>

<script>
import { billMerlistApi, capitalFlowExportApi,orderSimpleTk} from '@/api/accounts'
import { fromList } from '@/libs/constants.js'
import fileList from '@/components/exportFile/fileList'
import { roterPre } from '@/settings'
  import { formateDate, moneyAct ,getAccountAll } from "@/utils/index.js";
export default {
  name: 'AccountsCapitalFlow',
  components: { fileList },
  data() {
    return {
      timeVal: [],
      tableData: {
        data: [],
        total: 0
      },
      roterPre: roterPre,
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
      options: []
    }
  },
  mounted() {
    this.accountList = getAccountAll(0)
    this.getList()
  },
  methods: {
    // 时间选择
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

    // 单笔退款
    orderSimpleTk(id) {
      let that = this;
      this.$confirm('针对此笔消费红冲，您确认执行吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        orderSimpleTk(id)
          .then(res => {
            this.$message.success(res.message);
            this.listLoading = false;
            this.getList();
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

    // 导出
    exportRecord() {
      capitalFlowExportApi()
        .then((res) => {
          /*this.$message.success(res.message)
          this.$refs.exportList.exportFileList()*/
          const h = this.$createElement;
          this.$msgbox({
            title: '提示',
            message: h('p', null, [
              h('span', null, '文件正在生成中，请稍后点击"'),
              h('span', { style: 'color: teal' }, '导出已生成列表'),
              h('span', null, '"查看~ '),
            ]),
            confirmButtonText: '我知道了',
          }).then(action => {

          });
        })
        .catch((res) => {
          this.$message.error(res.message)
        })
    },
    // 导出列表
    getExportFileList() {
      this.$refs.exportList.exportFileList()
    },
    // 列表
    getList(num) {
      this.listLoading = true
      this.tableFrom.page = num ? num : this.tableFrom.page;
      billMerlistApi(this.tableFrom)
        .then((res) => {
          this.tableData.data = res.data.list
          this.tableData.total = res.data.count
          this.listLoading = false
        })
        .catch((res) => {
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
    }
  }
}
</script>

<style scoped>
.selWidth {
  width: 320px;
}
</style>
