<template>
  <div class="divBox">
    <el-card class="box-card">
      <el-button icon="el-icon-arrow-left" size="mini" class="pan-back-btn mb20" @click="back">返回</el-button>
      <el-form ref="formValidate" class="form" :model="formValidate" label-width="120px" :rules="ruleValidate" @submit.native.prevent>
        <div class="dividerTitle">
          <span class="title mr10">文章信息</span>
          <el-divider />
        </div>
        <el-row :gutter="10">
          <el-col v-bind="grid">
            <el-form-item label="标题：" prop="title" label-for="title">
              <el-input v-model="formValidate.title" placeholder="请输入" element-id="title" style="width: 90%" />
            </el-form-item>
          </el-col>
          <el-col v-bind="grid" class="mr50">
            <el-form-item label="作者：" prop="author" label-for="author">
              <el-input v-model="formValidate.author" placeholder="请输入" maxLength="32" element-id="author" style="width: 90%" />
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="文章分类：" label-for="cid" prop="cid">
              <el-select v-model="formValidate.cid" clearable placeholder="请选择" class="mb15" style="width: 90%">
                <el-option
                  :label="sleOptions.title"
                  :value="sleOptions.category_id"
                  style="width: 560px;height:200px;overflow: auto;background-color:#fff"
                >
                  <el-tree
                    ref="tree2"
                    :data="treeData"
                    :props="defaultProps"
                    highlight-current
                    @node-click="handleSelClick"
                  />
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-bind="grid" class="mr50">
            <el-form-item label="文章简介：" prop="synopsis" label-for="synopsis">
              <el-input v-model="formValidate.synopsis" type="textarea" placeholder="请输入" style="width: 90%" />
            </el-form-item>
          </el-col>
          <el-col v-bind="grid" class="mr50">
            <el-form-item label="图文封面：" prop="image_input">
              <div class="upLoadPicBox" @click="modalPicTap('1')">
                <div v-if="formValidate.image_input" class="pictrue"><img :src="formValidate.image_input"></div>
                <div v-else class="upLoad">
                  <i class="el-icon-camera cameraIconfont" />
                </div>
              </div>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="视频：" prop="video_link">
              <el-input class="perW50" v-model="videoLink" placeholder="请输入视频链接"/>
              <input type="file" ref='refid' @change="zh_uploadFile_change" style="display:none">
              <el-button type="primary" icon="ios-cloud-upload-outline" class="uploadVideo" @click="zh_uploadFile">{{videoLink ? '确认添加' : '上传视频'}}</el-button>
              <!--              <Progress :percent = progress :stroke-width="5" v-if="upload.videoIng" />-->
              <el-progress :percentage="progress" :text-inside="true" :stroke-width="26"  v-if="upload.videoIng"></el-progress>
              <div class="iview-video-style" v-if="formValidate.video_link">
                <video style="width:100%;height: 100%!important;border-radius: 10px;" :src="formValidate.video_link" controls="controls">
                  您的浏览器不支持 video 标签。
                </video>
                <div class="mark">
                </div>
                <i class="el-icon-delete iconv" @click="delVideo"/>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="dividerTitle">
          <span class="title">文章内容</span>
          <el-divider />
        </div>
        <el-form-item label="文章内容：" prop="content">
          <ueditor-from v-model="formValidate.content" :content="formValidate.content" />
          <!--<vue-ueditor-wrap v-model="formValidate.content" :config="myConfig" style="width: 90%;" @beforeInit="addCustomDialog" />-->
        </el-form-item>
        <div class="dividerTitle">
          <span class="title">其他设置</span>
          <el-divider />
        </div>
        <el-row>
<!--          <el-col :span="24">-->
<!--            <el-form-item label="原文链接：">-->
<!--              <el-input v-model="formValidate.url" placeholder="请输入" style="width: 60%" />-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col :span="24">-->
<!--            <el-form-item label="banner显示：">-->
<!--              <el-radio-group v-model="formValidate.is_banner">-->
<!--                <el-radio :label="1" class="radio">显示</el-radio>-->
<!--                <el-radio :label="0">不显示</el-radio>-->
<!--              </el-radio-group>-->
<!--            </el-form-item>-->
<!--          </el-col>
          <el-col :span="24">
            <el-form-item label="热门文章：">
              <el-radio-group v-model="formValidate.is_hot">
                <el-radio :label="1" class="radio">显示</el-radio>
                <el-radio :label="0">不显示</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>-->
          <el-col :span="24">
            <el-form-item label="是否显示：">
              <el-radio-group v-model="formValidate.status">
                <el-radio :label="1" class="radio">显示</el-radio>
                <el-radio :label="0">不显示</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-button type="primary" class="submission" @click="onsubmit('formValidate')">提交</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { categoryListApi, articleSchoolAddApi, articleSchoolDetailApi,articleSchoolEditApi, articleEditApi ,articleGetTempKeysApi} from '@/api/cms'
