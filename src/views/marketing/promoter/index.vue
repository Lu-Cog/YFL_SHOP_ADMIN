<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form size="small" label-width="100px">
            <el-form-item label="时间选择：" class="width100">
              <el-radio-group v-model="tableFrom.date" type="button" class="mr20" size="small" @change="selectChange(tableFrom.date)">
                <el-radio-button v-for="(item,i) in fromList.fromTxt" :key="i" :label="item.val">{{ item.text }}</el-radio-button>
              </el-radio-group>
              <el-date-picker v-model="timeVal" value-format="yyyy/MM/dd" format="yyyy/MM/dd" size="small" type="daterange" placement="bottom-end" placeholder="自定义时间" style="width: 250px;" @change="onchangeTime" />
            </el-form-item>
            <el-form-item label="关键字：" class="width100">
              <el-input v-model="tableFrom.keyword" placeholder="请输入请输入用户UID查询" class="selWidth" size="small" @change="getList">
                <el-button slot="append" icon="el-icon-search" size="small" @click="getList" />
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <el-table
        v-loading="listLoading"
        :data="tableData.data"
        style="width: 100%"
        size="mini"
        class="table"
        highlight-current-row
      >
        <el-table-column
          prop="uid"
          label="ID"
          width="60"
        />
        <el-table-column
          label="头像"
          min-width="80"
        >
          <template slot-scope="scope">
            <div class="demo-image__preview">
              <el-image
                :src="scope.row.avatar || moren"
                :preview-src-list="[scope.row.avatar || moren]"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="account"
          label="手机号"
          min-width="130"
        />
        <el-table-column
          prop="real_name"
          label="用户信息"
          min-width="130"
        />
        <el-table-column
          prop="think_count"
          label="推广用户数量"
          min-width="120"
        />

        <el-table-column label="操作" min-width="150" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="mr10" @click="onSpread(scope.row.uid, 'man')">查看推广人</el-button>

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

    <!--推广人-->
    <el-dialog
      title="推广人员清单"
      :visible.sync="dialogVisible"
      width="900px"
      :before-close="handleClose"
    >
      <div class="container">
        <el-form size="small" label-width="100px">
          <el-form-item label="时间选择：" class="width100">
            <el-radio-group v-model="spreadFrom.date" type="button" class="mr20" size="small" @change="selectChangeSpread(spreadFrom.date)">
              <el-radio-button v-for="(item,i) in fromList.fromTxt" :key="i" :label="item.val">{{ item.text }}</el-radio-button>
            </el-radio-group>
            <el-date-picker v-model="timeValSpread" value-format="yyyy/MM/dd" format="yyyy/MM/dd" size="small" type="daterange" placement="bottom-end" placeholder="自定义时间" style="width: 250px;" @change="onchangeTimeSpread" />
          </el-form-item>

         <!-- <el-form-item label="关键字：" class="width100">
            <el-input v-model="spreadFrom.keyword" placeholder="请输入请输入姓名、电话、UID" class="selWidth" size="small">
              <el-button slot="append" icon="el-icon-search" size="small" @click="onChanges" />
            </el-input>
          </el-form-item> -->
        </el-form>
      </div>
      <el-table
        v-if="onName === 'man'"
        key="men"
        v-loading="spreadLoading"
        :data="spreadData.data"
        style="width: 100%"
        size="mini"
        class="table"
        highlight-current-row
      >
        <el-table-column
          prop="uid"
          label="ID"
          width="60"
        />
        <el-table-column
          label="头像"
          min-width="80"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.avatar" class="demo-image__preview">
              <el-image
                :src="scope.row.avatar"
                :preview-src-list="[scope.row.avatar]"
              />
            </div>
            <span v-else>
              <img style="width: 36px; height: 36px"
                    src="../../../assets/images/f.png" alt="">
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="account"
          label="手机号"
          min-width="130"
        />
        <el-table-column
          prop="real_name"
          label="用户信息"
          min-width="130"
        />
        <el-table-column
          prop="create_time"
          label="推广时间"
          min-width="150"
        />
      </el-table>

      <div class="block">
        <el-pagination
          :page-sizes="[10, 20]"
          :page-size="spreadFrom.limit"
          :current-page="spreadFrom.page"
          layout="total, sizes, prev, pager, next, jumper"
          :total="spreadData.total"
          @size-change="handleSizeChangeSpread"
          @current-change="pageChangeSpread"
        />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { promoterZbListApi, spreadZbListApi } from '@/api/promoter'
