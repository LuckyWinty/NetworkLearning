<template>
 <div class="content">
     <div class="spots">
       <div class="spots-wrap">
         <el-breadcrumb separator="/">
           <el-breadcrumb-item :to="{ path: '/' }">课程学习</el-breadcrumb-item>
           <el-breadcrumb-item>{{subjectInfo.title}}</el-breadcrumb-item>
         </el-breadcrumb>
         <div class="tag-wrap">
           <ul>
             <li>
               <h3>{{subjectInfo.hardLever}}</h3>
               <p>难度</p>
             </li>
             <li>
               <h3>{{subjectInfo.long}}</h3>
               <p>时长</p>
             </li>
             <li>
             <h3>{{subjectInfo.hotLever}}人</h3>
             <p>关注度</p>
             </li>
           </ul>
         </div>
     </div>
   </div>
   <div class="detail">
     <el-row>
       <el-col class="detail-subject" :span="16">
         <div class="grid-content bg-purple">
          <p class="margin-top-10px">简介：{{subjectInfo.desc}}</p>
           <el-tabs :active-name="activeName">
             <el-tab-pane label="章节" name="first">
               <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
             </el-tab-pane>
             <el-tab-pane label="评论" name="second">
               <Comment></Comment>
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
             </el-tab-pane>
             <el-tab-pane label="问答" name="third">
               <Comment></Comment>
               <Reply></Reply>
               <Page></Page>
             </el-tab-pane>
           </el-tabs>
         </div>
       </el-col>
       <el-col :span="8">
         <div class="grid-content bg-purple">
           <div class="note">
             <el-card class="box-card">
               <div slot="header" class="clearfix">
                 <span style="line-height: 36px;">课程须知</span>
               </div>
               <p>{{subjectInfo.note}}</p>
             </el-card>
           </div>
         </div>
       </el-col>
     </el-row>
   </div>
 </div>
</template>
<style>
.spots{
  width:100%;
  height:150px;
  background-image: url("../images/bg.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.el-breadcrumb{
  padding: 20px 0;
  font-size: 16px !important;
}

.tag-wrap{
  margin-top: 30px;
}
.tag-wrap ul li{
  min-width:80px;
  display: inline-block;

 }
.tag-wrap ul li+li:before{
  border-left: solid 1px #fff;
}
.tag-wrap ul li h3,.tag-wrap ul li p{
  color:#fff;
  text-align: left;
}
.tag-wrap ul li h3{
  font-weight: 500;
}
  .detail,.spots-wrap{
    width:80%;
    margin: 0 auto;
  }
  .el-tabs{
    width:90%;
    margin:20px 0;
  }
 .el-tabs__item{
   padding: 0 50px !important;
 }
  .detail-subject{
    margin: 0 !important;
    padding: 0 !important;
  }
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.note{
  width: 80%;
  margin-left:30px;
  margin-top: 50px;
}
</style>
<script>
  import Comment from 'components/module/Comment.vue'
  import Reply from 'components/module/Reply.vue'
  import Page from 'components/module/Page.vue'
  export default {
    data () {
      return {
        activeName: 'first',
        subjectInfo: {
          title: '计算机',
          hardLever: '初级',
          long: '1小时',
          hotLever: '1231',
          desc: '8小时带领大家步步深入学习标签的基础知识，掌握各种样式的基本用法。',
          note: '本课程是腾讯前端团队Alloyteam参与主办的AC2016前端技术大会现场实录。大会分享议题涉及最近流行的ReactNative、Node.js、Angular.js、RXjs等技术。精彩分享不容错过！'
        },
        data: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1'
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1'
          }, {
            label: '二级 2-2'
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1'
          }, {
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    components: {
      Comment: Comment,
      Reply: Reply,
      Page: Page
    },
    methods: {
      handleNodeClick (data) {
        console.log(data)
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
