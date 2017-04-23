<template>
    <div class="personalCenter">
        <div class="personalInfo">
          <div class="personalInfo-wrap">
            <div class="portrait"><img :src="`${basicUrl}/image?imageId=${person.portrait}`" alt=""></div>
            <div class="more-info">
              <h2>{{person.userName}}</h2>
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
                <el-menu-item index="4"><i class="el-icon-warning"></i>我关注的问题</el-menu-item>
                <el-menu-item index="5"><i class="el-icon-setting"></i>基本信息</el-menu-item>
              </el-menu>
            </div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple">
              <div class="module-wrap" v-show="showModule==1">
                <div class="tabs-wrap">
                <el-tabs type="card">
                  <el-tab-pane label="我关注的">
                    <FocusSubject :subjectInfos="subjectInfos"></FocusSubject>
                    <Page></Page>
                  </el-tab-pane>
                </el-tabs>
                </div>
              </div>

              <div class="module-wrap" v-show="showModule==2">
                <div class="tabs-wrap">
                  <el-tabs type="card">
                    <el-tab-pane label="我的提问">
                      <singleQuestion :questions="person.myQuestions.questions"></singleQuestion>
                      <Page></Page>
                    </el-tab-pane>
                  </el-tabs>
                </div>
              </div>
              <div class="module-wrap" v-show="showModule==4">
                <div class="tabs-wrap">
                  <el-tabs type="card">
                    <el-tab-pane label="我关注的问题">
                      <singleQuestion :questions="person.myFocusQuestions.questions"></singleQuestion>
                      <Page></Page>
                    </el-tab-pane>
                  </el-tabs>
                </div>
              </div>

              <div class="module-wrap" v-show="showModule==5">
                <div class="tabs-wrap">
                  <el-tabs type="card" @tab-click="handleClick" @tab-remove="handleRemove">
                    <el-tab-pane label="个人信息">
                      <el-form :model="person" label-width="80px">
                        <el-form-item label="头像">
                          <img style="width:200px;height:200px;" :src="`${basicUrl}/image?imageId=${person.portrait}`" alt="">
                        </el-form-item>
                        <el-form-item label="用户名">
                          <el-input v-model="person.userName"></el-input>
                        </el-form-item>
                        <el-form-item label="微信">
                          <el-input v-model="person.wechat"></el-input>
                        </el-form-item>
                        <el-form-item label="QQ">
                          <el-input v-model="person.qq"></el-input>
                        </el-form-item>
                        <el-form-item label="手机">
                          <el-input v-model="person.phone"></el-input>
                        </el-form-item>
                        <el-form-item label="个性签名">
                          <el-input type="textarea" v-model="person.signature"></el-input>
                        </el-form-item>
                      </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="修改信息">
                      <el-form :model="person" label-width="80px">
                        <el-form-item label="头像">
                          <el-upload
                            action="http://localhost:3000/admin/addImage"
                            type="drag"
                            :thumbnail-mode="true"
                            :multiple="false"
                            :on-remove="handleRemove"
                            :on-success="handlePicSucess"
                            :default-file-list="fileList"
                          >
                            <i class="el-icon-upload"></i>
                            <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
                            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                          </el-upload>
                        </el-form-item>
                        <el-form-item label="微信">
                          <el-input v-model="person.wechat"></el-input>
                        </el-form-item>
                        <el-form-item label="QQ">
                          <el-input v-model="person.qq"></el-input>
                        </el-form-item>
                        <el-form-item label="手机">
                          <el-input v-model="person.phone"></el-input>
                        </el-form-item>
                        <el-form-item label="个性签名">
                          <el-input type="textarea" v-model="person.signature"></el-input>
                        </el-form-item>
                        <el-form-item>
                        <el-button type="primary" @click="onSubmit">确认修改</el-button>
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
  import singleQuestion from 'components/module/singleQuestion.vue'
  import Page from 'components/module/Page.vue'
  export default {
    data () {
      return {
        subjectInfos: [],
        basicUrl: this.getUrl(),
        person: {myFocusQuestions: {}, myQuestions: {}},
        showModule: 1,
        fileList: []
      }
    },
    created () {
      this.getUserInfo()
    },
    methods: {
      getUrl () {
        return this.$store.state.basicUrl
      },
      popTip (title, tips) {
        this.$alert(tips, title, {
        })
      },
      getUserInfo () {
        var self = this
        var params = {}
        var name, value
        var str = window.location.href
        var num = str.indexOf('?')
        str = str.substr(num + 1)
        var arr = str.split('&')
        for (var i = 0; i < arr.length; i++) {
          num = arr[i].indexOf('=')
          if (num > 0) {
            name = arr[i].substring(0, num)
            value = arr[i].substr(num + 1)
            params[name] = value
          }
        }
        var userId = params.userId || window.sessionStorage.getItem('userId')
        this.$http.post(self.getUrl() + '/showPersonInfo', {userId: userId}).then((response) => {
          if (response.status === 200) {
            if (response.data.status === 1) {
              console.log('----------', response.data)
              self.person = response.data.user
              self.subjectInfos = []
              self.subjectInfos = self.subjectInfos.concat(response.data.user.mySubjects.subjects)
            } else {
              self.popTip(response.data.mes)
            }
          }
        }, (response) => {
          // error callback
        })
      },
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
        var self = this
        var params = {}
        var name, value
        var str = window.location.href
        var num = str.indexOf('?')
        str = str.substr(num + 1)
        var arr = str.split('&')
        for (var i = 0; i < arr.length; i++) {
          num = arr[i].indexOf('=')
          if (num > 0) {
            name = arr[i].substring(0, num)
            value = arr[i].substr(num + 1)
            params[name] = value
          }
        }
        var userId = params.userId || window.sessionStorage.getItem('userId')
        this.$http.post(self.getUrl() + '/updatePersonInfo', {userId: userId, user: self.person}).then((response) => {
          if (response.status === 200) {
            self.popTip(response.data.mes)
          }
        }, (response) => {
          // error callback
        })
      },
      handlePicSucess (response, file, fileList) {
        this.handleRemovePic(file, fileList)
        this.person.portrait = response.fileId
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
      singleQuestion: singleQuestion,
      Page: Page
    }
  }
</script>