import { fromList } from '@/libs/constants.js'
export default {
  name: 'AccountsUser',
  data() {
    return {
      moren: require("@/assets/images/f.png"),
      cardLists: [],
      timeVal: [],
      tableData: {
        data: [],
        total: 0
      },
      listLoading: true,
      tableFrom: {
        paid: '',
        date: '',
        keyword: '',
        page: 1,
        limit: 20
      },
      fromList: fromList,
      dialogVisible: false,
      spreadData: {
        data: [],
        total: 0
      },
      spreadFrom: {
        page: 1,
        limit: 10,
        date: '',
        level: '',
        keyword: ''
      },
      timeValSpread: [],
      spreadLoading: false,
      uid: '',
      onName: ''
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 从后台获取数据,重新排序
    // changeSort (val) {
    //   debugger
    //   console.log(val) // column: {…} order: "ascending" prop: "date"
    //   // 根据当前排序重新获取后台数据,一般后台会需要一个排序的参数
    //
    // },
    // 清除
    clearSpread(row) {
      return ;
    },
    onSpread(uid, n) {
      this.onName = n
      this.uid = uid
      this.dialogVisible = true
      this.spreadFrom = {
        page: 1,
        limit: 10,
        date: '',
        level: '',
        keyword: ''
      }
      this.getListSpread(uid)
    },
    handleClose() {
      this.dialogVisible = false
    },
    // 选择时间
    selectChangeSpread(tab) {
      this.timeValSpread = []
      this.spreadFrom.date = tab
      this.onName === 'man' ? this.getListSpread(this.uid) : this.getSpreadOrderList(this.uid)
    },
    // 具体日期
    onchangeTimeSpread(e) {
      this.timeValSpread = e
      this.spreadFrom.date = e ? this.timeValSpread.join('-') : ''
      this.onName === 'man' ? this.getListSpread(this.uid) : this.getSpreadOrderList(this.uid)
    },
    onChanges() {
      this.onName === 'man' ? this.getListSpread(this.uid) : this.getSpreadOrderList(this.uid)
    },
    // 推广人列表
    getListSpread(uid) {
      this.spreadLoading = true
      spreadZbListApi(uid, this.spreadFrom).then(res => {
        this.spreadData.data = res.data.list
        this.spreadData.total = res.data.count
        this.spreadLoading = false
      }).catch((res) => {
        this.$message.error(res.message)
        this.spreadLoading = false
      })
    },
    pageChangeSpread(page) {
      this.spreadFrom.page = page
      this.onName === 'man' ? this.getListSpread(this.uid) : this.getSpreadOrderList(this.uid)
    },
    handleSizeChangeSpread(val) {
      this.spreadFrom.limit = val
      this.onName === 'man' ? this.getListSpread(this.uid) : this.getSpreadOrderList(this.uid)
    },
    // 推广订单
    onSpreadOrder(uid, n) {
      this.uid = uid
      this.onName = n
      this.dialogVisible = true
      this.spreadFrom = {
        page: 1,
        limit: 10,
        date: '',
        level: '',
        keyword: ''
      }
      this.getSpreadOrderList(uid)
    },
    getSpreadOrderList(uid) {
      return;
    },
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
    getList() {
      this.listLoading = true
      promoterZbListApi(this.tableFrom).then(res => {
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
    }
  }
}
</script>

<style scoped>
  .selWidth{
    width: 300px;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
    font-size: 12px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
