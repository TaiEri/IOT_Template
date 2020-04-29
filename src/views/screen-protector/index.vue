<template>
  <div class="start-wrap" @click="touchScreen">
    <div class="logo-img">
      <div class="logo"></div>
    </div>
    <div class="current">
      <span class="time">{{time}}</span>
      <span class="date">{{date}} {{week}}</span>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { pushMessage } from '../../socket/index'
import { getWeek, getTime, getDate } from '../../utils/tools'
export default {
  components: {},
  data () {
    return {
      timer: null,
      time: '',
      date: '',
      week: ''
    }
  },
  computed: {
    ...mapState({
      connection_token: state => state.connection_token
    })
  },
  watch: {
    connection_token (newValue) {
      console.log('============ Token来了的时候发送info =============')
      pushMessage({
        type: 'info',
        use_room_list: [localStorage.getItem('room_id')],
        connection_token: newValue
      })
    }
  },
  methods: {
    touchScreen () {
      this.$router.back()
    }
  },
  created () {

  },
  mounted () {
    const that = this
    this.timer = setInterval(() => {
      that.time = getTime()
      that.date = getDate()
      that.week = getWeek()
    }, 1000)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>
<style lang='less' scoped>
@import "../../styles/public.less";
.start-wrap {
  .size(100%, 100%);
  background-color: #1d2023;
  flex-direction: column;
  .flex-center();
  .logo-img {
    .size(100%, 40%);
    .logo {
      margin: 0 auto;
      // TODO 需要添加图片logo
      .size(500px, 200px);
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
  }
  .current {
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    .time {
      font-size: 120px;
    }
    .date {
      font-size: 30px;
    }
  }
}
</style>
