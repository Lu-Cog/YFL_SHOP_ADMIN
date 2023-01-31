<template>
  <div class="divBox">
    <!-- :model="headerForm" -->
    <el-form class="formValidate mt20" label-width="120px" :model="ruleForm" :rules="rules" ref="ruleForm"
      @submit.native.prevent>
      <el-row :gutter="24">
        <div style="width: 60%;">
          <el-col>
            <el-form-item ref="reform" label="活动名称：" prop="title" label-width="120px">
              <el-input v-model="ruleForm.title" placeholder="请输入活动名称" />
            </el-form-item>
          </el-col>

          <el-col>
            <el-form-item ref="reform" label="活动时间：">
              <el-col :span="12">
                <el-form-item prop="show_range_time">
                  <el-date-picker v-model="show_range_time" type="datetimerange" start-placeholder="开始日期"
                    end-placeholder="结束日期" :default-time="['09:00:00', '18:00:00']">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <!-- <el-col class="line" :span="1">-</el-col>
               <el-col :span="8">
                  <el-date-picker  v-model="ruleForm.end_time" type="datetime"  placeholder="选择结束日期"  default-time="18:00:00"></el-date-picker>
               </el-col> -->
            </el-form-item>
          </el-col>

          <el-col>
            <el-form-item ref="reform" label="活动状态：">
              <el-switch active-text="开启" inactive-text="关闭" active-value="1" inactive-value="0"
                v-model="ruleForm.status"></el-switch>
            </el-form-item>
          </el-col>

          <el-col>
            <el-form-item ref="reform" prop="account" label="选择付款账户：">
              <el-checkbox-group v-model="ruleForm.account">
                <el-checkbox prop="account" v-for="(key, value) in account" :key="key" :label="key" :value="value">
                  {{ value }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item ref="reform" label="返点账户标签：">
              <el-form-item prop="account_label">
                <el-checkbox-group v-model="ruleForm.account_label">
                  <el-checkbox v-for="(key, value) in account_label" :key="key" :label="key" :value="value">{{ value }}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item ref="reform" label="备注：">
              <el-input type="textarea" v-model="ruleForm.note"></el-input>
            </el-form-item>
          </el-col>
        </div>

        <el-col :span="24">
          <el-form-item label="产品价格清单：">
            <div v-for="(product, index) in products" :key="index">
              <div>{{ product.store_name }}</div>
              <el-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
                <!-- 多规格表格-->
                <el-form-item class="labeltop">
                  <el-table :data="product.attrValue" style="width: 55%" border>
                    <!-- <el-table-column type="selection" width="55">
                    </el-table-column> -->

                    <el-table-column align="center" :label="'规格'" min-width="40">
                      <template slot-scope="scope">
                        <span class="priceBox" v-text="scope.row.sku + '-' + scope.row.bar_code"></span>
                      </template>
                    </el-table-column>

                    <el-table-column align="center" label="售价" min-width="40">
                      <template slot-scope="scope">
                        <span class="priceBox" v-text="scope.row.price"></span>
                      </template>
                    </el-table-column>

                    <el-table-column align="center" label="活动价" min-width="40">
                      <template slot-scope="scope">
                        <el-input v-model="
                            newPrice[
                              scope.row.product_id +
                                '||' +
                                scope.row.unique +
                                '||' +
                                scope.row.sku
                            ]
                          " @input="newPriceChange(scope.row.unique)" placeholder="请输入活动价"></el-input>
                        <!-- <span class="priceBox" v-text="product.product_id+'||'+scope.row.unique+'||'+scope.row.sku"></span> -->
                      </template>
                    </el-table-column>
                    <el-table-column align="center" label="限量" min-width="40">
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.liang" @input="newLiangChange(scope.row.unique)"
                          placeholder="请输入购买量"></el-input>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-form-item>
              </el-col>
            </div>
          </el-form-item>
        </el-col>
      </el-row>

      <div style="width: 100%;height: 50px;"></div>
      <div
        style="position: fixed;bottom: 0px;left: 0;padding-left: 10%;box-shadow: 2px 0px 2px 2px rgba(0,0,0,.2);padding-top: 10px;width: 100%;z-index: 999; background: #FFFFFF;">
        <el-form-item>
          <el-col :span="2">
            <el-button :loading="loading" type="primary" class="submission" size="medium" @click="onSubmit()">提交
            </el-button>
          </el-col>
          <el-col :span="2">
            <el-button class="submission" size="medium" @click="cancel()">返回
            </el-button>
          </el-col>
          <el-col :span="4">
            <el-button type="text" class="submission" @click="goTop()">回顶部
            </el-button>
          </el-col>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
  import formCreate from "@form-create/element-ui";
  import {
    activityDetail,
    productAllApi,
    saveActivity
  } from "@/api/marketing";
  import {
    roterPre
  } from "@/settings";
  import {
    formateDate,
    moneyAct
  } from "@/utils/index.js";
  export default {
    name: "CreateActivity",
    data() {
      return {
        grid2: {
          xl: 10,
          lg: 12,
          md: 12,
          sm: 24,
          xs: 24
        },

        products: [],
        account: {
          // "首批款":"first_batch",
          现金账户: "now_money",
          活动现金: "activity_principal",
          返点账户: "activity_bonus"
        },
        account_label: {
          "10%": "10",
          "20%": "20",
          "30%": "30",
          "40%": "40",
          "50%": "50",
          "60%": "60"
        },
        ruleForm: {
          title: "",
          status: 0,
          show_range_time: [],
          start_time: "",
          end_time: "",
          pro_list: [],
          account: [],
          account_label: []
        },
        rules: {
          title: [{
              required: true,
              message: "请输入活动名称",
              trigger: "blur"
            },
            {
              min: 3,
              max: 60,
              message: "长度在 3 到 60 个字符",
              trigger: "blur"
            }
          ],
          // show_range_time: [
          //   { required: true, message: "请选择活动时间", trigger: "blur" }
          // ],
          account: [{
            required: true,
            message: "请选择付款账户",
            trigger: "blur"
          }],
          account_label: [{
            required: true,
            message: "请选择奖励账户标签",
            trigger: "blur"
          }]
        },
        show_range_time: '',
        loading: false,

        activity_id: 0, //0表示添加，>0表示编辑

        //选中的数据
        selectList: [],
        list: [],

        selIdUniPrice: [],
        newPrice: {}
      };
    },
    components: {
      formCreate: formCreate.$form()
    },
    created() {
      this.activity_id = this.$route.params.id;
      this.getProduct();
      if (this.activity_id > 0) {
        this.activityDetail();
      }
    },
    methods: {
      newPriceChange(unique) {
        this.selIdUniPrice = [];
        for (let key in this.newPrice) {
          let value = parseFloat(this.newPrice[key]);
          if (isNaN(value) || value <= 0) continue;
          this.products.forEach(v => {
            v.attrValue.forEach(j => {
              if (j.unique == key.split("||")[1] && j.liang) {
                this.selIdUniPrice.push(key + "||" + value + "||" + j.liang);
              }
            });
          });
          let selArr = [];
          this.selIdUniPrice.forEach((v, b) => {
            selArr.push(v.split("||")[1]);
          });
          if (!selArr.includes(key.split("||")[1])) {
            this.selIdUniPrice.push(key + "||" + value + "||" + 0);
          }
        }
      },
      newLiangChange(unique) {
        let liang = "";
        this.products.forEach(v => {
          v.attrValue.forEach(j => {
            if (j.unique == unique) {
              liang = j.liang;
            }
          });
        });

        let setText = "";
        this.selIdUniPrice.some((a, b) => {
          if (a.split("||")[1] == unique) {
            setText =
              a.split("||")[0] +
              "||" +
              a.split("||")[1] +
              "||" +
              a.split("||")[2] +
              "||" +
              a.split("||")[3] +
              "||" +
              liang;
            this.$set(this.selIdUniPrice, b, setText);
          }
        });
      },
      //获取编辑、添加数据
      getProduct() {
        productAllApi(this.activity_id)
          .then(res => {
            this.products = res.data;
            //设置价格编辑显示
            // v-model="newPrice[product.product_id+'||'+scope.row.unique+'||'+scope.row.sku]"

            //创造变量，并赋值
            let tmp = {};
            for (let i = 0; i < this.products.length; i++) {
              for (let j = 0; j < this.products[i]["attrValue"].length; j++) {
                let tt = this.products[i]["attrValue"][j];
                if (tt["checkedPrice"]) {
                  tmp[
                    tt["product_id"] + "||" + tt["unique"] + "||" + tt["sku"]
                  ] = moneyAct(tt["checkedPrice"]);
                  this.selIdUniPrice.push(
                    tt["product_id"] +
                    "||" +
                    tt["unique"] +
                    "||" +
                    tt["sku"] +
                    "||" +
                    moneyAct(tt["checkedPrice"])+
                    "||"+
                    tt["liang"]
                  );
                } else {
                  tmp[tt["product_id"] + "||" + tt["unique"] + "||" + tt["sku"]] =
                    "";
                }
              }
            }
            this.newPrice = tmp;
          })
          .catch(err => {
            this.$message.error(err.message || "数据加载失败");
          });
      },

      //加载表单
      activityDetail() {
        activityDetail(this.activity_id)
          .then(res => {
            this.ruleForm = res.data;
            //数据处理
            if (this.ruleForm.account) {
              this.ruleForm.account = this.ruleForm.account.split(",");
            } else {
              this.ruleForm.account = [];
            }
            if (this.ruleForm.account_label) {
              this.ruleForm.account_label = this.ruleForm.account_label.split(
                ","
              );
            } else {
              this.ruleForm.account_label = [];
            }
            if (this.ruleForm.start_time && this.ruleForm.end_time) {
              this.ruleForm.show_range_time = Array(
                this.ruleForm.start_time,
                this.ruleForm.end_time
              );
            } else {
              this.ruleForm.show_range_time = [];
            }
            this.show_range_time = this.ruleForm.show_range_time
            this.ruleForm.status = String(this.ruleForm.status); //必须为字符串
          })
          .catch(err => {
            this.$message.error(err.message || "数据加载失败");
          });
      },

      // selectionChecked(row, checked) {
      //   this.$refs.multipleTable.toggleRowSelection(this.tableData3[2], true);
      // },

      handleselect(data) {
        return true;
      },

      onSubmit() {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            //处理选中时间
            if (this.show_range_time.length > 0) {
              this.ruleForm.start_time = formateDate(
                this.show_range_time[0]
              );
              this.ruleForm.end_time = formateDate(
                this.show_range_time[1]
              );
            }
            this.ruleForm.status = parseInt(this.ruleForm.status);
            this.ruleForm.pro_list = this.selIdUniPrice;
            saveActivity(this.activity_id, this.ruleForm)
              .then(res => {
                this.$message.success(res.message || "提交成功");
                this.$router.push({
                  path: `${roterPre}/marketing/activity/list`
                });
              })
              .catch(err => {
                this.$message.error(err.message || "操作失败");
              });
          } else {
            document.documentElement.scrollTop = document.body.scrollTop = 0;
            return false;
          }
        });
      },

      //返回列表
      cancel() {
        // 调用全局挂载的方法
        this.$store.dispatch("tagsView/delView", this.$route);
        // 返回上一步路由
        this.$router.go(-1);
      },

      //回顶部
      goTop() {
        document.documentElement.scrollTop = document.body.scrollTop = 0;
      }
    }
  };
</script>

<style scoped></style>
