<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form size="small" label-width="100px" :inline="true">
            <el-form-item label="文章标题：">
              <el-input v-model="tableFrom.title" placeholder="请输入文章标题" class="selWidth" size="small">
                <el-button slot="append" icon="el-icon-search" size="small" @click="getList" />
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <router-link :to="{path: roterPre +'/cms/addSchool'}">
          <el-button size="small" type="primary">添加文章</el-button>
        </router-link>
      </div>
      <el-table
        v-loading="listLoading"
        :data="tableData.data"
        style="width: 100%"
        size="small"
      >
        <el-table-column
          prop="article_id"
          label="ID"
          min-width="60"
        />
        <el-table-column label="文章图片" min-width="80" prop="image">
          <template slot-scope="scope">
            <div class="demo-image__preview">
              <el-image
                style="width: 36px; height: 36px"
                :src="scope.row.image_input"
                :preview-src-list="[scope.row.image_input]"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="文章标题" min-width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.articleCategory ? ' [ ' + scope.row.articleCategory.title + ' ] ' + scope.row.title : scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="时间"
          min-width="150"
        />
        <el-table-column label="操作" min-width="100" fixed="right">
          <template slot-scope="scope">
            <router-link :to="{path: roterPre + '/cms/addSchool/' + scope.row.article_id}">
              <el-button type="text" size="small" class="mr10">编辑</el-button>
            </router-link>
            <el-button type="text" size="small" @click="handleDelete(scope.row.article_id, scope.$index)">删除</el-button>
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
  articleSchoolLstApi, articleSchoolDeleApi
} from '@/api/cms'
import { roterPre } from '@/settings'
export default {
  name: 'ArticleSchool',
  data() {
    return {
      roterPre: roterPre,
      tableFrom: {
        page: 1,
        limit: 20,
        title: ''
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
      articleSchoolLstApi(this.tableFrom).then(res => {
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
    // 删除
    handleDelete(id, idx) {
      this.$modalSure().then(() => {
        articleSchoolDeleApi(id).then(({ message }) => {
          this.$message.success(message)
          this.getList()
        }).catch(({ message }) => {
          this.$message.error(message)
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .selWidth{
    width: 350px;
  }
</style>
