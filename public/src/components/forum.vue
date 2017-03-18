<template>
    <div class="forum">
      <div class="search">
        <el-input class="inline"></el-input>
        <el-button class="search-btn" type="primary" icon="search">搜索</el-button>
      </div>
      <el-row :gutter="20">
        <el-col :span="16"><div class="grid-content bg-purple">
          <h3 class="all_head">全部讨论</h3>
          <el-form ref="form" label-width="80px">
            <el-form-item class="select-item" label="条件筛选：">
              <el-radio-group v-model="condition" @change="showQuestion(condition)">
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
        condition: '全部',
        question: '',
        showQuestion: [],
        allQuestion: [],
        recommendQuestion: [],
        newQuestion: [],
        waitQuestion: [],
        focusQuestion: []
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
      showQuestion (value) {
        var self = this
        switch (value) {
          case '全部' :
            var all = JSON.parse(window.sessionStorage.getItem('allQuestion')) || ''
            console.log('----------------', all)
            if (all.length > 0) {
              self.allQuestion = []
              self.allQuestion = self.allQuestion.concat(all)
              self.showQuestion = []
              self.showQuestion = self.showQuestion.concat(self.allQuestion.slice(0, 20))
              return
            }
            var userId = window.sessionStorage.getItem('userId') || ''
            this.$http.post(self.getUrl() + '/index', {userId: userId}).then((response) => {
              if (response.status === 200) {
                if (response.data.status === 1) {
                  self.allQuestion = self.allQuestion.concat(response.data.Subjects)
                  window.sessionStorage.setItem('allQuestion', JSON.stringify(self.allQuestion))
                  self.showQuestion = self.showQuestion.concat(response.data.Subjects.slice(0, 20))
                } else {
                  self.popTip(response.data.mes)
                }
              }
            }, (response) => {
              // error callback
            })
            break
          case '初级' :
            var temp = []
            var loop = 0
            while (loop < self.allQuestion.length) {
              var sub = self.allQuestion[loop++]
              if (sub.level === '初级') {
                temp.push(sub)
              }
            }
            self.showQuestion = []
            self.showQuestion = self.showQuestion.concat(temp)
            break
          case '中级' :
            var temp1 = []
            var loop1 = 0
            while (loop1 < self.allQuestion.length) {
              var sub1 = self.allQuestion[loop1++]
              if (sub1.level === '中级') {
                temp1.push(sub1)
              }
            }
            self.showQuestion = []
            self.showQuestion = self.showQuestion.concat(temp1)
            break
          case '高级' :
            var temp2 = []
            var loop2 = 0
            while (loop2 < self.allQuestion.length) {
              var sub2 = self.allQuestion[loop2++]
              if (sub2.level === '高级') {
                temp2.push(sub2)
              }
            }
            self.showQuestion = []
            self.showQuestion = self.showQuestion.concat(temp2)
            break
          case '最新' :
            self.showQuestion = self.showQuestion.sort(function (a, b) {
              return new Date(b.created) - new Date(a.created)
            })
            break
          case '最热' :
            self.showQuestion = self.showQuestion.sort(function (a, b) {
              return b.beFocused.length - a.beFocused.length
            })
            break
          default :
        }
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
          if (!self.question) {
            this.popTip('提问失败', '您还没有输入评论内容呢~~')
            return
          }
          this.$http.post(self.getUrl() + '/askQuestion', {userId: userId, content: self.question}).then((response) => {
            if (response.status === 200) {
              if (response.data.status === 1) {
                self.question = ''
                console.log('----------', response.data)
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
      }
    },
    components: {
      Question: Question,
      Page: Page
    }
  }
</script>
