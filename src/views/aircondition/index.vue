<template>
  <div class="airCondition-wrap">
    <div class="top">
      <div class="left">
        <arl-button-back />
      </div>
      <div class="center"></div>
      <div class="right"></div>
    </div>
    <div class="airCondition-main"></div>
  </div>
</template>
<script>
export default {
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>
<style lang='less' scoped>
.airCondition-wrap {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
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
  .airCondition-main {
    flex: 1;
    display: flex;
    box-sizing: border-box;
    padding-top: 50px;
  }
}
</style>
