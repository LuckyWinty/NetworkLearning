<template>
    <div class="detail-content">
      <div class="title-wrap">问题详细</div>
      <Question :questions="singleQuestion" :showFocus="1">
      </Question>
    </div>
</template>
<style>
  .detail-content{
    width:80%;
    margin: 0 auto;
  }
  .detail-content .title-wrap{
    text-align: center;
    font-size: 24px;
    font-weight: 500;
    margin:25px 0;
  }
</style>
<script>
  import Question from 'components/module/Question.vue'
  export default {
    data () {
      return {
        singleQuestion: []
      }
    },
    components: {
      Question: Question
    },
    created () {
      this.showSingleQuestion()
    },
    methods: {
      getUrl () {
        return this.$store.state.basicUrl
      },
      popTip (title, tips) {
        this.$alert(tips, title, {
        })
      },
      showSingleQuestion () {
        var self = this
        var params = {}
        var name, value
        var str = window.location.href
        var num = str.indexOf('?')
        str = str.substr(num + 1)
        var arr = str.split('&')
        for (var i = 0; i < arr.length; i++) {
          num = arr[i].indexOf('=')
          if (num > 0) {
            name = arr[i].substring(0, num)
            value = arr[i].substr(num + 1)
            params[name] = value
          }
        }
        var questionId = params.questionId || ''
        this.$http.post(self.getUrl() + '/showSingleQuestion', {questionId: questionId}).then((response) => {
          if (response.status === 200) {
            if (response.data.status === 1) {
              console.log('----------', response.data)
              self.singleQuestion = []
              self.singleQuestion = self.singleQuestion.concat(response.data.Question)
            } else {
              self.popTip(response.data.mes)
            }
          }
        }, (response) => {
            // error callback
        })
      }
    }
  }
</script>
