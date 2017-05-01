<template>
  <div class="personalCenter edit-subject">
    <h1 class="head-title">课程修改</h1>
    <div class="person-detail">
      <div class="step-wrap">
        <el-steps :space="400" :active="active" finish-status="success">
          <el-step title="基本信息">
          </el-step>
          <el-step title="更多相关">
          </el-step>
          <el-step title="主体内容"></el-step>
        </el-steps>
      </div>
      <div class="step-1" v-show="active==1">
        <el-form :model="subject" label-width="150px">
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
        <el-button class="top-btn pull-right" type="primary" @click="updateSubject">确定录入</el-button>
      </div>
    </div>
  </div>
</template>
<style>
  .head-title{
    font-weight: 500;
    text-align: center;
    margin:30px 0;
  }
  .edit-subject{
    width:1050px;
    margin:0 auto;
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
  /*富文本*/
  .ql-container .ql-editor {
    min-height: 450px;
    padding-bottom: 10px;
    max-height: 700px;
  }
  .step-3 .top-btn{
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
        active: 1,
        showModule: 1,
        users: [],
        subjects: [],
        questions: [],
        items: []
      }
    },
    created () {
      this.getEditSubjectInfo()
    },
    methods: {
      getUrl () {
        return this.$store.state.basicUrl
      },
      getEditSubjectInfo () {
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
        var subjectId = params.subjectId || ''
        this.$http.post(self.getUrl() + '/subjectSpots', {subjectId: subjectId}).then((response) => {
          if (response.status === 200) {
            if (response.data.status === 1) {
              console.log('----------', response.data)
              var practice = []
              var moreInfo = []
              self.subject = response.data.Subject
              for (var i = 0; i < response.data.Subject.moreInfos.length; i++) {
                var temp = response.data.Subject.moreInfos[i]
                moreInfo.push(temp.name + '|' + temp.url)
              }
              self.subject.moreInfo = moreInfo.join(',')
              for (var ii = 0; ii < response.data.Subject.moreInfos.length; ii++) {
                var temp1 = response.data.Subject.moreInfos[ii]
                practice.push(temp1.name + '|' + temp1.url)
              }
              self.subject.practice = practice.join(',')
            } else {
              self.popTip(response.data.mes)
            }
          }
        }, (response) => {
          // error callback
        })
      },
      updateSubject () {
        var self = this
        var subjectInfo = {}
        subjectInfo.practice = self.subject.practice
        subjectInfo.moreInfo = self.subject.moreInfo
        subjectInfo.title = self.subject.title
        subjectInfo.desc = self.subject.desc
        subjectInfo.level = self.subject.level
        subjectInfo.learnTime = self.subject.learnTime
        subjectInfo.content = self.subject.content
        subjectInfo.mustKnow = self.subject.mustKnow
        this.$http.post(self.$store.state.basicUrl + '/admin/updateSubject', {subject: subjectInfo}).then((response) => {
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
              window.location.href = '/#/adminIndex'
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
