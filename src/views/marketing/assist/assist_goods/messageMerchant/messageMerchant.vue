<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="filter-container">
          <div class="demo-input-suffix acea-row">
            <span class="seachTiele">关键字：</span>
            <el-input v-model="search" placeholder="请输入商户关键字" class="selWidth" clearable @change="searchList">
              <el-button slot="append" icon="el-icon-search" @click="searchList()" />
            </el-input>
          </div>
          <el-button size="small" type="primary" @click="addMerchant()">添加商户</el-button>
          <el-button size="small" type="primary" @click="addMerchant(true)">一键添加所有商户</el-button>
          <!-- <el-button size="small" type="primary" @click="delMerchant()">刪除</el-button> -->
          <!-- <el-button size="small" type="primary" @click="delMerchant(true)">清空商户</el-button> -->
        </div>
      </div>
      <el-table v-loading="listLoading" :data="tableData.data" style="width: 100%" size="small" highlight-current-row
        @selection-change="selectDelChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="mer_id" label="商户ID" min-width="60" />
        <el-table-column prop="store_name" label="店铺名称" min-width="160" />
        <el-table-column prop="real_name" label="商户名称" min-width="140" />
        <el-table-column prop="mer_phone" min-width="140" label="商户手机号" />
        <el-table-column prop="assist_user_count" min-width="140" label="几人团" />
        <el-table-column prop="assist_hour" min-width="140" label="过期小时" />
        <el-table-column prop="assist_count" min-width="140" label="分配团数量" />
        <el-table-column prop="assist_used_count" min-width="140" label="已开团数量" />
        <el-table-column prop="assist_success_count" min-width="140" label="成功团数量" />
        <el-table-column label="操作" min-width="160">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="mr10" @click="delMerchant(scope.row.mer_id)">删除</el-button>
            <el-button type="text" size="small" class="mr10" @click="editMerchant(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <el-pagination :page-sizes="[10, 20, 30, 40]" :page-size="tableFrom.limit" :current-page="tableFrom.page"
          layout="total, sizes, prev, pager, next, jumper" :total="tableData.total" @size-change="handleSizeChange"
          @current-change="pageChange" />
      </div>
    </el-card>

    <el-dialog title="添加活动商户" class="merchantDialog" :visible.sync="CreateDialogVisible" width="60%">
      <div class="divBox">
        <div class="header clearfix">
          <div class="filter-container">
            <div class="demo-input-suffix acea-row">
              <span class="seachTiele" v-show="false">商户分类：</span>
              <el-select v-show="false" v-model="tableForm" placeholder="请选择" class="mr20" clearable
                @change="getList()">
                <el-option v-for="item in tableForm" :key="item.id" :label="item.name" :value="item.name" />
              </el-select>
              <span class="seachTiele" style="margin-left: 40%" width="30%">搜索商户：</span>
              <el-input v-model="tableForm.keyword" clearable style="width: 40%" @change="searchListAll">
                <el-button slot="append" icon="el-icon-search" @click="searchListAll" />
              </el-input>
            </div>
          </div>
        </div>
        <el-table :data="tableDataAll.data" style="width: 100%" size="mini" @selection-change="selectChange">
          <el-table-column width="55" type="selection"> </el-table-column>

          <el-table-column prop="id" label="商户ID" min-width="20" />
          <el-table-column prop="store_name" label="店铺名称" min-width="60" />
          <el-table-column prop="name" label="商户名称" min-width="30">
          </el-table-column>
          <el-table-column prop="phone" min-width="30" label="商户手机号">
          </el-table-column>
        </el-table>
        <div style="height: 10px">
          <el-pagination :page-sizes="[10, 20, 30, 40]" :page-size="tableFromIssue.limit"
            :current-page="tableFromIssue.page" layout="total, sizes, prev, pager, next, jumper"
            :total="tableDataAll.total" @size-change="handleSizeChangeIssue" @current-change="pageChangeIssue" />
        </div>
      </div>
      <span slot="footer">
        <el-button type="mini" @click="CreateDialogVisible = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="addMerchantDo">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑商户对话框 -->
    <el-dialog title="编辑活动商户" :visible.sync="editDialogVisible" @close="editDialogVisibleClosed" width="30%"
      class="editDialoglocation">
      <el-form ref="editFormRef" :model="editForm" label-width="80px">
        <el-form-item label="商户ID" prop="mer_id">
          <el-input v-model="editForm.mer_id" disabled="true"/>
        </el-form-item>
        <el-form-item label="店铺名称" prop="store_name">
          <el-input v-model="editForm.store_name"  disabled="true"/>
        </el-form-item>
        <el-form-item label="商户名称" prop="real_name">
          <el-input v-model="editForm.real_name" disabled="true" />
        </el-form-item>
        <el-form-item label="手机号" prop="mer_phone">
          <el-input v-model="editForm.mer_phone" disabled="true" />
        </el-form-item>
        <el-form-item label="几人团" prop="assist_user_count">
          <el-input v-model="editForm.assist_user_count" disabled="true" />
        </el-form-item>
        <el-form-item label="过期小时" prop="assist_hour">
          <el-input v-model="editForm.assist_hour"  />
        </el-form-item>
        <el-form-item label="分配团数量" prop="assist_count">
          <el-input v-model="editForm.assist_count"  />
        </el-form-item>
        <el-form-item label="已开团数量" prop="assist_used_count">
          <el-input v-model="editForm.assist_used_count" disabled="true" />
        </el-form-item>
        <el-form-item label="成功团数量" prop="assist_success_count">
          <el-input v-model="editForm.assist_success_count" disabled="true" />
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button type="small" @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editMerchantDo" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getMerchantAssistListApi,
    merchantAssistDeleteApi,
    merchantAssistAddApi,
    merchantAssistEditApi
  } from "@/api/marketing";
  import {
    roterPre
  } from "@/settings";
  export default {
    name: "messageMerchant",
    data() {
      const checkmobile = (value, callback) => {
        const regmobile = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        if (regmobile.test(value)) {
          return callback();
        }
        callback(new Error("请输入正确的手机号"));
      };
      return {
        search: "",
        Loading: false,
        roterPre: roterPre,
        listLoading: true,
        receiveType: 0,
        tableData: {
          data: [],
          total: 0
        },
        tableFrom: {
          page: 1,
          limit: 10
        },
        tableFromIssue: {
          page: 1,
          limit: 10
        },
        //添加商户数据
        tableForm: {
          product_assist_id: "",
          mer_id: "",
          //搜索数据
          keyword: ""
        },
        //编辑商户数据
        editForm: {
          product_assist_id: "",
          mer_id: "",
          mer_name: "",
          real_name: "",
          mer_phone: "",
          assist_count: "",
          assist_hour: "",
          assist_success_count: "",
          assist_user_count: "",
          assist_used_count: ""
        },

        issueData: {
          data: [],
          total: 0
        },
        activityId: 0,
        activityDetail: {},
        value: true,
        //对话框控制
        CreateDialogVisible: false,
        deleteDialogVisible: false,
        editDialogVisible: false,
        //选中框
        templateRadio: 0,
        //所有商户
        tableDataAll: {},
        //选中的数组
        selectArr: [],
        selectDelArr: []
      };
    },
    created() {
      this.activityId = this.$route.params.id;
      console.log(this.activityId, "this.activityId");
      this.getList();
    },
    methods: {
      searchListAll() {
        this.tableFromIssue.page = 1;
        this.getListAll()
      },
      searchList() {
        this.tableFrom.page = 1;
        this.getList()
      },
      // 获取当前活动商户列表
      async getList() {
        this.listLoading = true;
        let data = {
          keyword: this.search,
          limit: this.tableFrom.limit,
          page: this.tableFrom.page
        };
        await getMerchantAssistListApi(this.activityId, data)
          .then(res => {
            this.tableData.data = res.data.list;
            this.tableData.total = res.data.count;
            this.selectDelArr = [];
            this.listLoading = false;
          })
          .catch(err => {
            this.$message.error(err.message || "操作失败");
            this.listLoading = false;
          });
      },
      //获取所有商户列表
      getListAll() {
        this.listLoading = true;
        let data = {
          keyword: this.tableForm.keyword,
          limit: this.tableFromIssue.limit,
          page: this.tableFromIssue.page
        };
        getMerchantAssistListApi(0, data)
          .then(res => {
            this.tableDataAll.data = res.data.list;
            this.tableDataAll.total = res.data.count;
            this.selectArr = [];
            this.listLoading = false;
          })
          .catch(err => {
            this.$message.error(err.message || "操作失败");
            this.listLoading = false;
          });
      },
      //监听分页数据条数
      handleSizeChange(val) {
        this.tableFrom.limit = val;
        this.getList();
      },
      //监听页数
      pageChange(page) {
        this.tableFrom.page = page;
        this.getList();
      },
      //添加商户
      addMerchant(isAll = false) {
        if (isAll) {
          //一键添加所有商户
          this.addMerchantAll();
        } else {
          this.getListAll();
          this.CreateDialogVisible = true;
        }
      },
      addMerchantAll(isAll = false) {
        let that = this;

        if (isAll) {
          //一键添加所有商户
          this.addMerchantAll();
        } else {

          this.$confirm("确定要添加所有商家参加本活动吗?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
            .then(() => {
              console.log("选择了确认");
              let ids = {
                ids: [-1]
              };
              merchantAssistAddApi(this.activityId, ids)
                .then(res => {
                  that.loading = false;
                  this.getList();
                  that.$message.success(res.message);
                })
                .catch(res => {
                  that.loading = false;
                  that.$message.error(res.message);
                });
            })
            .catch(() => {
              //选择了取消
              that.loading = false;
            });
        }
      },
      // 添加商户
      addMerchantDo() {
        let selectArr = [...new Set(this.selectArr)];
        let ids = {
          ids: selectArr
        };

        if (selectArr.length == 0) {
          this.CreateDialogVisible = false;
          return;
        }
        merchantAssistAddApi(this.activityId, ids)
          .then(res => {
            this.$message.success(res.message || "操作成功");
            this.getList();
            this.CreateDialogVisible = false;
          })
          .catch(err => {
            this.$message.error(err.message || "操作失败");
            this.getList();
            this.CreateForm.mer_id = "";
            this.CreateForm.product_assist_id = "";
            this.CreateDialogVisible = false;
          });
      },
      //编辑商户
      editMerchant(val) {
        this.editDialogVisible = true;
        this.editForm = val;
        this.editForm.product_assist_id = this.activityId;

      },
      //编辑商户-do
      editMerchantDo() {

        merchantAssistEditApi(this.activityId,this.editForm)
          .then(res => {
            this.$message.success(res.message || "操作成功");
            this.getList();
            this.editDialogVisible = false;
          })
          .catch(err => {
            this.$message.error(err.message || "操作失败");
            this.editDialogVisible = false;
          });
      },
      //删除商户
      delMerchant(id = "") {

         this.$confirm("删除此商家会同步清空抢多多订单?", "提示", {
             confirmButtonText: "确定",
             cancelButtonText: "取消",
             type: "warning"
           })
           .then(() => {
             if (id != "") {
               this.selectDelArr = [id];
             }
             let selectArr = [...new Set(this.selectDelArr)];
             let ids = {
               ids: selectArr
             };
             if (selectArr.length == 0) {
               this.CreateDialogVisible = false;
               return;
             }
             merchantAssistDeleteApi(this.activityId, ids)
             .then(res => {
               this.$message.success(res.message || "操作成功");
               this.getList();
               this.deleteDialogVisible = false;
             })
             .catch(err => {
               this.$message.error(err.message || "操作失败");
               this.deleteDialogVisible = false;
             });
           })
           .catch(() => {
             //选择了取消
             that.loading = false;
           });

      },

      selectChange(item, flag) {
        this.selectArr = [];
        for (let i = 0; i < item.length; i++) {
          this.selectArr.push(item[i].id);
        }
      },
      selectDelChange(item, flag) {
        this.selectDelArr = [];
        for (let i = 0; i < item.length; i++) {
          this.selectDelArr.push(item[i].id);
        }
      },
      //重置表单
      CreateDialogVisibleClosed() {
        this.$refs.CreateFormRef.resetFields();
      },
      editDialogVisibleClosed() {
        this.$refs.editFormRef.resetFields();
      },
      handleCheckedCitiesChange() {},
      // 列表
      // getIssueList(status) {
      //   this.Loading = true;
      //   this.tableFromIssue.status = status;
      //   issueApi(this.tableFromIssue)
      //     .then((res) => {
      //       this.issueData.data = res.data.list;
      //       this.issueData.total = res.data.total;
      //       this.selectArr = [];
      //       this.Loading = false;
      //     })
      //     .catch((err) => {
      //       this.$message.error(err.message|| '操作失败');
      //       this.Loading = false;
      //     });
      // },
      pageChangeIssue(page) {
        this.tableFromIssue.page = page;
        this.getListAll();
      },
      handleSizeChangeIssue(val) {
        this.tableFromIssue.limit = val;
        this.getListAll();
      },
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
    width: 250px !important;
  }

  .seachTiele {
    margin: 0 0 15px;
    line-height: 35px;
    font-size: 13px;
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

  .ceateDialoglocation {
    margin-top: 12%;
  }

  .editDialoglocation {
    margin-top: 4%;
  }

  .selWidth {
    width: 360px !important;
  }

  .seachTiele {
    line-height: 35px;
  }

  .fr {
    float: right;
  }

  .merchantDialog {
    margin-top: -5%;
    font-size: 26px;
  }
</style>
