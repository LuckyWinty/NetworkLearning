<template>
  <div class="reply">
    <div class="comment-wrap" v-for="comment in comments">
      <div class="portrait">
        <img v-bind:src="comment.portrait" alt="">
        <h4>{{comment.userName}}</h4>
      </div>
      <div class="info">
        <p class="content">{{comment.content}}</p>
        <div class="more-detail">
          <span class="time">回复时间：{{comment.time}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
 .reply .comment-wrap:after{
    display: block;
    content: '';
    visibility: hidden;
    clear: both;
  }
 .reply .comment-wrap{
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
    data () {
      return {
        comments: [{
          portrait: 'http://img.mukewang.com/585897cd0001603207120172.jpg',
          userName: '我是学生',
          content: 'Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget odio.',
          time: '2016-12-20',
          likeNum: '30'
        }]
      }
    }
  }
</script>
