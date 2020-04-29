<template>
  <div
    class="count-wrap"
    @touchstart.prevent="start"
    @touchmove.prevent="move"
    @touchend.prevent="end"
    :class="{active:isPressDown}"
  >
    <slot name="icon"></slot>
  </div>
</template>
<script>
export default {
  name: 'ArlButton',
  data () {
    return {
      isLongPress: false,
      timer: null,
      isPressDown: false
    }
  },
  methods: {
    start () {
      const that = this
      // 按下的时候发出按下请求
      this.$emit('start')
      console.log('按下')
      this.isPressDown = true
      // 判断是否长按,并且持续发出请求
      this.isLongPress = false
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
      this.timer = setInterval(() => {
        if (!that.isLongPress) {
          that.isLongPress = true
        }
        // 发出持续的请求
        that.$emit('hold')
        console.log('还在按着')
      }, 180)
    },
    move () {
      clearInterval(this.timer)
      this.timer = null
      console.log('移动了')
    },
    end () {
      clearInterval(this.timer)
      this.timer = null
      // 发出抬起的请求
      this.$emit('end')
      console.log('松手了')
      this.isPressDown = false
    }
  }
}
</script>
<style lang='less' scoped>
.count-wrap {
  background-color: #2e333b;
  height: 42px;
  width: 42px;
  border-radius: 21px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 18px;
  margin-bottom: 12px;
  &.active {
    background-color: #589ef8;
  }
  .count-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    span {
      flex: 1;
      font-size: 18px;
      color: white;
      i {
        font-size: 38px;
      }
    }
  }
}
</style>
