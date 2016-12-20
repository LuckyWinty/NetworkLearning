<template>
    <div class="detail-content">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">课程学习</el-breadcrumb-item>
        <el-breadcrumb-item>{{subjectInfo.title}}</el-breadcrumb-item>
      </el-breadcrumb>
      <div>这里是html模板</div>
      <div class="comment">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="评论">
            <el-input type="textarea" v-model="form.comment"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">评论</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="commentList">
       <Comment></Comment>
      </div>
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
  .detail-content{
    width:80%;
    margin: 0 auto;
  }
  .comment{
    margin-top: 20px;
    border-top:solid 1px #c0c0c0;
    padding-top: 20px;
  }
</style>
<script>
  import Comment from 'components/module/Comment.vue'

  export default {
    data () {
      return {
        subjectInfo: {
          title: '计算机',
          hardLever: '初级',
          long: '1小时',
          hotLever: '1231',
          desc: '8小时带领大家步步深入学习标签的基础知识，掌握各种样式的基本用法。',
          note: '本课程是腾讯前端团队Alloyteam参与主办的AC2016前端技术大会现场实录。大会分享议题涉及最近流行的ReactNative、Node.js、Angular.js、RXjs等技术。精彩分享不容错过！'
        },
        form: {
          comment: ''
        },
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4
      }
    },
    components: {
      Comment: Comment
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
