<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="filter-container">
          <div class="demo-input-suffix acea-row">
            <span class="seachTiele">状态：</span>
            <el-select v-model="tableFrom.status" placeholder="请选择" class="filter-item  mr20" clearable
              @change="getList()">
              <el-option label="全部" :value="-1" />
              <el-option label="未开启" :value="0" />
              <el-option label="开启" :value="1" />
            </el-select>
            <span class="seachTiele">关键字：</span>
            <el-input v-model="tableFrom.keyword" placeholder="请输入活动名称搜索" class="selWidth" clearable
              @change="getList()">
              <el-button slot="append" icon="el-icon-search" @click="getList()" />
            </el-input>
          </div>
          <el-button size="small" type="primary" @click="createActivity(0)">添加活动</el-button>
        </div>
      </div>
      <el-table v-loading="listLoading" :data="tableData.data" style="width: 100%" size="small" highlight-current-row>
        <el-table-column prop="activity_id" label="ID" min-width="60" />
        <el-table-column prop="title" label="活动名称" min-width="230" />
        <!-- <el-table-column prop="active_type" label="活动类型" min-width="100"  > -->
        </el-table-column>

        <el-table-column min-width="120" label="活动日期">
          <template slot-scope="{ row }">
            <div v-if="row.start_time">
              {{ row.start_time }} - {{ row.end_time }}
            </div>
            <span v-else>未设置</span>
          </template>
        </el-table-column>

        <el-table-column label="是否开启" min-width="100">
          <template slot-scope="{ row }">
            <el-switch v-model="row.status" :active-value="1" :inactive-value="0" active-text="开启" inactive-text="关闭"
              @change="onchangeIsShow(row)" />
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="160">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="mr10" @click="editActivity(scope.row)">编辑</el-button>
            <el-button type="text" style="margin-left:50px" size="small"
              @click="messageMerchant(scope.row.activity_id)">管理参加商户</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination :page-sizes="[5,10 ,20, 0]" :page-size="tableFrom.limit" :current-page="tableFrom.page"
          layout="total, sizes, prev, pager, next, jumper" :total="tableData.total" @size-change="handleSizeChange"
          @current-change="pageChange" />
      </div>
    </el-card>
  </div>
</template>

<script>
  import {
    activityIssueListApi,
    activityIssueStatusApi,
  } from "@/api/marketing";
  export default {
    name: "ActivityList",
    data() {
      return {
        Loading: false,
        listLoading: true,
        tableData: {
          data: [],
          total: 0
        },
        tableFrom: {
          page: 1,
          limit: 20,
          status: -1,
          keyword: "",
        },

        value: true
      };
    },
    mounted() {
      this.getList();
    },
    methods: {

      // 列表
      getList() {
        this.listLoading = true;
        this.tableFrom.page = this.tableFrom.page;
        activityIssueListApi(this.tableFrom)
          .then(res => {
            this.tableData.data = res.data.list;
            this.tableData.total = res.data.count;
            this.listLoading = false;
          })
          .catch((err) => {
            this.$message.error(err.message || '操作失败');
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

      // 修改活动状态
      onchangeIsShow(row) {
        activityIssueStatusApi(row.activity_id, row.status)
          .then((res) => {
            this.$message.success(res.message || '操作成功');
          })
          .catch((err) => {
            this.$message.error(err.message || '操作失败');
          });
      },
      // 跳转编辑活动页面
      editActivity(data) {
        this.$router.push({
          path: `editActivity/${data.activity_id}`,
          query: {
            title: data.title
          }
        });
      },
      //跳转添加活动页面
      createActivity(id) {
        this.$router.push(`createActivity/${id}`);
      },

      //跳转管理商户页面
      messageMerchant(id) {
        this.$router.push(`messageMerchant/${id}`);
      }
    }
  };
</script>

<style scoped lang="scss">
  .modalbox {
    /deep/.el-dialog {
      min-width: 550px;
    }
  }

  .selWidth {
    width: 350px !important;
    height: 20px;
  }

  .seachTiele {
    margin: 0 0 15px;
    line-height: 35px;
  }

  .fa {
    color: #0a6aa1;
    display: block;
  }

  .sheng {
    color: #ff0000;
    display: block;
  }

  .ml20 {
    margin-left: 20px;
  }

  .box-container {
    overflow: hidden;
  }

  .box-container .list {
    float: left;
    line-height: 40px;
  }

  .box-container .sp {
    width: 50%;
  }

  .box-container .sp3 {
    width: 33.3333%;
  }

  .box-container .sp100 {
    width: 100%;
  }

  .box-container .list .name {
    display: inline-block;
    width: 150px;
    text-align: right;
    color: #606266;
  }

  .box-container .list .blue {
    color: #1890ff;
  }
</style>
