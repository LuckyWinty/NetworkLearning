<template>
  <div id="app">
    <nav>
      <el-menu theme="dark" default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item class="nav-item" index="1"><router-link to="/"><i class="el-icon-menu"></i>首页</router-link></el-menu-item>
        <el-menu-item class="nav-item" index="2"><router-link to="/subjectLearn"><i class="el-icon-document"></i>课程学习</router-link></el-menu-item>
        <el-menu-item class="nav-item" index="3"><router-link to="/forum"><i class="el-icon-information"></i>论坛</router-link></el-menu-item>
        <el-menu-item class="nav-item" index="4"><router-link to="/questions"><i class="el-icon-edit"></i>题库练习</router-link></el-menu-item>
        <el-menu-item class="nav-item float-right" index="6" v-show="isLogin">注销</el-menu-item>
        <el-menu-item class="nav-item float-right" index="5"  v-show="isLogin"><router-link to="/personalCenter">欢迎您，{{person.userName}}</router-link></el-menu-item>
        <el-menu-item class="nav-item float-right" index="7" v-show="!isLogin">登录</el-menu-item>
        <el-menu-item class="nav-item" index="8" v-if="isAdmin"><router-link to="/adminIndex">进入管理系统</router-link></el-menu-item>
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
    created () {
      this.checkLogin()
    },
    methods: {
      getUrl () {
        return this.$store.state.basicUrl
      },
      popTip (title, tips) {
        this.$alert(tips, title, {
        })
      },
      handleSelect (key, keyPath) {
        if (key) {
          this.curIndex = key
        }
        console.log(Number(this.curIndex))
        if (Number(this.curIndex) === 7) {
          this.showLoginFlag = !this.showLoginFlag
        }
        if (Number(this.curIndex) === 6) {
          this.isLogin = false
          window.sessionStorage.removeItem('userId')
          this.showLoginFlag = false
          window.location.reload()
        }
      },
      getLoginInfo (info) {
        this.isLogin = true
        this.person = info
        this.showLoginFlag = false
        if (this.person.power === 0) {
          this.isAdmin = true
        }
      },
      checkLogin () {
        var self = this
        var userId = window.sessionStorage.getItem('userId') || ''
        this.$http.post(self.getUrl() + '/checkLogin', {userId: userId}).then((response) => {
          if (response.status === 200) {
            if (response.data.status === 1) {
              console.log(response.data.person)
              self.getLoginInfo(response.data.person)
            }
          }
        }, (response) => {
          // error callback
        })
      }
    },
    components: {
      'login': login
    }
}
</script>

<style>
  #app .container{
    width:1300px;
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
  float:right !important;
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
  #app .is-active a, #app .is-active i{
    color:#20a0ff;
  }
</style>
