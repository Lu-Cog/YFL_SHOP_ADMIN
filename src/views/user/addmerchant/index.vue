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
            <el-form-item label="登录账号：" prop="account" label-for="account">
              <el-input v-model="formValidate.mer_phone" placeholder="请输入登录手机号" maxLength="32" element-id="account"
                :disabled="disabled" style="width: 90%" />
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="商家编码：" prop="mer_code" label-for="mer_code">
              <el-input v-model="formValidate.mer_code" placeholder="请输入商家编码" element-id="mer_code" :disabled="disabled"
                style="width: 90%" />
            </el-form-item>
          </el-col>

          <el-col v-bind="grid">
            <el-form-item label="商家姓名：" prop="real_name" label-for="real_name">
              <el-input v-model="formValidate.real_name" @blur="onMerName(formValidate.real_name)" placeholder="请输入真实姓名"
                maxLength="32" element-id="real_name" style="width: 90%" />
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="推荐人手机：" prop="tj_phone" label-for="tj_phone">
              <el-input v-model="formValidate.tj_phone" placeholder="请输入推荐人手机号" element-id="tj_phone"
                :disabled="disabled" style="width: 90%" />
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
              <el-select v-model="formValidate.group_id" clearable placeholder="请选择" class="mb15" style="width: 90%">
                <el-option v-for="item in level_1" :key="item.group_id" :label="item.group_name" :value="item.group_id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-bind="grid" class="mr50">
            <el-form-item label="老代理等级：" label-for="ldl_id" prop="ldl_id">
              <el-select v-model="formValidate.merchant_level_id" clearable placeholder="请选择" class="mb15"
                style="width: 90%">
                <el-option v-for="item in level_2" :key="item.group_id" :label="item.group_name" :value="item.group_id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="YBK等级：" label-for="ybk_id" prop="ybk_id">
              <el-select v-model="formValidate.other_level_id" clearable placeholder="请选择" class="mb15"
                style="width: 90%">
                <el-option v-for="item in level_3" :key="item.group_id" :label="item.group_name" :value="item.group_id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>



        </el-row>
        <el-row>
          <el-col v-bind="grid">
            <el-form-item label="标签：" label-for="label" prop="label">
              <el-select v-model="labelLst" multiple placeholder="请选择" class="mb15" style="width: 90%">
                <el-option v-for="item in labelLists" :key="item.label_id" :label="item.label_name"
                  :value="item.label_id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="首批款达标：">
              <el-radio-group v-model="formValidate.is_first_ok">
                <el-radio :label="1" class="radio">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="总首批款：" prop="first_batch" label-for="first_batch">
              <el-input v-model="formValidate.first_in" placeholder="请输入总首批款到账金额" maxLength="32"
                element-id="first_batch" style="width: 90%" />
            </el-form-item>
          </el-col>

          <el-col v-bind="grid">
            <el-form-item label="入驻日期：" value-format="yyyy-MM-dd" format="yyyy-MM-dd" prop="reg_time"
              label-for="reg_time">
              <el-date-picker @change="changeTime1" v-model="formValidate.reg_time" type="date" placeholder="选择日期"
                style="width: 90%">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="签约起始日期：" value-format="yyyy-MM-dd" format="yyyy-MM-dd" prop="ht_start_time"
              label-for="ht_start_time">
              <el-date-picker @change="changeTime2" v-model="formValidate.ht_start_time" type="date" placeholder="选择日期"
                style="width: 90%">
              </el-date-picker>
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="签约结束日期：" value-format="yyyy-MM-dd" format="yyyy-MM-dd" prop="ht_end_time"
              label-for="ht_end_time">
              <el-date-picker @change="changeTime3" v-model="formValidate.ht_end_time" type="date" placeholder="选择日期"
                style="width: 90%">
              </el-date-picker>
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="账户状态：">
              <el-radio-group v-model="formValidate.user_status">
                <el-radio :label="1" class="radio">开通</el-radio>
                <el-radio :label="0">关闭</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="用户备注：" prop="note" label-for="note">
              <el-input v-model="formValidate.user_desc" type="textarea" placeholder="请输入" style="width: 90%" />
            </el-form-item>
          </el-col>


          <!--  <el-col v-bind="grid">
            <el-form-item label="业务员：" prop="yewu" label-for="yewu">
              <el-input v-model="formValidate.yewu" placeholder="请输入" maxLength="32" element-id="yewu"
                style="width: 90%" />
            </el-form-item>
          </el-col> -->
        </el-row>

        <div class="dividerTitle">
          <span class="title mr10">门店基础信息</span>
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
              <el-input v-model="formValidate.contact_name" placeholder="请输入" maxLength="32" element-id="mer_uname"
                style="width: 90%" />
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="联系电话：" prop="mer_phone" label-for="mer_phone">
              <el-input v-model="formValidate.contact_phone" placeholder="请输入" maxLength="32" element-id="mer_phone"
                style="width: 90%" />
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="详细地址：" prop="mer_detail" label-for="mer_detail">
              <el-input v-model="formValidate.detail" placeholder="请输入" maxLength="32" element-id="mer_detail"
                style="width: 90%" />
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="大区：" label-for="syxt" prop="syxt">
              <el-select v-model="formValidate.area_id" clearable placeholder="请选择" class="mb15" style="width: 90%">
                <el-option v-for="(item,index) in areaBig" :key="index" :label="item" :value="index">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="加盟地区：" prop="area_id" label-for="area_id">
              <el-cascader filterable v-model="formValidate.address_ids" :options="areaList"
                :props="{ checkStrictly: true , expandTrigger: 'hover' }" @change="handleChange" style="width: 90%">
              </el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col v-bind="grid" style="width: 88%;">
            <el-form-item label="经纬度：">
              <el-input enter-button="查找位置" v-model="location" placeholder="请查找位置" style="width: 90%" readonly
                :disabled="disabled">
                <el-button slot="append" style="background: #46a6ff; color: #fff; border-radius: 0 4px 4px 0;"
                  @click="onSearch">查找位置</el-button>
              </el-input>
              <div slot="content">请点击查找位置选择位置</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="店铺状态：">
              <el-radio-group v-model="formValidate.status">
                <el-radio :label="1" class="radio">开通</el-radio>
                <el-radio :label="0">关闭</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="店铺简介：" prop="mer_intro" label-for="mer_intro">
              <el-input v-model="formValidate.mer_desc" type="textarea" placeholder="请输入" style="width: 90%" />
            </el-form-item>
          </el-col>
        </el-row>
        <div class="dividerTitle">
          <span class="title mr10">其他信息</span>
          <el-divider />
        </div>
        <el-row>
          <el-col v-bind="grid">
            <el-form-item label="身份证(人相面)：" prop="pic_sfz1">
              <div class="acea-row">
                <div class="pictrue" v-for="(item, index) in formValidate.pic_sfz1" :key="index">
                  <el-image :src="item" :preview-src-list="formValidate.pic_sfz1">
                  </el-image>
                </div>
                <div class="upLoadPicBox" @click="modalPicTap('1')">
                  <div class="upLoad">
                    <i class="el-icon-camera cameraIconfont" />
                  </div>
                </div>
              </div>
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="身份证(国徽面)：" prop="pic_sfz2">
              <div class="acea-row">
                <div class="pictrue" v-for="(item, index) in formValidate.pic_sfz2" :key="index">
                  <el-image :src="item" :preview-src-list="formValidate.pic_sfz2">
                  </el-image>
                </div>
                <div class="upLoadPicBox" @click="modalPicTap('2')">
                  <div class="upLoad">
                    <i class="el-icon-camera cameraIconfont" />
                  </div>
                </div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <!-- <el-col v-bind="grid"> -->
          <el-form-item label="营业执照：" prop="pic_yyzz">
            <div class="acea-row">
              <div v-for="(item, index) in formValidate.pic_yyzz" :key="index" class="pictrue" draggable="false"
                @dragstart="handleDragStart($event, item)" @dragover.prevent="handleDragOver($event, item)"
                @dragenter="handleDragEnter($event, item)" @dragend="handleDragEnd($event, item)">
                <el-image :src="item" :preview-src-list="formValidate.pic_yyzz">
                </el-image>
                <i class="el-icon-error btndel" @click="handleRemove(formValidate.pic_yyzz,index)" />
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
          <!-- </el-col> -->
        </el-row>

        <el-row>
          <el-form-item label="店铺门头照：" prop="pic_store">
            <div class="acea-row">
              <div v-for="(item, index) in formValidate.pic_store" :key="index" class="pictrue" draggable="false"
                @dragstart="handleDragStart($event, item)" @dragover.prevent="handleDragOver($event, item)"
                @dragenter="handleDragEnter($event, item)" @dragend="handleDragEnd($event, item)">
                <el-image :src="item" :preview-src-list="formValidate.pic_store">
                </el-image>
                <i class="el-icon-error btndel" @click="handleRemove(formValidate.pic_store,index)" />
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
        </el-row>
        <el-row>
          <el-form-item label="签约合同：" prop="pic_ht">
            <div class="acea-row">
              <div v-for="(item, index) in formValidate.pic_ht" :key="index" class="pictrue" draggable="false"
                @dragstart="handleDragStart($event, item)" @dragover.prevent="handleDragOver($event, item)"
                @dragenter="handleDragEnter($event, item)" @dragend="handleDragEnd($event, item)">
                <el-image :src="item" :preview-src-list="formValidate.pic_ht">
                </el-image>
                <i class="el-icon-error btndel" @click="handleRemove(formValidate.pic_ht,index)" />
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
        </el-row>
        <!-- <el-row>
          <el-col :span="24">
            <el-form-item label="是否营业执照：">
              <el-radio-group v-model="formValidate.yyzz_real">
                <el-radio :label="1" class="radio">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row> -->
        <el-row>
          <el-col v-bind="grid">
            <el-form-item label="经营类型：" label-for="jylx" prop="jylx">
              <el-select v-model="formValidate.jylx" clearable placeholder="请选择" class="mb15" style="width: 90%">
                <el-option v-for="item in jylx" :key="item.id" :label="item.label" :value="item.label">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="商业形态：" label-for="syxt" prop="syxt">
              <el-select v-model="formValidate.syxt" clearable placeholder="请选择" class="mb15" style="width: 90%">
                <el-option v-for="item in syxt" :key="item.id" :label="item.label" :value="item.label">
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
          <!--   <el-col v-bind="grid">
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
          </el-col> -->
          <!-- <el-col v-bind="grid">
            <el-form-item label="收货地址：" prop="contact_detail" label-for="contact_detail">
              <el-input v-model="formValidate.contact_detail" placeholder="请输入" maxLength="32"
                element-id="contact_detail" style="width: 90%" />
            </el-form-item>
          </el-col> -->

        </el-row>
        <div class="dividerTitle">
          <span class="title mr10">收货信息</span>
          <el-divider />
        </div>
        <el-row style="margin-bottom: 50px;">
          <el-table :data="formValidate.receivingInfo" border style="width: 100%">
            <el-table-column label="收货人" width="150px">
              <template slot-scope="scope">
                <el-input v-model="scope.row.name" placeholder="请输入"></el-input>
              </template>
            </el-table-column>

            <el-table-column label="收货人电话" width="180px">
              <template slot-scope="scope">
                <el-input v-model="scope.row.phone" placeholder="请输入"></el-input>
              </template>
            </el-table-column>

            <el-table-column label="省市区">
              <template slot-scope="scope">
                <el-cascader filterable v-model="scope.row.address_ids" :options="areaList"
                  :props="{ checkStrictly: true , expandTrigger: 'hover' }" @change="handleChange2" style="width: 90%">
                </el-cascader>
              </template>
            </el-table-column>

            <el-table-column label="详细地址">
              <template slot-scope="scope">
                <el-input v-model="scope.row.address" placeholder="请输入"></el-input>
              </template>
            </el-table-column>

            <el-table-column label="操作" width="150px">
              <template slot-scope="scope">
                <el-button @click="delClick(scope.$index,scope.row)" size="small">删除</el-button>
                <!-- <el-button @click="delClick(scope.$index,scope.row)" size="small" type="primary">保存</el-button> -->
              </template>
            </el-table-column>
          </el-table>
          <el-button style="margin-top: 10px;" @click="addinfo">新增收货地址</el-button>
        </el-row>
        <div
          style="position: fixed;bottom: 0px;left: 0; padding-top: 10px;padding-left: 10%;width: 100%;z-index: 99; background: #FFFFFF;box-shadow: 2px 0px 2px 2px rgba(0,0,0,.2);">
          <el-form-item>
            <el-col :span="2">
              <el-button type="primary" class="submission" size="medium" @click="onsubmit('formValidate')">提交
              </el-button>
            </el-col>
            <el-col :span="2">
              <el-button class="submission" size="medium" @click="back">返回
              </el-button>
            </el-col>
            <el-col :span="4">
              <el-button type="text" class="submission" @click="goTop()">回顶部
              </el-button>
            </el-col>
          </el-form-item>
        </div>
        <!-- <el-button type="primary" class="submission" @click="onsubmit('formValidate')">提交</el-button> -->
      </el-form>
    </el-card>
    <el-dialog v-if="modalMap" v-model="modalMap" :visible.sync="modalMap" title="选择位置" close-on-click-modal
      class="mapBox" custom-class="dialog-scustom">
      <iframe id="mapPage" width="100%" height="500px" frameborder="0" v-bind:src="keyUrl"></iframe>
    </el-dialog>
  </div>
