<template>
  <div class="login-wrap">
    <div class="mask"></div>
    <div class="login">
      <div class="close">
        <i class="el-icon-close close-icon" @click="doClose"></i>
      </div>
      <h5 class="title">还没有账号？去<a href="#">注册</a></h5>
      <el-form :model="userInfo" label-width="80px" id="personInfo" enctype="multipart/form-data">
        <el-form-item label="用户名">
          <el-input name="userName" v-model="userInfo.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input name="password" v-model="userInfo.password"></el-input>
        </el-form-item>
        <el-button type="primary" @click="doLogin">登录</el-button>
      </el-form>
    </div>
  </div>
</template>
<style>
.login-wrap{
 position:fixed;
 top:0;
 bottom:0;
 left:0;
 right:0;
 text-align:center;
 z-index:998;
}
  .login{
     position:absolute;
     top:25%;
     left:25%;
     width:50%;
     height:50%;
     background-color:#fff;
     z-index:999;
  }
  .login .title{
    font-weight:500;
    margin:10px 10px 30px 20px;
    text-align:left;
  }
  .close{
  width:100%;
  height:50px;
  background-color:#ccc;
  }
  .close .close-icon{
  color:#fff;
  display:block;
  float:right;
  margin-top:10px;
  margin-right:10px;
  }
  #personInfo{
   width:80%;
   height:100%;
   margin:0 auto;
  }
</style>
<script>
  export default {
    data () {
      return {
        userInfo: {
          userName: '',
          password: ''
        }
      }
    },
    methods: {
      getUrl () {
        return this.$store.state.basicUrl
      },
      doLogin () {
        console.log('---------------ok?', this.getUrl())
        var self = this
        var formData = new window.FormData(document.getElementById('personInfo'))

        this.$http.post(self.getUrl() + '/', formData).then((response) => {
          console.log(response)
          if (response.status === 200) {
            if (response.data.status === 1) {
              console.log(response.data)
              self.deliverInfo(response.data.person)
            } else {
              self.popTip(response.data.mes)
            }
            self.userInfo = {
              userName: '',
              password: ''
            }
          }
        }, (response) => {
          // error callback
        })
      },
      popTip (title, tips) {
        this.$alert(tips, title, {
        })
      },
      doClose () {
        this.$emit('doClose')
      },
      deliverInfo (person) {
        this.$emit('login', person)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
