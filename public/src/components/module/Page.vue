<template>
  <div class="block" v-if="pageInfo > 10">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage1"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="pageInfo">
    </el-pagination>
  </div>
</template>
<style>
</style>
<script>
  export default {
    props: ['pageInfo', 'pageSize'],
    data () {
      return {
        currentPage1: 1
      }
    },
    methods: {
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
