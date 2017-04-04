<template>
    <div class="item-edit">
      <h1>习题编辑</h1>
      <div class="edit-wrap">
        <el-form :model="practice" label-width="150px">
          <el-form-item label="章节名称">
            <el-input v-model="practice.belong"></el-input>
          </el-form-item>
          <el-form-item label="题目描述">
            <el-input type="textarea" placeholder="最大500字" v-model="practice.content"></el-input>
          </el-form-item>
          <el-form-item label="题目选项">
            <el-input type="textarea" placeholder="每条选项最大150字,例：***，***，***" v-model="practice.choice" placa></el-input>
          </el-form-item>
          <el-form-item label="正确答案">
            <el-input v-model="practice.correctChoice" placeholder="例：A，B，C"></el-input>
          </el-form-item>
          <el-form-item label="答案解释">
            <el-input type="textarea" placeholder="最大250字" v-model="practice.explain"></el-input>
          </el-form-item>
        </el-form>
        <el-button class="top-btn pull-right" type="primary" @click="updateItem">确定更新</el-button>
      </div>
    </div>
</template>
<style>
  .item-edit h1{
    text-align: center;
    font-weight: 500;
    margin:30px 0;
  }
  .edit-wrap{
    width:1000px;
    margin:0 auto;
  }
</style>
<script>
    export default{
      data () {
        return {
          practice: {
            content: '',
            choice: '',
            correctChoice: '',
            explain: '',
            belong: ''
          }
        }
      },
      created () {
        this.getEditItemInfo()
      },
      methods: {
        getUrl () {
          return this.$store.state.basicUrl
        },
        popTip (title, tips) {
          this.$alert(tips, title, {
          })
        },
        getEditItemInfo () {
          var self = this
          var params = {}
          var name, value
          var str = window.location.href
          var num = str.indexOf('?')
          str = str.substr(num + 1)
          var arr = str.split('&')
          for (var i = 0; i < arr.length; i++) {
            num = arr[i].indexOf('=')
            if (num > 0) {
              name = arr[i].substring(0, num)
              value = arr[i].substr(num + 1)
              params[name] = value
            }
          }
          var itemId = params.itemId || ''
          this.$http.post(self.getUrl() + '/admin/showOneItem', {itemId: itemId}).then((response) => {
            if (response.status === 200) {
              if (response.data.status === 1) {
                console.log('----------', response.data)
                var temp = response.data.item
                var str = ''
                for (var i = 0; i < temp.choice.length; i++) {
                  var op = temp.choice[i].option
                  str = str + op.split(':')[1]
                }
                str = str.trim()
                str = str.replace(/\s/ig, ',')
                temp.choice = str
                temp.correctChoice = temp.correctChoice.join(',')
                self.practice = temp
              } else {
                self.popTip(response.data.mes)
              }
            }
          }, (response) => {
              // error callback
          })
        },
        updateItem () {
          var self = this
          this.$http.post(self.getUrl() + '/admin/updateItem', {item: self.practice}).then((response) => {
            if (response.status === 200) {
              if (response.data.status === 1) {
                self.popTip(response.data.mes)
                window.location.href = '/#/adminIndex'
              } else {
                self.popTip(response.data.mes)
              }
            }
          }, (response) => {
            // error callback
          })
        }
      }
    }
</script>
