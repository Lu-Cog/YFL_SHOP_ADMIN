<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form size="small" label-width="100px" :inline="true">

            <el-form-item label="选择时间：" style="display: inline-block">
              <el-radio-group
                v-model="tableFrom.date"
                size="small"
                @change="selectChange(tableFrom.date)"
              >
                <el-radio-button
                  v-for="(itemn,indexn) in fromList.fromTxt"
                  :key="indexn"
                  :label="itemn.val"
                >{{ itemn.text }}</el-radio-button>
              </el-radio-group>
              <el-date-picker
                v-model="timeVal"
                type="daterange"
                placeholder="选择日期"
                format="yyyy/MM/dd"
                value-format="yyyy/MM/dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="onchangeTime"
              />
            </el-form-item>

            <el-form-item label="关键字搜索：" label-width="100px" style="display: block;">
              <el-input
                v-model="tableFrom.keyword"
                placeholder="请输入店铺关键字/店铺名/手机号"
                class="selWidth"
                @change="getList(1)"
              >
                <el-button slot="append" icon="el-icon-search" @click="getList(1)" />
              </el-input>
            </el-form-item>

            <el-tabs v-if="headeNum.length > 0" v-model="tableFrom.status" @tab-click="getList(1)">
              <el-tab-pane v-for="(item,index) in headeNum" :key="index" :name="item.type.toString()" :label="item.title +'('+item.count +')' " />
            </el-tabs>

          </el-form>
        </div>
        <el-button size="small" type="primary" @click="onAdd">添加商户</el-button>
      </div>
      <el-table
        v-loading="listLoading"
        :data="tableData.data"
        style="width: 100%"
        size="small"
        highlight-current-row
        class="switchTable"
      >
        <el-table-column prop="mer_id" label="ID" min-width="60" />
        <el-table-column prop="mer_phone" label="登录账户" min-width="100" />
        <el-table-column prop="merchant.mer_code" label="商家编码" min-width="100" />
        <el-table-column prop="real_name" label="商家姓名" min-width="100" />
        <el-table-column prop="mer_name" label="店铺名称" min-width="150" />
        <el-table-column prop="merchant.first_in" label="总首批款" min-width="100" />
        <el-table-column prop="merchant.reg_time" label="入驻日期" min-width="100" />
        <el-table-column prop="merchant.ht_start_time" label="签约起始日期" min-width="100" />
        <el-table-column prop="merchant.ht_end_time" label="签约结束日期" min-width="100" />

        <!-- <el-table-column prop="mer_address" label="商户地址" min-width="200" /> -->
        <el-table-column prop="mer_desc" label="备注" min-width="150" />
        <!-- <el-table-column prop="sort" label="排序" min-width="100" /> -->

        <el-table-column prop="create_time" label="创建时间" min-width="150" />
        <!-- <el-table-column prop="merchant.status" label="开启/关闭" min-width="100">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.merchant.status"
              :active-value="1"
              :inactive-value="0"
              active-text="开启"
              inactive-text="关闭"
              disabled
              @click.native="onchangeIsClose(scope.row.merchant)"
            />
          </template>
        </el-table-column> -->
        <el-table-column label="操作" min-width="100" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="onEdit(scope.row.mer_id)">编辑</el-button>
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
  </div>
