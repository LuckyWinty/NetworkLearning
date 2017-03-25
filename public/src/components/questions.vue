<template>
  <div class="questions-container">
    <div class="search">
      <el-input class="inline"></el-input>
      <el-button class="search-btn" type="primary" icon="search">搜索</el-button>
    </div>
    <el-row :gutter="20">
      <el-col :span="6" class="left-notes">
        <div class="grid-content bg-purple">
          <el-tree :data="data"
                   :highlight-current="true"
                   node-key="id"
                   :default-expanded-keys="[1]"
                   :current-node-key="2"
                   @node-click="handleNodeClick"></el-tree>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple">
          <div class="question-list">
             <singleSelect :questionList="questionList"></singleSelect>
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
          id: 1,
          label: '概述',
          children: [{
            id: 2,
            label: '因特网的组成'
          }, {
            id: 3,
            label: '计算机网络的类别'
          }, {
            id: 4,
            label: '计算机网络的性能'
          }, {
            id: 5,
            label: '计算机网络体系结构'
          }]
        }, {
          id: 6,
          label: '物理层',
          children: [{
            id: 7,
            label: '物理层基本概念'
          }, {
            id: 8,
            label: '数据通信基础'
          }, {
            id: 9,
            label: '物理层下面的传输媒介'
          }, {
            id: 10,
            label: '信道复用技术'
          }]
        }, {
          id: 11,
          label: '数据链路层',
          children: [{
            id: 12,
            label: '数据链路层概念'
          }, {
            id: 13,
            label: '点对点协议PPP'
          }, {
            id: 14,
            label: '广播信道'
          }, {
            id: 15,
            label: '以太网扩展'
          }]
        }, {
          id: 16,
          label: '网络层',
          children: [{
            id: 17,
            label: '网络层概念'
          }, {
            id: 18,
            label: '网络协议IP'
          }, {
            id: 19,
            label: '子网和超网'
          }, {
            id: 20,
            label: '路由和IP'
          }]
        }, {
          id: 21,
          label: '运输层',
          children: [{
            id: 22,
            label: '运输层概念'
          }, {
            id: 23,
            label: '数据报协议UDP'
          }, {
            id: 24,
            label: '传输控制协议TCP'
          }, {
            id: 25,
            label: '可靠传输工作原理'
          }]
        }, {
          id: 26,
          label: '应用层',
          children: [{
            id: 27,
            label: '文件传输协议FTP'
          }, {
            id: 28,
            label: '点对点协议PPP'
          }, {
            id: 29,
            label: '万维网'
          }, {
            id: 30,
            label: '电子邮件'
          }]
        }, {
          id: 31,
          label: '网络安全',
          children: [{
            id: 32,
            label: '网络安全概念'
          }, {
            id: 33,
            label: '两类密码体制'
          }, {
            id: 34,
            label: '鉴别'
          }, {
            id: 35,
            label: '系统安全'
          }]
        }, {
          id: 36,
          label: '音频/视频服务',
          children: [{
            id: 37,
            label: '相关概述'
          }, {
            id: 38,
            label: '流式存储'
          }, {
            id: 39,
            label: '交互式音频/视频'
          }, {
            id: 40,
            label: '交互服务'
          }]
        }, {
          id: 41,
          label: '无线网络和移动网络',
          children: [{
            id: 42,
            label: '无线局域网WLAN'
          }, {
            id: 43,
            label: '无线个人区域网WPAN'
          }, {
            id: 44,
            label: '无线城域网WMAN'
          }, {
            id: 45,
            label: '窝蜂移动通信网'
          }]
        }, {
          id: 46,
          label: '下一代通信网',
          children: [{
            id: 47,
            label: '相关概念'
          }, {
            id: 48,
            label: 'IPV6'
          }, {
            id: 49,
            label: 'MPLS'
          }, {
            id: 50,
            label: 'P2P'
          }]
        }],
        questionList: [],
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4
      }
    },
    created () {
      this.getPractice('因特网的组成')
    },
    methods: {
      getUrl () {
        return this.$store.state.basicUrl
      },
      popTip (title, tips) {
        this.$alert(tips, title, {
        })
      },
      handleNodeClick (data) {
        this.getPractice(data.label)
      },
      getPractice (label) {
        var self = this
        self.questionList = []
        this.$http.post(self.getUrl() + '/showPractice', {belong: label}).then((response) => {
          if (response.status === 200) {
            if (response.data.status === 1) {
              self.questionList = self.questionList.concat(response.data.Items)
            } else {
              self.popTip(response.data.mes)
            }
          }
        }, (response) => {
          // error callback
        })
      },
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
