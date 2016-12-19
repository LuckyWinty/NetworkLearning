<template>
  <div class="container">
    <h3 class="all_head">全部课程</h3>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="难度：">
        <el-radio-group v-model="form.resource">
          <el-radio label="全部"></el-radio>
          <el-radio label="初级"></el-radio>
          <el-radio label="中级"></el-radio>
          <el-radio label="高级"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="热度：">
        <el-radio-group v-model="form.resource">
          <el-radio label="最新"></el-radio>
          <el-radio label="最热"></el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
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
</style>

<script>
  export default {
    data () {
      return {
        form: {
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit () {
        console.log('submit!')
      }
    }
  }
</script>
