<template>
  <div class="container">
    <h3 class="all_head">全部课程</h3>
    <el-form label-width="80px">
      <el-form-item class="select-item" label="选择难度：">
        <el-radio-group v-model="hardLever" @change="showSubjects(hardLever)">
          <el-radio label="全部"></el-radio>
          <el-radio label="初级" ></el-radio>
          <el-radio label="中级"></el-radio>
          <el-radio label="高级"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item class="select-item" label="选择热度：">
        <el-radio-group v-model="hotLever"  @change="showSubjects(hotLever)">
          <el-radio label="最新"></el-radio>
          <el-radio label="最热"></el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <Subject  :hotLists="hotLists"></Subject>
    <page></page>
  </div>
</template>

<style>
  .all_head{
    font-weight: 500;
    color:#000000;
    font-family: "微软雅黑";
    font-size: 26px;
    margin: 0;
  }
  .select-item{
    border-bottom: 1px solid #ccc;
    margin-top: 10px;
    margin-bottom: 10px;
    padding-bottom: 8px;
  }
  .el-form-item__label{
    padding:0 !important;
    text-align: center !important;
    margin-bottom: 0;
    margin-top: 10px;
  }
  .block{
    width:445px;
    margin:20px auto;
  }
  .el-pager li,.el-pagination button{
    min-width: 36px !important;
    height:36px !important;
    padding:4px !important;
  }
</style>

<script>
  import Subject from 'components/module/Subject.vue'
  import Page from 'components/module/Page.vue'
  export default {
    data () {
      return {
        hardLever: '全部',
        hotLever: '最新',
        currentPage1: 5,
        hotLists: [],
        allSubject: [],
        primarySubject: [],
        middleSubject: [],
        highSubject: []
      }
    },
    created () {
      this.showSubjects('全部')
    },
    components: {
      Subject: Subject,
      Page: Page
    },
    methods: {
      getUrl () {
        return this.$store.state.basicUrl
      },
      showSubjects (value) {
        var self = this
        switch (value) {
          case '全部' :
            var all = JSON.parse(window.sessionStorage.getItem('allSubject')) || ''
            console.log('----------------', all)
            if (all.length > 0) {
              self.allSubject = []
              self.allSubject = self.allSubject.concat(all)
              self.hotLists = []
              self.hotLists = self.hotLists.concat(self.allSubject.slice(0, 20))
              return
            }
            var userId = window.sessionStorage.getItem('userId') || ''
            this.$http.post(self.getUrl() + '/index', {userId: userId}).then((response) => {
              if (response.status === 200) {
                if (response.data.status === 1) {
                  self.allSubject = self.allSubject.concat(response.data.Subjects)
                  window.sessionStorage.setItem('allSubject', JSON.stringify(self.allSubject))
                  self.hotLists = self.hotLists.concat(response.data.Subjects.slice(0, 20))
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
            while (loop < self.allSubject.length) {
              var sub = self.allSubject[loop++]
              if (sub.level === '初级') {
                temp.push(sub)
              }
            }
            self.hotLists = []
            self.hotLists = self.hotLists.concat(temp)
            break
          case '中级' :
            var temp1 = []
            var loop1 = 0
            while (loop1 < self.allSubject.length) {
              var sub1 = self.allSubject[loop1++]
              if (sub1.level === '中级') {
                temp1.push(sub1)
              }
            }
            self.hotLists = []
            self.hotLists = self.hotLists.concat(temp1)
            break
          case '高级' :
            var temp2 = []
            var loop2 = 0
            while (loop2 < self.allSubject.length) {
              var sub2 = self.allSubject[loop2++]
              if (sub2.level === '高级') {
                temp2.push(sub2)
              }
            }
            self.hotLists = []
            self.hotLists = self.hotLists.concat(temp2)
            break
          case '最新' :
            self.hotLists = self.hotLists.sort(function (a, b) {
              return new Date(b.created) - new Date(a.created)
            })
            break
          case '最热' :
            self.hotLists = self.hotLists.sort(function (a, b) {
              return b.beFocused.length - a.beFocused.length
            })
            break
          default :
        }
      },
      onSubmit () {
        console.log('submit!')
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        this.currentPage = val
        console.log(`当前页: ${val}`)
      }
    }
  }
</script>
