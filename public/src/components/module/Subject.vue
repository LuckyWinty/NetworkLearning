<template>
    <el-row>
      <el-col class="subject-item" :span="5" v-for="info in hotLists">
        <a href="#">
          <el-card :body-style="{ padding: '0px' }">
            <img v-bind:src="`${basicUrl}/image?imageId=${info.imageId}`" class="image">
            <div style="padding: 14px;">
              <h3 class="subject_title">{{info.title}}</h3>
              <p class="subject_desc">{{info.desc}}</p>
              <div class="bottom clearfix">
                <time class="time">{{info.beFocused.length}}人关注</time>
                <i class="el-icon-star-off">关注</i>
              </div>
            </div>
          </el-card>
        </a>
      </el-col>
    </el-row>
</template>

<style>
  .subject-item{
    margin:10px;
  }
  .el-icon-star-off{
    float:right;
    color:#A4C24E;
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
    props: ['hotLists'],
    data () {
      return {
        currentDate: new Date(),
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
