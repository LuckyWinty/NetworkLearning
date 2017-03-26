<template>
    <div class="personalCenter">
        <div class="personalInfo">
          <div class="personalInfo-wrap">
            <div class="portrait"><img :src="person.portrait" alt=""></div>
            <div class="more-info">
              <h2>{{person.name}}</h2>
              <p>个性签名:  {{person.signature}}</p>
            </div>
          </div>
        </div>
        <div class="person-detail">
          <el-row :gutter="20">
            <el-col :span="6"><div class="grid-content bg-purple my-nav">
              <el-menu default-active="1" class="el-menu-vertical-demo" @select="changeModule" >
                <el-menu-item index="1" ><i class="el-icon-message"></i>课程</el-menu-item>
                <el-menu-item index="2"><i class="el-icon-menu"></i>我的提问</el-menu-item>
                <el-menu-item index="3"><i class="el-icon-document"></i>我的回答</el-menu-item>
                <el-menu-item index="4"><i class="el-icon-warning"></i>我关注的问题</el-menu-item>
                <el-menu-item index="5"><i class="el-icon-setting"></i>基本信息</el-menu-item>
              </el-menu>
            </div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple">
              <div class="module-wrap" v-show="showModule==1">
                <div class="tabs-wrap">
                <el-tabs type="card">
                  <el-tab-pane label="我关注的">
                    <FocusSubject></FocusSubject>
                    <Page></Page>
                  </el-tab-pane>
                </el-tabs>
                </div>
              </div>

              <div class="module-wrap" v-show="showModule==2">
                <div class="tabs-wrap">
                  <el-tabs type="card" @tab-click="handleClick" @tab-remove="handleRemove">
                    <el-tab-pane label="最近提问">
                      <FocusSubject></FocusSubject>
                      <Page></Page>
                    </el-tab-pane>
                    <el-tab-pane label="我关注的">
                      <FocusSubject></FocusSubject>
                      <Page></Page>
                    </el-tab-pane>
                  </el-tabs>
                </div>
              </div>

              <div class="module-wrap" v-show="showModule==3">
                <div class="tabs-wrap">
                  <el-tabs type="card" @tab-click="handleClick" @tab-remove="handleRemove">
                    <el-tab-pane label="最近回答">
                      <FocusSubject></FocusSubject>
                      <Page></Page>
                    </el-tab-pane>
                    <el-tab-pane label="我关注的">
                      <FocusSubject></FocusSubject>
                      <Page></Page>
                    </el-tab-pane>
                  </el-tabs>
                </div>
              </div>

              <div class="module-wrap" v-show="showModule==4">
                <div class="tabs-wrap">
                  <el-tabs type="card" @tab-click="handleClick" @tab-remove="handleRemove">
                    <el-tab-pane label="最近关注">
                      <FocusSubject></FocusSubject>
                      <Page></Page>
                    </el-tab-pane>
                    <el-tab-pane label="最热关注">
                      <FocusSubject></FocusSubject>
                      <Page></Page>
                    </el-tab-pane>
                  </el-tabs>
                </div>
              </div>

              <div class="module-wrap" v-show="showModule==5">
                <div class="tabs-wrap">
                  <el-tabs type="card" @tab-click="handleClick" @tab-remove="handleRemove">
                    <el-tab-pane label="个人信息">
                      <el-form :model="formAlignRight" label-width="80px">
                        <el-form-item label="头像">
                          <img :src="person.portrait" alt="">
                        </el-form-item>
                        <el-form-item label="用户名">
                          <el-input v-model="formAlignRight.name"></el-input>
                        </el-form-item>
                        <el-form-item label="微信">
                          <el-input v-model="formAlignRight.wechat"></el-input>
                        </el-form-item>
                        <el-form-item label="QQ">
                          <el-input v-model="formAlignRight.qq"></el-input>
                        </el-form-item>
                        <el-form-item label="手机">
                          <el-input v-model="formAlignRight.phone"></el-input>
                        </el-form-item>
                        <el-form-item label="个性签名">
                          <el-input type="textarea" v-model="formAlignRight.desc"></el-input>
                        </el-form-item>
                      </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="修改信息">
                      <el-form :model="formAlignRight" label-width="80px">
                        <el-form-item label="头像">
                          <el-upload
                            action="//jsonplaceholder.typicode.com/posts/"
                            type="drag"
                            :multiple="true"
                            :on-preview="handlePreview"
                            :on-remove="handleRemovePic"
                            :on-success="handleSuccess"
                            :on-error="handleError"
                            :default-file-list="fileList"
                          >
                            <i class="el-icon-upload"></i>
                            <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
                            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                          </el-upload>
                        </el-form-item>
                        <el-form-item label="用户名">
                          <el-input v-model="formAlignRight.name"></el-input>
                        </el-form-item>
                        <el-form-item label="微信">
                          <el-input v-model="formAlignRight.wechat"></el-input>
                        </el-form-item>
                        <el-form-item label="QQ">
                          <el-input v-model="formAlignRight.qq"></el-input>
                        </el-form-item>
                        <el-form-item label="手机">
                          <el-input v-model="formAlignRight.phone"></el-input>
                        </el-form-item>
                        <el-form-item label="个性签名">
                          <el-input type="textarea" v-model="formAlignRight.desc"></el-input>
                        </el-form-item>
                        <el-form-item>
                        <el-button type="primary" @click="onSubmit">确认修改</el-button>
                        <el-button>保存</el-button>
                        </el-form-item>
                      </el-form>
                    </el-tab-pane>
                  </el-tabs>
                </div>
              </div>
            </div></el-col>
          </el-row>
        </div>
    </div>
