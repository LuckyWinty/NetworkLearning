<template>
    <div class="forum">
      <div class="search">
        <el-input class="inline"></el-input>
        <el-button class="search-btn" type="primary" icon="search">搜索</el-button>
      </div>
      <el-row :gutter="20">
        <el-col :span="16"><div class="grid-content bg-purple">
          <h3 class="all_head">全部讨论</h3>
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item class="select-item" label="条件筛选：">
              <el-radio-group v-model="form.discuss">
                <el-radio label="全部"></el-radio>
                <el-radio label="推荐"></el-radio>
                <el-radio label="最新"></el-radio>
                <el-radio label="等待回答"></el-radio>
                <el-radio label="只显示我关注的"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <Question>
          </Question>
          <el-form ref="form">
            <el-form-item>
              <el-input type="textarea" v-model="question"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitQuestion">提问</el-button>
            </el-form-item>
          </el-form>
          <Page></Page>
        </div></el-col>
        <el-col :span="6" class="right-notes">
          <div class="grid-content bg-purple">
            <div class="grid-content bg-purple">
              <div class="note">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span style="line-height: 36px;">提问达人</span>
                  </div>
                  <div v-for="o in 4" class="text item">
                    {{'列表内容 ' + o }}
                  </div>
                </el-card>
              </div>
            </div>
          </div>
          <div class="grid-content bg-purple">
            <div class="grid-content bg-purple">
              <div class="note">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span style="line-height: 36px;">回答雷锋榜</span>
                  </div>
                  <div v-for="o in 4" class="text item">
                    {{'列表内容 ' + o }}
                  </div>
                </el-card>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
</template>
<style>
  .forum{
    width:95%;
    margin:0 auto;
  }
  .ask-btn{
    width: 90px;
    margin: 0 auto;
  }
  .right-notes{
    margin-left: 70px;
    margin-top: 100px;
  }
</style>
<script>
  import Question from 'components/module/Question.vue'
  import Page from 'components/module/Page.vue'
  export default{
    data () {
      return {
        form: {
          discuss: '全部'
        },
        question: '',
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4
      }
    },
    methods: {
      getUrl () {
        return this.$store.state.basicUrl
      },
      popTip (title, tips) {
        this.$alert(tips, title, {
        })
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        this.currentPage = val
        console.log(`当前页: ${val}`)
      },
      submitQuestion () {
        var self = this
        var userId = window.sessionStorage.getItem('userId') || ''
        if (userId) {
          var self = this
          if (!self.question) {
            this.popTip('提问失败', '您还没有输入评论内容呢~~')
            return
          }
          this.$http.post(self.getUrl() + '/askQuestion', {userId: userId, content: self.question}).then((response) => {
            if (response.status === 200) {
            if (response.data.status === 1) {
              self.form.comment = ''
              console.log('----------', response.data)
              self.subjectInfo.comments = []
              self.subjectInfo.comments = self.subjectInfo.comments.concat(response.data.comments)
            } else {
              self.popTip(response.data.mes)
            }
          }
        }, (response) => {
            // error callback
          })
        } else {
          this.popTip('提问失败', '您还没有登录呢~~')
        }
    },
    components: {
      Question: Question,
      Page: Page
    }
  }
</script>
