<template>
  <div class="personalCenter">
    <h1 class="head-title">后台管理系统</h1>
    <div class="person-detail">
      <el-row :gutter="20">
        <el-col :span="6"><div class="grid-content bg-purple my-nav">
          <el-menu default-active="1" class="el-menu-vertical-demo" @select="changeModule" >
            <el-menu-item index="1" ><i class="el-icon-message"></i>用户管理</el-menu-item>
            <el-menu-item index="2"><i class="el-icon-menu"></i>课程管理</el-menu-item>
            <el-menu-item index="3"><i class="el-icon-document"></i>论坛管理</el-menu-item>
            <el-menu-item index="4"><i class="el-icon-warning"></i>测验管理</el-menu-item>
          </el-menu>
        </div>
        </el-col>
        <el-col :span="18"><div class="grid-content bg-purple">
          <div class="module-wrap" v-show="showModule==1">
            <el-tabs type="card" @tab-click="handleClick" @tab-remove="handleRemove">
              <el-tab-pane label="全部用户">
              <div class="tabs-wrap">
                <table class="primary-table top-margin">
                  <thead>
                    <th rowspan="1" colspan="1">用户名</th>
                    <th rowspan="1" colspan="1">用户权限</th>
                    <th rowspan="1" colspan="1">手机号码</th>
                    <th rowspan="1" colspan="1">注册日期</th>
                    <th rowspan="1" colspan="1">操作</th>
                  </thead>
                  <tbody>
                  <tr>
                    <td>11</td>
                    <td>12</td>
                    <td>13</td>
                    <td>14</td>
                    <td>
                      <el-button
                        size="small"
                        @click="handleEdit(scope.$index, scope.row)">重置密码</el-button>
                      <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </td>
                  </tr>
                  </tbody>
                 </table>
                 <Page></Page>
                </div>
              </el-tab-pane>
              <el-tab-pane label="添加管理员">
                <el-form :model="formLabelAlign" label-width="80px" id="personInfo1" enctype="multipart/form-data">
                  <el-form-item label="用户名">
                    <el-input name="userName" v-model="formLabelAlign.userName"></el-input>
                  </el-form-item>
                  <el-form-item label="密码">
                    <el-input name="password" v-model="formLabelAlign.password"></el-input>
                  </el-form-item>
                  <el-form-item label="管理权限">
                    <el-input name="power" v-model="formLabelAlign.power"></el-input>
                  </el-form-item>
                  <el-form-item label="微信">
                    <el-input name="wechat" v-model="formLabelAlign.wechat"></el-input>
                  </el-form-item>
                  <el-form-item label="手机">
                    <el-input name="phone" v-model="formLabelAlign.phone"></el-input>
                  </el-form-item>
                  <el-button type="primary" @click="doAdd">添加</el-button>
                </el-form>
              </el-tab-pane>
            </el-tabs>
            </div>
          </div>
          <div class="module-wrap" v-show="showModule==2">
            <el-tabs type="card" @tab-click="handleClick" @tab-remove="handleRemove">
              <el-tab-pane label="全部课程">
                <div class="tabs-wrap">
                  <table class="primary-table top-margin">
                    <thead>
                    <th rowspan="1" colspan="1">课程名称</th>
                    <th rowspan="1" colspan="1">录入日期</th>
                    <th rowspan="1" colspan="1">课程难度</th>
                    <th rowspan="1" colspan="1">课程时长</th>
                    <th rowspan="1" colspan="1">操作</th>
                    </thead>
                    <tbody>
                    <tr>
                      <td>11</td>
                      <td>12</td>
                      <td>13</td>
                      <td>14</td>
                      <td>
                        <el-button
                          size="small"
                          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                          size="small"
                          type="danger"
                          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                  <Page></Page>
                </div>
              </el-tab-pane>
              <el-tab-pane label="添加课程">
                <div class="step-wrap">
                  <el-steps :space="300" :active="active" finish-status="success">
                    <el-step title="基本信息">
                    </el-step>
                    <el-step title="更多相关">
                    </el-step>
                    <el-step title="主体内容"></el-step>
                  </el-steps>
                </div>
                <div class="step-1" v-show="active==1">
                  <el-form :model="subject" label-width="150px">
                    <el-form-item label="课程展示图">
                      <el-upload
                        action="//jsonplaceholder.typicode.com/posts/"
                        type="drag"
                        :multiple="true"
                        :on-preview="handlePreview"
                        :on-remove="handleRemovePic"
                        :on-success="handleSuccess"
                        :on-error="handleError"
                      >
                        <i class="el-icon-upload"></i>
                        <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                      </el-upload>
                    </el-form-item>
                    <el-form-item label="课程名称">
                      <el-input v-model="subject.title"></el-input>
                    </el-form-item>
                    <el-form-item label="课程描述">
                      <el-input type="textarea" v-model="subject.desc"></el-input>
                    </el-form-item>
                    <el-form-item label="课程难度">
                      <el-radio-group v-model="subject.level">
                        <el-radio label="初级"></el-radio>
                        <el-radio label="中级"></el-radio>
                        <el-radio label="高级"></el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="课程时长">
                      <el-input v-model="subject.learnTime"></el-input>
                    </el-form-item>
                    <el-form-item label="是否录完">
                      <el-radio-group v-model="subject.isFinished">
                        <el-radio label="已录完"></el-radio>
                        <el-radio label="未录完"></el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="课程章节数">
                      <el-input v-model="subject.spotNum"></el-input>
                    </el-form-item>
                    <el-button type="primary" @click="next">下一步</el-button>
                  </el-form>
                </div>
                <div class="step-2" v-show="active==2">
                  <el-form :model="subject" label-width="150px">
                    <el-form-item label="课程章节目录">
                      <el-input v-model="subject.spot"></el-input>
                    </el-form-item>
                    <el-form-item label="课程章节层级">
                      <el-input v-model="subject.label"></el-input>
                    </el-form-item>
                    <el-form-item label="课程推荐习题链接">
                        <el-input type="textarea" v-model="subject.moreInfo"></el-input>
                    </el-form-item>
                    <el-form-item label="课程推荐学习资源">
                      <el-input type="textarea" v-model="subject.moreInfo"></el-input>
                    </el-form-item>
                    <el-button type="primary" @click="next">下一步</el-button>
                  </el-form>
                </div>
                <div class="step-3" v-show="active==3">
                  <vue-html5-editor :content="content" :height="500"></vue-html5-editor>
                  <el-button class="top-margin" type="primary" @click="onSubmit">确定录入</el-button>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>

          <div class="module-wrap" v-show="showModule==3">
          </div>

          <div class="module-wrap" v-show="showModule==4">
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<style>
  .head-title{
    font-weight: 500;
    text-align: center;
    margin:30px 0;
  }
  .personalInfo .portrait img{
    width:100px;
    height:100px;
    margin-top: 20px;
  }
  .more-info h2{
    font-weight: 500;
    margin-bottom: 10px;
  }
  .more-info h2,.more-info p{
    color:#fff;
  }
  .person-detail{
    margin-top: 50px;
  }
  .my-nav{
    margin-top:20px;
  }
  .top-margin{
    margin-top: 20px;
  }
  .primary-table{
    width:100%;
    border-collapse:collapse;
    border:1px solid #e0e6ed;
    border-radius: 5px;
  }
  .primary-table thead{
    background-color: #EFF2F7;
  }
  .primary-table th,.primary-table tr{
    border:1px solid #e0e6ed;
    text-align: center;
  }
  .primary-table th{
    padding:10px;
    color:#1f2d3d;
    font-weight: 100;
    font-size: 16px;
  }
  .primary-table tr td{
    padding:10px;
    border:1px solid #e0e6ed;
  }
  .primary-table tr:hover{
    background-color: #EFF2F7;
  }
  .step-wrap{
    border-bottom: solid 1px #e0e6ed;
    padding-bottom: 10px;
    margin-bottom: 30px;
  }
  /*富文本*/
  .custom-icon {
    background-size: 100% 100%;
    display: inline-block;
  }
  .custom-icon.text {
    background-image: url('custom-icons/text.png');
  }
  .custom-icon.font {
    background-image: url(custom-icons/font.png);
  }
  .custom-icon.align {
    background-image: url(custom-icons/align.png);
  }
  .custom-icon.list {
    background-image: url(custom-icons/list.png);
  }
  .custom-icon.color {
    background-image: url(custom-icons/color.gif);
  }
  .custom-icon.eraser {
    background-image: url(custom-icons/eraser.gif);
  }
  .custom-icon.full-screen {
    background-image: url(custom-icons/full-screen.gif);
  }
  .custom-icon.hr {
    background-image: url(custom-icons/hr.gif);
  }
  .custom-icon.image {
    background-image: url(custom-icons/image.gif);
  }
  .custom-icon.link {
    background-image: url(custom-icons/link.gif);
  }
  .custom-icon.table {
    background-image: url(custom-icons/table.gif);
  }
  .custom-icon.undo {
    background-image: url(custom-icons/undo.gif);
  }
  .custom-icon.unlink {
    background-image: url(custom-icons/unlink.gif);
  }
  .custom-icon.info {
    background-image: url(custom-icons/info.png);
  }
