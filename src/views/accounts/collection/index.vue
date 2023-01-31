<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">

        <div class="container">
          <el-form inline size="small" :label-position="labelPosition" label-width="100px">
            <el-form-item label="关键字：" class="width100">
              <el-input v-model="userFrom.keyword" placeholder="姓名/银行卡号" class="selWidth" size="small" >
                <el-button slot="append" icon="el-icon-search" size="small" @click="getList(1)" />
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="mb15">
          <el-button style="margin-left: 20px;" size="small" type="primary" @click="addCard">添加银行卡</el-button>
          <el-button size="small" type="primary" @click="batchlabel">设置默认卡</el-button>
        </div>
        <el-alert v-if="multipleSelection.length>0" :title="`已选择  ${multipleSelection.length}  项`" type="info"
          show-icon />
      </div>
      <el-table v-loading="listLoading" :data="tableData.data" style="width: 100%" size="small" highlight-current-row  @selection-change="handleSelectionChange">

        <el-table-column type="selection" width="50" />
        <el-table-column prop="user_bank_id" label="ID" min-width="70" />
        <el-table-column label="支付通道"  min-width="100">
          <template slot-scope="scope">
            <span class="spBlock">{{ scope.row.pay_way==1?"建行":"汇付" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="card_name" label="真实姓名" sortable min-width="100" />
        <el-table-column prop="card_no" label="银行卡号" sortable min-width="140" />
        <el-table-column prop="card_sfz" label="身份证号" sortable min-width="140" />
        <el-table-column prop="card_phone" label="开户手机号" sortable min-width="100" />
        <el-table-column prop="bd_card_id" label="汇付商户编号" sortable min-width="140" />
        <el-table-column prop="hsb_no" label="建行商户编号"  min-width="140" />
        <el-table-column label="是否默认"  min-width="100">
          <template slot-scope="scope">
            <span class="spBlock">{{ scope.row.is_default==1?"默认":"否" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="添加时间" min-width="150" />
        <el-table-column label="操作" min-width="130" fixed="right">
          <template slot-scope="scope">
            <!-- <el-button type="text" size="small" class="mr10" @click="onEdit(scope.row.user_bank_id)">查看</el-button> -->
            <el-button type="text" size="small" class="mr10" @click="onDelete(scope.row.user_bank_id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination :page-sizes="[20, 40, 60, 80]" :page-size="userFrom.limit" :current-page="userFrom.page"
          layout="total, sizes, prev, pager, next, jumper" :total="tableData.total" @size-change="handleSizeChange"
          @current-change="pageChange" />
      </div>
    </el-card>
    <el-dialog title="提示" :visible.sync="visible" width="1000px" :before-close="handleClose" class="dia">
      <news-category v-if="visible" :is-show-send="isShowSend" :wechat-ids="wechatIds" :user-ids="ids"
        :max-cols="maxCols" />
      <!--<span slot="footer" class="dialog-footer" />-->
    </el-dialog>

  </div>
</template>

<script>
  import {
    getBankcard,
    cardAddApi,
    cardUpdateApi,
    deleteCApi,
    setDefault,
  } from '@/api/user'
  export default {
    name: 'UserBank',
    data() {
      return {
        visibleDetail: false,
        maxCols: 3,
        isShowSend: true,
        visible: false,
        tableData: {
          data: [],
          total: 0
        },
        listLoading: true,
        multipleSelection: [],
        ids: '',
        labelPosition: 'right',

        userFrom: {
          keyword:'',
          page: 1,
          limit: 20,
        },

      }
    },
    mounted() {
      this.getList('')
    },
    methods: {

      sendNews() {
          if (this.multipleSelection.length === 0) return this.$message.warning('请先选择用户')
          this.visible = true
      },
      handleClose() {
          this.visible = false
      },
      handleSelectionChange(val) {
          this.multipleSelection = val
          const data = []
          const wechatData = []
          this.multipleSelection.map((item) => {
              data.push(item.user_bank_id)
          })
          this.ids = data.join(',')
      },


      pageChange(page) {
        this.userFrom.page = page
        this.getList('')
      },
      handleSizeChange(val) {
        this.userFrom.limit = val
        this.getList('')
      },
      addCard() {
        this.$modalForm(cardAddApi()).then(() => this.getList())
      },
      // 编辑
      onEdit(id) {
        let that = this;
        this.$modalForm(cardUpdateApi(id)).then(() => this.getList())
      },


      // 列表
      getList(num) {
        console.log("加载列表");
        this.listLoading = true
        this.userFrom.page = num ? num : this.userFrom.page;
        getBankcard(this.userFrom).then(res => {
          this.tableData.data = res.data.list
          this.tableData.total = res.data.count
          this.listLoading = false
        }).catch(res => {
          this.listLoading = false
          this.$message.error(res.message)
        })
      },

      batchlabel(id) {

        if(this.multipleSelection.length == 0){
           this.$message.error('请选择一项');
           return;
        }else if(this.multipleSelection.length >1){
           this.$message.error('仅能选择一项');
           return;
        }
        let that = this;
        this.$confirm('确定要设置默认吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          setDefault(this.ids)
            .then(res => {
              this.LogLoading = false;
              this.$message.success(res.message);
              this.getList('');
            })
            .catch(res => {
              this.$message.error(res.message);
              this.LogLoading = false;
            });

        }).catch(() => {
          that.loading = false
        })
      },

      onDelete(id) {
        let that = this;
        this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteCApi(id)
            .then(res => {
              console.log(res);
              this.LogLoading = false;
              this.$message.success(res.message);
              this.getList('');
            })
            .catch(res => {
              this.$message.error(res.message);
              this.LogLoading = false;
            });

        }).catch(() => {
          that.loading = false
        })
      },

    }
  }
</script>

<style lang="scss" scoped>
  .selWidth {
    width: 300px;
  }

  .selWidth_half {
    width: 50% !important;
  }

  .dia {
    /deep/ .el-dialog__body {
      height: 700px !important;
    }
  }

  .text-right {
    text-align: right;
  }

  .container {
    min-width: 821px;

    /deep/.el-form-item {
      width: 100%;
    }

    /deep/.el-form-item__content {
      width: 72%;
    }
  }

  .vipName {
    color: #dab176
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
    font-size: 12px;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 33.33%;
  }

  /deep/[type=reset],
  [type=submit],
  button,
  html [type=button] {
    -webkit-appearance: none !important;
  }
</style>
