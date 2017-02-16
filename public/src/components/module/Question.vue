<template>
  <div class="question">
    <div class="comment-wrap" v-for="comment in comments">
      <div class="question-detail-wrap">
      <div class="portrait">
        <img v-bind:src="comment.portrait" alt="">
      </div>
      <div class="info">
        <h4 class="user-info">提问来自  <span class="user-name">{{comment.userName}}</span>
          <span class="wrapper">
            <el-button type="info" class="float-right">关注</el-button>
          </span>
        </h4>
        <p class="content">{{comment.content}}</p>
        <div class="more-detail">
          <span class="time">提问时间：{{comment.time}}</span>
          <div class="question-rate">
            <span>评分：</span>
            <el-rate class="rate-lever"
              v-model="comment.rate"
              :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
            </el-rate>
          </div>
        </div>
      </div>
      </div>
      <div class="answer-wrap">
        <Answer></Answer>
      </div>
      <div class="answer-btn"><el-button @click="open3" type="success">我要回答</el-button></div>
    </div>
  </div>
</template>
<style>
  .comment-wrap:after,.question-detail-wrap:after,.more-detail:after{
    display: block;
    content: '';
    visibility: hidden;
    clear: both;
  }
  .comment-wrap{
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
  export default{
    data () {
      return {
        comments: [{
          portrait: 'http://img.mukewang.com/585897cd0001603207120172.jpg',
          userName: '我是学生',
          content: 'Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget odio.',
          time: '2016-12-20',
          rate: null
        },
        {
          portrait: 'http://img.mukewang.com/585897cd0001603207120172.jpg',
          userName: '我是学生',
          content: 'Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget odio.',
          time: '2016-12-20',
          rate: '3'
        }]
      }
    },
    components: {
      Answer: Answer
    },
    methods: {
      open3 () {
        this.$prompt('请输入邮箱', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          inputErrorMessage: '邮箱格式不正确'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '你的邮箱是: ' + value
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
      }
    }
  }
</script>
