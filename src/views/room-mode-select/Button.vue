<template>
  <div
    class="numpad-wrap"
    @touchstart.prevent="start"
    @touchend.prevent="end"
    :class="{active:isPressDown}"
  >
    <div class="numpad-center">
      <slot name="title"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BtnNumPad',
  data () {
    return {
      isPressDown: false
    }
  },
  methods: {
    start () {
      this.isPressDown = true
      this.$emit('start')
    },
    end () {
      this.isPressDown = false
      this.$emit('end')
    }
  }
}
</script>
<style lang='less' scoped>
.numpad-wrap {
  background-color: #303544;
  height: 60px;
  width: 140px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  &.active {
    background-color: #006eff;
  }
  .numpad-center {
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
