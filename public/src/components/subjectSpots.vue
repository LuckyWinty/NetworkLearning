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
          <p class="margin-top-10px">简介：{{subjectInfo.desc}}</p>
           <el-tabs :active-name="activeName">
             <el-tab-pane label="课程" name="first">
               <div class="subject-content" v-html="subjectInfo.content"></div>
               <div class="comment">
                 <el-form ref="form" :model="form">
                   <el-form-item>
                     <el-input type="textarea" v-model="form.comment"></el-input>
                   </el-form-item>
                   <el-form-item>
                     <el-button type="primary" @click="onSubmit">评论</el-button>
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
                   <span style="line-height: 36px;">对应的习题链接</span>
                 </div>
                 <div v-for="o in 4" class="text item">
                   {{'列表内容 ' + o }}
                 </div>
               </el-card>
               <el-card class="box-card"  style="margin-top: 36px;">
                 <div slot="header" class="clearfix">
                   <span style="line-height: 36px;">推荐学习资源</span>
                 </div>
                 <div v-for="o in 4" class="text item">
                   {{'列表内容 ' + o }}
                 </div>
               </el-card>
             </el-tab-pane>
             <el-tab-pane label="问答" name="third">
               <Comment></Comment>
               <Reply></Reply>
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
    width:80%;
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

.item {
  padding: 18px 0;
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
</style>
<script>
  import Comment from 'components/module/Comment.vue'
  import Reply from 'components/module/Reply.vue'
  import Page from 'components/module/Page.vue'
  export default {
    data () {
      return {
        activeName: 'first',
        subjectInfo: {},
        form: {
          comment: ''
        },
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4
      }
    },
    created () {
      this.showSubject()
    },
    components: {
      Comment: Comment,
      Reply: Reply,
      Page: Page
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
        console.log('------------------', params, subjectId)
        this.$http.post(self.getUrl() + '/subjectSpots', {subjectId: subjectId}).then((response) => {
          if (response.status === 200) {
            if (response.data.status === 1) {
              console.log('----------课程', response.data.Subject)
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
      onSubmit () {
        console.log('submit!')
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
