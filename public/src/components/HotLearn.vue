<template>
  <div class="container">
    <div class="search">
      <el-input class="inline"></el-input>
      <el-button type="primary" icon="search">搜索</el-button>
    </div>
  <h3 class="hot_head">最热学习榜<el-button  type="primary">查看更多</el-button></h3>
      <el-row>
        <el-col :span="5" v-for="info in hotLists">
          <a href="#">
            <el-card :body-style="{ padding: '0px' }">
              <img v-bind:src="info.imgUrl" class="image">
              <div style="padding: 14px;">
                <h3 class="subject_title">{{info.title}}</h3>
                <p class="subject_desc">{{info.desc}}</p>
                <div class="bottom clearfix">
                  <time class="time">{{info.focus}}人关注</time>
                  <i class="el-icon-star-off">关注</i>
                </div>
              </div>
            </el-card>
          </a>
        </el-col>
      </el-row>
  </div>
</template>

<style>
  .container{
    padding: 10px 20px;
  }
  .search{
    width:50%;
    margin:20px auto;
  }
  .search:after{
    display: block;
    content: '';
    visibility: hidden;
    clear: both;
  }
  .inline{
    width:78%;
    float:left;
  }
  .hot_head{
    font-weight: 500;
    color:#000000;
    font-family: "微软雅黑";
    font-size: 26px;
    margin: 0;
  }
  .el-icon-star-off{
    float:right;
    color:#A4C24E;
  }
  .el-col{
    margin:10px;
    min-width: 300px;
  }
  .el-button{
    float: right;
    margin-right: 50px;
  }
  .subject_title{
    font-weight: 500;
    color:#000000;
    font-family: "微软雅黑";
  }
  .subject_desc{
    color:#58606D;
  }
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>

<script>
  export default {
    data () {
      return {
        currentDate: new Date(),
        hotLists: [{
          id: '123',
          imgUrl: 'http://img.mukewang.com/529dc3380001379906000338-240-135.jpg',
          level: '初',
          title: '网络安全',
          desc: '8小时带领大家步步深入学习标签的基础知识，掌握各种样式的基本用法。',
          focus: '2000'
        },
        {
          id: '124',
          imgUrl: 'http://img.mukewang.com/529dc3380001379906000338-240-135.jpg',
          level: '初',
          title: '网络安全',
          desc: '8小时带领大家步步深入学习标签的基础知识，掌握各种样式的基本用法。',
          focus: '2000'
        },
        {
          id: '124',
          imgUrl: 'http://img.mukewang.com/529dc3380001379906000338-240-135.jpg',
          level: '初',
          title: '网络安全',
          desc: '8小时带领大家步步深入学习标签的基础知识，掌握各种样式的基本用法。',
          focus: '2000'
        },
        {
          id: '124',
          imgUrl: 'http://img.mukewang.com/529dc3380001379906000338-240-135.jpg',
          level: '初',
          title: '网络安全',
          desc: '8小时带领大家步步深入学习标签的基础知识，掌握各种样式的基本用法。',
          focus: '2000'
        },
        {
          id: '124',
          imgUrl: 'http://img.mukewang.com/529dc3380001379906000338-240-135.jpg',
          level: '初',
          title: '网络安全',
          desc: '8小时带领大家步步深入学习标签的基础知识，掌握各种样式的基本用法。',
          focus: '2000'
        },
        {
          id: '124',
          imgUrl: 'http://img.mukewang.com/529dc3380001379906000338-240-135.jpg',
          level: '初',
          title: '网络安全',
          desc: '8小时带领大家步步深入学习标签的基础知识，掌握各种样式的基本用法。',
          focus: '2000'
        },
        {
          id: '124',
          imgUrl: 'http://img.mukewang.com/529dc3380001379906000338-240-135.jpg',
          level: '初',
          title: '网络安全',
          desc: '8小时带领大家步步深入学习标签的基础知识，掌握各种样式的基本用法。',
          focus: '2000'
        },
        {
          id: '124',
          imgUrl: 'http://img.mukewang.com/529dc3380001379906000338-240-135.jpg',
          level: '初',
          title: '网络安全',
          desc: '8小时带领大家步步深入学习标签的基础知识，掌握各种样式的基本用法。',
          focus: '2000'
        }]
      }
    }
  }
</script>
