<template>
  <div class="question">
    <div class="question-wrap" v-for="answer in answers">
      <div class="portrait">
         <img :src="answer.user.portrait?`${basicUrl}/image?imageId=${answer.user.portrait}`:`${basicUrl}/image?imageId=58c4d44ad68eca1eb831a2b6`" alt="">
      </div>
      <div class="info">
        <h4 class="user-info">回答来自  <span class="user-name">{{answer.user.userName}}</span></h4>
        <p class="content">{{answer.content}}</p>
        <div class="more-detail">
          <span class="time">回答时间：{{formatDate(answer.created)}}</span>
          <div class="answer-like" @click="doLike(answer._id, questionId, $event)">
            <el-tag type="primary">赞({{answer.likeNum}})</el-tag>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
 .question .question-wrap:after{
    display: block;
    content: '';
    visibility: hidden;
    clear: both;
  }
 .question .question-wrap{
    padding-top:10px;
    padding-bottom: 20px;
    border-top: solid 1px #EFF1F0;
    border-bottom: none;
  }
 .question .portrait{
    width:15%;
    box-sizing: border-box;
    float:left;
  }
 .question .portrait img{
    display: block;
    width:70px;
    height:70px;
    margin:0 auto;
    border-radius: 50%;
  }
 .question .user-info{
    color:#4E4E4E;
  }
 .question .user-name{
    color:#000000;
  }
 .question .info{
    width:85%;
    box-sizing: border-box;
    float:right;
  }
 .question .info .content{
    text-indent: 2em;
    margin: 10px 0;
    color:#5E6D82;
  }
 .question .more-detail .time{
    color:#858483;
  }
 .question .answer-like {
    width: 100px;
    float: right;
   cursor: pointer;
  }
</style>
<script>
  export default{
    props: ['answers', 'questionId'],
    data () {
      return {
        basicUrl: this.getUrl()
      }
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
      doLike (answerId, questionId, el) {
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
          self.$http.post(self.getUrl() + '/doLike', {userId: userId, subjectId: subjectId, questionId: questionId, answerId: answerId}).then((response) => {
            if (response.status === 200) {
              if (response.data.status === 1) {
                console.log(response.data)
                el.target.parentElement.innerHTML = '<span class="el-tag el-tag--primary">赞(' + response.data.likeNum + ')</span>'
              }
            }
          }, (response) => {
            // error callback
          })
        } else {
          this.popTip('失败', '您还没有登录呢~~')
        }
      }
    }
  }
</script>
