<template>
  <div id="app">
    <nav>
      <el-menu theme="dark" default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item class="nav-item" index="1"><i class="el-icon-menu"></i><router-link to="/">首页</router-link></el-menu-item>
        <el-menu-item class="nav-item" index="2"><i class="el-icon-document"></i><router-link to="/subjectLearn">课程学习</router-link></el-menu-item>
        <el-menu-item class="nav-item" index="3"><i class="el-icon-information"></i><router-link to="/forum">论坛</router-link></el-menu-item>
        <el-menu-item class="nav-item" index="4"><i class="el-icon-edit"></i><router-link to="/questions">题库练习</router-link></el-menu-item>
        <el-menu-item class="nav-item" index="5"><router-link to="/personalCenter">个人中心</router-link></el-menu-item>
      </el-menu>
      <div class="line"></div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style>
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
</style>
