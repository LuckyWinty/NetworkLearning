<template>
  <div class="question">
    <div class="question-wrap" v-for="question in questions">
      <div class="question-detail-wrap">
        <div class="portrait">
          <img :src="question.user.portrait?`${basicUrl}/image?imageId=${question.user.portrait}`:`${basicUrl}/image?imageId=58c4d44ad68eca1eb831a2b6`" alt="">
        </div>
        <div class="info">
          <a :href="`/#/subjectSpots?subjectId=${info._id}`">
            <h4 class="user-info">提问来自  <span class="user-name">{{question.user.userName}}</span>
            </h4>
            <p class="content">{{question.content}}</p>
            <div class="more-detail">
              <span class="time">提问时间：{{formatDate(question.created)}}</span>
            </div>
          </a>
        </div>
      </div>
    </div>
    <Page :pageSize="5"></Page>
  </div>
</template>
<style>
  .question-wrap:after,.question-detail-wrap:after,.more-detail:after{
    display: block;
    content: '';
    visibility: hidden;
    clear: both;
  }
  .question-wrap{
    padding-top:10px;
    padding-bottom: 20px;
    border-bottom: solid 1px #c0c0c0;
  }
  .portrait{
    width:15%;
    box-sizing: border-box;
    float:left;
  }
  .portrait img{
    display: block;
    width:70px;
    height:70px;
    margin:0 auto;
    border-radius: 50%;
  }
  .user-info{
    color:#4E4E4E;
  }
  .user-name{
    color:#000000;
  }
  .info{
    width:85%;
    box-sizing: border-box;
    float:right;
  }
  .info .content{
    width:100%;
    text-indent: 2em;
    margin: 10px 0;
    color:#5E6D82;
  }
  .more-detail .time{
    color:#858483;
  }

</style>
<script>
  import Answer from 'components/module/Answer.vue'
  import Page from 'components/module/Page.vue'
  export default{
    props: ['questions'],
    data () {
      return {
        basicUrl: this.getUrl()
      }
    },
    components: {
      Answer: Answer,
      Page: Page
    },
    methods: {
      getUrl () {
        return this.$store.state.basicUrl
      },
      popTip (title, tips) {
        this.$alert(tips, title, {
        })
      },
      formatDate (date) {
        var times = new Date(date)
        var Y = times.getFullYear()
        var M = times.getMonth() > 8 ? times.getMonth() + 1 : '0' + (times.getMonth() + 1)
        var D = times.getDate() > 9 ? times.getDate() : '0' + times.getDate()

        var H = times.getHours()
        var m = times.getMinutes()
        var S = times.getSeconds()

        return Y + '-' + M + '-' + D + '  ' + H + ' : ' + m + ' : ' + S
      }
    }
  }
</script>
