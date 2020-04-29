<template>
  <div class="room-wrap">
    <span class="title">选择房间</span>
    <el-select v-model="room" placeholder="请选择房间" v-if="roomList">
      <el-option v-for="item in roomList" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <div class="sure-btn" @click="chooseRoom">
      <span>确定</span>
    </div>
  </div>
</template>
<script>
import { pushMessage } from '../../socket/index'
import { mapState } from 'vuex'
export default {
  components: {},
  data () {
    return {
      room: ''
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo,
      roomList: state => {
        const rooms = state.room_list.map((item, index) => {
          return {
            value: item.meeting_room_guid_id,
            label: item.room_name
          }
        })
        return rooms
      }
    })
  },
  watch: {
    room (newValue) {
      console.log(newValue)
    }
  },
  methods: {
    chooseRoom () {
      // 保存选中的房间id
      localStorage.setItem('room_id', this.room)
      const _this = this
      // 保存房间标识
      const choosed = this.roomList.filter(item => item.value === _this.room)[0]
      let roomFlag = null
      console.log(choosed)
      if (choosed.value === '6271fb72-09af-11ea-9fdc-0cda411d07a3') {
        roomFlag = '4f'
      } else if (choosed.value === '55aa5902-09af-11ea-9eec-0cda411d07a3') {
        roomFlag = '3f'
      } else if (choosed.value === '720c5604-09d7-11ea-9a74-0cda411d07a3') {
        roomFlag = '1f'
      }
      localStorage.setItem('room_flag', roomFlag)
      localStorage.setItem('room_name', choosed.label)
      this.$router.replace('/')
    },
    socketCallback (data) {
      if (data.type === 'login') {
        this.$loading().close()
      }
    }
  },
  mounted () {
    const _this = this
    console.log('===========选择房间==============', _this.userInfo)
    this.$loading({ fullscreen: true, text: '获取房间信息中...', background: 'rgba(0, 0, 0, 0.8)' })
    pushMessage({
      type: 'login',
      token: _this.userInfo.token,
      user_type: 'ipad',
      user_name: _this.userInfo.user,
      user_id: _this.userInfo.user_id
    }, this.socketCallback)
  },
  beforeDestroy () {
  }
}
</script>
<style lang='less' scoped>
@import "../../styles/public.less";
.room-wrap {
  .size(100%, 100%);
  background-image: url("../../assets/images/login_bg.png");
  background-repeat: no-repeat;
  background-size: cover;
  .flex-center();
  .el-select {
    margin: 0 20px 0 20px;
  }
  .sure-btn {
    .size(80px, 40px);
    box-sizing: border-box;
    border: solid 1px white;
    border-radius: 8px;
    .flex-center();
  }
}
</style>
