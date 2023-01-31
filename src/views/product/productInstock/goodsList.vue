<template>
  <el-dialog v-if="dialogVisible" title="商品信息" :visible.sync="dialogVisible" width="1200px">
    <div class="divBox">
      <div class="header clearfix">
        <div class="filter-container">
          <div class="demo-input-suffix acea-row">
            <span class="seachTiele">商品搜索：</span>
            <el-input
              v-model="tableFrom.keyword"
              placeholder="请输入商品名称，关键字，产品编号"
              class="selWidth"
              clearable
            >
              <el-button slot="append" icon="el-icon-search" @click="getList" />
            </el-input>
            <el-button style="margin-left: 30px;" size="small" type="primary" @click='close'>确定</el-button>
          </div>
        </div>
      </div>
      <el-table v-loading="listLoading" :data="tableData.data" style="width: 100%" size="mini" @selection-change="handleSelectionChange">
          <el-table-column
              type="selection"
              width="55">
            </el-table-column>
        <!-- <el-table-column width="55">
          <template slot-scope="scope">
            <el-radio
              v-model="templateRadio"
              :label="scope.row.product_id"
              @change.native="getTemplateRow(scope.row)"
            >&nbsp</el-radio>
          </template>
        </el-table-column> -->
        <el-table-column prop="product_id" label="ID" min-width="50" />
        <el-table-column label="商品图" min-width="80">
          <template slot-scope="scope">
            <div class="demo-image__preview">
              <el-image
                style="width: 36px; height: 36px"
                :src="scope.row.image"
                :preview-src-list="[scope.row.image]"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="store_name" label="商品名称" min-width="200" />
      </el-table>
      <div class="block mb20">
        <el-pagination
          :page-sizes="[5, 40, 60, 80]"
          :page-size="tableFrom.limit"
          :current-page="tableFrom.page"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.total"
          @size-change="handleSizeChange"
          @current-change="pageChange"
        />
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { productLstMultApi, categorySelectApi } from "@/api/product";
import { roterPre } from "@/settings";
export default {
  name: "GoodsList",
  data() {
    return {
      dialogVisible: false,
      templateRadio: 0,
      merCateList: [],
      roterPre: roterPre,
      listLoading: true,
      tableData: {
        data: [],
        total: 0,
      },
      tableFrom: {
        page: 1,
        limit: 5,
        cate_id: "",
        store_name: "",
        keyword: "",
        is_gift_bag: 0,
        status: 1
      },
      multipleSelection: {},
      checked: [],
    };
  },
  mounted() {
    this.getList();
    window.addEventListener("unload", (e) => this.unloadHandler(e));
  },
  methods: {
    getTemplateRow(row) {
      this.multipleSelection = { src: row.image, id: row.product_id };
    },
    handleSelectionChange(val) {
            this.multipleSelection = val;
    },
    close(){
      this.dialogVisible = false;
      // console.log(this.multipleSelection);
      this.$emit("getProduct", this.multipleSelection);
    },
   
    // 列表
    getList() {
      this.listLoading = true;
      productLstMultApi(this.tableFrom)
        .then((res) => {
          this.tableData.data = res.data.list;
          this.tableData.total = res.data.count;
          
          this.listLoading = false;
        })
        .catch((res) => {
          this.listLoading = false;
          this.$message.error(res.message);
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
  },
};
</script>

<style scoped lang="scss">
.selWidth {
  width: 360px !important;
}
.seachTiele {
  line-height: 35px;
}
.fr {
  float: right;
}
</style>
