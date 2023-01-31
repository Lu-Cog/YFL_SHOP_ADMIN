<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form size="small" inline label-width="120px">
           
            <el-form-item label="关键词：" label-width="80px">
              <el-input v-model="tableFrom.keyword" placeholder="请输入订单号搜索" class="selWidth" @change="getList(1)">
                <el-button slot="append" icon="el-icon-search" @click="getList(1)" />
              </el-input>
            </el-form-item>
         
          </el-form>
        </div>

        <router-link :to=" { path:`${roterPre}` + '/product/instockAdd?type='+this.$route.query.type } ">
          <el-button size="small" type="primary">
            <i class="add">+</i> 添加
          </el-button>
        </router-link>
      </div>
      <el-table v-loading="listLoading" :data="tableData.data" style="width: 100%" size="mini">
        <el-table-column prop="id" label="ID" min-width="50" />
     
        <!-- <el-table-column label="图片" min-width="80">
          <template slot-scope="scope">
            <div class="demo-image__preview">
              <el-image :src="scope.row.image" :preview-src-list="[scope.row.image]" />
            </div>
          </template>
        </el-table-column> -->
        <el-table-column prop="order_sn" label="订单号" min-width="150" />
        <el-table-column prop="type" label="类型" min-width="120" />
        <el-table-column prop="stype" label="子类型" min-width="120" />
        <el-table-column prop="stock" label="总数量" min-width="120" />
		<!-- <el-table-column prop="exp_time" label="过期时间" min-width="120" v-if="this.$route.query.type==1"/> -->
        <!-- <el-table-column prop="price" label="价格" min-width="120" /> -->
        <el-table-column prop="note" label="备注" />
    <el-table-column prop="create_time" label="创建时间" min-width="90" />
        <!-- <el-table-column prop="status" label="显示状态" min-width="80">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0" active-text="显示"
              inactive-text="隐藏" @change="onchangeIsShow(scope.row)" />
          </template>
        </el-table-column> -->
      
        <el-table-column label="操作" fixed="right">
          <template slot-scope="scope">
			  <router-link :to=" { name:'ProductInfo',params:scope.row} ">查看</router-link>
            <!-- <el-button type="text" size="small" class="mr10" @click="onEdit(scope.row.product_assist_id)"></el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination :page-sizes="[20, 40, 60, 80]" :page-size="tableFrom.limit" :current-page="tableFrom.page"
          layout="total, sizes, prev, pager, next, jumper" :total="tableData.total" @size-change="handleSizeChange"
          @current-change="pageChange" />
      </div>
    </el-card>
    <!--商品编辑-->
    <el-dialog title="商品编辑" :visible.sync="dialogVisible" width="1000px" :before-close="handleClose">
      <el-form ref="formValidate" v-loading="fullscreenLoading" class="formValidate mt20" :rules="ruleValidate"
        :model="formValidate" label-width="100px" @submit.native.prevent>
        <el-form-item label="商品主图：" prop="image">
          <div class="upLoadPicBox" @click="modalPicTap('1')">
            <div v-if="formValidate.image" class="pictrue">
              <img :src="formValidate.image" />
            </div>
            <div v-else class="upLoad">
              <i class="el-icon-camera cameraIconfont" />
            </div>
          </div>
        </el-form-item>
        <el-form-item label="商品名称：" prop="store_name">
          <el-input v-model="formValidate.store_name" placeholder="请输入商品名称" />
        </el-form-item>
        <el-form-item label="活动简介：" prop="store_info">
          <el-input v-model="formValidate.store_info" type="textarea" :rows="3" placeholder="请输入抢多多活动简介" />
        </el-form-item>
        <el-form-item label="活动时间：" required>
          <el-date-picker v-model="assist_date" type="datetimerange" range-separator="至"
            start-placeholder="开始日期" end-placeholder="结束日期" align="right" @change="onchangeTime" />
        </el-form-item>
        <el-form-item label="商品总数：" prop="assist_count">
          <el-input-number v-model.number="formValidate.assist_count" :min="10" placeholder="请输入商品总数量" />
        </el-form-item>
        <el-form-item label="团规模人数：" prop="assist_user_count">
          <el-input-number v-model.number="formValidate.assist_user_count" :min="1" placeholder="请输入多少人满团" />
        </el-form-item>
        <el-form-item label="团购限时：" prop="assist_hour">
          <el-input-number v-model.number="formValidate.assist_hour" :min="1" placeholder="请输入多少小时自动结束" /> 小时
        </el-form-item>
        <el-form-item label="活动状态：">
          <el-radio-group v-model="formValidate.status">
            <el-radio :label="0" class="radio">关闭</el-radio>
            <el-radio :label="1">开启</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item style="margin-top:30px;">
          <el-button type="primary" class="submission" size="small" @click="handleSubmit('formValidate')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--商品审核-->
    <!-- <info-from ref="infoFrom" :is-show="isShow" @subSuccess="subSuccess" /> -->
    <!--查看详情-->
    <!-- <details-data ref="detailsData" :is-show="isShowDetail" /> -->
  </div>
