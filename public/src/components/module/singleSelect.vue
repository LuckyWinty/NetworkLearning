<template>
    <div>
      <div class="questions-nav" style="display: none;">
        <h4>题目导航</h4>
        <ul>
          <li v-for="(o,index) in questionList" class="questions-item">
            <a :href="'#question'+(index+1)" class="question-index">{{index+1}}</a>
          </li>
        </ul>
      </div>
      <div v-for="(item,index) in questionList" :id="'question'+(index+1)">
        <div class="single-item">
          <p class="title"><span>{{index+1}}.</span>{{item.content}}</p>
          <el-checkbox-group v-model="item.selected">
            <el-checkbox v-for="(opt,index) in item.choice" :label="index">{{opt.option}}</el-checkbox>
          </el-checkbox-group>
          <div class="btn-group">
            <el-button type="primary" @click="check(item)">检验</el-button>
          </div>
        </div>
        <div class="tips" v-show="item.result!=''">
          <h4>回答{{item.result}}！</h4>
          <p>{{item.explain}}</p>
        </div>
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
  .single-item .el-checkbox{
    display: block;
    margin-left: 15px;
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
      props: ['questionList'],
      data () {
        return {
        }
      },
      methods: {
        check (item) {
          var result = true
          var temp = { A: 0, B: 1, C: 2, D: 3, E: 4, F: 5, G: 6, H: 7, I: 8, J: 9 }
          if (item.correctChoice.length !== item.selected.length) {
            result = false
          } else {
            for (var i = 0; i < item.correctChoice.length; i++) {
              if (item.selected.indexOf(temp[item.correctChoice[i]]) === -1) {
                result = false
                break
              }
            }
          }
          for (var w = 0; w < this.questionList.length; w++) {
            if (this.questionList[w]._id.toString() === item._id.toString()) {
              if (result) {
                this.questionList[w].result = '正确'
              } else {
                this.questionList[w].result = '错误'
              }
            }
          }
        }
      }
    }
</script>
