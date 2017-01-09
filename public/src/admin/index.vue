<template>
  <div class="personalCenter">
    <div class="personalInfo">
      <div class="personalInfo-wrap">
        <div class="portrait"><img :src="person.portrait" alt=""></div>
        <div class="more-info">
          <h2>{{person.name}}</h2>
          <p>个性签名:  {{person.signature}}</p>
        </div>
      </div>
    </div>
    <div class="person-detail">
      <el-row :gutter="20">
        <el-col :span="6"><div class="grid-content bg-purple my-nav">
          <el-menu default-active="1" class="el-menu-vertical-demo" @select="changeModule" >
            <el-menu-item index="1" ><i class="el-icon-message"></i>用户管理</el-menu-item>
            <el-menu-item index="2"><i class="el-icon-menu"></i>课程管理</el-menu-item>
            <el-menu-item index="3"><i class="el-icon-document"></i>论坛管理</el-menu-item>
            <el-menu-item index="4"><i class="el-icon-warning"></i>测验管理</el-menu-item>
          </el-menu>
        </div></el-col>
        <el-col :span="18"><div class="grid-content bg-purple">
          <div class="module-wrap" v-show="showModule==1">
            <div class="tabs-wrap">
              <el-tabs type="card" @tab-click="handleClick" @tab-remove="handleRemove">
                <el-tab-pane label="全部用户">
                    <el-table
                      :data="tableData3"
                      height="250"
                      border
                      style="width: 100%">
                      <el-table-column
                        prop="date"
                        label="日期"
                        width="180">
                      </el-table-column>
                      <el-table-column
                        prop="name"
                        label="姓名"
                        width="180">
                      </el-table-column>
                      <el-table-column
                        prop="address"
                        label="地址">
                      </el-table-column>
                      <el-table-column
                        prop="tag"
                        label="标签"
                        width="100"
                        :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
                        :filter-method="filterTag">
                        <template scope="scope">
                          <el-tag
                            :type="scope.row.tag === '家' ? 'primary' : 'success'"
                            close-transition>{{scope.row.tag}}</el-tag>
                        </template>
                      </el-table-column>
                      <el-table-column label="操作">
                        <template scope="scope">
                          <el-button
                            size="small"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                          <el-button
                            size="small"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  <Page></Page>
                </el-tab-pane>
                <el-tab-pane label="增加用户">
                  <el-form :model="formAlignRight" label-width="80px">
                    <el-form-item label="头像">
                      <el-upload
                        action="//jsonplaceholder.typicode.com/posts/"
                        type="drag"
                        :multiple="true"
                        :on-preview="handlePreview"
                        :on-remove="handleRemovePic"
                        :on-success="handleSuccess"
                        :on-error="handleError"
                        :default-file-list="fileList"
                      >
                        <i class="el-icon-upload"></i>
                        <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                      </el-upload>
                    </el-form-item>
                    <el-form-item label="用户名">
                      <el-input v-model="formAlignRight.name"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                      <el-input v-model="formAlignRight.password"></el-input>
                    </el-form-item>
                    <el-form-item label="管理权限">
                      <el-input v-model="formAlignRight.power"></el-input>
                    </el-form-item>
                    <el-form-item label="微信">
                      <el-input v-model="formAlignRight.wechat"></el-input>
                    </el-form-item>
                    <el-form-item label="QQ">
                      <el-input v-model="formAlignRight.qq"></el-input>
                    </el-form-item>
                    <el-form-item label="手机">
                      <el-input v-model="formAlignRight.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="个性签名">
                      <el-input type="textarea" v-model="formAlignRight.desc"></el-input>
                    </el-form-item>
                    <el-button type="primary" @click="onSubmit">添加</el-button>
                    </el-form-item>
                  </el-form>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
          <div class="module-wrap" v-show="showModule==2">
            <div class="tabs-wrap">
              <el-tabs type="card" @tab-click="handleClick" @tab-remove="handleRemove">
                <el-tab-pane label="最近提问">
                  <FocusSubject></FocusSubject>
                  <Page></Page>
                </el-tab-pane>
                <el-tab-pane label="我关注的">
                  <FocusSubject></FocusSubject>
                  <Page></Page>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>

          <div class="module-wrap" v-show="showModule==3">
            <div class="tabs-wrap">
              <el-tabs type="card" @tab-click="handleClick" @tab-remove="handleRemove">
                <el-tab-pane label="最近回答">
                  <FocusSubject></FocusSubject>
                  <Page></Page>
                </el-tab-pane>
                <el-tab-pane label="我关注的">
                  <FocusSubject></FocusSubject>
                  <Page></Page>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>

          <div class="module-wrap" v-show="showModule==4">
            <div class="tabs-wrap">
              <el-tabs type="card" @tab-click="handleClick" @tab-remove="handleRemove">
                <el-tab-pane label="最近关注">
                  <FocusSubject></FocusSubject>
                  <Page></Page>
                </el-tab-pane>
                <el-tab-pane label="最热关注">
                  <FocusSubject></FocusSubject>
                  <Page></Page>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>

        </div></el-col>
      </el-row>
    </div>
  </div>
</template>
<style>
  .personalInfo{
    width:100%;
    height:100px;
    background-image: url("../images/personBg.jpg");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .personalInfo-wrap:after{
    display: block;
    content: '';
    visibility: hidden;
    clear: both;
  }
  .personalInfo-wrap,.person-detail{
    width:80%;
    margin:0 auto;
  }
  .personalInfo .portrait img{
    width:100px;
    height:100px;
    margin-top: 20px;
  }
  .more-info{
    width:85%;
    box-sizing: border-box;
    margin-top: 20px;
    float:left;
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
</style>
<script>
  import Page from './components/module/Page.vue'
  export default {
    data () {
      return {
        person: {
          name: '学生乙',
          portrait: 'https://gss0.baidu.com/8_BXsjip0QIZ8tyhnq/timg?wh_rate=0&wapiknow&quality=100&size=w250&sec=0&di=755e2d919a2414a6a2de820f555d44ae&src=http%3A%2F%2Fiknow02.bosstatic.bdimg.com%2Fzhidaoribao%2F2016%2F1221%2Fdz.jpg',
          signature: '技术改变未来',
          subject: ''
        },
        showModule: 1,
        formAlignRight: {
          name: '',
          wechat: '',
          qq: '',
          phone: '',
          desc: ''
        },
        fileList: [{name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
      }
    },
    methods: {
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
      }
    },
    components: {
      Page: Page
    }
  }
</script>
