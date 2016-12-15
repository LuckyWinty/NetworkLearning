<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="hot">
      <h3 class="ui large header">最热学习榜</h3>
    <div class="hot_wrap">
      <div class="ui special cards">
        <div class="card" v-for="info in hotLists">
          <div class="blurring dimmable image">
            <div class="ui dimmer transition hidden">
              <div class="content">
                <div class="center">
                  <div class="ui inverted button">进入学习</div>
                </div>
              </div>
            </div>
            <img v-bind:src="info.imgUrl">
          </div>
          <div class="content">
            <a class="header">{{info.title}}</a>
            <div class="meta">
              <span class="date">{{info.desc}}</span>
            </div>
          </div>
          <div class="extra content">
            <a><i class="users icon"></i>{{info.focus}}人关注</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'hot-learn',
    data () {
      return {
        hotLists: [{
          id: '123',
          imgUrl: 'http://img.mukewang.com/529dc3380001379906000338-240-135.jpg',
          level: '初',
          title: '网络安全',
          desc: '8小时带领大家步步深入学习标签的基础知识，掌握各种样式的基本用法。',
          focus: '2000'
        },
        {
          id: '124',
          imgUrl: 'http://img.mukewang.com/529dc3380001379906000338-240-135.jpg',
          level: '初',
          title: '网络安全',
          desc: '8小时带领大家步步深入学习标签的基础知识，掌握各种样式的基本用法。',
          focus: '2000'
        }]
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
