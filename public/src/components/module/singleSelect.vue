<template>
    <div>
      <div v-for="item in questionList">
        <div class="single-item">
          <p class="title"><span>{{item.index}}.</span>{{item.content}}</p>
          <el-radio-group class="opt-group" v-model="item.selected">
            <el-radio class="select-opt" v-for="opt in item.selects" :label="opt.option">{{opt.option}}</el-radio>
          </el-radio-group>
          <div class="btn-group">
            <el-button type="primary">检验</el-button>
            <el-button type="warning">标记</el-button>
          </div>
        </div>
        <div class="tips" v-if="item.result">
          <h4>回答{{item.result.result}}！</h4>
          <p>{{item.result.explain}}</p>
        </div>
      </div>
    </div>
</template>
<style>
  .single-item{
    background-color: #D9EDF7;
    padding:15px 10px;
    margin-top: 15px;
    border-radius: 5px;
  }
  .title{
    margin-bottom: 15px;
  }
  .opt-group{
    width:100%;
  }
  .btn-group{
   margin-top: 20px;
  }
  .select-opt{
    display: block !important;
    max-width: 100%;
    white-space:normal;
  }
  .single-item .el-radio+.el-radio{
    margin-left: 0px !important;
    margin-top: 5px;
  }
  .single-item .el-radio__label{
    white-space:normal;
  }
  .tips{
    background-color: #FCF8E3;
    padding: 15px 10px;
    margin-top: 10px;
    border-radius: 5px;
  }
  .tips h4{
    color:#13CE66;
  }
  .tips p{
    color:#B1833B;
    font-size: 14px;
    margin-top: 5px;
  }
</style>
<script>
    export default{
      data () {
        return {
          questionList: [{
            index: '1',
            content: '为解决各类应用问题而编写的程序，称为______软件。',
            selects: [{option: 'a. 应用软件'}, {option: 'b. 应用软件'}, {option: 'c. 应用软件'}, {option: 'd. 应用软件'}],
            selected: '',
            result: {result: '正确', explain: '这个回答给满分！'}
          },
          {
            index: '2',
            content: '为解决各类应用问题而编写的程序，称为______软件。',
            selects: [{option: 'a. 应用软件应用软件应用软件应用软件应用软件应用软件应用软件应用软件应用软件应用软件应用软件应用软件应用软件应用软件应用软件应用软件应用软件应用软件应用软件应用软件'}, {option: 'b. 应用软件'}, {option: 'c. 应用软件'}, {option: 'd. 应用软件'}],
            selected: '',
            result: ''
          }]
        }
      }
    }
</script>