</template>
<script>
  import {
    assistProListJApi,
    assistProductStatusApi,
    assistDUpdateApi,
    assistStatusApi,
    merSelectApi,
    assistUpdateOneApi
  } from '@/api/product'
  import {
    roterPre
  } from "@/settings";
  import ueditorFrom from '@/components/ueditorFrom/index'
  // import infoFrom from './info'
  // import detailsData from './detail'
  const proOptions = [{
    name: '热门榜单',
    value: 'is_hot'
  }, {
    name: '促销单品',
    value: 'is_benefit'
  }, {
    name: '精品推荐',
    value: 'is_best'
  }, {
    name: '首发新品',
    value: 'is_new'
  }]

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
    rank: '',
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
      // infoFrom,
      ueditorFrom,
      // detailsData
    },
	watch: {
		'$route' (to, from) { //监听路由是否变化
			if(to.query.type != from.query.type){
				this.tableFrom.type = to.query.type
				this.getList();//重新加载数据
			}
		}
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
        assist_date: '',
        fromList: {
          custom: true,
          fromTxt: [{
              text: '全部',
              val: ''
            },
            {
              text: '待审核',
              val: '0'
            },
            {
              text: '已审核',
              val: '1'
            },
            {
              text: '审核失败',
              val: '-1'
            }
          ]
        },
        tableFrom: {
          page: 1,
          limit: 20,
          keyword: "",
          type: this.$route.query.type,
          product_status: '',
          is_trader: '',
          mer_id: '',
          status: ''
        },
        modals: false,
        dialogVisible: false,
        isShowDetail: false,
        isShow: false,
        loading: false,
        recommend: proOptions,
        fullscreenLoading: true,
        manyTabTit: {},
        manyTabDate: {},
        formValidate: Object.assign({}, defaultObj),
        OneattrValue: [Object.assign({}, defaultObj.attrValue[0])], // 单规格
        ManyAttrValue: [Object.assign({}, defaultObj.attrValue[0])], // 多规格
        attrInfo: {},
        merSelect: [],
        checkboxGroup: [],
        ruleValidate: {
          store_name: [{
            required: true,
            message: "请输入商品名称",
            trigger: "blur"
          }, ]
        },
      };
    },
    mounted() {
      this.getList('');
      this.getMerSelect();
    },
    methods: {
      // 点击商品图
      modalPicTap(tit, num, i) {
        const _this = this;
        const attr = [];
        this.$modalUpload(function(img) {
          if (tit === "1" && !num) {
            _this.formValidate.image = img[0];
            _this.OneattrValue[0].image = img[0];
          }
          if (tit === "2" && !num) {
            img.map((item) => {
              attr.push(item.attachment_src);
              _this.formValidate.slider_image.push(item);
              if (_this.formValidate.slider_image.length > 10) {
                _this.formValidate.slider_image.length = 10
              }
            });
          }
          if (tit === "1" && num === "dan") {
            _this.OneattrValue[0].image = img[0];
          }
          if (tit === "1" && num === "duo") {
            _this.ManyAttrValue[i].image = img[0];
          }
          if (tit === "1" && num === "pi") {
            _this.oneFormBatch[0].image = img[0];
          }
        }, tit);
      },
      //跳转管理商户页面
      messageMerchantQdd(id) {
        this.$router.push(`messageMerchantQdd/${id}`);
      },
      onChangeGroup() {
        this.checkboxGroup.includes('is_benefit') ? this.formValidate.is_benefit = 1 : this.formValidate.is_benefit =
          0 && this.checkboxGroup.remove('is_benefit')
        this.checkboxGroup.includes('is_best') ? this.formValidate.is_best = 1 : this.formValidate.is_best = 0 && this
          .checkboxGroup.remove('is_best')
        this.checkboxGroup.includes('is_new') ? this.formValidate.is_new = 1 : this.formValidate.is_new = 0 && this
          .checkboxGroup.remove('is_new')
        this.checkboxGroup.includes('is_hot') ? this.formValidate.is_hot = 1 : this.formValidate.is_hot = 0 && this
          .checkboxGroup.remove('is_hot')
      },
      handleClose() {
        this.dialogVisible = false
      },
      // 商户列表；
      getMerSelect() {
        merSelectApi()
          .then((res) => {
            this.merSelect = res.data;
          })
          .catch((res) => {
            this.$message.error(res.message);
          });
      },
      subSuccess() {
        this.getList('')
      },
      watCh(val) {

      },
      // 编辑
      onEdit(id) {
		  
        this.productId = id
        // this.getInfo(id)
        // this.dialogVisible = true
      },
      // 审核
      toReview(id) {
        this.$refs.infoFrom.dialogVisible = true
        this.isShow = true
        this.$refs.infoFrom.getInfo(id)
      },
      getInfo(id) {
        this.fullscreenLoading = true
        this.checkboxGroup = [];
        assistDUpdateApi(id).then(res => {
          const info = res.data
          this.formValidate = {
            image: info.image,
            is_hot: info.is_hot,
            is_best: info.is_best,
            is_new: info.is_new,
            is_benefit: info.is_benefit,
            status: info.status,
            ficti: info.ficti,
            content: info.content,
            store_name: info.store_name,
            rank: info.rank,
            store_info: info.store_info,
            assist_count: info.assist_count,
            assist_user_count: info.assist_user_count,
            assist_hour: info.assist_hour,
          }
          this.assist_date = [
            info.start_time,
            info.end_time,
          ];
          if (info.is_benefit === 1) this.checkboxGroup.push('is_benefit')
          if (info.is_hot === 1) this.checkboxGroup.push('is_hot')
          if (info.is_best === 1) this.checkboxGroup.push('is_best')
          if (info.is_new === 1) this.checkboxGroup.push('is_new')
          this.fullscreenLoading = false
          console.log(this.formValidate)
        }).catch(res => {
          this.$message.error(res.message)
          this.fullscreenLoading = false
        })
      },
      // 查看详情
      goDetail(id) {
        this.$refs.detailsData.dialogVisible = true
        this.isShowDetail = true
        this.$refs.detailsData.getInfo(id)
      },
      // 列表
      getList(num) {
        this.listLoading = true;
        this.tableFrom.page = num ? num : this.tableFrom.page;
        assistProListJApi(this.tableFrom)
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
      // 下架
      toOff(id) {
        this.$prompt('强制下架', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputErrorMessage: '请输入强制下架原因',
          inputType: 'textarea',
          inputPlaceholder: '请输入强制下架原因',
          inputValidator: (value) => {
            if (!value) {
              return '请输入强制下架原因'
            }
          }
        }).then(({
          value
        }) => {
          assistProductStatusApi({
            id: id,
            status: -2,
            refusal: value
          }).then(res => {
            this.$message({
              type: 'success',
              message: '提交成功'
            })
            this.getList('')
          }).catch((res) => {
            this.$message.error(res.message)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
      },
      // 具体日期
      onchangeTime(e) {
        this.assist_date = e;
        console.log(this.moment(e[0]).format("YYYY-MM-DD HH:mm:ss"))
        this.formValidate.start_time = e ? this.moment(e[0]).format("YYYY-MM-DD HH:mm:ss") : "";
        this.formValidate.end_time = e ? this.moment(e[1]).format("YYYY-MM-DD HH:mm:ss") : "";
      },
      onchangeIsShow(row) {
        assistStatusApi(row.product_assist_id, row.status)
          .then(({
            message
          }) => {
            this.$message.success(message);
            this.getList('');
          })
          .catch(({
            message
          }) => {
            this.$message.error(message);
          });
      },
      // 提交
      handleSubmit(name) {
        console.log(this.formValidate)
        console.log(this.assist_date);
        if(!this.formValidate.start_time){
          this.formValidate.start_time = this.assist_date[0]
          this.formValidate.end_time = this.assist_date[1]
        }


        this.$refs[name].validate((valid) => {
          if (valid) {
            assistUpdateOneApi(this.productId, this.formValidate).then(async res => {
              this.fullscreenLoading = false
              this.$message.success(res.message)
              this.dialogVisible = false
              this.getList()
            }).catch(res => {
              this.fullscreenLoading = false
              this.$message.error(res.message)
            })
          } else {
            return false
          }
        })
      },
    }

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
