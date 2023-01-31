<template>
  <div class="divBox">
    <!-- :model="headerForm" -->
    <el-form class="formValidate mt20" label-width="120px" :model="ruleForm" :rules="rules" ref="ruleForm"
      @submit.native.prevent>
      <el-row :gutter="24">
        <div style="width: 60%;">
          <el-col>
            <el-form-item ref="reform" label="充值活动名称：" prop="title" label-width="120px">
              <el-input v-model="ruleForm.title" placeholder="请输入活动名称" />
            </el-form-item>
          </el-col>

          <el-col>
            <el-form-item ref="reform" label="充值活动时间：">
              <el-col :span="12">
                <el-form-item prop="show_range_time">
                  <el-date-picker v-model="show_range_time" @blur="changeTime" type="datetimerange" start-placeholder="开始日期"
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
            <el-form-item ref="reform" label="充值活动状态：">
              <el-switch active-text="开启" inactive-text="关闭" active-value="1" inactive-value="0"
                v-model="ruleForm.status"></el-switch>
            </el-form-item>
          </el-col>

          <el-col>
            <el-form-item ref="reform" prop="account" label="充值本金账户：">
              <el-checkbox-group v-model="select.account">
                <el-checkbox :disabled="true" prop="account" v-for="(key, value) in account" :key="key" :label="key" :value="value">
                  {{ value }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>

          <el-col>
            <el-form-item ref="reform" prop="account" label="充值赠送账户：">
              <el-checkbox-group v-model="select.account2">
                <el-checkbox :disabled="true" prop="account" v-for="(key, value) in account2" :key="key" :label="key" :value="value">
                  {{ value }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>

          <el-col>
            <el-form-item ref="reform" label="满送阈值：" prop="base_money" label-width="120px">
              <el-input type="number" style="width: 30%;" v-model="ruleForm.base_money" placeholder="满多少元,则赠送"><template slot="append">元</template></el-input>
            </el-form-item>
          </el-col>

          <el-col>
            <el-form-item ref="reform" label="返点赠送比列：">
              <el-form-item prop="account_label">
                <el-radio-group v-model="ruleForm.gift_rate">
                  <el-radio v-for="(key, value) in account_label" :key="key" :label="key" :value="value">{{ value }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form-item>
          </el-col>

  <el-col>
            <el-form-item ref="reform" label="最大充值金额：" prop="max_money" label-width="120px">
              <el-input type="number" style="width: 30%;" v-model="ruleForm.max_money" placeholder="最大充值金额"><template slot="append">元</template></el-input>
            </el-form-item>
          </el-col>


          <el-col>
            <el-form-item ref="reform" label="备注：">
              <el-input type="textarea" v-model="ruleForm.note"></el-input>
            </el-form-item>
          </el-col>
        </div>
      </el-row>

      <div style="width: 100%;height: 50px;"></div>
      <div style="position: fixed;bottom: 0px;padding-top: 10px;width: 100%;z-index: 999; background: #FFFFFF;">
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
    RactivityDetail,
    productAllApi,
    saveRActivity
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
        select:{
          account: ['now_money','activity_principal'],
          account2: ['activity_bonus'],
        },
        products: [],
        account: {
          "现金账户(普通充值)": "now_money",
          "活动现金(活动赠送充值)": "activity_principal",
        }
        ,account2: {
          "返点账户": "activity_bonus"
        },
        account_label: {
          // "0": "0",
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
          gift_rate: '0',
          max_money:50000,
          base_money:3000
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
          // show_range_time: [{
          //   required: true,
          //   message: "充值活动时间",
          //   trigger: "blur"
          // }]

        },
        show_range_time:'',
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
      if (this.activity_id > 0) {
        this.RactivityDetails();
      }
    },
    methods: {
      changeTime(e){
        console.log(this.show_range_time);
      },
      //加载表单
      RactivityDetails() {
        RactivityDetail(this.activity_id)
          .then(res => {
            this.ruleForm = res.data;
            //数据处理
            if (this.ruleForm.start_time && this.ruleForm.end_time) {
              this.ruleForm.show_range_time = Array(
                this.ruleForm.start_time,
                this.ruleForm.end_time
              );
            } else {
              this.ruleForm.show_range_time = [];
            }
            this.show_range_time = this.ruleForm.show_range_time
            this.ruleForm.gift_rate = String(this.ruleForm.gift_rate); //必须为字符串
            this.ruleForm.status = String(this.ruleForm.status); //必须为字符串
            this.ruleForm.max_money = Math.floor(this.ruleForm.max_money);
            this.ruleForm.base_money = Math.floor(this.ruleForm.base_money);
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
            saveRActivity(this.activity_id, this.ruleForm)
              .then(res => {
                this.$message.success(res.message || "提交成功");
                this.$router.push({
                  path: `${roterPre}/marketing/recharge/list`
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
