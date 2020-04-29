<template>
  <div class="video-switch-wrap">
    <div class="top">
      <div class="left">
        <arl-button-back />
      </div>
      <div class="center"></div>
      <div class="right"></div>
    </div>
    <div class="video-switch-main"></div>
  </div>
</template>
<script>
export default {
  name: 'VideoSwitch',
  components: {},
  data () {
    return {
    }
  },
  watch: {
  },
  computed: {
  },
  created () {
  },
  methods: {
  },
  mounted () {
  }
}
</script>
<style lang='less' scoped>
@import "../../styles/public.less";
.video-switch-wrap {
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
    }
  }
  .video-switch-main {
    flex: 1;
    .flex-center();
    flex-direction: column;
    box-sizing: border-box;
    padding-top: 10px;
  }
}
</style>
