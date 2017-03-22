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
              <el-radio-group v-model="condition" @change="showQuestions(condition)">
                <el-radio label="全部"></el-radio>
                <el-radio label="推荐"></el-radio>
                <el-radio label="最新"></el-radio>
                <el-radio label="等待回答"></el-radio>
                <el-radio label="只显示我关注的"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <el-form ref="form">
            <el-form-item>
              <el-input type="textarea" v-model="question"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitQuestion">提问</el-button>
            </el-form-item>
          </el-form>
          <Question :questions="showQuestion" :showFocus="0">
          </Question>
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
                  <div v-for="o in askPersons" class="text item">
                    {{o.userName}}
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
                  <div v-for="o in answerPersons" class="text item">
                    {{o.userName}}
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
        focusQuestion: [],
        askPersons: [],
        answerPersons: []
      }
    },
    created () {
      this.showQuestions('全部')
      this.getPerson()
    },
    methods: {
      getUrl () {
        return this.$store.state.basicUrl
      },
      popTip (title, tips) {
        this.$alert(tips, title, {
        })
      },
      showQuestions (value) {
        var self = this
        switch (value) {
          case '全部' :
            var userId = window.sessionStorage.getItem('userId') || ''
            this.$http.post(self.getUrl() + '/showQuestions', {userId: userId}).then((response) => {
              if (response.status === 200) {
                if (response.data.status === 1) {
                  self.allQuestion = []
                  self.allQuestion = self.allQuestion.concat(response.data.Questions)
                  console.log('------', self.allQuestion)
                  self.showQuestion = self.allQuestion.slice(0, 20)
                } else {
                  self.popTip(response.data.mes)
                }
              }
            }, (response) => {
              // error callback
            })
            break
          case '推荐' :
            self.showQuestion = self.allQuestion.sort(function (a, b) {
              return b.beFocused.length - a.beFocused.length
            })
            break
          case '最新' :
            self.showQuestion = self.allQuestion.sort(function (a, b) {
              return new Date(b.created) - new Date(a.created)
            }).slice(0, 20)
            break
          case '等待回答' :
            var temp = []
            var loop = 0
            while (loop < self.allQuestion.length) {
              var sub = self.allQuestion[loop++]
              if (sub.answers.length === 0) {
                temp.push(sub)
              }
            }
            self.showQuestion = []
            self.showQuestion = self.showQuestion.concat(temp)
            break
          case '只显示我关注的' :
            var Id = window.sessionStorage.getItem('userId') || ''
            if (Id) {
              var temp1 = []
              var loop1 = 0
              while (loop1 < self.allQuestion.length) {
                var sub1 = self.allQuestion[loop1++]
                for (var i = 0; i < sub1.beFocused.length; i++) {
                  if (sub1.beFocused[i].toString() === Id.toString()) {
                    temp1.push(sub1)
                  }
                }
              }
              self.showQuestion = []
              self.showQuestion = self.showQuestion.concat(temp1)
            } else {
              this.popTip('无问题', '主人，你藏得太深了，还没有登录呢~~')
              return
            }
            break
          default :
        }
      },
      getPerson () {
        var self = this
        this.$http.post(self.getUrl() + '/getPerson').then((response) => {
          if (response.status === 200) {
            if (response.data.status === 1) {
              self.askPersons = []
              self.askPersons = self.askPersons.concat(response.data.askPersons)
              self.answerPersons = self.answerPersons.concat(response.data.answerPersons)
            } else {
              self.popTip(response.data.mes)
            }
          }
        }, (response) => {
          // error callback
        })
      },
      submitQuestion () {
        var self = this
        var userId = window.sessionStorage.getItem('userId') || ''
        if (userId) {
          if (!self.question) {
            this.popTip('提问失败', '您还没有输入内容呢~~')
            return
          }
          this.$http.post(self.getUrl() + '/askQuestion', {userId: userId, content: self.question}).then((response) => {
            if (response.status === 200) {
              if (response.data.status === 1) {
                self.question = ''
                self.allQuestion = response.data.question.concat(self.allQuestion)
                self.showQuestion = response.data.question.concat(self.showQuestion)
                self.showQuestions(self.condition)
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
