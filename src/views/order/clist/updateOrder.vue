<template>
  <div class="divBox">
    <el-button icon="el-icon-arrow-left" size="mini" class="pan-back-btn mb20" @click="back">返回</el-button>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="filter-container">
          <div v-loading="loading">
            <div class="description">
              <div class="title">订单信息</div>
              <div class="acea-row">
                <div class="description-term">订单编号：{{ orderDatalist.order_sn }}</div>
                <div class="description-term" v-if="orderDatalist.paid == 0">订单状态：待支付</div>
                <div class="description-term" v-else>订单状态：{{ orderDatalist.status | orderStatusFilter }}</div>
                <div class="description-term">商品总价：{{ orderDatalist.total_price }}</div>
                <div class="description-term">商品总数：{{ orderDatalist.total_num }}</div>
                <div class="description-term">订单运费：{{ orderDatalist.total_postage }}</div>
                <div class="description-term">优惠券金额：{{ orderDatalist.coupon_price }}</div>
                <div class="description-term">实际支付：{{ orderDatalist.finalOrder ? (parseFloat(orderDatalist.finalOrder.pay_price) + parseFloat(orderDatalist.pay_price)) : orderDatalist.pay_price }}</div>

                <div class="description-term">下单时间：{{ orderDatalist.create_time }}</div>
                <div class="description-term">支付时间：{{ orderDatalist.paid==1?orderDatalist.pay_time:"未支付" }}</div>
                <div class="description-term">发货时间：{{ orderDatalist.delivery_time?orderDatalist.delivery_time:"未发货" }}</div>
                <div class="description-term">支付账户：{{ account_name}}</div>
                <div class="description-term">买家备注：{{ orderDatalist.mark }}</div>
              </div>
              <el-divider />
              <div class="title">用户信息</div>
              <div class="acea-row" style="margin-bottom: 20px;">
                <div class="description-term">用户ID：{{orderDatalist.user.uid}}</div>
                <div class="description-term">用户名称：{{ orderDatalist.user.real_name }}</div>
                <div class="description-term">用户账号：{{ orderDatalist.user.phone }}</div>
              </div>
              <div class="title">用户钱包</div>
              <div class="acea-row" style="margin-bottom: 20px;">
                <div class="description-term">保证金：{{orderDatalist.user.margin}}</div>
                <div class="description-term">首批款：{{ orderDatalist.user.first_batch }}</div>
                <div class="description-term">现金账户：{{ orderDatalist.user.now_money }}</div>
                <div class="description-term">活动现金：{{ orderDatalist.user.activity_principal }}</div>
                <div class="description-term">返点账户：{{ orderDatalist.user.activity_bonus }}</div>
                <div class="description-term">奖励账户：{{ orderDatalist.user.reward_account }}</div>
                <div class="description-term">老代理账户：{{ orderDatalist.user.especially }}</div>
                <div class="description-term">YBK转款账户：{{ orderDatalist.user.ybk }}</div>
              </div>
              <div style="margin-top: 25px;;" class="title">发货信息</div>
              <div class="acea-row">
                <div class="description-term">收件人：{{ orderDatalist.real_name }}</div>
                <div class="description-term">联系电话：{{ orderDatalist.user_phone }}</div>
                <div class="description-term">收货地址：{{ orderDatalist.user_address }}</div>
                <div class="description-term"></div>
                <div class="description-term">快递公司：{{ orderDatalist.delivery_name }}</div>
                <div class="description-term">运单号：{{ orderDatalist.delivery_id }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="title">产品列表</div>
      <el-button  @click="opendig()">添加商品</el-button>
      <el-table v-loading="listLoading" :data="tableData.data" style="width: 100%" size="small" highlight-current-row>
        <el-table-column prop="product_id" label="ID" min-width="60" />
        <el-table-column label="商品图" min-width="80">
          <template slot-scope="scope">
            <div class="demo-image__preview">
              <el-image :src="scope.row.cart_info.product.image || moren" :preview-src-list="[scope.row.cart_info.product.image || moren]" />
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="cart_info.product.store_name" label="商品名称" min-width="200" /> -->
        <el-table-column min-width="200" label="商品名称2">
          <template slot-scope="{ row }">
            <el-input class="elinput" :readonly="true" v-model="row.cart_info.product.store_name+''+row.cart_info.productAttr.sku"></el-input>
          </template>
        </el-table-column>

        <el-table-column min-width="100" label="单价">
          <template slot-scope="{ row }">
            <el-input class="elinput"  onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
            v-model="row.cart_info.productAttr.price" placeholder="请输入单价" @input="total"></el-input>
          </template>
        </el-table-column>

        <el-table-column min-width="100" label="数量">
          <template slot-scope="{ row }">
            <el-input class="elinput" maxlength="3" onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
              v-model="row.product_num" placeholder="请输入数量" @input="total(row.price,row.product_num,row.product_price)">
            </el-input>
          </template>
        </el-table-column>
        <el-table-column min-width="100" label="小计">
          <template slot-scope="{ row }">
            <el-input class="elinput" :disabled="true"
              v-model="row.product_price = (row.cart_info.productAttr.price*parseInt(row.product_num)).toFixed(2)"
              @input="total(row.price,row.product_num,row.product_price)">
            </el-input>
          </template>
        </el-table-column>

        <el-table-column label="操作" min-width="60">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editActivity(scope.row.product_id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="foot" style="margin: 20px 0;">
        <el-row type="flex" class="row-bg" justify="end">

          <el-col :span="4">
            <div class="grid-content">商品总金额：<el-input  @input="totalSum()" class="grid-input" onkeyup="this.value = this.value.replace(/[^\d.]/g,'');" v-model="orderTotal"></el-input>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content">订单运费：<el-input  @input="totalSum()" class="grid-input" onkeyup="this.value = this.value.replace(/[^\d.]/g,'');" v-model="orderDatalist.total_postage">
              </el-input>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content">总数量：<el-input  :disabled="true" class="grid-input"   v-model="numTotal"></el-input>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content">实际支付金额：<el-input class="grid-input red bold" :disabled="true"  v-model="payTotal"></el-input>
            </div>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" @click="sub()">确认修改</el-button>
          </el-col>
        </el-row>
      </div>
      <!-- <div class="block">
        <el-pagination :page-sizes="[5,10 ,20, 0]" :page-size="tableFrom.limit" :current-page="tableFrom.page"
          layout="total, sizes, prev, pager, next, jumper" :total="tableData.total" @size-change="handleSizeChange"
          @current-change="pageChange" />
      </div>
      
      -->
    </el-card>
    <el-dialog title="添加商品" :visible.sync="dialogFormVisible" >
      <el-form :model="form">
        <el-form-item label="商品名称:" :label-width="formLabelWidth">
          <el-select @change="changePru" v-model="form.product_id" filterable placeholder="请选择" style="width: 80%;">
            <el-option v-for="item in goodsList" :key="item.product_id" :label="item.product_name" :value="item.product_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格:" :label-width="formLabelWidth">
          <el-select @change="changeUnique" v-model="form.unique" filterable placeholder="请选择" style="width: 80%;">
            <el-option v-for="item in attrList" :key="item.unique" :label="item.unique_name"
              :value="item.unique">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单价:" :label-width="formLabelWidth">
          <el-input v-model="form.price" type="number" autocomplete="off" style="width: 80%;"></el-input>
        </el-form-item>
        <el-form-item label="数量:" :label-width="formLabelWidth">
          <el-input v-model="form.num" type="number" autocomplete="off" style="width: 80%;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="subPri()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    orderLstDetailApi,
    deleteGoodsApi,
    updateGoodsApi,
    productLstApi,
    addGoodsApi,
  } from "@/api/order";
  import {
    roterPre
  } from '@/settings'
  export default {
    data() {
      return {
        form: {
          product_id: '',
          unique: '',
          price: '',
          num: ''
        },
        account_name:"",
        attrList: [],
        goodsList: [],
        dialogFormVisible: false,
        formLabelWidth: '120px',
        updateId: '',
        loading: false,
        listLoading: true,
        tableData: {
          data: [],
          total: 0
        },
        roterPre: roterPre,
        orderDatalist: {
          order_sn: '',
          status: '',
          create_time: '',
          mark: '',
          user: {
            uid: '',
            real_name: '',
            phone: '',
          },
          real_name: '',

        },
        value: true,
        numTotal: '',
        orderTotal: '',
        payTotal: ''
      };
    },
    mounted() {
      this.updateId = this.$route.params.id;
      this.getOrderInfo(this.updateId)
      this.productLst()
    },

    methods: {
      changeUnique(e){
        for(let index in this.attrList){
          let item = this.attrList[index]
          if(item.unique == e){
            this.form.price = item.price
          }
        }
      },
      changePru(e){
        for(let index in this.goodsList){
          let item = this.goodsList[index]
          if(item.product_id == e){
            this.attrList = item.list
          }
        }
      },
      subPri() {
        addGoodsApi(this.updateId, this.form).then(res => {
          this.$message.success(res.message)
          this.getOrderInfo(this.updateId)
          this.dialogFormVisible = false
        }).catch(res => {
          this.$message.error(res.message)
        })
      },
      productLst() {
        productLstApi().then(res => {
          this.goodsList = res.data.list;
        })
      },

      opendig() {
        this.dialogFormVisible = true
      },
      sub() {
        console.log(this.tableData.data);
        let data = {
          total_num: this.numTotal,
          total_price: this.orderTotal,
          pay_postage: this.orderDatalist.total_postage,
          pay_price: this.payTotal,
          orderProduct: this.tableData.data
        }
        updateGoodsApi(this.updateId, data).then(res => {
          this.$message.success(res.message)
          setTimeout(() => {
            this.$store.dispatch('tagsView/delView', this.$route)
            this.$router.go(-1)
            // this.$router.push({
            //   path: `${roterPre}/order/list`
            // })
          }, 500)
        }).catch(res => {
          this.$message.error(res.message)
        })
      },
      // 返回
      back() {
        this.$store.dispatch('tagsView/delView', this.$route)
        this.$router.go(-1)
      },
      total(pri, num, tol) {
        let numTotal = 0
        let orderTotal = 0
        let payTotal = Number(this.orderDatalist.total_postage)
        for (let item in this.tableData.data) {

          let _num =  parseInt(this.tableData.data[item].product_num);
          let _price = _num * this.tableData.data[item].cart_info.productAttr.price;
          numTotal += _num;
          orderTotal += _price;
          payTotal += _price;
        }
        this.orderTotal = orderTotal
        this.numTotal = numTotal
        this.payTotal = payTotal
      },
      totalSum(){
        this.payTotal = Number(this.orderTotal) + Number(this.orderDatalist.total_postage);
      },
      unique(arr) {
         return Array.from(new Set(arr))
      },
      getOrderInfo(id) {
        this.listLoading = true;
        orderLstDetailApi(id).then(res => {
          this.orderDatalist = res.data
          this.tableData.data = res.data.orderProduct;
          this.orderTotal = res.data.total_price
          this.payTotal = res.data.pay_price;
          this.numTotal = res.data.total_num;
          this.listLoading = false;
          //this.total()

          if(res.data.account != ""){
            let acc = res.data.account.split(',');
            acc = this.unique(acc);
            let str = [];
            for(let item of  acc){
              switch(item){
                  case "margin":
                    str.push("保证金");break;
                  case "first_batch":
                    str.push("首批款");break;
                  case "now_money":
                    str.push("现金账户");break;
                  case "activity_principal":
                    str.push("活动现金");break;
                  case "activity_bonus":
                    str.push("返点账户");break;
                  case "reward_account":
                    str.push("奖励账户");break;
                  case "especially":
                    str.push("老代理账户");break;
                  case "ybk":
                    str.push("YBK转款账户");break;
              }
            }
            this.account_name = str.join(",");

          }
        })
      },

      // 跳转编辑活动页面
      editActivity(id) {
        let that = this
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          deleteGoodsApi(that.updateId, id).then(res => {
            that.$message({
              type: 'success',
              message: '删除成功!'
            });
            that.getOrderInfo(that.updateId)
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
    }
  };
</script>

<style scoped lang="scss">

  .red{
    color: #f00;
  }
  .bold{
    font-weight: bold;
  }
  .grid-input {
    width: 40%;
  }

  .grid-content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .foot {
    margin-top: 20px;
  }

  .elinput {
    width: 60%;
  }

  .title {
    margin-bottom: 16px;
    color: #17233d;
    font-weight: 700;
    font-size: 20px;
  }

  .description-term {
    font-size: 16px !important;
  }

  .description {
    &-term {
      display: table-cell;
      padding-bottom: 10px;
      line-height: 20px;
      width: 50%;
      font-size: 12px;
    }
  }

  .logistics {
    align-items: center;
    padding: 10px 0px;

    .logistics_img {
      width: 45px;
      height: 45px;
      margin-right: 12px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .logistics_cent {
      span {
        display: block;
        font-size: 12px;
      }
    }
  }

  .trees-coadd {
    width: 100%;
    height: 400px;
    border-radius: 4px;
    overflow: hidden;

    .scollhide {
      width: 100%;
      height: 100%;
      overflow: auto;
      margin-left: 18px;
      padding: 10px 0 10px 0;
      box-sizing: border-box;

      .content {
        font-size: 12px;
      }

      .time {
        font-size: 12px;
        color: #2d8cf0;
      }
    }
  }

  .scollhide::-webkit-scrollbar {
    display: none;
    /* Chrome Safari */
  }

  .modalbox {
    /deep/.el-dialog {
      min-width: 550px;
    }
  }

  .selWidth {
    width: 350px !important;
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
