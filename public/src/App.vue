<template>
  <div id="app">
    <nav>
      <el-menu theme="dark" default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item class="nav-item" index="1"><i class="el-icon-menu"></i><router-link to="/">首页</router-link></el-menu-item>
        <el-menu-item class="nav-item" index="2"><i class="el-icon-document"></i><router-link to="/subjectLearn">课程学习</router-link></el-menu-item>
        <el-menu-item class="nav-item" index="3"><i class="el-icon-information"></i><router-link to="/forum">论坛</router-link></el-menu-item>
        <el-menu-item class="nav-item" index="4"><i class="el-icon-edit"></i><router-link to="/questions">题库练习</router-link></el-menu-item>
        <el-menu-item class="nav-item" index="5"  v-show="isLogin"><router-link to="/personalCenter">{{person.userName}}|<a>注销</a></router-link></el-menu-item>
        <el-menu-item class="nav-item" index="6" v-show="!isLogin">登录</el-menu-item>
        <el-menu-item class="nav-item" index="7" v-show="!isAdmin"><router-link to="/adminIndex">进入管理系统</router-link></el-menu-item>
      </el-menu>
      <div class="line"></div>
    </nav>
    <login v-show="showLoginFlag" v-on:doClose="handleSelect" v-on:login="getLoginInfo"></login>
    <router-view></router-view>
  </div>
</template>

<script>
  import login from 'components/module/login.vue'
export default {
    data () {
      return {
        curIndex: 1,
        showLoginFlag: false,
        isLogin: false,
        isAdmin: false,
        person: {
          userName: ''
        }
      }
    },
    methods: {
      handleSelect (key, keyPath) {
        if (key) {
          this.curIndex = key
        }
        console.log(Number(this.curIndex))
        if (Number(this.curIndex) === 6) {
          this.showLoginFlag = !this.showLoginFlag
        }
      },
      getLoginInfo (info) {
        this.isLogin = true
        this.person = info
        this.showLoginFlag = false
        if (this.person.power === 0) {
          this.isAdmin = true
        }
        console.log('--------------', info)
      }
    },
    components: {
      'login': login
    }
}
</script>

<style>
  #app .container{
    width:1450px;
    margin:0 auto;
  }
  .el-menu{
    border-radius:0 !important;
  }
  .el-menu-item a{
    color:#fff;
  }
 .nav-item:last-child{
   float:right !important;
 }
 .float-right{
  display:block;
  float:right;
 }
 .mask{
 position:absolute;
 top:0;
 bottom:0;
 left:0;
 right:0;
 background-color:#000;
 opacity:0.5;
 z-index:1;
 }
</style>
