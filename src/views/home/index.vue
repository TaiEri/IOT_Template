<template>
  <div class="home-wrap">
    <div class="bg"></div>
  </div>
</template>
<script>
export default {
  name: 'BusHome'
}
</script>
<style lang='less' scoped>
.home-wrap {
  position: absolute;
  height: 100%;
  width: 100%;
  .bg {
    position: relative;
    height: 100%;
    width: 100%;
    background-image: url("../../assets/images/home_bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
}
</style>
