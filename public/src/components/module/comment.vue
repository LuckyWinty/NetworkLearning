<template>
  <div class="wrap">
    <div class="comment">
      <div class="comment-wrap" v-for="comment in comments">
        <div class="portrait">
          <img :src="comment.portrait" alt="">
        </div>
        <div class="info">
          <h4>{{comment.userName}}</h4>
          <p class="content">{{comment.content}}</p>
          <div class="more-detail">
            <span class="time">评论时间：{{comment.time}}</span>
            <span class="el-icon-star-on like">{{comment.likeNum}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="page-wrap" v-if="comments">
      <Page></Page>
    </div>
  </div>
</template>
<style>
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
      }
    },
    components: {
      Page: Page
    }
  }
</script>
