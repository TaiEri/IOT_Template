<template>
  <div class="controlBtn-wrap">
    <div class="controlBtn-center">
      <slot name="icon"></slot>
      <slot name="title"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ModuleButton',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
<style lang='less' scoped>
.controlBtn-wrap {
  background-color: #2e333b;
  height: 85px;
  width: 95px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  .controlBtn-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    span {
      flex: 1;
      font-size: 15px;
      color: white;
      i {
        font-size: 35px;
      }
    }
  }
  &.active {
    background-color: #006eff;
  }
}
</style>