</template>
<script>
import {
  merchantLstLocalApi,
  merchantCreateApi,
  merchantUpdateApi,
  merchantDeleteApi,
  merchantStatuseApi,
  merchantPasswordApi,
  merchantLoginApi,
  changeCopyApi,
  merchantCountApi,
  merchantIsCloseApi
} from '@/api/merchant'
import { fromList } from '@/libs/constants.js'
import { roterPre } from '@/settings'
import SettingMer from '@/libs/settingMer'
import Cookies from 'js-cookie'
export default {
  name: 'MerchantList',
  data() {
    return {
      fromList: fromList,
      roterPre: roterPre,
      isChecked: false,
      listLoading: true,
      headeNum: [
        {
        count: 0,
        type: '1',
        title: "全部商户"
      },
        // {
        //   count: 0,
        //   type: '0',
        //   title: "已关闭商户"
        // }
      ],
      tableData: {
        data: [],
        total: 0
      },
      tableFrom: {
        page: 1,
        limit: 20,
        date: '',
        status: '1',
        keyword: '',
        is_trader: ''
      },
      autoUpdate: true,
      timeVal: []
    }
  },
  mounted() {
    this.getHeadNum()
    this.getList('')
  },
  methods: {
    onLogo(id) {
      merchantLoginApi(id)
        .then((res) => {
          Cookies.set('merchantToken', res.data.token)
          window.open(SettingMer.httpUrl + res.data.url)
        })
        .catch((res) => {
          this.$message.error(res.message)
        })
    },
    // 选择时间
    selectChange(tab) {
      this.tableFrom.date = tab
      this.timeVal = []
      this.tableFrom.page = 1;
      this.getList('')
    },
    // 具体日期
    onchangeTime(e) {
      this.timeVal = e
      this.tableFrom.date = this.timeVal ? this.timeVal.join('-') : ''
      this.tableFrom.page = 1;
      this.getList('')
    },
    // 获取开启商户数
    getHeadNum(){
      merchantCountApi()
        .then((res) => {
          this.headeNum[0]['count'] = res.data.valid;
          this.headeNum[1]['count'] = res.data.invalid;
        })
        .catch((res) => {

        })
    },
    // 列表
    getList(num) {
      this.listLoading = true
      this.tableFrom.page = num ? num : this.tableFrom.page;
      merchantLstLocalApi(this.tableFrom)
        .then((res) => {
          this.tableData.data = res.data.list
          this.tableData.total = res.data.count
          this.listLoading = false
          this.getHeadNum()
        })
        .catch((res) => {
          this.listLoading = false
          this.$message.error(res.message)
        })
    },
    pageChange(page) {
      this.tableFrom.page = page
      this.getList('')
    },
    handleSizeChange(val) {
      this.tableFrom.limit = val
      this.getList(1)
    },
    // 修改状态
    onchangeIsShow(row) {
      const title = row.is_best === 0 ? '是否开启推荐商户' : '是否关闭推荐商户'
      this.$modalSure(title).then(() => {
        merchantStatuseApi(row.mer_id, row.is_best === 1 ? 0 : 1)
          .then(({ message }) => {
            this.$message.success(message)
            this.getList('')
          })
          .catch(({ message }) => {
            this.$message.error(message)
          })
      })
    },
    // 开启关闭
    onchangeIsClose(row) {
      merchantIsCloseApi(row.mer_id, row.status === 1 ? 0 : 1)
          .then(({ message }) => {
            this.$message.success(message)
            this.getList('');
          })
          .catch(({ message }) => {
            this.$message.error(message)
          })

    },
    // 添加
    onAdd() {
      this.$router.push({ path: `addmerchant` })
      // this.$modalForm(merchantCreateApi()).then(() => this.getList(''))
    },
    // 编辑
    onEdit(id) {
      this.$router.push({ path: `editmerchant/${id}` })
      // this.$modalForm(merchantUpdateApi(id)).then(() => this.getList(''))
    },
    // 删除
    handleDelete(id) {
      this.$modalSure('该商户下有相关数据信息，删除后不可恢复，您是否确定删除').then(() => {
        merchantDeleteApi(id)
          .then(({ message }) => {
            this.$message.success(message)
            this.getList('')
            this.getHeadNum()
          })
          .catch(({ message }) => {
            this.$message.error(message)
          })
      })
    },
    // 设置复制次数
    handleTimes(id) {
      this.$modalForm(changeCopyApi(id)).then(() => this.getList(''))
    },

    // 修改密码表单
    onPassword(id) {
      this.$modalForm(merchantPasswordApi(id))
    }
  }
}
</script>

<style scoped lang="scss">
</style>
