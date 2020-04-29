<template>
  <div class="room-mode-wrap">
    <div class="mode-container">
      <div class="mode-title">
        <arl-button-back v-if="chooseDivideBtn" />
        <span>请选择房间模式</span>
      </div>
      <div class="mode-merge">
        <p>合房模式</p>
        <div class="merge-container">
          <btn-num-pad
            class="merge-item"
            @end="chooseRoomMode('720c5604-09d7-11ea-9a74-0cda411d07a3')"
          >
            <span slot="title">报告厅</span>
          </btn-num-pad>
        </div>
      </div>
      <div class="mode-sepatate">
        <p>分房模式</p>
        <div class="sepatate-container">
          <btn-num-pad
            class="sepatate-item"
            @end="chooseRoomMode('1e8926ce-1017-11ea-84d1-0cda411d07a3')"
          >
            <span slot="title">Room1</span>
          </btn-num-pad>
          <btn-num-pad
            class="sepatate-item"
            @end="chooseRoomMode('1e8acd58-1017-11ea-84d1-0cda411d07a3')"
          >
            <span slot="title">Room2</span>
          </btn-num-pad>
          <btn-num-pad
            class="sepatate-item"
            @end="chooseRoomMode('1e8c75a4-1017-11ea-84d1-0cda411d07a3')"
          >
            <span slot="title">Room3</span>
          </btn-num-pad>
        </div>
      </div>
      <div class="mode-bottom">
        <span>请注意:当您选择以上任意模式时,其余控制iPad将同步切换至该模式,请谨慎操作.</span>
      </div>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
      :show-close="false"
    >
      <span slot="title" class="icon">
        <i></i>
      </span>
      <h3>房间模式</h3>
      <div class="content">
        <p>请确认是否切换房间模式</p>
        <p>请注意:其余控制iPad将同步切换至该模式</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="jumpToMode">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { pushMessage } from '../../socket/index'
import { mapState } from 'vuex'
import BtnNumPad from './Button'
export default {
  components: { BtnNumPad },
  data () {
    return {
      roomId: '',
      dialogVisible: false
    }
  },
  computed: {
    ...mapState({
      connection_token: state => state.connection_token,
      chooseDivideBtn: state => state.chooseDivideBtn
    }),
    currentRoom () {
      return localStorage.getItem('room_flag')
    }
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
    chooseRoomMode (guid) {
      this.dialogVisible = true
      this.roomId = guid
    },
    socketCallback (data) {
    },
    handleClose (done) {
    },
    jumpToMode () {
      // 手动选择分房
      this.$store.dispatch('updateDevideStatus', true)
      // 发送会议室信息
      this.$loading({ fullscreen: true, text: '模式转换中...', background: 'rgba(0, 0, 0, 0.8)' })
      // 本地切换模式
      localStorage.setItem('room_id', this.roomId)
      let roomFlag = ''
      let roomName = ''
      if (this.roomId === '720c5604-09d7-11ea-9a74-0cda411d07a3') {
        roomName = '一楼报告厅'
        roomFlag = '1f'
      } else if (this.roomId === '1e8926ce-1017-11ea-84d1-0cda411d07a3') {
        roomName = '一楼报告厅1号会议室'
        roomFlag = '1f-1'
      } else if (this.roomId === '1e8acd58-1017-11ea-84d1-0cda411d07a3') {
        roomName = '一楼报告厅2号会议室'
        roomFlag = '1f-2'
      } else if (this.roomId === '1e8c75a4-1017-11ea-84d1-0cda411d07a3') {
        roomName = '一楼报告厅3号会议室'
        roomFlag = '1f-3'
      }
      localStorage.setItem('room_name', roomName)
      localStorage.setItem('room_flag', roomFlag)
      // 跳转到主页
      this.$router.replace('/')
      pushMessage({
        type: 'info',
        control_info: 'control_info',
        use_room_list: [localStorage.getItem('room_id')],
        connection_token: this.connection_token
      }, this.socketCallback)
    }
  },
  mounted () {
  },
  beforeDestroy () {
    this.dialogVisible = false
  }
}
</script>
<style lang='less'>
@import "../../styles/public.less";
.room-mode-wrap {
  .size(100%, 100%);
  background-image: url("../../assets/images/login_bg.png");
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  .mode-container {
    .size(70%, 80%);
    box-sizing: border-box;
    // border: 1px red solid;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    .mode-title {
      flex: 2;
      position: relative;
      .el-button {
        position: absolute;
        top: 25%;
        left: 50px;
      }
      & > span {
        position: absolute;
        right: 10%;
        top: 40%;
        font-size: 40px;
      }
    }
    .mode-merge {
      flex: 3;
      display: flex;
      flex-direction: column;
      & > p {
        font-size: 20px;
        color: #767d85;
        box-sizing: border-box;
        padding-left: 50px;
      }
      .merge-container {
        flex: 1;
        box-sizing: border-box;
        padding-left: 50px;
        padding-top: 25px;
        display: flex;
        // align-items: center;
        .merge-item {
          .size(160px, 120px);
          background-color: #2f333a;
          border-radius: 16px;
          display: flex;
          justify-content: center;
          align-items: center;
          &.active {
            background-color: #006eff;
          }
          span {
            font-size: 26px;
          }
        }
      }
    }
    .mode-sepatate {
      flex: 3;
      display: flex;
      flex-direction: column;
      & > p {
        font-size: 20px;
        color: #767d85;
        box-sizing: border-box;
        padding-left: 50px;
      }
      .sepatate-container {
        flex: 1;
        box-sizing: border-box;
        padding-left: 50px;
        padding-top: 25px;
        display: flex;
        // align-items: center;
        .sepatate-item {
          .size(160px, 120px);
          margin-right: 40px;
          background-color: #2f333a;
          border-radius: 16px;
          display: flex;
          justify-content: center;
          align-items: center;
          &.active {
            background-color: #006eff;
          }
          span {
            font-size: 26px;
          }
        }
      }
    }
    .mode-bottom {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      & > span {
        color: #767d85;
      }
    }
  }
  .el-dialog__wrapper {
    .el-dialog {
      height: 400px;
      margin-top: 30vh !important;
      background-color: #292b33 !important;
      display: flex;
      flex-direction: column;
      .el-dialog__header {
        flex: 1;
        position: relative;
        .icon {
          position: absolute;
          right: 40px;
          height: 30px;
          width: 30px;
          & > i {
            display: inline-block;
            height: 30px;
            width: 30px;
            background-image: url("../../assets/images/模式切换icon.png");
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }
        }
      }
      .el-dialog__body {
        padding: 0;
        height: 280px;
        display: flex;
        flex-direction: column;
        & > h3 {
          flex: 2;
          text-align: center;
          font-weight: bold;
          font-size: 30px;
          color: #ffffff;
        }
        .content {
          flex: 3;
          & > p {
            text-align: center;
            font-size: 20px;
            color: #9fa0a1;
            margin-bottom: 20px;
          }
        }
      }
      .el-dialog__footer {
        padding: 10px 20px 50px;
        flex: 2;
        .dialog-footer {
          display: flex;
          justify-content: space-around;
          .el-button {
            width: 130px;
            height: 50px;
            & > span {
              font-size: 20px;
              color: #ffffff;
            }
            &:nth-child(1) {
              background-color: #313543;
              border: none;
            }
            &:nth-child(2) {
              background-color: #2971f6;
              border: none;
            }
          }
        }
      }
    }
  }
}
</style>
