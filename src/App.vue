<template>
  <el-container id="app">
    <router-view />
  </el-container>
</template>
<script>
export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      time: 0,
      timer: null
    }
  },
  beforeCreate () {
  },
  watch: {
    $route (to, from) {
      if (to.path === '/room_mode') {
        this.time = 0
        this.setupTimer()
      }
    }
  },
  created () {
    this.$router.replace('/login')
  },
  computed: {
  },
  methods: {
    // 息屏保护界面
    setupTimer () {
      const that = this
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        if (that.time < 5 * 60) {
          that.time++
        } else {
          clearInterval(that.timer)
          // that.timer = null
          if (this.$route.path !== '/screen_protector') {
            that.$router.push('/screen_protector')
          }
        }
      }, 1000)
    },
    callJsAlert (str) {
      this.$store.dispatch('saveUDID', str)
    }
  },
  mounted () {
    // 原生发送过来的数据
    window.callJsAlert = this.callJsAlert
    // 自启开机动画
    // const token = localStorage.getItem('user')
    // sessionStorage.setItem('isStart', 'true')
    // setTimeout(() => {
    //   this.isStart = true
    //   if (token) {
    //     // this.$router.replace('/')
    //   } else {
    //     this.$router.replace('/login')
    //   }
    // }, 3000)

    // 屏保默认启动
    const that = this
    window.ontouchstart = function () {
      that.time = 0
      that.setupTimer()
    }
    this.setupTimer()
  }
}
</script>
<style lang="less">
@import "./styles/public.less";
#app {
  .size(100%, 100%);
  position: relative;
}
.video__preset_position.el-popper {
  background: #21222a;
  opacity: 0.8;
  margin-top: 0;
  border: none;
  .popper__arrow {
    display: none;
  }
  ul {
    padding: 0;
    li {
      color: #b5b6ba;
      background: #21222a;
      &.selected {
        color: #fff;
        background: #21222a;
        font-weight: 700;
      }
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
* {
  .user-select();
}
input {
  user-select: auto;
}
</style>
