<template>
  <div class="divBox">
    <el-card class="box-card">
      <el-button icon="el-icon-arrow-left" size="mini" class="pan-back-btn mb20" @click="back">返回</el-button>
      <el-form ref="formValidate" class="form" :model="formValidate" label-width="120px" :rules="ruleValidate"
        @submit.native.prevent>
        <div class="dividerTitle">
          <span class="title mr10">客户基础信息</span>
          <el-divider />
        </div>
        <el-row :gutter="10">
          <el-col v-bind="grid">
            <el-form-item label="ID编码：" prop="mer_code" label-for="mer_code">
              <el-input v-model="formValidate.mer_code" placeholder="请输入" element-id="mer_code" style="width: 90%" />
            </el-form-item>
          </el-col>
          <el-col v-bind="grid" class="mr50">
            <el-form-item label="手机号：" prop="account" label-for="account">
              <el-input v-model="formValidate.account" placeholder="请输入" maxLength="32" element-id="account"
                style="width: 90%" />
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="姓名：" prop="real_name" label-for="real_name">
              <el-input v-model="formValidate.real_name" placeholder="请输入" maxLength="32" element-id="real_name"
                style="width: 90%" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="性别：">
              <el-radio-group v-model="formValidate.sex">
                <el-radio :label="0">默认</el-radio>
                <el-radio :label="1" class="radio">男</el-radio>
                <el-radio :label="2" class="radio">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="合伙人：" label-for="hhr_id" prop="hhr_id">
              <el-select v-model="formValidate.hhr_id" clearable placeholder="请选择" class="mb15" style="width: 90%">
                <el-option v-for="item in level" :key="item.group_id" :label="item.group_name" :value="item.group_id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-bind="grid" class="mr50">
            <el-form-item label="老代理等级：" label-for="ldl_id" prop="ldl_id">
              <el-select v-model="formValidate.ldl_id" clearable placeholder="请选择" class="mb15" style="width: 90%">
                <el-option v-for="item in level" :key="item.group_id" :label="item.group_name" :value="item.group_id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="YBK等级：" label-for="ybk_id" prop="ybk_id">
              <el-select v-model="formValidate.ybk_id" clearable placeholder="请选择" class="mb15" style="width: 90%">
                <el-option v-for="item in level" :key="item.group_id" :label="item.group_name" :value="item.group_id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-bind="grid" class="mr50">
            <el-form-item label="标签：" label-for="label" prop="label">
              <el-select v-model="formValidate.label" multiple placeholder="请选择" class="mb15" style="width: 90%">
                <el-option v-for="item in label" :key="item.id" :label="item.label" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="推荐人电话：" prop="tj_phone" label-for="tj_phone">
              <el-input v-model="formValidate.tj_phone" placeholder="请输入" element-id="tj_phone" style="width: 90%" />
            </el-form-item>
          </el-col>
          <el-col v-bind="grid" class="mr50">
            <el-form-item label="地区：" prop="area_id" label-for="area_id">
              <el-cascader v-model="areainfo" :options="areaList" :props="{ expandTrigger: 'hover' }"
                @change="handleChange" style="width: 90%"></el-cascader>
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="加盟日期：" prop="reg_time" label-for="reg_time">
              <el-date-picker v-model="formValidate.reg_time" type="date" placeholder="选择日期" style="width: 90%">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col v-bind="grid" class="mr50">
            <el-form-item label="总首批款：" prop="first_batch" label-for="first_batch">
              <el-input v-model="formValidate.first_batch" placeholder="请输入" maxLength="32" element-id="first_batch"
                style="width: 90%" />
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="签约起始日期：" prop="ht_start_time" label-for="ht_start_time">
              <el-date-picker v-model="formValidate.ht_start_time" type="date" placeholder="选择日期" style="width: 90%">
              </el-date-picker>
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col v-bind="grid" class="mr50">
            <el-form-item label="签约结束日期：" prop="ht_end_time" label-for="ht_end_time">
              <el-date-picker v-model="formValidate.ht_end_time" type="date" placeholder="选择日期" style="width: 90%">
              </el-date-picker>
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col v-bind="grid">
            <el-form-item label="业务员：" prop="yewu" label-for="yewu">
              <el-input v-model="formValidate.yewu" placeholder="请输入" maxLength="32" element-id="yewu"
                style="width: 90%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col v-bind="grid">
            <el-form-item label="签约客户身份证(正面)：" prop="pic_sfz1">
              <div class="upLoadPicBox" @click="modalPicTap('1')">
                <div v-if="formValidate.pic_sfz1" class="pictrue"><img :src="formValidate.pic_sfz1"></div>
                <div v-else class="upLoad">
                  <i class="el-icon-camera cameraIconfont" />
                </div>
              </div>
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="签约客户身份证(反面)：" prop="pic_sfz2">
              <div class="upLoadPicBox" @click="modalPicTap('2')">
                <div v-if="formValidate.pic_sfz2" class="pictrue"><img :src="formValidate.pic_sfz2"></div>
                <div v-else class="upLoad">
                  <i class="el-icon-camera cameraIconfont" />
                </div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="签约合同：" prop="pic_ht">
              <div class="acea-row">
                <div v-for="(item, index) in formValidate.pic_ht" :key="index" class="pictrue" draggable="false"
                  @dragstart="handleDragStart($event, item)" @dragover.prevent="handleDragOver($event, item)"
                  @dragenter="handleDragEnter($event, item)" @dragend="handleDragEnd($event, item)">
                  <img :src="item" />
                  <!-- <i class="el-icon-error btndel" @click="handleRemove(index)" /> -->
                </div>
                <div class="uploadCont" title="750*750px">
                  <div class="upLoadPicBox" @click="modalPicTap('3')">
                    <div class="upLoad">
                      <i class="el-icon-camera cameraIconfont" />
                    </div>
                  </div>
                </div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col v-bind="grid">
            <el-form-item label="门头照：" prop="pic_store">
              <div class="acea-row">
                <div v-for="(item, index) in formValidate.pic_store" :key="index" class="pictrue" draggable="false"
                  @dragstart="handleDragStart($event, item)" @dragover.prevent="handleDragOver($event, item)"
                  @dragenter="handleDragEnter($event, item)" @dragend="handleDragEnd($event, item)">
                  <img :src="item" />
                  <!-- <i class="el-icon-error btndel" @click="handleRemove(index)" /> -->
                </div>
                <div class="uploadCont" title="750*750px">
                  <div class="upLoadPicBox" @click="modalPicTap('4')">
                    <div class="upLoad">
                      <i class="el-icon-camera cameraIconfont" />
                    </div>
                  </div>
                </div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col v-bind="grid">
            <el-form-item label="营业执照：" prop="pic_yyzz">
              <div class="acea-row">
                <div v-for="(item, index) in formValidate.pic_yyzz" :key="index" class="pictrue" draggable="false"
                  @dragstart="handleDragStart($event, item)" @dragover.prevent="handleDragOver($event, item)"
                  @dragenter="handleDragEnter($event, item)" @dragend="handleDragEnd($event, item)">
                  <img :src="item" />
                  <!-- <i class="el-icon-error btndel" @click="handleRemove(index)" /> -->
                </div>
                <div class="uploadCont" title="750*750px">
                  <div class="upLoadPicBox" @click="modalPicTap('5')">
                    <div class="upLoad">
                      <i class="el-icon-camera cameraIconfont" />
                    </div>
                  </div>
                </div>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="是否本人营业执照：">
              <el-radio-group v-model="formValidate.yyzz_real">
                <el-radio :label="1" class="radio">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col v-bind="grid">
            <el-form-item label="经营类型：" label-for="jylx" prop="jylx">
              <el-select v-model="formValidate.jylx" clearable placeholder="请选择" class="mb15" style="width: 90%">
                <el-option v-for="item in jylx" :key="item.id" :label="item.label" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="商业形态：" label-for="syxt" prop="syxt">
              <el-select v-model="formValidate.syxt" clearable placeholder="请选择" class="mb15" style="width: 90%">
                <el-option v-for="item in syxt" :key="item.id" :label="item.label" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="开户名称：" prop="bank_uname" label-for="bank_uname">
              <el-input v-model="formValidate.bank_uname" placeholder="请输入" maxLength="32" element-id="bank_uname"
                style="width: 90%" />
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="银行账号：" prop="bank_no" label-for="bank_no">
              <el-input v-model="formValidate.bank_no" placeholder="请输入" maxLength="32" element-id="bank_no"
                style="width: 90%" />
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="开户银行：" prop="bank_name" label-for="bank_name">
              <el-input v-model="formValidate.bank_name" placeholder="请输入" maxLength="32" element-id="bank_name"
                style="width: 90%" />
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="收货联系人：" prop="contact_name" label-for="contact_name">
              <el-input v-model="formValidate.contact_name" placeholder="请输入" maxLength="32" element-id="contact_name"
                style="width: 90%" />
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="收货电话：" prop="contact_phone" label-for="contact_phone">
              <el-input v-model="formValidate.contact_phone" placeholder="请输入" maxLength="32" element-id="contact_phone"
                style="width: 90%" />
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="收货地址：" prop="contact_detail" label-for="contact_detail">
              <el-input v-model="formValidate.contact_detail" placeholder="请输入" maxLength="32"
                element-id="contact_detail" style="width: 90%" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="账户状态：">
              <el-radio-group v-model="formValidate.status">
                <el-radio :label="1" class="radio">开通</el-radio>
                <el-radio :label="0">关闭</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="备注：" prop="note" label-for="note">
              <el-input v-model="formValidate.note" type="textarea" placeholder="请输入" style="width: 90%" />
            </el-form-item>
          </el-col>
        </el-row>
        <div class="dividerTitle">
          <span class="title mr10">门店管理信息</span>
          <el-divider />
        </div>
        <el-row>
          <el-col v-bind="grid">
            <el-form-item label="店铺名称：" prop="mer_name" label-for="mer_name">
              <el-input v-model="formValidate.mer_name" placeholder="请输入" maxLength="32" element-id="mer_name"
                style="width: 90%" />
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="联系人：" prop="mer_uname" label-for="mer_uname">
              <el-input v-model="formValidate.mer_uname" placeholder="请输入" maxLength="32" element-id="mer_uname"
                style="width: 90%" />
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="联系电话：" prop="mer_phone" label-for="mer_phone">
              <el-input v-model="formValidate.mer_phone" placeholder="请输入" maxLength="32" element-id="mer_phone"
                style="width: 90%" />
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="店铺详细地址：" prop="mer_detail" label-for="mer_detail">
              <el-input v-model="formValidate.mer_detail" placeholder="请输入" maxLength="32" element-id="mer_detail"
                style="width: 90%" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="营业状态：">
              <el-radio-group v-model="formValidate.mer_status">
                <el-radio :label="1" class="radio">开通</el-radio>
                <el-radio :label="0">关闭</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="店铺简介：" prop="mer_intro" label-for="mer_intro">
              <el-input v-model="formValidate.mer_intro" type="textarea" placeholder="请输入" style="width: 90%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-button type="primary" class="submission" @click="onsubmit('formValidate')">提交</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import {
    merchantAraeApi,
    merchantDetailApi,
    merchantUpdataApi,
    merchantGroupListApi
  } from '@/api/merchant.js'
  import {
    roterPre
  } from '@/settings'
  export default {
    name: 'EditMerchant',
    data() {
      const validateUpload = (rule, value, callback) => {
        if (this.formValidate.image_input) {
          callback()
        } else {
          callback(new Error('请上传图文封面'))
        }
      }
      const validateUpload2 = (rule, value, callback) => {
        if (!this.formValidate.cid) {
          callback(new Error('请选择文章分类'))
        } else {
          callback()
        }
      }
      return {
        mer_id: 0,
        roterPre: roterPre,
        grid: {
          xl: 10,
          lg: 10,
          md: 10,
          sm: 24,
          xs: 24
        },
        formValidate: {
          mer_code: '',
          account: '',
          real_name: '',
          sex: 0,
          hhr_id: '',
          ldl_id: '',
          ybk_id: '',
          label: [],
          tj_phone: '',
          area_id: '',
          province_id: '',
          city_id: '',
          district_id: '',
          reg_time: '',
          first_batch: '',
          ht_start_time: '',
          ht_end_time: '',
          yewu: '',
          pic_sfz1: [],
          pic_sfz2: [],
          pic_ht: [],
          pic_store: [],
          pic_yyzz: [],
          yyzz_real: 1,
          bank_uname: '',
          status: 0,
          jylx: '',
          syxt: '',
          bank_no: '',
          bank_name: '',
          contact_name: '',
          contact_phone: '',
          contact_detail: '',
          note: '',
          mer_name: '',
          mer_uname: '',
          mer_phone: '',
          mer_detail: '',
          mer_status: 1,
          mer_intro: ''
        },
        areainfo: '',
        level: '',
        label: '',
        jylx: [{
            label: '专业店',
            id: 1
          },
          {
            label: '美容店',
            id: 2
          },
          {
            label: '工作室',
            id: 3
          },
          {
            label: '美容美发',
            id: 4
          },
          {
            label: '其他',
            id: 0
          }
        ],
        syxt: [{
            label: '商铺',
            id: 1
          },
          {
            label: '商场',
            id: 2
          },
          {
            label: '办公楼',
            id: 3
          },
          {
            label: '居家',
            id: 4
          },
          {
            label: '其他',
            id: 0
          }
        ],
        areaList: [],
        ruleValidate: {
          title: [{
            required: true,
            message: '请输入标题',
            trigger: 'blur'
          }],
          author: [{
            required: true,
            message: '请输入作者',
            trigger: 'blur'
          }],
          cid: [{
            required: true,
            validator: validateUpload2,
            trigger: 'change'
          }],
          image_input: [{
            required: true,
            validator: validateUpload,
            trigger: 'change'
          }],
          content: [{
            required: true,
            message: '请输入文章内容',
            trigger: 'change'
          }]
        },
        tempRoute: {}
      }
    },
    watch: {
      // $route(to, from) {
      //   if (this.$route.params.id) {
      //     this.getDetails()
      //   } else {
      //     this.formValidate = {
      //       title: '',
      //       author: '',
      //       image_input: '',
      //       content: '',
      //       synopsis: '',
      //       url: '',
      //       is_hot: 0,
      //       is_banner: 0,
      //       status: 0
      //     }
      //   }
      // }
    },
    created() {
      this.tempRoute = Object.assign({}, this.$route)
    },
    mounted() {
      this.getGroupList()
      this.getAreaList()
      if (this.$route.params.id>0) {
        // this.setTagsViewTitle()
        this.mer_id = this.$route.params.id
        this.getDetails()
        console.log(this.mer_id);
      }
    },
    methods: {
      getDetails() {
        merchantDetailApi(this.mer_id).then(res => {
          console.log(this.formValidate );
          this.formValidate = res.data
          console.log(this.formValidate );
        })
      },
      handleChange(val) {
        this.formValidate.province_id = val[0]
        this.formValidate.city_id = val[1]
        this.formValidate.district_id = val[2]
        console.log(this.formValidate);
      },
      getGroupList(){
        merchantGroupListApi().then(res=>{
          this.level=res.data
        })
      },
      getAreaList() {
        let id = 0
        merchantAraeApi(id).then(res => {
          this.areaList = res.data
          // this.$message.success(res.message)
        }).catch(res => {
          // this.$message.error(res.message)
        })
      },
      // 返回
      back() {
        this.$router.push({
          path: `${roterPre}/user/merList`
        })
      },

      modalPicTap(tit) {
        const _this = this
        this.$modalUpload(function(img) {
          if(tit === "1"){
            _this.formValidate.pic_sfz1 = img[0]
          }else if(tit === "2"){
            _this.formValidate.pic_sfz2 = img[0]
          }else if(tit === "3"){
            img.map(item => {
              _this.formValidate.pic_ht.push(item);
              if (_this.formValidate.pic_ht.length > 10)
                _this.formValidate.pic_ht.length = 10;
            });
          }else if(tit === "4"){
            img.map(item => {
              _this.formValidate.pic_store.push(item);
              if (_this.formValidate.pic_store.length > 10)
                _this.formValidate.pic_store.length = 10;
            });
          }else{
            img.map(item => {
              _this.formValidate.pic_yyzz.push(item);
              if (_this.formValidate.pic_yyzz.length > 10)
                _this.formValidate.pic_yyzz.length = 10;
            });
          }
        }, tit)
      },

      // 提交数据
      onsubmit(name) {
        console.log(this.formValidate);
        this.$refs[name].validate((valid) => {
          if (valid) {
            merchantUpdataApi(this.formValidate, this.mer_id).then(async res => {
              this.$message.success(res.message)
              setTimeout(() => {
                this.$router.push({
                  path: `${roterPre}/user/merList`
                })
              }, 500)
            }).catch(res => {
              this.$message.error(res.message)
            })
          } else {
            return false
          }
        })
      },
    }
  }
</script>

<style scoped lang="scss">
  /deep/ .el-pagination__jump {
    margin-left: 0;
  }

  /deep/ .el-form-item--medium .el-form-item__label {
    width: 150px !important;
  }
  .pictrue {
    width: 60px;
    height: 60px;
    border: 1px dotted rgba(0, 0, 0, 0.1);
    margin-right: 10px;
    position: relative;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
    }
  }
</style>
