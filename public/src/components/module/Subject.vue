<template>
    <el-row>
      <el-col class="subject-item" :span="5" v-for="info in hotLists">
          <el-card :body-style="{ padding: '0px' }">
            <a :href="`/#/subjectSpots?subjectId=${info._id}`">
            <img :src="`${basicUrl}/image?imageId=${info.imageId}`" class="image">
              <div style="padding: 10px;">
              <h3 class="subject_title">{{info.title}}</h3>
              <p class="subject_desc">{{info.desc}}</p>
              </div>
              </a>
              <div class="bottom clearfix"  style="padding:0px 10px 10px 10px;">
                <span class="time">{{info.beFocused.length}}人关注</span>
                <!--<i class="el-icon-star-off" @click="focus(info._id)">关注</i>-->
                <el-button type="info" size="small" class="float-right" @click="focus(info)">{{info.isFocus==1?'已关注':'关注'}}</el-button>
              </div>
          </el-card>
      </el-col>
    </el-row>
</template>

<style>
  .subject-item{
    margin:10px;
  }
  .el-icon-star-off{
    float:right;
    color:#A4C24E;
  }
  .subject_title{
    font-weight: 500;
    color:#000000;
    font-family: "微软雅黑";
  }
  .subject_desc{
    color:#58606D;
  }
  .time {
    vertical-align: -webkit-baseline-middle;
    font-size: 13px;
    color: #999;
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }
  .image {
    width: 100%;
    display: block;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
</style>

<script>
  export default {
    props: ['hotLists'],
    data () {
      return {
        currentDate: new Date(),
        basicUrl: this.getUrl()
      }
    },
    methods: {
      getUrl () {
        return this.$store.state.basicUrl
      },
      focus (info) {
        var userId = window.sessionStorage.getItem('userId') || ''
        var isFocus = info.isFocus

        if (userId) {
          var self = this
          this.$http.post(self.getUrl() + '/focus', {userId: userId, subjectId: info._id, isFocus: isFocus}).then((response) => {
            if (response.status === 200) {
              if (response.data.status === 1) {
                console.log('----------', response.data)
                for (var i = 0; i < self.hotLists.length; i++) {
                  if (self.hotLists[i]._id.toString() === info._id) {
                    self.hotLists[i].isFocus = response.data.isFocus
                    if (response.data.isFocus === 1) {
                      self.hotLists[i].beFocused.push('1')
                    } else {
                      self.hotLists[i].beFocused.splice(0, 1)
                    }
                  }
                }
              } else {
                self.popTip(response.data.mes)
              }
            }
          }, (response) => {
            // error callback
          })
        } else {
          this.popTip('关注失败', '您还没有登录呢~~')
        }
      },
      popTip (title, tips) {
        this.$alert(tips, title, {
        })
      }
    }
  }
</script>
