<template>
    <div class="focus-subject">
      <div class="focus-wrap" v-for="subjectInfo in subjectInfos">
        <div class="pic">
          <img v-bind:src="subjectInfo.imgUrl" alt="">
        </div>
        <div class="content">
          <h3>subjectInfo.title</h3>
        </div>
        <div class="learn-btn">
          <el-button type="info">继续学习</el-button>
        </div>
      </div>

    </div>
</template>
<style>

</style>
<script>
    export default{
      data () {
        return{
          subjectInfos: [{
            id: '123',
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
