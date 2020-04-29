<template>
  <div class="bulb-wrap">
    <div class="top">
      <div class="left">
        <arl-button-back />
      </div>
      <div class="center">
        <!-- <span>提示：点击灯光点亮</span> -->
      </div>
      <div class="right"></div>
    </div>
    <div class="bulb-main"></div>
  </div>
</template>
<script>
export default {
  name: 'Bulb',
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
  },
  created () {
  },
  watch: {
  }
}
</script>
<style lang='less'>
@import "../../styles/public.less";
.bulb-wrap {
  display: flex;
  flex-direction: column;
  .size(100%, 100%);
  background-color: #24262e;
  & > .top {
    height: 35px;
    display: flex;
    color: white;
    .left {
      flex: 1;
    }
    .center {
      width: 70%;
      line-height: 35px;
      color: #747d8b;
    }
    .right {
      flex: 1;
      line-height: 35px;
      position: relative;
    }
  }
  .bulb-main {
    flex: 1;
    position: relative;
    box-sizing: border-box;
    padding-top: 40px;
  }
}
</style>
