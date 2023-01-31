<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form size="small" label-width="120px">
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
            <el-form-item label="是否团长：">
              <el-radio-group v-model="tableFrom.is_head" type="button" @change="getList(1)">
                <el-radio-button label="">全部</el-radio-button>
                <el-radio-button label="1">团长</el-radio-button>
                <el-radio-button label="0">参团人员</el-radio-button>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="拼团状态：">
              <el-radio-group v-model="tableFrom.status" type="button" @change="getList(1)">
                <el-radio-button label="">全部</el-radio-button>
                <el-radio-button label="1">拼团中</el-radio-button>
                <el-radio-button label="2">拼成成功</el-radio-button>
                <el-radio-button label="-1">拼团失败</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="核销状态：">
              <el-radio-group v-model="tableFrom.hx_status" type="button" @change="getList(1)">
                <el-radio-button label="">全部</el-radio-button>
                <el-radio-button label="1">已核销</el-radio-button>
                <el-radio-button label="0">未核销</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="发货状态：">
              <el-radio-group v-model="tableFrom.is_delivery" type="button" @change="getList(1)">
                <el-radio-button label="">全部</el-radio-button>
                <el-radio-button label="1">已发货</el-radio-button>
                <el-radio-button label="0">未发货</el-radio-button>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="订单号搜索：">
              <el-input v-model="tableFrom.keyword" placeholder="请输入订单号" class="selWidth" @change="getList(1)">
                <el-button slot="append" icon="el-icon-search" @click="getList(1)" />
              </el-input>
            </el-form-item>
            <el-form-item label="发起人搜索：">
              <el-input v-model="tableFrom.user_name" placeholder="请输入发起人昵称" class="selWidth" @change="getList(1)">
                <el-button slot="append" icon="el-icon-search" @click="getList(1)" />
              </el-input>

              <el-button size="small" style="margin-left: 50px;" type="primary" @click="exportOrder()">生成订单</el-button>
              <el-button size="small" type="primary" @click="getExportFileList">导出已生成列表</el-button>

            </el-form-item>
            <el-button size="mini" style="margin-left: 0px" @click="deliverGoods">批量发货</el-button>
          </el-form>
        </div>
      </div>
      <el-table v-loading="listLoading" :data="tableData.data" style="width: 100%" size="mini" @selection-change="handleSelectionChange">
        <el-table-column key="2" type="selection" width="55" />
        <el-table-column prop="product_assist_set_id" label="ID" min-width="50" />
        <!--  <el-table-column label="商户名称" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.merchant ? scope.row.merchant.mer_name : '' }}</span>
          </template>
        </el-table-column> -->
        <!--  <el-table-column prop="mer_name" label="商户类别" min-width="90">
          <template slot-scope="scope">
            <span v-if="scope.row.merchant" class="spBlock">{{ scope.row.merchant.is_trader ? '自营' : '非自营' }}</span>
          </template>
        </el-table-column> -->
        <el-table-column prop="product_assist_sn" label="订单号" min-width="140" />
        <el-table-column label="商品图片" min-width="80">
          <template slot-scope="scope">
            <div class="demo-image__preview">
              <el-image :src="scope.row.product.image" :preview-src-list="[scope.row.product.image]" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" min-width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.assist.store_name }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="助力价格" min-width="90">
          <template slot-scope="scope">
            <span>{{ scope.row.assist && scope.row.assist.assistSku[0].assist_price || '' }}</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column prop="assist_user_count" label="当前团数量" min-width="90" /> -->
        <el-table-column label="发起人" min-width="90">
          <template slot-scope="scope">
            <span>{{ scope.row.user && scope.row.user.nickname || '' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否团长" min-width="90">
          <template slot-scope="scope">
            <span>{{ scope.row.is_head==1?"是":"否"}}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" min-width="90">
          <template slot-scope="scope">
            <span>{{ scope.row.status==1?"拼团中":(scope.row.status==2?"拼团成功":"拼团失败") }}</span>
          </template>
        </el-table-column>
        <el-table-column label="核销" min-width="90">
          <template slot-scope="scope">
            <span>{{ scope.row.hx_status==1?"已核销":"未核销" }}</span>
          </template>
        </el-table-column>
        <el-table-column label="发货" min-width="90">
          <template slot-scope="scope">
            <span>{{ scope.row.is_delivery==1?"已发货":"未发货" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="delivery_time" label="发货时间" min-width="130" />
        <el-table-column prop="create_time" label="发起时间" min-width="130" />
        <el-table-column label="活动时间" min-width="160">
          <template slot-scope="scope">
            {{ scope.row.assist.end_time && scope.row.assist.end_time ? scope.row.assist.end_time: "" }}
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="150" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="mr10" @click="goDetail(scope.row.product_assist_set_id)">查看详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination :page-sizes="[20, 40, 60, 80]" :page-size="tableFrom.limit" :current-page="tableFrom.page"
          layout="total, sizes, prev, pager, next, jumper" :total="tableData.total" @size-change="handleSizeChange"
          @current-change="pageChange" />
      </div>
    </el-card>
    <!--查看详情-->
    <details-data ref="detailsData" :is-show="isShowDetail" />

    <!--导出订单列表-->
    <file-list ref="exportList" />
  </div>
</template>
<script>
  import {
    assistListApi,
    assistSetDeliveryApi,
    exportOrderApi,
  } from "@/api/product";
  import {
    roterPre
  } from "@/settings";
  import {
    fromList
  } from "@/libs/constants.js";
  import detailsData from './detail'
  import fileList from "@/components/exportFile/fileList";

  const defaultObj = {
    product_id: "",
    image: "",
    slider_image: [],
    store_name: "",
    store_info: "",
    start_day: "",
    end_day: "",
    start_time: "",
    end_time: "",
    is_open_recommend: 1,
    is_open_state: 1,
    is_show: 1,
    presell_type: 1,
    keyword: "",
    brand_id: "", // 品牌id
    cate_id: "", // 平台分类id
    mer_cate_id: [], // 商户分类id
    unit_name: "",
    integral: 0,
    sort: 0,
    is_good: 0,
    temp_id: "",
    preSale_date: "",
    finalPayment_date: "",
    delivery_type: 1,
    delivery_day: 10,
    attrValue: [{
      image: "",
      price: null,
      down_price: null,
      presell_price: null,
      cost: null,
      ot_price: null,
      old_stock: null,
      stock: null,
      bar_code: "",
      weight: null,
      volume: null,
    }, ],
    attr: [],
    extension_type: 0,
    content: "",
    spec_type: 0,
    // give_coupon_ids: [],
    is_gift_bag: 0,
    // couponData: [],
  };

  export default {
    name: "ProductList",
    components: {
      detailsData,
      fileList
    },
    data() {
      return {
        props: {
          emitPath: false,
        },
        roterPre: roterPre,
        listLoading: true,
        tableData: {
          data: [],
          total: 0,
        },
        assistStatusList: [{
            label: "未开始",
            value: 0
          },
          {
            label: "正在进行",
            value: 1
          },
          {
            label: "已结束",
            value: 2
          },
        ],
        fromList: fromList,
        tableFrom: {
          page: 1,
          limit: 20,
          keyword: "",
          is_head: "",
          is_delivery: "",
          status: "",
          hx_status: "",
          date: '',
          type: '',
          user_name: ''
        },
        modals: false,
        dialogVisible: false,
        loading: false,
        manyTabTit: {},
        manyTabDate: {},
        formValidate: Object.assign({}, defaultObj),
        OneattrValue: [Object.assign({}, defaultObj.attrValue[0])], // 单规格
        ManyAttrValue: [Object.assign({}, defaultObj.attrValue[0])], // 多规格
        attrInfo: {},
        timeVal: '',
        isShowDetail: false,
        multipleSelection:[],
        assistSetId:[]
      };
    },
    mounted() {
      this.getList('');
    },
    methods: {
      handleSelectionChange(val) {
          this.multipleSelection = val
          const data = []
          this.multipleSelection.map((item) => {
              data.push(item.product_assist_set_id)
          })
          this.assistSetId = data
          console.log(this.assistSetId,"assistSetId");
      },
      deliverGoods() {
        if (this.multipleSelection.length === 0) return this.$message.warning('请先选择订单')
        this.$confirm('此操作将批量发货, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          assistSetDeliveryApi({ids:this.assistSetId})
          .then(res => {
            this.$message.success(res.message || "操作成功");
            this.getList("");
          })
          .catch(err => {
            this.$message.error(err.message || "操作失败");
          });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      },
      getExportFileList() {
        this.fileVisible = true;
        this.$refs.exportList.exportFileList("qdd");
      },
      // 导出
      exportOrder() {
        exportOrderApi(this.tableFrom)
          .then(res => {
            /*this.$message.success(res.message);
            this.fileVisible = true;
            this.$refs.exportList.exportFileList();*/
            const h = this.$createElement;
            this.$msgbox({
              title: "提示",
              message: h("p", null, [
                h("span", null, '文件正在生成中，请稍后点击"'),
                h("span", {
                  style: "color: teal"
                }, "导出已生成列表"),
                h("span", null, '"查看~ ')
              ]),
              confirmButtonText: "我知道了"
            }).then(action => {});
          })
          .catch(res => {
            this.$message.error(res.message);
          });
      },
      watCh() {

      },
      // 查看详情
      goDetail(id) {
        this.$refs.detailsData.dialogVisible = true
        this.isShowDetail = true
        this.$refs.detailsData.getList(id)
      },
      // 选择时间
      selectChange(tab) {
        this.tableFrom.date = tab;
        this.tableFrom.page = 1;
        this.timeVal = [];
        this.getList('');
      },
      // 具体日期
      onchangeTime(e) {
        this.timeVal = e;
        this.tableFrom.date = e ? this.timeVal.join("-") : "";
        this.tableFrom.page = 1;
        this.getList('');
      },
      // 列表
      getList(num) {
        this.listLoading = true;
        this.tableFrom.page = num ? num : this.tableFrom.page;
        assistListApi(this.tableFrom)
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
        this.getList('');
      },
      handleSizeChange(val) {
        this.tableFrom.limit = val;
        this.getList('');
      },


    },
  };
</script>

<style scoped lang="scss">
  .el-table .cell {
    white-space: pre-line;
  }

  .add {
    font-style: normal;
    position: relative;
    top: -1.2px;
  }

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand1 {
    /deep/ label {
      width: 77px !important;
      color: #99a9bf;
    }
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 33.33%;
  }

  .selWidth {
    width: 350px !important;
  }

  .seachTiele {
    line-height: 35px;
  }

  .title {
    margin-bottom: 16px;
    color: #17233d;
    font-size: 14px;
    font-weight: bold;
  }

  .scollhide::-webkit-scrollbar {
    display: none;
    /* Chrome Safari */
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
    color: #606266;
  }

  .box-container .list .blue {
    color: #1890ff;
  }

  .box-container .list.image {
    margin: 20px 0;
    position: relative;
  }

  .box-container .list.image img {
    position: absolute;
    top: -20px;
  }

  .labeltop {
    height: 280px;
    overflow-y: auto;
  }
</style>
