<template>
  <div class="question">
    <div class="question-wrap" v-for="comment in comments">
      <div class="portrait">
        <img :src="comment.portrait" alt="">
      </div>
      <div class="info">
        <h4 class="user-info">回答来自  <span class="user-name">{{comment.userName}}</span></h4>
        <p class="content">{{comment.content}}</p>
        <div class="more-detail">
          <span class="time">回答时间：{{comment.time}}</span>
          <div class="answer-like">
            <el-tag type="primary">赞({{comment.likeNum}})</el-tag>
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
          likeNum: '123'
        },
        {
          portrait: 'http://img.mukewang.com/585897cd0001603207120172.jpg',
          userName: '我是学生',
          content: 'Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget odio.',
          time: '2016-12-20',
          likeNum: '3'
        }]
      }
    }
  }
</script>
