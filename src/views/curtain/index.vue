<template>
  <div class="curtain-wrap">
    <div class="top">
      <div class="left">
        <arl-button-back />
      </div>
      <div class="center"></div>
      <div class="right"></div>
    </div>
    <div class="curtain-main"></div>
  </div>
</template>
<script>
export default {
  name: 'Curtain',
  components: {
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  computed: {
  },
  methods: {
  }
}
</script>
<style lang='less' scoped>
.curtain-wrap {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: #24262e;
  & > .top {
    height: 50px;
    display: flex;
    color: white;
    .left {
      flex: 1;
    }
    .center {
      width: 65%;
      line-height: 35px;
      color: #747d8b;
    }
    .right {
      flex: 1;
      line-height: 35px;
      display: flex;
      margin-top: 10px;
    }
  }
  .curtain-main {
    flex: 1;
    display: flex;
    box-sizing: border-box;
    padding-top: 20px;
  }
}
</style>
