<template>
  <div class="divBox">
    <!-- :model="headerForm" -->
    <el-form
      class="formValidate mt20"
      label-width="120px"
      :model="ruleForm" :rules="rules" ref="ruleForm"
      @submit.native.prevent
    >
      <el-row :gutter="24">

      <div style="width: 60%;">
        <el-col  >
            <el-form-item ref="reform" label="用户等级：" prop="group_name"  label-width="120px" >
              <el-input  v-model="ruleForm.group_name" placeholder="请输入用户等级名称"  />
            </el-form-item>
        </el-col>

       <el-col  >
           <el-form-item ref="reform" label="备注：" >
             <el-input type="textarea" v-model="ruleForm.note"></el-input>
           </el-form-item>
       </el-col>
      </div>

       <el-col :span="24">
          <el-form-item label="产品价格清单：">
            <div v-for="(product,index) in products" :key="index">
              <div>{{ product.store_name }}</div>
              <el-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
                <!-- 多规格表格-->
                <el-form-item class="labeltop">
                  <el-table
                    :data="product.attrValue"
                    style="width: 55%"
                    border  >
                    <!-- <el-table-column type="selection" width="55">
                    </el-table-column> -->

                    <el-table-column
                      align="center"
                      :label="'规格'"
                      min-width="40" >

                      <template slot-scope="scope">
                        <span class="priceBox" v-text="scope.row.sku"></span>
                      </template>
                    </el-table-column>

                    <el-table-column align="center" label="售价" min-width="40">
                      <template slot-scope="scope">
                        <span class="priceBox" v-text="scope.row.price"></span>
                      </template>
                    </el-table-column>

                    <el-table-column
                      align="center"
                      label="等级价格"
                      min-width="40"
                    >
                    <template slot-scope="scope" >
                      <el-input v-model="newPrice[scope.row.product_id+'||'+scope.row.unique+'||'+scope.row.sku]"  @input="newPriceChange" placeholder="请输入等级价格"></el-input>
                      <!-- <span class="priceBox" v-text="product.product_id+'||'+scope.row.unique+'||'+scope.row.sku"></span> -->
                    </template>
                    </el-table-column>
                    <!-- <el-table-column align="center" label="限制" min-width="50">
                      <span class="priceBox" v-text="1" />
                    </el-table-column> -->
                  </el-table>
                </el-form-item>
              </el-col>
            </div>
          </el-form-item>
        </el-col>
      </el-row>

      <div style="width: 100%;height: 50px;"></div>
      <div  style="position: fixed;bottom: 0px;padding-top: 10px;width: 100%;z-index: 999; background: #FFFFFF;">
      <el-form-item  >
        <el-col :span="2"  >
          <el-button
          :loading="loading"
          type="primary"
          class="submission"
          size="medium"
          @click="onSubmit()" >提交
          </el-button >
        </el-col>
        <el-col :span="2">
          <el-button
          class="submission"
          size="medium"
          @click="cancel()" >返回
          </el-button >
        </el-col>
        <el-col :span="4" >
          <el-button
          type="text"
          class="submission"
          @click="goTop()" >回顶部
          </el-button >
        </el-col>
      </el-form-item>
      </div>


    </el-form>

  </div>
</template>

<script>
import formCreate from "@form-create/element-ui";
import { activityDetail,productAllApi,saveActivity } from "@/api/user";
import { roterPre } from "@/settings";
import { formateDate,moneyAct } from '@/utils/index.js'
export default {
  name: "CreateActivity",
  data() {
    return {
      products: [],

      ruleForm: {
        group_name: '',
        note: ''

      },
      rules: {
        group_name: [
          { required: true, message: "请输入用户等级名称", trigger: "blur" },
          { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
        ]
      },

      loading: false,

      group_id: 0, //0表示添加，>0表示编辑

      //选中的数据
      selectList: [],
      list: [],

      selIdUniPrice: [],
      newPrice: {},

    };
  },
  components: {
    formCreate: formCreate.$form(),
  },
  created() {

    this.group_id = this.$route.params.id;
    console.log(this.group_id,"this.group_id");
    this.getProduct();
    if(this.group_id>0){
      this.activityDetail();
    }

  },
  methods: {

    newPriceChange() {

      this.selIdUniPrice = [];
      for(let key in this.newPrice) {
         let value = parseFloat(this.newPrice[key]);
         if( isNaN(value) || value <= 0 ) continue;
         this.selIdUniPrice.push(key+"||"+value);
      }
      console.log(this.selIdUniPrice,"selIdUniPrice");


    },
    //获取编辑、添加数据
    getProduct() {
      productAllApi(this.group_id)
        .then((res) => {
          this.products = res.data;
          //设置价格编辑显示

          //创造变量，并赋值
          let tmp = {};
          for(let i=0;i<this.products.length;i++){
              for(let j=0;j<this.products[i]["attrValue"].length;j++){
                let tt = this.products[i]["attrValue"][j];
                tmp[tt["product_id"]+"||"+tt["unique"]+"||"+tt["sku"]] = tt["checkedPrice"]?moneyAct(tt["checkedPrice"]):"";
              }
          }
          this.newPrice = tmp;

          // console.log(this.newPrice,"this.newPrice");
        })
        .catch((err) => {
          this.$message.error(err.message|| '数据加载失败');
        });
    },

    //加载表单
    activityDetail() {

      activityDetail(this.group_id)
        .then((res) => {
          this.ruleForm = res.data;
        })
        .catch((err) => {
          this.$message.error(err.message|| '数据加载失败');
        });
    },


    handleselect(data) {

      console.log("handleSelectionChange", data);
      return true;

    },


    onSubmit() {

      this.$refs.ruleForm.validate((valid) => {
        if (valid) {

          this.ruleForm.pro_list = this.selIdUniPrice;
          console.log(this.ruleForm,"this.ruleForm");
          saveActivity(this.group_id,this.ruleForm)
            .then((res) => {
              this.$message.success(res.message || "提交成功");
              this.$router.push({ path: `${roterPre}/user/group` });
            })
            .catch((err) => {
              this.$message.error(err.message|| '操作失败');
            });

        } else {

          document.documentElement.scrollTop = document.body.scrollTop = 0;
          return false;
        }
      });

    },

    //返回列表
    cancel(){
      // 调用全局挂载的方法
      this.$store.dispatch('tagsView/delView', this.$route)
      // 返回上一步路由
      this.$router.go(-1)
    },

    //回顶部
    goTop(){
     document.documentElement.scrollTop = document.body.scrollTop = 0;
    },


  },
};
</script>

<style scoped>
</style>
