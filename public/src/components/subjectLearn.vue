<template>
  <div class="container">
    <h3 class="all_head">全部课程</h3>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item class="select-item" label="选择难度：">
        <el-radio-group v-model="form.hardLever">
          <el-radio label="全部"></el-radio>
          <el-radio label="初级"></el-radio>
          <el-radio label="中级"></el-radio>
          <el-radio label="高级"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item class="select-item" label="选择热度：">
        <el-radio-group v-model="form.hotLever">
          <el-radio label="最新"></el-radio>
          <el-radio label="最热"></el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <Subject></Subject>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage1"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="100">
      </el-pagination>
    </div>
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

  export default {
    data () {
      return {
        form: {
          hardLever: '',
          hotLever: ''
        },
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4
      }
    },
    components: {
      'Subject': Subject
    },
    methods: {
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
