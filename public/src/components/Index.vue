<template>
  <div class="container">
    <div class="search">
      <el-input class="inline"></el-input>
      <el-button type="primary" icon="search">搜索</el-button>
    </div>
  <h3 class="hot_head">最热学习榜<el-button  type="primary">查看更多</el-button></h3>
    <Subject></Subject>
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
  .el-button{
    float:right;
    margin-right: 20px;
  }
  .hot_head{
    font-weight: 500;
    color:#000000;
    font-family: "微软雅黑";
    font-size: 26px;
    margin: 0;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
  .margin-top-10px{
    margin-top: 10px;
  }
</style>

<script>
  import Subject from 'components/module/Subject.vue'

  export default {
    data () {
      return {
        currentDate: new Date()
      }
    },
    components: {
      'Subject': Subject
    }
  }
</script>
