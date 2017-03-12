<template>
 <div>
     <div class="spots">
       <div class="spots-wrap">
         <el-breadcrumb separator="/">
           <el-breadcrumb-item :to="{ path: '/' }">课程学习</el-breadcrumb-item>
           <el-breadcrumb-item>{{subjectInfo.title}}</el-breadcrumb-item>
         </el-breadcrumb>
         <div class="tag-wrap">
           <ul>
             <li>
               <h3>{{subjectInfo.level}}</h3>
               <p>难度</p>
             </li>
             <li>
               <h3>{{subjectInfo.learnTime}}</h3>
               <p>时长</p>
             </li>
             <li>
             <h3>{{subjectInfo.beFocused}}人</h3>
             <p>关注度</p>
             </li>
           </ul>
         </div>
     </div>
   </div>
   <div class="detail">
     <el-row>
       <el-col class="detail-subject" :span="18">
         <div class="grid-content bg-purple">
           <el-tabs :active-name="activeName">
             <el-tab-pane label="课程" name="first">
               <div class="subject-content" v-html="subjectInfo.content"></div>
               <div class="comment">
                 <el-form ref="form" :model="form">
                   <el-form-item>
                     <el-input type="textarea" v-model="form.comment"></el-input>
                   </el-form-item>
                   <el-form-item>
                     <el-button type="primary" @click="doComment(subjectInfo)">评论</el-button>
                   </el-form-item>
                 </el-form>
               </div>
               <div class="commentList">
                 <Comment :comments="subjectInfo.comments"></Comment>
               </div>
             </el-tab-pane>
             <el-tab-pane label="更多资源" name="second">
               <el-card class="box-card">
                 <div slot="header" class="clearfix">
                   <span style="line-height: 36px;color: red;font-weight: bold;">对应的习题链接</span>
                 </div>
                 <div v-for="o in subjectInfo.practices" class="text">
                   <a class="link" :href="o.url">{{o.name}}</a>
                 </div>
               </el-card>
               <el-card class="box-card"  style="margin-top: 36px;">
                 <div slot="header" class="clearfix">
                   <span style="line-height: 36px;color: red;font-weight: bold;">推荐学习资源</span>
                 </div>
                 <div v-for="o in subjectInfo.moreInfos" class="text">
                   <a class="link" :href="o.url">{{o.name}}</a>
                 </div>
               </el-card>
             </el-tab-pane>
             <el-tab-pane label="问答" name="third">
               <el-form ref="form" :model="question">
                 <el-form-item>
                   <el-input type="textarea" v-model="question.ask"></el-input>
                 </el-form-item>
                 <el-form-item>
                   <el-button type="primary" @click="submitQuestion(subjectInfo)">提问</el-button>
                 </el-form-item>
               </el-form>
               <Question :questions="subjectInfo.Questions" :showFocus="1"></Question>
             </el-tab-pane>
           </el-tabs>
         </div>
       </el-col>
       <el-col :span="6">
         <div class="grid-content bg-purple">
           <div class="note">
             <el-card class="box-card">
               <div slot="header" class="clearfix">
                 <span style="line-height: 36px;color: red;font-weight: bold;">课程须知</span>
               </div>
               <p>{{subjectInfo.mustKnow}}</p>
             </el-card>
           </div>
         </div>
       </el-col>
     </el-row>
   </div>
 </div>
</template>
<style>
.spots{
  width:100%;
  height:150px;
  background-image: url("../images/bg12.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.el-breadcrumb{
  padding: 20px 0;
  font-size: 16px !important;
}

.tag-wrap{
  margin-top: 30px;
}
.tag-wrap ul li{
  min-width:80px;
  display: inline-block;

 }
.tag-wrap ul li+li:before{
  border-left: solid 1px #fff;
}
.tag-wrap ul li h3,.tag-wrap ul li p{
  color:#fff;
  text-align: left;
}
.tag-wrap ul li h3{
  font-weight: 500;
}
  .detail,.spots-wrap{
    width:90%;
    margin: 0 auto;
  }
  .el-tabs{
    width:90%;
    margin:20px 0;
  }
 .el-tabs__item{
   padding: 0 50px !important;
 }
  .detail-subject{
    margin: 0 !important;
    padding: 0 !important;
  }
.text {
  font-size: 14px;
}
.el-textarea textarea{
  height:100px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.note{
  width: 80%;
  margin-left:30px;
  margin-top: 50px;
}
  .subject-content{
    padding: 10px 0;
  }
  .link{
    display: block;
    padding: 10px 5px;
    border-radius: 5px;
    background-color: #d3dce6;
    margin:5px 0;
  }
   .link:hover{
   background-color: #ccc;
   }
</style>
<script>
  import Comment from 'components/module/Comment.vue'
  import Question from 'components/module/Question.vue'
  export default {
    data () {
      return {
        activeName: 'first',
        subjectInfo: {},
        form: {
          comment: ''
        },
        question: {
          ask: ''
        }
      }
    },
    created () {
      this.showSubject()
    },
    components: {
      Comment: Comment,
      Question: Question
    },
    methods: {
      getUrl () {
        return this.$store.state.basicUrl
      },
      popTip (title, tips) {
        this.$alert(tips, title, {
        })
      },
      showSubject () {
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
              self.subjectInfo = response.data.Subject
              self.subjectInfo.beFocused = self.subjectInfo.beFocused.length
            } else {
              self.popTip(response.data.mes)
            }
          }
        }, (response) => {
          // error callback
        })
      },
      doComment (info) {
        var userId = window.sessionStorage.getItem('userId') || ''
        if (userId) {
          var self = this
          if (!self.form.comment) {
            this.popTip('评论失败', '您还没有输入评论内容呢~~')
            return
          }
          this.$http.post(self.getUrl() + '/comment', {userId: userId, subjectId: info._id, comment: self.form.comment}).then((response) => {
            if (response.status === 200) {
              if (response.data.status === 1) {
                self.form.comment = ''
                console.log('----------', response.data)
                self.subjectInfo.comments = []
                self.subjectInfo.comments = self.subjectInfo.comments.concat(response.data.comments)
              } else {
                self.popTip(response.data.mes)
              }
            }
          }, (response) => {
            // error callback
          })
        } else {
          this.popTip('评论失败', '您还没有登录呢~~')
        }
      },
      submitQuestion (info) {
        var userId = window.sessionStorage.getItem('userId') || ''
        if (userId) {
          var self = this
          if (!self.question.ask) {
            this.popTip('提问失败', '您还没有输入提问内容呢~~')
            return
          }
          this.$http.post(self.getUrl() + '/ask', {userId: userId, subjectId: info._id, question: self.question.ask}).then((response) => {
            if (response.status === 200) {
              if (response.data.status === 1) {
                self.question.ask = ''
                console.log('----------', response.data)
                self.subjectInfo.Questions = []
                self.subjectInfo.Questions = self.subjectInfo.Questions.concat(response.data.questions)
              } else {
                self.popTip(response.data.mes)
              }
            }
          }, (response) => {
            // error callback
          })
        } else {
          this.popTip('提问失败', '您还没有登录呢~~')
        }
      },
      handleNodeClick (data) {
        console.log(data)
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        this.currentPage = val
        console.log(`当前页: ${val}`)
      }
    }
  }
</script>
