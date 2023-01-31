<template>
<div class="divBox">
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <el-tabs v-model="user_type" @tab-click="getList(1)">
                <el-tab-pane label="全部会员" name="" />
                <el-tab-pane label="商家会员" name="merchant" />
                <el-tab-pane label="普通会员" name="user" />
                <!-- <el-tab-pane label="小程序用户" name="routine" />
                <el-tab-pane label="H5用户" name="h5" /> -->
            </el-tabs>
            <div class="container">
                <el-form inline size="small" :label-position="labelPosition" label-width="100px">
                    <el-row>
                        <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
                          <el-col v-bind="grid">
                              <el-form-item label="关键词：" >
                                  <el-input v-model="userFrom.keyword"  placeholder="请输入会员ID或手机号" clearable class="selWidth" @change="userSearchs"/>
                              </el-form-item>
                          </el-col>
                           <!-- <el-col v-bind="grid">
                                <el-form-item label="会员手机号：">
                                    <el-input v-model="userFrom.phone" placeholder="请输入会员手机号" clearable class="selWidth" />
                                </el-form-item>
                            </el-col> -->
                            <el-col v-bind="grid">
                                <el-form-item label="真实姓名：">
                                    <el-input v-model="userFrom.real_name" placeholder="请输入会员真实姓名" clearable class="selWidth" @change="userSearchs"/>
                                </el-form-item>
                            </el-col>

                        </el-col>

                        <template v-if="collapse">
                            <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">

                                <el-col v-bind="grid">
                                    <el-form-item label="会员等级：">
                                        <el-select v-model="userFrom.group_id" placeholder="请选择" class="selWidth" clearable filterable @change="userSearchs">
                                            <el-option value="">全部</el-option>
                                            <el-option v-for="(item, index) in groupList" :key="index" :value="item.group_id" :label="item.group_name" />
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col v-bind="grid">
                                    <el-form-item label="会员标签：">
                                        <el-select v-model="userFrom.label_id" placeholder="请选择" class="selWidth" clearable filterable @change="userSearchs">
                                            <el-option value="">全部</el-option>
                                            <el-option v-for="(item, index) in labelLists" :key="index" :value="item.label_id" :label="item.label_name" />
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
                                <el-col v-bind="grid">
                                    <el-form-item label="性别：">
                                        <el-radio-group v-model="userFrom.sex" type="button" class="selWidth" @change="userSearchs">
                                            <el-radio-button label="">
                                                <span>全部</span>
                                            </el-radio-button>
                                            <el-radio-button label="1">
                                                <span>男</span>
                                            </el-radio-button>
                                            <el-radio-button label="2">
                                                <span>女</span>
                                            </el-radio-button>
                                            <el-radio-button label="0">
                                                <span>保密</span>
                                            </el-radio-button>
                                        </el-radio-group>
                                    </el-form-item>
                                </el-col>
                                <el-button style="margin-left: 20px;" size="small" type="primary" @click="exportOrder"
                                  >生成列表</el-button
                                >
                                <el-button size="small" type="primary" @click="getExportFileList"
                                  >导出已生成列表</el-button
                                >
                                <el-col v-bind="grid">
                                    <!-- <el-form-item label="身份：">
                                        <el-radio-group v-model="userFrom.is_promoter" type="button" class="selWidth">
                                            <el-radio-button label="">
                                                <span>全部</span>
                                            </el-radio-button>
                                            <el-radio-button label="1">
                                                <span>推广员</span>
                                            </el-radio-button>
                                            <el-radio-button label="0">
                                                <span>普通会员</span>
                                            </el-radio-button>
                                        </el-radio-group>
                                    </el-form-item> -->
                                </el-col>
                            </el-col>
                            <!-- <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
                                <el-col v-bind="grid">
                                    <el-form-item label="访问情况：">
                                        <el-select v-model="userFrom.user_time_type" placeholder="请选择" class="selWidth" clearable>
                                            <el-option value="visitno" label="时间段未访问" />
                                            <el-option value="visit" label="最后访问" />
                                            <el-option value="add_time" label="首次访问" />
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col v-bind="grid">
                                    <el-form-item label="消费情况：">
                                        <el-select v-model="userFrom.pay_count" placeholder="请选择" class="selWidth" clearable>
                                            <el-option value="-1" label="0次"></el-option>
                                            <el-option value="0" label="1次以上"></el-option>
                                            <el-option value="1" label="2次以上"></el-option>
                                            <el-option value="2" label="3次以上"></el-option>
                                            <el-option value="3" label="4次以上"></el-option>
                                            <el-option value="4" label="5次以上"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-col> -->
                           <!-- <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
                                <el-col v-bind="grid">
                                    <el-form-item label="访问时间：" class="timeBox">
                                        <el-date-picker v-model="timeVal" value-format="yyyy/MM/dd" align="right" unlink-panels format="yyyy/MM/dd" size="small" type="daterange" placement="bottom-end" placeholder="自定义时间" class="selWidth" :picker-options="pickerOptions" @change="onchangeTime" />
                                    </el-form-item>
                                </el-col>
                            </el-col> -->
                        </template>
                        <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6" class="text-right userFrom">
                            <el-form-item>
                                <el-button type="primary" icon="ios-search" label="default" class="mr15" size="small" @click="userSearchs">搜索</el-button>
                                <el-button class="ResetSearch mr10" size="small" type="reset" @click="reset('userFrom')">重置</el-button>
                                <a class="ivu-ml-8" @click="collapse = !collapse">
                                    <template v-if="!collapse">
                                        展开 <i class="el-icon-arrow-down" />
                                    </template>
                                    <template v-else>
                                        收起 <i class="el-icon-arrow-up" />
                                    </template>
                                </a>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div class="mb15">
                <!-- <el-button v-show="user_type === 'wechat'" size="mini" class="mr10" @click="sendNews">发送图文消息</el-button> -->
                <!-- <el-button size="mini" class="mr10" @click="batchGroup">批量设置分组</el-button> -->
                <el-button size="mini" @click="batchlabel">批量设置标签</el-button>
            </div>
            <el-alert v-if="multipleSelection.length>0" :title="`已选择  ${multipleSelection.length}  项`" type="info" show-icon />
        </div>
        <el-table v-loading="listLoading" :data="tableData.data" style="width: 100%" size="small" highlight-current-row @selection-change="handleSelectionChange">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="首次访问：">
                            <span>{{ props.row.create_time }}</span>
                        </el-form-item>
                        <el-form-item label="近次访问：">
                            <span>{{ props.row.last_time }}</span>
                        </el-form-item>
                        <el-form-item label="身份证号：">
                            <span>{{ props.row.card_id }}</span>
                        </el-form-item>
                        <el-form-item label="手机号：">
                            <span>{{ props.row.phone }}</span>
                        </el-form-item>
                        <el-form-item label="真实姓名：">
                            <span>{{ props.row.real_name }}</span>
                        </el-form-item>
                        <el-form-item label="标签：">
                            <span v-for="(item, index) in props.row.label" :key="index" v-text="item" />
                        </el-form-item>
                        <el-form-item label="生日：">
                            <span>{{ props.row.birthday }}</span>
                        </el-form-item>
                        <el-form-item label="地址：">
                            <span>{{ props.row.addres }}</span>
                        </el-form-item>
                        <el-form-item label="备注：">
                            <span>{{ props.row.mark }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column type="selection" width="50" />
            <el-table-column prop="uid" label="ID" min-width="70" />
            <el-table-column label="头像" min-width="60">
                <template slot-scope="scope">
                    <div class="demo-image__preview">
                        <el-image style="width: 36px; height: 36px" :src="scope.row.avatar ? scope.row.avatar : moren" :preview-src-list="[scope.row.avatar || moren]" />
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="手机号" min-width="120">
                <template slot-scope="{row}">
                    <span>{{ row.phone }}</span>
                </template>
            </el-table-column>
            <el-table-column label="姓名" min-width="70">
                <template slot-scope="{row}">
                    <span>{{ row.real_name }}</span>
                </template>
            </el-table-column>
            <el-table-column label="等级" min-width="100">
                <template slot-scope="{row}">
                    <span v-for="(item2, index) in row.card1" :key="index">{{ item2 }}, </span>
                </template>
            </el-table-column>
            <el-table-column label="标签" min-width="100">
                <template slot-scope="{row}">
                    <span v-for="(item2, index) in row.label_id" :key="index">{{ row.card2[item2] }}, </span>
                </template>
            </el-table-column>
           <!-- <el-table-column label="昵称" min-width="150">
                <template slot-scope="{row}">
                    <div class="acea-row">
                        <i v-show="row.sex===1" class="el-icon-male mr5" style="font-size: 15px; margin-top: 3px; color:#2db7f5; " />
                        <i v-show="row.sex===2" class="el-icon-female mr5" style="font-size: 15px; margin-top: 3px; color:#ed4014; " />
                        <div v-text="row.nickname" />
                    </div>
                    <div v-show="row.vip_name" class="vipName">{{ row.vip_name }}</div>
                </template>
            </el-table-column> -->
            <!-- <el-table-column label="分组" min-width="100">
                <template slot-scope="{row}">
                    <span>{{ row.group?row.group.group_name:'无' }}</span>
                </template>
            </el-table-column> -->
            <el-table-column label="推荐人ID" min-width="100">
                <template slot-scope="{row}">
                    <span>{{ row.spread ?row.spread.uid:'无' }}</span>
                </template>
            </el-table-column>
            <el-table-column label="推荐人编码" min-width="100">
                <template slot-scope="{row}">
                    <span>{{ (row.spread&&row.spread.mer_code!="") ?row.spread.mer_code:'无' }}</span>
                </template>
            </el-table-column>
            <el-table-column label="推荐人姓名" min-width="120">
                <template slot-scope="{row}">
                    <span>{{ (row.spread&&row.spread.real_name!="") ?row.spread.real_name:'无' }}</span>
                </template>
            </el-table-column>
            <!-- <el-table-column label="用户类型" min-width="100">
              <template slot-scope="{row}">
                <span>{{ row.user_type === 'routine' ? '小程序' : row.user_type === 'wechat' ? '公众号' : 'H5' }}</span>
              </template>
            </el-table-column> -->
            <el-table-column prop="margin" label="保证金" sortable min-width="100" />
            <el-table-column prop="first_batch" label="首批款" sortable min-width="100" />
            <el-table-column prop="now_money" label="现金账户" sortable min-width="100" />
            <el-table-column prop="activity_principal" label="活动现金" sortable min-width="100" />
            <el-table-column prop="activity_bonus" label="返点账户" sortable min-width="100" />
            <el-table-column prop="reward_account" label="奖励账户" sortable min-width="100" />
            <el-table-column prop="especially" label="老代理" sortable min-width="100" />
            <el-table-column prop="ybk" label="YBK账户" sortable min-width="100" />
            <el-table-column prop="brokerage_price" label="佣金账户" sortable min-width="100" />
            <el-table-column label="操作" min-width="130" fixed="right">
                <template slot-scope="scope">
                    <el-button type="text" size="small" class="mr10" @click="onEdit(scope.row.uid)">编辑</el-button>
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            更多<i class="el-icon-arrow-down el-icon--right" />
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <!-- <el-dropdown-item @click.native="onDetails(scope.row.uid)">账户详情</el-dropdown-item> -->
                            <!-- <el-dropdown-item @click.native="setMoney(scope.row)">设置余额</el-dropdown-item> -->
                            <!-- <el-dropdown-item v-if="scope.row.vip_name">清除等级</el-dropdown-item> -->
                            <!-- <el-dropdown-item @click.native="setGroup(scope.row)">设置分组</el-dropdown-item> -->
                            <el-dropdown-item @click.native="setTj(scope.row)">设置推荐人</el-dropdown-item>
                            <el-dropdown-item @click.native="setLabel(scope.row)">设置标签</el-dropdown-item>
                            <el-dropdown-item @click.native="bill(scope.row.uid)">账户管理</el-dropdown-item>
                            <el-dropdown-item v-if="scope.row.mer_id>0" @click.native="setAccount(scope.row.uid)">更换商家账号</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination :page-sizes="[20, 40, 60, 80]" :page-size="userFrom.limit" :current-page="userFrom.page" layout="total, sizes, prev, pager, next, jumper" :total="tableData.total" @size-change="handleSizeChange" @current-change="pageChange" />
        </div>
    </el-card>
    <el-dialog title="提示" :visible.sync="visible" width="1000px" :before-close="handleClose" class="dia">
        <news-category v-if="visible" :is-show-send="isShowSend" :wechat-ids="wechatIds" :user-ids="ids" :max-cols="maxCols" />
        <!--<span slot="footer" class="dialog-footer" />-->
    </el-dialog>
    <!--账户详情-->
    <el-dialog v-if="uid" title="会员详情" :visible.sync="visibleDetail" width="1000px" :before-close="Close">
        <user-details v-if="visibleDetail" ref="userDetails" :uid="uid" />
    </el-dialog>

    <!--导出订单列表-->
    <file-list ref="exportList" />
</div>
</template>

<script>
import {
    userLstApi,
    changeGroupApi,
    changelabelApi,
    changeAccountApi,
    changeNowMoneyApi,
    batchChangeGroupApi,
    batchChangelabelApi,
    userUpdateApi,
    groupLstApi,
    exportOrderApi,
    labelLstApi,
    changeTjrApi
} from '@/api/user'
import newsCategory from '@/components/newsCategory/index.vue'
import userDetails from './userDetails'
import fileList from "@/components/exportFile/fileList";
export default {
    name: 'UserList',
    components: {
        newsCategory,
        userDetails,
        fileList
    },
    data() {
        return {
            moren: require("@/assets/images/f.png"),
            pickerOptions: {
                shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()))
                            picker.$emit('pick', [start, end])
                        }
                    },
                    {
                        text: '昨天',
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.setTime(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1)))
                            end.setTime(end.setTime(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())))
                            picker.$emit('pick', [start, end])
                        }
                    },
                    {
                        text: '最近7天',
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                            picker.$emit('pick', [start, end])
                        }
                    },
                    {
                        text: '最近30天',
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                            picker.$emit('pick', [start, end])
                        }
                    },
                    {
                        text: '本月',
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.setTime(new Date(new Date().getFullYear(), new Date().getMonth(), 1)))
                            picker.$emit('pick', [start, end])
                        }
                    },
                    {
                        text: '本年',
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.setTime(new Date(new Date().getFullYear(), 0, 1)))
                            picker.$emit('pick', [start, end])
                        }
                    }
                ]
            },
            timeVal: [],
            collapse: false,
            visibleDetail: false,
            maxCols: 3,
            isShowSend: true,
            visible: false,
            user_type: '',
            // mer_type: '', //1表示普通用户，2表示商家
            tableData: {
                data: [],
                total: 0
            },
            listLoading: true,
            multipleSelection: [],
            ids: '',
            wechatIds: '',
            uid: '',
            labelPosition: 'right',
            userProps: {
                children: 'children',
                label: 'name',
                value: 'name'
            },
            userFrom: {
                label_id: '',
                user_type: '',
                sex: '',
                is_promoter: '',
                country: '',
                pay_count: '',
                user_time_type: '',
                user_time: '',
                nickname: '',
                province: '',
                city: '',
                page: 1,
                limit: 20,
                group_id: ''
            },
            address: [],
            grid: {
                xl: 8,
                lg: 12,
                md: 12,
                sm: 24,
                xs: 24
            },
            grid2: {
                xl: 18,
                lg: 16,
                md: 12,
                sm: 24,
                xs: 24
            },
            grid3: {
                xl: 8,
                lg: 12,
                md: 12,
                sm: 24,
                xs: 24
            },
            addresData: [],
            groupList: [],
            labelLists: []
        }
    },
    mounted() {
        this.groupLists()
        this.getTagList()
        this.getList('')
    },
    methods: {
      bill(id){
        this.$router.push(`bill/${id}`);
      },
      getExportFileList() {
        this.fileVisible = true;
        this.$refs.exportList.exportFileList("user");
      },
      // 导出
      exportOrder() {
        exportOrderApi(this.userFrom)
          .then(res => {
            const h = this.$createElement;
            this.$msgbox({
              title: "提示",
              message: h("p", null, [
                h("span", null, '文件正在生成中，请稍后点击"'),
                h("span", { style: "color: teal" }, "导出已生成列表"),
                h("span", null, '"查看~ ')
              ]),
              confirmButtonText: "我知道了"
            }).then(action => {});
          })
          .catch(res => {
            this.$message.error(res.message);
          });
      },

        // 选择时间
        selectChange(tab) {
            this.timeVal = []
            this.userFrom.user_time = tab
            this.getList('')
        },
        // 具体日期
        onchangeTime(e) {
            this.timeVal = e
            this.userFrom.user_time = e ? this.timeVal.join('-') : ''
        },
        userSearchs() {
          if(this.userFrom.user_time_type && (!this.userFrom.user_time)){
            this.$message.error('请选择访问时间')
          }else if(!this.userFrom.user_time_type && (this.userFrom.user_time)){
            this.$message.error('请选择访问情况')
          }else{
            this.getList(1)
          }
        },

        // 分组列表
        groupLists() {
            groupLstApi({
                page: 1,
                limit: 9999
            }).then(async res => {
                this.groupList = res.data.list
            }).catch(res => {
                this.$message.error(res.message)
            })
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
        // 账户详情
        onDetails(id) {
            this.uid = id
            this.visibleDetail = true
        },
        Close() {
            this.visibleDetail = false
        },
        sendNews() {
            if (this.multipleSelection.length === 0) return this.$message.warning('请先选择用户')
            this.visible = true
        },
        handleClose() {
            this.visible = false
        },
        handleSelectionChange(val) {
            this.multipleSelection = val
            const data = []
            const wechatData = []
            this.multipleSelection.map((item) => {
                data.push(item.uid)
                wechatData.push(item.wechat_user_id)
            })
            this.ids = data.join(',')
            this.wechatIds = wechatData.join(',')
        },
        // 修改分组
        setGroup(row) {
            this.$modalForm(changeGroupApi(row.uid))
        },
        // 批量分组
        batchGroup() {
            if (this.multipleSelection.length === 0) return this.$message.warning('请先选择用户')
            this.$modalForm(batchChangeGroupApi({
                ids: this.ids
            }))
        },
        // 修改标签
        setLabel(row) {
            this.$modalForm(changelabelApi(row.uid))
        },
        // 修改标签
        setTj(row) {
            this.$modalForm(changeTjrApi(row.uid))
        },
        setAccount(uid) {
            this.$modalForm(changeAccountApi(uid))
        },
        // 批量标签
        batchlabel() {
            if (this.multipleSelection.length === 0) return this.$message.warning('请先选择用户')
            this.$modalForm(batchChangelabelApi({
                ids: this.ids
            }))
        },
        // 修改余额
        setMoney(row) {
            this.$modalForm(changeNowMoneyApi(row.uid))
        },
        // 列表
        getList(num) {
            this.listLoading = true
            this.userFrom.page = num ? num : this.userFrom.page;
            this.userFrom.user_type = this.user_type
            this.userFrom.province = this.address[0]
            this.userFrom.city = this.address[1]
            if (this.userFrom.user_type === '0') this.userFrom.user_type = ''
            userLstApi(this.userFrom).then(res => {
                this.tableData.data = res.data.list
                this.tableData.total = res.data.count
                this.listLoading = false
            }).catch(res => {
                this.listLoading = false
                this.$message.error(res.message)
            })
        },
        pageChange(page) {
            this.userFrom.page = page
            this.getList('')
        },
        handleSizeChange(val) {
            this.userFrom.limit = val
            this.getList('')
        },
        // 编辑
        onEdit(id) {
            this.$modalForm(userUpdateApi(id)).then(() => this.getList())
        },
        // 重置
        reset() {
            this.userFrom = {
                label_id: '',
                user_type: '',
                sex: '',
                is_promoter: '',
                country: '',
                pay_count: '',
                user_time_type: '',
                user_time: '',
                nickname: '',
                province: '',
                city: '',
                page: 1,
                limit: 15,
                group_id: ''
            }
            this.timeVal=[]
        }
    }
}
</script>

<style lang="scss" scoped>
.selWidth {
    width: 100% !important;
}
.selWidth_half {
    width: 50% !important;
}

.dia {
    /deep/ .el-dialog__body {
        height: 700px !important;
    }
}

.text-right {
    text-align: right;
}

.container {
    min-width: 821px;

    /deep/.el-form-item {
        width: 100%;
    }

    /deep/.el-form-item__content {
        width: 72%;
    }
}

.vipName {
    color: #dab176
}

.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
    font-size: 12px;
}

.el-icon-arrow-down {
    font-size: 12px;
}

.demo-table-expand {
    font-size: 0;
}

.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}

.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 33.33%;
}

/deep/[type=reset],
[type=submit],
button,
html [type=button] {
    -webkit-appearance: none !important;
}
</style>
