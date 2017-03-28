<template>
    <div class="detail-content">
      <Question :questions="singleQuestion" :showFocus="1">
      </Question>
    </div>
</template>
<style>
  .detail-content{
    width:80%;
    margin: 0 auto;
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
        var qusetionId = params.qusetionId || ''
        this.$http.post(self.getUrl() + '/showSingleQuestion', {qusetionId: qusetionId}).then((response) => {
          if (response.status === 200) {
            if (response.data.status === 1) {
              console.log('----------', response.data)
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
