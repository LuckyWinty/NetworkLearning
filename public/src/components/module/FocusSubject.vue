<template>
    <div class="focus-subject">
      <div class="focus-wrap" v-for="subjectInfo in subjectInfos">
        <div class="pic">
          <img :src="`${basicUrl}/image?imageId=${subjectInfo.imageId}`" alt="">
        </div>
        <div class="content">
          <h3>{{subjectInfo.title}}<span class="subject-progress">更新完成</span></h3>
          <p class="learn-progress">{{subjectInfo.desc}}</p>
          <p class="detail-info"><span>等级:<i>{{subjectInfo.level}}</i></span><span>评论:<i>{{subjectInfo.comments.length}}</i></span></p>
        </div>
        <div class="learn-btn">
          <a :href="`/#/subjectSpots?subjectId=${subjectInfo._id}`">
          <el-button type="info" class="continue-btn">继续学习</el-button>
          </a>
        </div>
      </div>

    </div>
</template>
<style>
  .focus-wrap:after{
    display: block;
    content:' ';
    visibility: hidden;
    clear: both;
  }
  .focus-wrap{
    height:120px;
    border-bottom:solid 1px #EFF1F0;
    padding-bottom: 10px;
    margin-top: 20px;
  }
 .pic{
    width:35%;
    box-sizing: border-box;
    float:left;
  }
  .pic img{
    width:85%;
    height:75%;
    max-width: 225px;
    max-height: 125px;
  }
  .content{
    width:50%;
    float:left;
    box-sizing: border-box;
  }
  .content p{
    font-size: 14px;
  }
  .content .subject-progress{
    margin-left: 10px;
    font-size: 16px;
    font-weight: 500;
    color:#ccc;
  }
  .content .learn-progress{
    margin:13px 0;
  }
  .content .detail-info{
    margin-top: 12px;
   }
  .content .detail-info span{
    margin-right: 30px;
  }
  .content .detail-info span i{
    color:#ccc;
    margin-left: 5px;
    font-style: normal;
  }
  .content .detail-progress{
    display: inline-block;
    width:80%;
  }
  .learn-btn{
    width:15%;
    float:left;
    box-sizing: border-box;
  }
  .learn-btn .continue-btn{
    display: block;
    margin:0 auto;
    margin-top: 42px;
  }
</style>
<script>
    export default{
      props: ['subjectInfos'],
      data () {
        return {
          basicUrl: this.getUrl()
        }
      },
      methods: {
        getUrl () {
          return this.$store.state.basicUrl
        }
      }
    }
</script>
