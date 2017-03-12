<template>
  <div class="wrap">
      <div class="comment-wrap" v-for="comment in comments">
        <div class="portrait">
          <img :src="comment.user.portrait?`${basicUrl}/image?imageId=${comment.user.portrait}`:`${basicUrl}/image?imageId=58c4d44ad68eca1eb831a2b6`" alt="">
        </div>
        <div class="info">
          <h4>{{comment.user.userName}}</h4>
          <p class="content">{{comment.content}}</p>
          <div class="more-detail">
            <span class="time">评论时间：{{formatDate(comment.created)}}</span>
          </div>
        </div>
      </div>
    <div class="page-wrap" v-if="comments">
      <Page pageInfo="comments.length"></Page>
    </div>
  </div>
</template>
<style>
.wrap{
    padding-top: 20px;
    border-top: solid 1px #c0c0c0;
}
  .comment-wrap:after{
    display: block;
    content: '';
    visibility: hidden;
    clear: both;
  }
  .comment-wrap{
    margin-top:10px;
    padding-bottom: 20px;
    border-bottom: solid 1px #EFF1F0;
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
  .info{
    width:85%;
    box-sizing: border-box;
    float:right;
  }
  .info .content{
    text-indent: 2em;
    margin: 10px 0;
    color:#5E6D82;
  }
  .more-detail .time{
    color:#858483;
  }
  .more-detail .like{
    float:right;
  }
</style>
<script>
  import Page from 'components/module/Page.vue'
  export default{
    props: ['comments'],
    data () {
      return {
        basicUrl: this.getUrl()
      }
    },
    methods: {
      getUrl () {
        return this.$store.state.basicUrl
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
    },
    components: {
      Page: Page
    }
  }
</script>
