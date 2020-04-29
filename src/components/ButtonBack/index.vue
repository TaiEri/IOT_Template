<template>
  <el-button type="info" @click="goback"></el-button>
</template>
<script>
export default {
  name: 'ArlButtonBack',
  methods: {
    goback () {
      this.$router.replace('/home')
    }
  }
}
</script>
<style lang='less' scoped>
.el-button {
  font-size: 16px;
  background-image: url('../../assets/images/back.png');
  background-size: 40% 90%;
  background-position-x: center;
  background-repeat: no-repeat;
  background-color: #2c2f37;
  border: none;
  height: 25px;
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