</template>

<script>
  import {
    merchantAraeApi,
    merchantDetailApi,
    merchantUpdataApi,
    checkPhone,
    merchantGroupListApi
  } from '@/api/merchant.js'
  import {
    labelLstApi
  } from '@/api/user'
  import {
    roterPre
  } from '@/settings'
  export default {
    name: 'EditMerchant',
    data() {
      const validateTjphone = (rule, value, callback) => {
        if (this.$route.params.id > 0) {
          this.$nextTick(() => {
            this.$refs.formValidate.clearValidate('account');
            this.$refs.formValidate.clearValidate('tj_phone');
            this.$refs.formValidate.clearValidate('mer_code');
          })
          callback();
        } else {
          checkPhone(2, {
            phone: this.formValidate.tj_phone
          }).then(res => {
            console.log(res);
            callback();
          }).catch(err => {
            callback(new Error(err.message))
          })
        }


      }
      const validateMercode = (rule, value, callback) => {
        if (this.$route.params.id > 0) {
          this.$nextTick(() => {
            this.$refs.formValidate.clearValidate('account');
            this.$refs.formValidate.clearValidate('tj_phone');
            this.$refs.formValidate.clearValidate('mer_code');
          })
          callback();
        } else {
          checkPhone(3, {
            phone: this.formValidate.mer_code
          }).then(res => {
            console.log(res);
            callback();
          }).catch(err => {
            callback(new Error(err.message))
          })
        }


      }
      const validateAccount = (rule, value, callback) => {
        if (this.$route.params.id > 0) {
          this.$nextTick(() => {
            this.$refs.formValidate.clearValidate('account');
            this.$refs.formValidate.clearValidate('tj_phone');
            this.$refs.formValidate.clearValidate('mer_code');
          })
          callback();
        } else {
          checkPhone(1, {
            phone: this.formValidate.mer_phone
          }).then(res => {
            console.log(res);
            callback();
          }).catch(err => {
            callback(new Error(err.message))
          })
        }

      }
      return {
        keyUrl: '',
        key: 'NFXBZ-XV7WQ-OX25L-GAEXO-XJ2N5-WDBHZ',
        modalMap: false,
        mer_id: 0,
        roterPre: roterPre,
        grid: {
          xl: 10,
          lg: 10,
          md: 10,
          sm: 24,
          xs: 24
        },
        disabled: false,
        formValidate: {
          receivingInfo: [{
            name: '',
            phone: '',
            address: '',
            address_ids: []
          }],
          mer_phone: '', //否	string	账号
          real_name: '', //否	string	真实姓名
          sex: 0, //否	int	姓名（0，1，2）
          tj_phone: '', //否	string	推荐人手机号
          label_id: [], //否	string	用户标签【数组传id】
          mer_name: '', //否	string	商户名称
          mer_code: '', //否	string	商户编号
          first_in: '', //否	string	总首批款
          group_id: 1,
          merchant_level_id: 0,
          other_level_id: 0,
          province_id: '', //否	int	省
          city_id: '', //否	int	市
          district_id: '', //否	int	区
          detail: '', //否	string	路上178号
          lat: '', //否	string	经纬度
          lng: '', //否	string	经纬度
          company_name: '', //否	string	公司名称
          reg_time: '', //否	string	入驻日期
          ht_start_time: '', //否	string	签约起始日期
          ht_end_time: '', //否	string	签约结束日期
          pic_sfz1: [], //否	string	身份证1
          pic_sfz2: [], //否	string	身份证2
          pic_ht: [], //否	string	合同（多张）
          pic_store: [], //否	string	门头照（多张）
          pic_yyzz: [], //否	string	营业执照
          jylx: '', //否	string	经营类型
          syxt: '', //否	string	商业形态
          contact_phone: '', //否	string	联系人手机
          user_desc: '', //否	string	用户备注
          mer_desc: '', //否	string	店铺备注
          user_status: 1, //否	int	账户状态 1正常，0锁定
          status: 1, //
          bank_uname: '',
          bank_no: '',
          bank_name: '',
          contact_detail: '',
          contact_name: '',
          address_ids: '',
          is_first_ok: 1,
          area_id: '',
        },
        location: '',
        areaBig: ['请选择大区', '一区', '二区', '三区', '四区', '五区', '六区', '七区'],
        level_1: [{
          group_id: 0,
          group_name: "请选择"
        }],
        level_2: [{
          group_id: 0,
          group_name: "请选择"
        }],
        level_3: [{
          group_id: 0,
          group_name: "请选择"
        }],
        labelLst: [],
        labelLists: [],
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
          account: [{
            required: true,
            validator: validateAccount,
            trigger: 'blur'
          }],
          mer_code: [{
            required: true,
            validator: validateMercode,
            trigger: 'blur'
          }],
          real_name: [{
            required: true,
            message: '请输入商家姓名',
            trigger: 'blur'
          }],
          mer_name: [{
            required: true,
            message: '请输入店铺名称',
            trigger: 'blur'
          }],
          tj_phone: [{
            required: true,
            validator: validateTjphone,
            trigger: 'blur'
          }],

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
      this.getTagList()
      if (this.$route.params.id > 0) {
        // this.setTagsViewTitle()
        this.mer_id = this.$route.params.id
        setTimeout(() => {
          this.getDetails()
        }, 400)
        this.disabled = true
      }
      window.addEventListener(
        "message",
        function(event) {
          // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
          var loc = event.data;
          if (loc && loc.module === "locationPicker") {
            // 防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
            window.parent.selectAdderss(loc);
          }
        },
        false
      );
      window.selectAdderss = this.selectAdderss;
    },
    methods: {
      delClick(index, item) {
        if (item.name == '' && item.phone=='' && item.address_ids.length==0 && item.address == '') {
          this.formValidate.receivingInfo.splice(index, 1)
        } else {
          this.$confirm('是否删除该收货地址？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.formValidate.receivingInfo.splice(index, 1)
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }

      },
      addinfo() {
        this.formValidate.receivingInfo.push({
          name: '',
          phone: '',
          address: '',
          address_ids: []
        })

      },
      handleRemove(arr, i) {
        console.log(arr);
        arr.splice(i, 1);
      },
      onMerName(name) {
        this.formValidate.mer_name = name + '的美容店'
      },
      //时间格式化
      changeTime1(val) {
        let d = new Date(val)
        this.formValidate.reg_time = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
      },
      changeTime2(val) {
        let d = new Date(val)
        this.formValidate.ht_start_time = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
      },
      changeTime3(val) {
        let d = new Date(val)
        this.formValidate.ht_end_time = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
      },
      // 选择经纬度
      selectAdderss(data) {
        this.formValidate.lat = data.latlng.lat
        this.formValidate.lng = data.latlng.lng
        this.location = data.latlng.lat + "," + data.latlng.lng;
        this.modalMap = false;
      },
      onSearch() {
        // if (!this.key || this.key == "")
        //   this.$message.error("请先到店铺设置里填写key值！");
        // else
        this.keyUrl =
          `https://apis.map.qq.com/tools/locpicker?type=1&key=${this.key}&referer=myapp&coord=${this.location}`
        this.modalMap = true;
      },
      //回顶部
      goTop() {
        document.documentElement.scrollTop = document.body.scrollTop = 0;
      },
      // 标签列表
      getTagList() {
        labelLstApi({
          page: 1,
          limit: 9999
        }).then(res => {
          this.labelLists = res.data.list
        }).catch(res => {
          this.$message.error(res.message)
        })
      },
      getDetails() {
        merchantDetailApi(this.mer_id).then(res => {
          this.formValidate = res.data;
          let label_tmp = [];
          for (let index in res.data.label_id) {
            label_tmp.push(parseInt(res.data.label_id[index]));
          }
          this.labelLst = label_tmp;
          this.formValidate.group_id = parseInt(res.data.group_id)
          this.formValidate.merchant_level_id = parseInt(res.data.merchant_level_id)
          this.formValidate.other_level_id = parseInt(res.data.other_level_id)
          for (let key in this.formValidate) {
            this.formValidate[key] = this.formValidate[key] == null ? '' : this.formValidate[key]
          }
          this.location = this.formValidate.lat + "," + this.formValidate.lng
        })
      },
      handleChange2(val) {
        console.log(val);
        this.formValidate.receivingInfo.address_ids = val
      },
      handleChange(val) {
        console.log(val);
        this.formValidate.address_ids = val
        this.formValidate.province_id = val[0]
        this.formValidate.city_id = val[1]
        this.formValidate.district_id = val[2]
        console.log(this.formValidate);
      },
      getGroupList() {
        merchantGroupListApi().then(res => {
          for (let index in res.data) {
            let item = res.data[index]
            if (item.type == 1) {
              this.level_1.push(item)
            } else if (item.type == 2) {
              this.level_2.push(item)
            } else {
              this.level_3.push(item)
            }
          }
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
        this.$store.dispatch('tagsView/delView', this.$route)
        this.$router.go(-1)
      },

      modalPicTap(tit) {
        const _this = this
        this.$modalUpload(function(img) {
          if (tit === "1") {
            _this.formValidate.pic_sfz1 = []
            _this.formValidate.pic_sfz1.push(img[0])
          } else if (tit === "2") {
            _this.formValidate.pic_sfz2 = []
            _this.formValidate.pic_sfz2.push(img[0])
          } else if (tit === "3") {
            img.map(item => {
              _this.formValidate.pic_ht.push(item);
              if (_this.formValidate.pic_ht.length > 10)
                _this.formValidate.pic_ht.length = 10;
            });
          } else if (tit === "4") {
            img.map(item => {
              _this.formValidate.pic_store.push(item);
              if (_this.formValidate.pic_store.length > 10)
                _this.formValidate.pic_store.length = 10;
            });
          } else {
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
        this.formValidate.label_id = this.labelLst
        this.$refs[name].validate((valid) => {
          console.log(valid);
          if (valid) {
            merchantUpdataApi(this.formValidate, this.mer_id).then(async res => {
              this.$message.success(res.message)
              setTimeout(() => {
                this.$store.dispatch('tagsView/delView', this.$route)
                this.$router.go(-1)
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

  /deep/ .el-cascader-menu__wrap {
    height: 400px !important;
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

    .btndel {
      position: absolute;
      z-index: 1;
      width: 20px !important;
      height: 20px !important;
      left: 46px;
      top: -4px;
    }

    img {
      width: 100%;
      height: 100%;
    }

    .el-image {
      width: 100%;
      height: 100%;
    }
  }
</style>