import ueditorFrom from '@/components/ueditorFrom'
import { roterPre } from '@/settings'
import { productGetTempKeysApi } from '@/api/product'
export default {
  name: 'EditArticle',
  components: { ueditorFrom },
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
      roterPre: roterPre,
      sleOptions: {
        title: '',
        category_id: ''
      },
      videoLink: '',
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      upload: {
        videoIng: false // 是否显示进度条；
      },
      list: [],
      treeData: [],
      grid: {
        xl: 10,
        lg: 10,
        md: 10,
        sm: 24,
        xs: 24
      },
      formValidate: {
        cid: '',
        title: '',
        author: '',
        image_input: '',
        content: '',
        synopsis: '',
        url: '',
        is_hot: 0,
        is_banner: 0,
        status: 0
      },
      ruleValidate: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        author: [
          { required: true, message: '请输入作者', trigger: 'blur' }
        ],
        cid: [
          { required: true, validator: validateUpload2, trigger: 'change' }
        ],
        image_input: [
          { required: true, validator: validateUpload, trigger: 'change' }
        ],
        content: [
          { required: true, message: '请输入文章内容', trigger: 'change' }
        ]
      },
      tempRoute: {}
    }
  },
  watch: {
    $route(to, from) {
      if (this.$route.params.id) {
        this.getDetails()
      } else {
        this.formValidate = {
          title: '',
          author: '',
          image_input: '',
          content: '',
          synopsis: '',
          url: '',
          is_hot: 0,
          is_banner: 0,
          status: 0
        }
      }
    }
  },
  created() {
    this.tempRoute = Object.assign({}, this.$route)
  },
  mounted() {
    this.getList()
    if (this.$route.params.id) {
      this.setTagsViewTitle()
      this.getDetails()
    }
  },
  methods: {

    // 返回
    back() {
      this.$router.push({ path: `${roterPre}/cms/articleSchool` })
    },
    zh_uploadFile () {
      if (this.videoLink) {
        this.formValidate.video_link = this.videoLink
      } else {
        this.$nextTick(() => {
          console.log(this.$refs.refid)
          this.$refs.refid.click()
        });
      }
    },
    zh_uploadFile_change (evfile) {
      let that = this
      let suffix = evfile.target.files[0].name.substr(evfile.target.files[0].name.indexOf('.'))
      if (suffix !== '.mp4') {
        return that.$message.error('只能上传MP4文件')
      }
      articleGetTempKeysApi().then(res => {
        that.$videoCloud.videoUpload({
          type: res.data.type,
          evfile: evfile,
          res: res,
          uploading (status, progress) {
            that.upload.videoIng = status
            console.log(status, progress)
          }
        }).then(res => {
          console.log(res);
          that.formValidate.video_link = res.url
          that.$message.success('视频上传成功')
        }).catch(res => {
          that.$message.error(res.message)
        })
      }).catch(res => {
        that.$message.error(res.message);
      });
    },
    // 所有分类
    getList() {
      categoryListApi({pid:1}).then(res => {
        this.treeData = res.data
      }).catch(res => {
        this.$message.error(res.message)
      })
    },
    modalPicTap(tit) {
      const _this = this
      this.$modalUpload(function(img) {
        _this.formValidate.image_input = img[0]
      }, tit)
    },
    // 分类点击
    handleSelClick(node) {
      this.formValidate.cid = node.category_id
      this.sleOptions = {
        title: node.title,
        category_id: node.category_id
      }
    },
    // 提交数据
    onsubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.$route.params.id) {
            articleSchoolEditApi(this.formValidate, this.$route.params.id).then(async res => {
              this.$message.success(res.message)
              setTimeout(() => {
                this.$router.push({ path: `${roterPre}/cms/articleSchool` })
              }, 500)
            }).catch(res => {
              this.$message.error(res.message)
            })
          } else {
            articleSchoolAddApi(this.formValidate).then(async res => {
              this.$message.success(res.message)
              setTimeout(() => {
                this.$router.push({ path: `${roterPre}/cms/articleSchool` })
              }, 500)
            }).catch(res => {
              this.$message.error(res.message)
            })
          }
        } else {
          return false
        }
      })
    },
    // 文章详情
    getDetails() {
      articleSchoolDetailApi(this.$route.params.id ? this.$route.params.id : 0).then(async res => {
        const news = res.data
        this.sleOptions.title = news.category.title
        this.sleOptions.category_id = news.category.category_id
        this.formValidate = {
          cid: news.category.category_id,
          title: news.title,
          author: news.author,
          image_input: news.image_input,
          content: news.content.content,
          synopsis: news.synopsis,
          url: news.url,
          is_hot: news.is_hot,
          is_banner: news.is_banner,
          status: news.status
        }
      }).catch(res => {
        this.loading = false
        this.$message.error(res.message)
      })
    },
    setTagsViewTitle() {
      const title = '编辑文章'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.$route.params.id}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    }
  }
}
</script>

<style scoped lang="scss">
/deep/ .el-pagination__jump{
  margin-left: 0;
}
</style>
