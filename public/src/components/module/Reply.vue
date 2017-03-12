<template>
  <div class="reply">
    <div class="reply-wrap" v-for="answer in answers">
      <div class="portrait">
        <img :src="answer.user.portrait?`${basicUrl}/image?imageId=${answer.user.portrait}`:`${basicUrl}/image?imageId=58c4d44ad68eca1eb831a2b6`" alt="">
        <h4>{{answer.user.userName}}</h4>
      </div>
      <div class="info">
        <p class="content">{{answer.content}}</p>
        <div class="more-detail">
          <span class="time">回复时间：{{formatDate(question.created)}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
 .reply .reply-wrap:after{
    display: block;
    content: '';
    visibility: hidden;
    clear: both;
  }
 .reply .reply-wrap{
    margin-top:10px;
    padding-bottom: 20px;
    border-bottom: solid 1px #EFF1F0;
  }
 .reply .portrait{
    width:15%;
    box-sizing: border-box;
    float:left;
  }
 .reply .portrait img{
    width:70px;
    height:70px;
    margin:0 auto;
    border-radius: 50%;
  }
 .reply .info{
    width:85%;
    box-sizing: border-box;
    float:right;
  }
 .reply .info .content{
    text-indent: 2em;
    margin: 10px 0;
    color:#5E6D82;
  }
 .reply .more-detail .time{
    color:#858483;
  }
 .reply .more-detail .like{
    float:right;
  }
</style>
<script>
  export default{
    props: ['answers'],
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
      }
    }
  }
</script>
