<template>
  <div class="voice-wrap">
    <div class="top">
      <div class="left">
        <arl-button-back />
      </div>
      <div class="center"></div>
      <div class="right"></div>
    </div>
    <div class="voice-main"></div>
  </div>
</template>
<script>
export default {
  name: 'Voice',
  components: {
  },
  data () {
    return {
    }
  },
  created () {
  },
  computed: {
  },
  watch: {
  },
  methods: {
  }
}
</script>
<style lang='less' scoped>
@import "../../styles/public.less";
.voice-wrap {
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
      width: 60%;
      line-height: 35px;
      color: #747d8b;
    }
    .right {
      flex: 1;
      position: relative;
    }
  }
  .voice-main {
    flex: 1;
    padding-top: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
</style>
