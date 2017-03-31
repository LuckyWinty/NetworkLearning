<template>
  <div class="regist-wrap">
    <div class="regist">
      <h5 class="title">注册</h5>
      <el-form :model="userInfo" label-width="80px" id="personInfo2" enctype="multipart/form-data">
        <el-form-item label="用户名">
          <el-input name="userName" v-model="userInfo.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input name="password" v-model="userInfo.password"></el-input>
        </el-form-item>
        <el-button class="regist-btn" type="primary" @click="doRegist">注册</el-button>
      </el-form>
    </div>
  </div>
</template>
<style>
  .regist{
    width:70%;
    margin:0 auto;
  }
  .regist-wrap .title{
    font-size: 26px;
    font-weight:500;
    text-align:center;
    margin: 30px 0;
  }
  .regist-wrap .regist-btn{
    width:80px;
    display: block;
    margin:0 auto;
    margin-top: 20px;
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
      doRegist () {
        var self = this
        var formData = new window.FormData(document.getElementById('personInfo2'))
        this.$http.post(self.$store.state.basicUrl + '/admin/add', formData).then((response) => {
          if (response.status === 200) {
            if (response.data.status === 1) {
              console.log('--------------成功')
              self.popTip('注册成功！', '点击右上角登陆吧！')
              self.userInfo.userName = ''
              self.userInfo.password = ''
            } else {
              self.popTip(response.data.mes)
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
