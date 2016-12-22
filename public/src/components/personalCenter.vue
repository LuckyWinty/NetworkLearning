<template>
    <div class="personalCenter">
        <div class="personalInfo">
          <div class="personalInfo-wrap">
            <div class="portrait"><img v-bind:src="person.portrait" alt=""></div>
            <div class="more-info">
              <h2>{{person.name}}</h2>
              <p>个性签名:{{person.signature}}</p>
            </div>
          </div>
        </div>
        <div class="person-detail">
          <el-row :gutter="20">
            <el-col :span="6"><div class="grid-content bg-purple">
              <el-menu default-active="2" class="el-menu-vertical-demo">
                <el-menu-item index="1"><i class="el-icon-message"></i>课程</el-menu-item>
                <el-menu-item index="2"><i class="el-icon-menu"></i>我的提问</el-menu-item>
                <el-menu-item index="3"><i class="el-icon-setting"></i>我的回答</el-menu-item>
                <el-menu-item index="3"><i class="el-icon-setting"></i>我关注的问题</el-menu-item>
                <el-menu-item index="3"><i class="el-icon-setting"></i>我的设置</el-menu-item>
              </el-menu>
            </div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple">

            </div></el-col>
          </el-row>
        </div>
    </div>
</template>
<style>
.personalInfo{
  width:100%;
  height:100px;
  background-image: url("../images/personBg.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.personalInfo-wrap:after{
  display: block;
  content: '';
  visibility: hidden;
  clear: both;
}
.personalInfo-wrap,.person-detail{
  width:80%;
  margin:0 auto;
}
  .personalInfo .portrait img{
    width:100px;
    height:100px;
    margin-top: 20px;
  }
  .more-info{
    width:85%;
    box-sizing: border-box;
    margin-top: 20px;
    float:left;
  }
.more-info h2{
  font-weight: 500;
  margin-bottom: 10px;
}
.more-info h2,.more-info p{
   color:#fff;
}
  .person-detail{
    margin-top: 50px;
  }
</style>
<script>
    export default{
      data () {
        return {
          person: {
            name: '学生乙',
            portrait: 'https://gss0.baidu.com/8_BXsjip0QIZ8tyhnq/timg?wh_rate=0&wapiknow&quality=100&size=w250&sec=0&di=755e2d919a2414a6a2de820f555d44ae&src=http%3A%2F%2Fiknow02.bosstatic.bdimg.com%2Fzhidaoribao%2F2016%2F1221%2Fdz.jpg',
            signature: '技术改变未来',
            subject: ''
          }
        }
      }
    }
</script>
