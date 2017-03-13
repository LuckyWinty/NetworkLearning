<template>
  <div class="container">
    <h3 class="all_head">全部课程</h3>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item class="select-item" label="选择难度：">
        <el-radio-group v-model="form.hardLever">
          <el-radio label="全部" @click="showSubjects"></el-radio>
          <el-radio label="初级" @click="showSubjects"></el-radio>
          <el-radio label="中级" @click="showSubjects"></el-radio>
          <el-radio label="高级" @click="showSubjects"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item class="select-item" label="选择热度：">
        <el-radio-group v-model="form.hotLever">
          <el-radio label="最新" @click="showSubjects"></el-radio>
          <el-radio label="最热" @click="showSubjects"></el-radio>
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
        form: {
          hardLever: '全部',
          hotLever: '最新'
        },
        currentPage1: 5,
        hotLists: [],
        allSubject: [],
        primarySubject: [],
        middleSubject: [],
        highSubject: []
      }
    },
    created () {
      this.showSubjects()
    },
    components: {
      Subject: Subject,
      Page: Page
    },
    methods: {
      getUrl () {
        return this.$store.state.basicUrl
      },
      showSubjects () {
        var self = this
        console.log('----------------', this.form.hardLever)
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