</template>
<style>
.personalInfo{
  width:100%;
  height:100px;
  background-image: url("../images/personBg.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.personalInfo-wrap:after{
  display: block;
  content: '';
  visibility: hidden;
  clear: both;
}
.personalInfo-wrap,.person-detail{
  width:80%;
  margin:0 auto;
}
  .personalInfo .portrait img{
    width:100px;
    height:100px;
    margin-top: 20px;
  }
  .more-info{
    width:85%;
    box-sizing: border-box;
    margin-top: 20px;
    float:left;
  }
.more-info h2{
  font-weight: 500;
  margin-bottom: 10px;
}
.more-info h2,.more-info p{
   color:#fff;
}
.person-detail{
    margin-top: 50px;
}
.my-nav{
    margin-top:20px;
  }
</style>
<script>
  import FocusSubject from 'components/module/FocusSubject.vue'
  import Page from 'components/module/Page.vue'
  export default {
    data () {
      return {
        person: {
          name: '学生乙',
          portrait: 'https://gss0.baidu.com/8_BXsjip0QIZ8tyhnq/timg?wh_rate=0&wapiknow&quality=100&size=w250&sec=0&di=755e2d919a2414a6a2de820f555d44ae&src=http%3A%2F%2Fiknow02.bosstatic.bdimg.com%2Fzhidaoribao%2F2016%2F1221%2Fdz.jpg',
          signature: '技术改变未来',
          subject: ''
        },
        showModule: 1,
        formAlignRight: {
          name: '',
          wechat: '',
          qq: '',
          phone: '',
          desc: ''
        },
        fileList: [{name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
      }
    },
    methods: {
      changeModule (index, indexPath) {
        this.showModule = index
        console.log('有反应不？', index, this.showModule)
      },
      handleRemove (tab) {
        console.log(tab)
      },
      handleClick (tab, event) {
        console.log(tab, event)
      },
      onSubmit () {
      },
      handleRemovePic (file, fileList) {
        console.log(file, fileList)
      },
      handlePreview (file) {
        console.log(file)
      }
    },
    components: {
      FocusSubject: FocusSubject,
      Page: Page
    }
  }
</script>
