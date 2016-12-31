<template>
  <div class="questions-container">
    <div class="search">
      <el-input class="inline"></el-input>
      <el-button class="search-btn" type="primary" icon="search">搜索</el-button>
    </div>
    <el-row :gutter="20">
      <el-col :span="6" class="left-notes">
        <div class="grid-content bg-purple">
          <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple">
          <div class="questions-nav">
            <h4>题目导航</h4>
            <ul>
              <li v-for="o in 15" class="questions-item">
                <a href="#" class="question-index">{{o}}</a>
              </li>
            </ul>
          </div>
          <div class="question-list">
             <singleSelect></singleSelect>
          </div>
          <Page></Page>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<style>
  .questions-nav ul:after{
    display: block;
    visibility: hidden;
    content: '';
    clear: both;
  }
  .questions-container{
    width:95%;
    margin:0 auto;
  }
  .questions-nav{
    border:solid 1px #EFF1F0;
    padding: 10px;
    border-radius: 5px;
  }
  .questions-nav ul{
    margin-top: 20px;
  }
.questions-nav .questions-item{
  margin: 2px;
  float:left;
}
  .questions-nav .questions-item a:hover{
    color:#fff;
    background-color: #20A0FF;
  }
  .question-index{
    padding:5px 10px;
    border:solid 1px #20A0FF;
    border-radius: 2px;
  }
</style>
<script>
  import singleSelect from 'components/module/singleSelect.vue'
  import Page from 'components/module/Page.vue'
  export default{
    data () {
      return {
        form: {
          discuss: '全部'
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
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4
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
    },
    components: {
      singleSelect: singleSelect,
      Page: Page
    }
  }
</script>
