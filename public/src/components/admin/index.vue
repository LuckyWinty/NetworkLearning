<template>
  <div class="personalCenter">
    <h1 class="head-title">后台管理系统</h1>
    <div class="person-detail">
      <el-row :gutter="20">
        <el-col :span="6"><div class="grid-content bg-purple my-nav">
          <el-menu default-active="1" class="el-menu-vertical-demo" @select="changeModule" >
            <el-menu-item index="1" ><i class="el-icon-message"></i>用户管理</el-menu-item>
            <el-menu-item index="2"><i class="el-icon-menu"></i>课程管理</el-menu-item>
            <el-menu-item index="3"><i class="el-icon-document"></i>论坛管理</el-menu-item>
            <el-menu-item index="4"><i class="el-icon-warning"></i>测验管理</el-menu-item>
          </el-menu>
        </div>
        </el-col>
        <el-col :span="18"><div class="grid-content bg-purple">
          <div class="module-wrap" v-show="showModule==1">
            <el-tabs type="card" @tab-click="handleClick" @tab-remove="handleRemove">
              <el-tab-pane label="全部用户">
              <div class="tabs-wrap">
                <table class="primary-table top-margin">
                  <thead>
                    <th rowspan="1" colspan="1">用户名</th>
                    <th rowspan="1" colspan="1">用户权限</th>
                    <th rowspan="1" colspan="1">手机号码</th>
                    <th rowspan="1" colspan="1">微信</th>
                    <th rowspan="1" colspan="1">操作</th>
                  </thead>
                  <tbody>
                  <tr v-if="users.length > 0" v-for="user in users">
                    <td>{{user.userName}}</td>
                    <td>{{user.power}}</td>
                    <td>{{user.phone}}</td>
                    <td>{{user.wechat}}</td>
                    <td>
                      <el-button
                        size="small"
                        @click="resetPassword(user)">重置密码</el-button>
                      <el-button
                        size="small"
                        type="danger"
                        @click="DeleteUser(user)">删除</el-button>
                    </td>
                  </tr>
                  </tbody>
                 </table>
                 <Page></Page>
                </div>
              </el-tab-pane>
              <el-tab-pane label="添加管理员">
                <el-form :model="formLabelAlign" label-width="80px" id="personInfo1" enctype="multipart/form-data">
                  <el-form-item label="用户名">
                    <el-input name="userName" v-model="formLabelAlign.userName"></el-input>
                  </el-form-item>
                  <el-form-item label="密码">
                    <el-input name="password" v-model="formLabelAlign.password"></el-input>
                  </el-form-item>
                  <el-form-item label="管理权限">
                    <el-input name="power" v-model="formLabelAlign.power"></el-input>
                  </el-form-item>
                  <el-form-item label="微信">
                    <el-input name="wechat" v-model="formLabelAlign.wechat"></el-input>
                  </el-form-item>
                  <el-form-item label="手机">
                    <el-input name="phone" v-model="formLabelAlign.phone"></el-input>
                  </el-form-item>
                  <el-button type="primary" @click="doAdd">添加</el-button>
                </el-form>
              </el-tab-pane>
            </el-tabs>
            </div>
          </div>
          <div class="module-wrap" v-show="showModule==2">
            <el-tabs type="card" @tab-click="handleClick" @tab-remove="handleRemove">
              <el-tab-pane label="全部课程">
                <div class="tabs-wrap">
                  <table class="primary-table top-margin">
                    <thead>
                    <th rowspan="1" colspan="1">课程名称</th>
                    <th rowspan="1" colspan="1">录入日期</th>
                    <th rowspan="1" colspan="1">课程难度</th>
                    <th rowspan="1" colspan="1">课程时长</th>
                    <th rowspan="1" colspan="1">操作</th>
                    </thead>
                    <tbody>
                    <tr v-for="subject in subjects">
                      <td>{{subject.title}}</td>
                      <td>{{formatDate(subject.created)}}</td>
                      <td>{{subject.level}}</td>
                      <td>{{subject.learnTime}}</td>
                      <td>
                        <el-button
                          size="small"
                          @click="editSubject(subject)">编辑</el-button>
                        <el-button
                          size="small"
                          type="danger"
                          @click="deleteSubject(subject)">删除</el-button>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                  <Page></Page>
                </div>
              </el-tab-pane>
              <el-tab-pane label="添加课程">
                <div class="step-wrap">
                  <el-steps :space="300" :active="active" finish-status="success">
                    <el-step title="基本信息">
                    </el-step>
                    <el-step title="更多相关">
                    </el-step>
                    <el-step title="主体内容"></el-step>
                  </el-steps>
                </div>
                <div class="step-1" v-show="active==1">
                  <el-form :model="subject" label-width="150px">
                    <el-form-item label="课程展示图">
                      <el-upload
                        action="http://localhost:3000/admin/addImage"
                        type="drag"
                        :thumbnail-mode="true"
                        :multiple = "false"
                        :on-remove="handleRemove"
                        :on-success="handlePicSucess"
                        :default-file-list="fileList"
                      >
                        <i class="el-icon-upload"></i>
                        <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                      </el-upload>
                    </el-form-item>
                    <el-form-item label="课程名称">
                      <el-input v-model="subject.title"></el-input>
                    </el-form-item>
                    <el-form-item label="课程描述">
                      <el-input type="textarea" placeholder="最大150字" v-model="subject.desc"></el-input>
                    </el-form-item>
                    <el-form-item label="课程难度">
                      <el-radio-group v-model="subject.level">
                        <el-radio label="初级"></el-radio>
                        <el-radio label="中级"></el-radio>
                        <el-radio label="高级"></el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="课程时长">
                      <el-input v-model="subject.learnTime"></el-input>
                    </el-form-item>
                    <el-button  class="top-btn" type="primary" @click="next">下一步</el-button>
                  </el-form>
                </div>
                <div class="step-2" v-show="active==2">
                  <el-form :model="subject" label-width="150px">
                    <el-form-item label="课程须知">
                      <el-input type="textarea"  placeholder="最大200字" v-model="subject.mustKnow" ></el-input>
                    </el-form-item>
                    <el-form-item label="课程推荐习题链接">
                        <el-input type="textarea" v-model="subject.practice"  placeholder="例：名称1|链接1，名称2|链接2，名称3|链接3"></el-input>
                    </el-form-item>
                    <el-form-item label="课程推荐学习资源">
                      <el-input type="textarea" v-model="subject.moreInfo"   placeholder="例：名称1|链接1，名称2|链接2，名称3|链接3"></el-input>
                    </el-form-item>
                    <el-button  class="top-btn" type="primary" @click="pre">上一步</el-button>
                    <el-button  class="top-btn pull-right" type="primary" @click="next">下一步</el-button>
                  </el-form>
                </div>
                <div class="step-3" v-show="active==3">
                  <quill-editor ref="myTextEditor"
                                v-model="subject.content"
                                @blur="onEditorBlur($event)"
                                @focus="onEditorFocus($event)"
                                @ready="onEditorReady($event)">
                  </quill-editor>
                  <el-button  class="top-btn" type="primary" @click="pre">上一步</el-button>
                  <el-button class="top-btn pull-right" type="primary" @click="insertSubject">确定录入</el-button>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>

          <div class="module-wrap" v-show="showModule==3">
            <el-tabs type="card" @tab-click="handleClick" @tab-remove="handleRemove">
              <el-tab-pane label="全部问题">
                <div class="tabs-wrap">
                  <table class="primary-table top-margin">
                    <thead>
                    <th rowspan="1" colspan="1">问题详情</th>
                    <th rowspan="1" colspan="1">提问日期</th>
                    <th rowspan="1" colspan="1">被关注人数</th>
                    <th rowspan="1" colspan="1">回答数量</th>
                    <th rowspan="1" colspan="1">操作</th>
                    </thead>
                    <tbody>
                    <tr v-for="question in questions">
                      <td>{{question.content}}</td>
                      <td>{{formatDate(question.created)}}</td>
                      <td>{{question.beFocused.length}}</td>
                      <td>{{question.answers.length}}</td>
                      <td>
                          size="small"
                          type="danger"
                          @click="deleteQuestion(question)">删除</el-button>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                  <Page></Page>
                </div>
              </el-tab-pane>
              </el-tabs>
          </div>

          <div class="module-wrap" v-show="showModule==4">
            <el-tabs type="card" @tab-click="handleClick" @tab-remove="handleRemove">
              <el-tab-pane label="全部练习">
                <div class="tabs-wrap">
                  <table class="primary-table top-margin">
                    <thead>
                    <th rowspan="1" colspan="1">练习名称</th>
                    <th rowspan="1" colspan="1">录入日期</th>
                    <th rowspan="1" colspan="1">选项个数</th>
                    <th rowspan="1" colspan="1">课程时长</th>
                    <th rowspan="1" colspan="1">操作</th>
                    </thead>
                    <tbody>
                    <tr>
                      <td>11</td>
                      <td>12</td>
                      <td>13</td>
                      <td>14</td>
                      <td>
                        <el-button
                          size="small"
                          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                          size="small"
                          type="danger"
                          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                  <Page></Page>
                </div>
              </el-tab-pane>
              <el-tab-pane label="添加练习">
                <div class="step-1">
                  <el-form :model="practice" label-width="150px">
                    <el-form-item label="章节名称">
                      <el-input v-model="practice.belong"></el-input>
                    </el-form-item>
                    <el-form-item label="题目描述">
                      <el-input type="textarea" placeholder="最大500字" v-model="practice.content"></el-input>
                    </el-form-item>
                    <el-form-item label="题目选项">
                    <el-input type="textarea" placeholder="每条选项最大150字,例：***，***，***" v-model="practice.choice" placa></el-input>
                  </el-form-item>
                    <el-form-item label="正确答案">
                      <el-input v-model="practice.correctChoice" placeholder="例：A，B，C"></el-input>
                    </el-form-item>
                    <el-form-item label="答案解释">
                      <el-input type="textarea" placeholder="最大250字" v-model="practice.explain"></el-input>
                    </el-form-item>
                  </el-form>
                  <el-button class="top-btn pull-right" type="primary" @click="insertItem">确定录入</el-button>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<style>
  .head-title{
    font-weight: 500;
    text-align: center;
    margin:30px 0;
  }
  .personalInfo .portrait img{
    width:100px;
    height:100px;
    margin-top: 20px;
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
  .top-margin{
    margin-top: 20px;
  }
  .primary-table{
    width:100%;
    border-collapse:collapse;
    border:1px solid #e0e6ed;
    border-radius: 5px;
  }
  .primary-table thead{
    background-color: #EFF2F7;
  }
  .primary-table th,.primary-table tr{
    border:1px solid #e0e6ed;
    text-align: center;
  }
  .primary-table th{
    padding:10px;
    color:#1f2d3d;
    font-weight: 100;
    font-size: 16px;
  }
  .primary-table tr td{
    padding:10px;
    border:1px solid #e0e6ed;
  }
  .primary-table tr:hover{
    background-color: #EFF2F7;
  }
  .step-wrap{
    border-bottom: solid 1px #e0e6ed;
    padding-bottom: 10px;
    margin-bottom: 30px;
  }
  .el-icon-view{
    display: none;
  }
  /*富文本*/
  .ql-container .ql-editor {
    min-height: 450px;
    padding-bottom: 10px;
    max-height: 700px;
  }
  .module-wrap .top-btn{
    margin-top: 20px;
  }
  .pull-right{
    float:right;
  }
</style>
<script>
  import Page from '../module/Page.vue'

  export default {
    data () {
      return {
        basicUrl: this.$store.state.basicUrl,
        fileList: [],
        formLabelAlign: {
          portrait: '',
          userName: '',
          password: '',
          power: '',
          wechat: '',
          qq: '',
          phone: '',
          signature: ''
        },
        subject: {
          title: '',
          imageId: '',
          desc: '',
          level: '',
          learnTime: '',
          practice: '',
          moreInfo: '',
          content: '',
          mustKnow: ''
        },
        practice: {
          content: '',
          choice: '',
          correctChoice: '',
          explain: '',
          belong: ''
        },
        active: 1,
        showModule: 1,
        users: [],
        subjects: [],
        questions: [],
        items: []
      }
    },
    created () {
      this.getUserInfo()
      this.getSubjectInfo()
    },
    methods: {
      getUrl () {
        return this.$store.state.basicUrl
      },
      getUserInfo () {
        var self = this
        this.$http.post(self.getUrl() + '/admin/showUsers').then((response) => {
          if (response.status === 200) {
            if (response.data.status === 1) {
              console.log('----------', response.data)
              self.users = response.data.users
            } else {
              self.popTip(response.data.mes)
            }
          }
        }, (response) => {
          // error callback
        })
      },
      resetPassword (user) {
        var self = this
        this.$http.post(self.$store.state.basicUrl + '/admin/resetPassword', {user: user}).then((response) => {
          if (response.status === 200) {
            self.popTip(response.data.mes)
          }
        }, (response) => {
          // error callback
        })
      },
      DeleteUser (user) {
        var self = this
        this.$http.post(self.$store.state.basicUrl + '/admin/deletUser', {user: user}).then((response) => {
          if (response.status === 200) {
            if (response.data.status === 1) {
              for (var i = 0; i < self.users.length; i++) {
                if (user._id.toString === self.users[i]._id.toString) {
                  self.users.splice(i, 1)
                  break
                }
              }
            }
            self.popTip(response.data.mes)
          }
        }, (response) => {
          // error callback
        })
      },
      doAdd () {
        var self = this
        var formData = new window.FormData(document.getElementById('personInfo1'))
        this.$http.post(self.$store.state.basicUrl + '/admin/add', formData).then((response) => {
          if (response.status === 200) {
            if (response.data.status === 1) {
              console.log('--------------成功')
              self.popTip('注册成功！', '点击右上角登陆吧！')
              self.users.push(response.data.user)
              self.formLabelAlign.portrait = ''
              self.formLabelAlign.userName = ''
              self.formLabelAlign.password = ''
              self.formLabelAlign.power = ''
              self.formLabelAlign.wechat = ''
              self.formLabelAlign.qq = ''
              self.formLabelAlign.phone = ''
              self.formLabelAlign.signature = ''
            } else {
              self.popTip(response.data.mes)
            }
          }
        }, (response) => {
          // error callback
        })
      },
      popTip (title, tips) {
        this.$alert(tips, title, {
        })
      },
      pre () {
        if (window.localStorage) {
          window.localStorage.setItem('subject', this.subject)
        } else {
          window.alert('该浏览器无法保存该课程数据，请输入后立刻发布。')
        }
        if (this.active-- < 0) this.active = 1
      },
      next () {
        console.log('--------------subject', this.subject)
        if (window.localStorage) {
          window.localStorage.setItem('subject', this.subject)
        } else {
          window.alert('该浏览器无法保存该课程数据，请输入后立刻发布。')
        }
        if (this.active++ > 2) this.active = 1
      },
      onEditorBlur (editor) {
        console.log('editor blur!', editor)
      },
      onEditorFocus (editor) {
        console.log('editor focus!', editor)
      },
      onEditorReady (editor) {
        console.log('editor ready!', editor)
      },
      changeModule (index, indexPath) {
        this.showModule = index
        console.log('---------------', index)
      },
      handleRemove (tab) {
        console.log(tab)
      },
      handleClick (tab, event) {
        console.log(tab, event)
      },
      getSubjectInfo () {
        var self = this
        this.$http.post(self.getUrl() + '/admin/showSubjects').then((response) => {
          if (response.status === 200) {
            if (response.data.status === 1) {
              console.log('----------', response.data)
              self.subjects = response.data.subjects
            } else {
              self.popTip(response.data.mes)
            }
          }
        }, (response) => {
          // error callback
        })
      },
      editSubject (subject) {
        window.location.href = '/#/subjectEdit?subjectId=' + subject._id
      },
      DeleteSubject (user) {
        var self = this
        this.$http.post(self.$store.state.basicUrl + '/admin/deletUser', {user: user}).then((response) => {
          if (response.status === 200) {
            if (response.data.status === 1) {
              for (var i = 0; i < self.users.length; i++) {
                if (user._id.toString === self.users[i]._id.toString) {
                  self.users.splice(i, 1)
                  break
                }
              }
            }
            self.popTip(response.data.mes)
          }
        }, (response) => {
          // error callback
        })
      },
      insertSubject () {
        var self = this
        this.$http.post(self.$store.state.basicUrl + '/admin/addSubjectInfo', {subject: self.subject}).then((response) => {
          if (response.status === 200) {
            if (response.data.status === 1) {
              self.popTip(response.data.mes)
              self.subject.title = ''
              self.subject.imageId = ''
              self.subject.desc = ''
              self.subject.level = ''
              self.subject.learnTime = ''
              self.subject.practice = ''
              self.subject.moreInfo = ''
              self.subject.content = ''
              self.subject.mustKnow = ''
              self.active = 1
              self.handleRemovePic()
              window.localStorage.removeItem('subject')
            } else {
              self.popTip(response.data.mes)
            }
          }
        }, (response) => {
          // error callback
        })
      },
      insertItem () {
        var self = this
        console.log('--------------practice', this.practice)
        this.$http.post(self.$store.state.basicUrl + '/admin/addPractice', {practice: self.practice}).then((response) => {
          if (response.status === 200) {
            if (response.data.status === 1) {
              self.popTip(response.data.mes)
              self.practice.content = ''
              self.practice.choice = ''
              self.practice.correctChoice = ''
              self.practice.belong = ''
              self.practice.explain = ''
            } else {
              self.popTip(response.data.mes)
            }
          }
        }, (response) => {
          // error callback
        })
      },
      handleRemovePic (file, fileList) {
        console.log('you', file, fileList)
      },
      handlePicSucess (response, file, fileList) {
        this.handleRemovePic(file, fileList)
        this.subject.imageId = response.fileId
      },
      formatter (row, column) {
        return row.address
      },
      filterTag (value, row) {
        return row.tag === value
      },
      formatDate (date) {
        var times = new Date(date)
        var Y = times.getFullYear()
        var M = times.getMonth() > 8 ? times.getMonth() + 1 : '0' + (times.getMonth() + 1)
        var D = times.getDate() > 9 ? times.getDate() : '0' + times.getDate()

        var H = times.getHours()
        var m = times.getMinutes()
        var S = times.getSeconds()

        return Y + '-' + this.checkTime(M) + '-' + this.checkTime(D) + '  ' + this.checkTime(H) + ' : ' + this.checkTime(m) + ' : ' + this.checkTime(S)
      },
      checkTime (i) {
        if (i < 10) {
          i = '0' + i
        }
        return i
      },
      handleEdit (index, row) {
        console.log(index, row)
      },
      handleDelete (index, row) {
        console.log(index, row)
      },
      handleSuccess (index, row) {
        console.log(index, row)
      },
      handleError (index, row) {
        console.log(index, row)
      }
    },
    components: {
      Page: Page
    }
  }
</script>
