<template>
  <div class="question">
    <div class="question-wrap" v-for="question in questions">
      <div class="question-detail-wrap">
      <div class="portrait">
        <img :src="question.user.portrait?`${basicUrl}/image?imageId=${question.user.portrait}`:`${basicUrl}/image?imageId=58c4d44ad68eca1eb831a2b6`" alt="">
      </div>
      <div class="info">
        <h4 class="user-info">提问来自  <span class="user-name">{{question.user.userName}}</span>
          <span class="wrapper" v-if="showFocus != 1">
            <el-button type="info" class="float-right">关注</el-button>
          </span>
        </h4>
        <p class="content">{{question.content}}</p>
        <div class="more-detail">
          <span class="time">提问时间：{{formatDate(question.created)}}</span>
          <!--<div class="question-rate">-->
            <!--<span>评分：</span>-->
            <!--<el-rate class="rate-lever"-->
              <!--v-model="question.grade"-->
              <!--disabled-->
              <!--change ="submitValue"-->
              <!--text-color="#ff9900">-->
            <!--</el-rate>-->
          <!--</div>-->
        </div>
      </div>
      </div>
      <div class="answer-wrap">
        <Answer :answers="question.answers"></Answer>
      </div>
      <div class="answer-btn"><el-button @click="open3(question)" type="success">我要回答</el-button></div>
    </div>
    <Page :pageSize="5"></Page>
  </div>
</template>
<style>
  .question-wrap:after,.question-detail-wrap:after,.more-detail:after{
    display: block;
    content: '';
    visibility: hidden;
    clear: both;
  }
  .question-wrap{
    padding-top:10px;
    padding-bottom: 20px;
    border-bottom: solid 1px #c0c0c0;
  }
  .portrait{
    width:15%;
    box-sizing: border-box;
    float:left;
  }
  .portrait img{
    display: block;
    width:70px;
    height:70px;
    margin:0 auto;
    border-radius: 50%;
  }
  .user-info{
    color:#4E4E4E;
  }
  .user-name{
    color:#000000;
  }
  .info{
    width:85%;
    box-sizing: border-box;
    float:right;
  }
  .info .content{
    width:100%;
    text-indent: 2em;
    margin: 10px 0;
    color:#5E6D82;
  }
  .more-detail .time{
    color:#858483;
  }
  .question-rate {
    width: 180px;
    float: right;
  }
  .rate-lever{
    width:130px;
    float:right;
  }
  .answer-wrap{
    margin-left: 15%;
    margin-top: 20px;
  }
</style>
<script>
  import Answer from 'components/module/Answer.vue'
  import Page from 'components/module/Page.vue'
  export default{
    props: ['questions', 'showFocus'],
    data () {
      return {
        basicUrl: this.getUrl()
      }
    },
    components: {
      Answer: Answer,
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
      formatDate (date) {
        var times = new Date(date)
        var Y = times.getFullYear()
        var M = times.getMonth() > 8 ? times.getMonth() + 1 : '0' + (times.getMonth() + 1)
        var D = times.getDate() > 9 ? times.getDate() : '0' + times.getDate()

        var H = times.getHours()
        var m = times.getMinutes()
        var S = times.getSeconds()

        return Y + '-' + M + '-' + D + '  ' + H + ' : ' + m + ' : ' + S
      },
      open3 (question) {
        var userId = window.sessionStorage.getItem('userId') || ''
        if (userId) {
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
          this.$prompt('请输入回复内容', '回复', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(({ value }) => {
            if (!value) {
              self.popTip('失败', '您还没有输入回复内容呢~~')
              return
            }
            self.$http.post(self.getUrl() + '/reply', {userId: userId, subjectId: subjectId, questionId: question._id, reply: value}).then((response) => {
              if (response.status === 200) {
                if (response.data.status === 1) {
                  console.log('----------', response.data)
                  self.questions = response.data.questions
                } else {
                  self.popTip(response.data.mes)
                }
              }
            }, (response) => {
              // error callback
            })
          }).catch(() => {
          })
        } else {
          this.popTip('失败', '您还没有登录呢~~')
        }
      },
      submitValue (question) {
        this.popTip('失败', '有登录呢~~')
      }
    }
  }
</script>