</style>
<script>
  import Page from '../module/Page.vue'

  export default {
    data () {
      return {
        fileList: [],
        formLabelAlign: {
          portrait: '',
          userName: '',
          password: '',
          power: '',
          wechat: '',
          qq: '',
          phone: '',
          signature: ''
        },
        subject: {
          title: '',
          images: [],
          desc: '',
          level: '',
          learnTime: '',
          spots: {},
          practice: [],
          isFinished: '',
          spotNum: ''
        },
        active: 1,
        content: '',
        showModule: 1,
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          tag: '家'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          tag: '家'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          tag: '家'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          tag: '家'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          tag: '家'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          tag: '家'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          tag: '家'
        }]
      }
    },
    methods: {
      doAdd () {
        var self = this
        var formData = new window.FormData(document.getElementById('personInfo1'))
        for (var [key, value] of formData.entries()) {
          console.log('------', key, value)
        }
        this.$http.post('http://localhost:3000/admin/add', formData).then((response) => {
          if (response.status === 200) {
            if (response.data.status === 1) {
              self.popTip('注册成功！', '点击右上角登陆吧！')
            } else {
              self.popTip(response.data.mes)
            }
          }
        }, (response) => {
          // error callback
        })
      },
      popTip (title, tips) {
        this.$alert(tips, title, {
        })
      },
      next () {
        if (this.active++ > 2) this.active = 0
      },
      changeModule (index, indexPath) {
        this.showModule = index
        console.log('有反应不？', index, this.showModule)
      },
      handleRemove (tab) {
        console.log(tab)
      },
      handleClick (tab, event) {
        console.log(tab, event)
      },
      onSubmit () {
      },
      handleRemovePic (file, fileList) {
        console.log(file, fileList)
      },
      handlePreview (file) {
        console.log(file)
      },
      formatter (row, column) {
        return row.address
      },
      filterTag (value, row) {
        return row.tag === value
      },
      handleEdit (index, row) {
        console.log(index, row)
      },
      handleDelete (index, row) {
        console.log(index, row)
      },
      handleSuccess (index, row) {
        console.log(index, row)
      },
      handleError (index, row) {
        console.log(index, row)
      }
    },
    components: {
      Page: Page
    }
  }
</script>
