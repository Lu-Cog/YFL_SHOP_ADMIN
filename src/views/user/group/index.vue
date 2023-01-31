<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- <el-button size="small" type="primary" @click="onAdd">添加用户等级</el-button> -->
        <el-button size="small" type="primary" @click="createActivity(0)">添加用户等级</el-button>
      </div>
      <el-table
        v-loading="listLoading"
        :data="tableData.data"
        style="width: 100%"
        size="small"
        highlight-current-row
      >
        <el-table-column
        prop="group_id"
          label="ID"
          min-width="60"
        />
        <el-table-column
        prop="group_name"
          label="等级名称"
          min-width="180"
        />
        <el-table-column
          prop="create_time"
          label="创建时间"
          min-width="150"
        />
        <el-table-column label="操作" min-width="100" fixed="right" align="center">
          <template slot-scope="scope">
            <!-- <el-button type="text" size="small" @click="onEdit(scope.row.group_id)">编辑</el-button> -->
            <el-button type="text" size="small" @click="editActivity(scope.row)">编辑</el-button>
            <!-- <el-button type="text" size="small" @click="handleDelete(scope.row.group_id, scope.$index)">删除</el-button> -->
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
  groupLstApi,
  groupFormApi,
  groupEditApi,
  groupDeleteApi,
} from '@/api/user'
export default {
  name: 'UserGroup',
  data() {
    return {
      tableFrom: {
        page: 1,
        limit: 20
      },
      tableData: {
        data: [],
        total: 0
      },
      listLoading: true
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 列表
    getList() {
      this.listLoading = true
      groupLstApi(this.tableFrom).then(res => {
        this.tableData.data = res.data.list
        this.tableData.total = res.data.count
        this.listLoading = false
      }).catch(res => {
        this.listLoading = false
        this.$message.error(res.message)
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

    // 跳转编辑活动页面
    editActivity(data) {
      this.$router.push({path:`editActivity/${data.group_id}`,query:{title:data.group_name}});
    },
    //跳转添加活动页面
    createActivity(id){
      this.$router.push(`createActivity/${id}`);
    },

    // 添加
    onAdd() {
      this.$modalForm( groupFormApi() ).then(() => this.getList())
    },
    // 编辑
    onEdit(id) {
      this.$modalForm(groupEditApi(id)).then(() => this.getList())
    },
    // 删除
    handleDelete(id, idx) {
      this.$modalSure().then(() => {
        groupDeleteApi(id).then(({ message }) => {
          this.$message.success(message)
          this.tableData.data.splice(idx, 1)
          this.getList()
        }).catch(({ message }) => {
          this.$message.error(message)
        })
      })
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
