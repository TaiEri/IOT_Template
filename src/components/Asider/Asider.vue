<template>
  <div class="aside-wrap">
    <div class="logo">
      <i class="logo-pic" @click.prevent="alertUDID"></i>
      <span class="roomName">| &nbsp;&nbsp;{{roomName}}</span>
      <!-- <span>| EP 3002</span> -->
      <span class="logout" @click="logout" v-if="currentRoom!=='3f'&&currentRoom!=='4f'">
        <i class="logout-icon"></i>
      </span>
    </div>
    <div class="user">
      <span class="user-title">{{user}}</span>
    </div>
    <div class="device-info">
      <div class="temperature">
        <div class="left">
          <arl-button @start="start('reduce')">
            <i class="el-icon-minus" slot="icon"></i>
          </arl-button>
        </div>
        <div class="center">
          <div class="setting">
            <div :class="['setting-num',{'length':tempLength}]">
              <span>{{temp}}</span>
              <img src="../../assets/images/asiderMenu/摄氏度.png" alt />
              <!-- <span>℃</span> -->
            </div>
            <span>设定温度</span>
          </div>
          <div class="indoor">
            <span>室内温度: {{currentTemp}}℃</span>
          </div>
        </div>
        <div class="right">
          <arl-button @start="start('add')">
            <i class="el-icon-plus" slot="icon"></i>
          </arl-button>
        </div>
      </div>
    </div>
    <div class="aside-main">
      <el-row class="tac">
        <el-col :span="24">
          <el-menu :default-active="menuIndex" class="el-menu-vertical-demo" @select="chooseMenu">
            <el-menu-item index="video" v-if="currentRoom!=='1f-2'&&currentRoom!=='1f-3'">
              <!-- <i class="iconfont icon-huiyishi"></i> -->
              <span class="icon-video-wrap">
                <i class="icon-video"></i>
              </span>
              <span slot="title">
                <div>
                  <b>视频会议</b>
                  <br />
                  <span>Video conference</span>
                </div>
              </span>
            </el-menu-item>
            <el-menu-item index="local">
              <!-- <i class="iconfont icon-huiyishi"></i> -->
              <span class="icon-local-wrap">
                <i class="icon-local"></i>
              </span>
              <span slot="title">
                <div>
                  <b>本地会议</b>
                  <br />
                  <span>Local meeting</span>
                </div>
              </span>
            </el-menu-item>
            <el-menu-item index="rest">
              <!-- <i class="iconfont icon-dengchu"></i> -->
              <span class="icon-rest-wrap">
                <i class="icon-rest"></i>
              </span>
              <span slot="title">
                <div>
                  <b>休闲模式</b>
                  <br />
                  <span>Leisure mode</span>
                </div>
              </span>
            </el-menu-item>
            <el-menu-item index="leave">
              <!-- <i class="iconfont icon-dengchu"></i> -->
              <span class="icon-leave-wrap">
                <i class="icon-leave"></i>
              </span>
              <span slot="title">
                <div>
                  <b>离开模式</b>
                  <br />
                  <span>Leave mode</span>
                </div>
              </span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <div class="air">
      <span>空气质量</span>
      <!-- <span>pm2.5: {{pm}} μg/m3</span> -->
      <div class="textBox">
        <transition name="slide">
          <p class="text" :key="text.id">{{text.val}}</p>
        </transition>
      </div>
    </div>
    <div class="version">
      <span>V 1.0</span>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { GUIDS } from '../../utils/constant'
import { pushMessage } from '../../socket/index'
export default {
  name: 'ArlAsider',
  components: {
  },
  data () {
    return {
      temp: 30,
      currentTemp: 0,
      maxTemp: 30,
      minTemp: 20,
      pm: '2.5',
      user: '',
      choose: '',
      menuIndex: '',
      timer: 0, // 计时器
      timer2: 0,
      clickCount: 0,
      number: 0
    }
  },
  computed: {
    ...mapState({
      airConditionInfo: state => state.airConditionInfo,
      modeInfo: state => state.modeInfo,
      inductorInfo: state => state.inductorInfo,
      connection_token: state => state.connection_token,
      roomName: state => state.roomName,
      device_UDID: state => state.device_UDID
    }),
    currentRoom () {
      return localStorage.getItem('room_flag')
    },
    TOTAL_GUIDS () {
      if (this.currentRoom === '4f') {
        return GUIDS.FOURTH_FLOOR_GUIDS
      } else if (this.currentRoom === '3f') {
        return GUIDS.THIRD_FLOOR_GUIDS
      } else if (this.currentRoom === '1f') {
        return GUIDS.FIRST_FLOOR_GUIDS
      } else if (this.currentRoom === '1f-1') {
        return GUIDS.FIRST_FLOOR_ROOM1_GUIDS
      } else if (this.currentRoom === '1f-2') {
        return GUIDS.FIRST_FLOOR_ROOM2_GUIDS
      } else if (this.currentRoom === '1f-3') {
        return GUIDS.FIRST_FLOOR_ROOM3_GUIDS
      }
      return 0
    },
    tempLength () {
      const temp = this.temp.toString()
      return temp.length > 2
    },
    text () {
      if (this.inductorInfo.length > 0 && this.inductorInfo[this.number].status) {
        const data = this.inductorInfo[this.number].status.split('-')
        return {
          id: this.number,
          val: this.inductorInfo[this.number].name + ' : ' + data[0] + ' ' + data[1]
        }
      } else {
        return {
          id: 0,
          val: ''
        }
      }
    },
    currentRoomName () {
      return localStorage.getItem('room_name')
    }
  },
  methods: {
    alertUDID () {
      this.clickCount++
      if (this.clickCount === 6) {
        alert(this.device_UDID)
        this.clickCount = 0
      }
    },
    start (type) {
      if (type === 'add') {
        this.temp += this.temp < this.maxTemp ? 0.5 : 0
        // this.temp += 1
      } else if (type === 'reduce') {
        this.temp -= this.temp > this.minTemp ? 0.5 : 0
        // this.temp -= 1
      }
      const info = this.airConditionInfo.filter(item => item.guid === this.TOTAL_GUIDS.TEMP_BAR)[0]
      const _this = this
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        pushMessage({
          type: 'control',
          guid: info.guid,
          meeting_room_guid: info.meeting_room_guid,
          event_type: _this.temp,
          connection_token: _this.connection_token
        }, this.socketCallback)
      }, 2000)
      pushMessage({
        type: 'control',
        guid: info.guid,
        meeting_room_guid: info.meeting_room_guid,
        event_type: _this.temp,
        control_flag: 3,
        connection_token: _this.connection_token
      }, this.socketCallback)
    },
    // 登出
    logout () {
      this.$store.dispatch('updateDivideBtn', true)
      this.$router.replace('/room_mode')
    },
    // 选择菜单
    async chooseMenu (index, indexPath) {
      this.menuIndex = ''
      const _this = this
      let info
      this.$confirm('此操作将转换另一种模式, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true
      }).then(() => {
        if (index.includes('leave')) {
          info = _this.modeInfo.filter(item => item.guid === _this.TOTAL_GUIDS.LEAVE_MODE)[0]
        } else if (index.includes('local')) {
          info = _this.modeInfo.filter(item => item.guid === _this.TOTAL_GUIDS.LOCAL_MODE)[0]
        } else if (index.includes('rest')) {
          info = _this.modeInfo.filter(item => item.guid === _this.TOTAL_GUIDS.REST_MODE)[0]
        } else if (index.includes('video')) {
          info = _this.modeInfo.filter(item => item.guid === _this.TOTAL_GUIDS.VIDEO_MODE)[0]
        }
        console.log(info)
        // pushMessage({
        //   type: 'control',
        //   guid: info.guid,
        //   event_type: 'click',
        //   meeting_room_guid: info.meeting_room_guid,
        //   status: info.status,
        //   connection_token: _this.connection_token
        // }, this.socketCallback)
      }).catch(() => {
        if (_this.modeInfo.some(item => item.status === 'on')) {
          _this.modeInfo.forEach(item => {
            if (item.status === 'on') {
              switch (item.guid) {
                case _this.TOTAL_GUIDS.VIDEO_MODE:
                  _this.menuIndex = 'video'
                  break
                case _this.TOTAL_GUIDS.LOCAL_MODE:
                  _this.menuIndex = 'local'
                  break
                case _this.TOTAL_GUIDS.REST_MODE:
                  _this.menuIndex = 'rest'
                  break
                case _this.TOTAL_GUIDS.LEAVE_MODE:
                  _this.menuIndex = 'leave'
                  break
                default:
                  break
              }
            }
          })
          console.log(_this.menuIndex)
        } else {
          _this.menuIndex = `/${Math.random()}`
        }
      })
    },
    socketCallback (data) {
      // console.log(data)
    },
    startMove () {
      // eslint-disable-next-line
      this.timer2 = setTimeout(() => {
        if (this.number === this.inductorInfo.length - 1) {
          this.number = 0
        } else {
          this.number += 1
        }
        this.startMove()
      }, 8000) // 滚动不需要停顿则将2000改成动画持续时间
    }
  },
  beforeDestroy () {
    clearTimeout(this.timer2)
  },
  mounted () {
    // let decryptInfo = CryptoJS.AES.decrypt(localStorage.getItem('userInfo'), 'aura')
    // let userInfo = JSON.parse(decryptInfo.toString(CryptoJS.enc.Utf8))
    // this.user = JSON.parse(localStorage.getItem('userInfo')).user
    this.user = JSON.parse(sessionStorage.getItem('userInfo')).user
    this.startMove()
  },
  watch: {
    modeInfo: {
      handler (newValue) {
        console.log('模式变化')
        const _this = this
        // 启动同步mode
        newValue.forEach(item => {
          if (item.status === 'on') {
            console.log('默认打开', newValue)
            switch (item.guid) {
              case _this.TOTAL_GUIDS.VIDEO_MODE:
                _this.menuIndex = 'video'
                break
              case _this.TOTAL_GUIDS.LOCAL_MODE:
                _this.menuIndex = 'local'
                break
              case _this.TOTAL_GUIDS.REST_MODE:
                _this.menuIndex = 'rest'
                break
              case _this.TOTAL_GUIDS.LEAVE_MODE:
                _this.menuIndex = 'leave'
                break
              default:
                break
            }
          }
        })
      },
      deep: true
    },
    airConditionInfo: {
      handler (newValue) {
        this.currentTemp = newValue.filter(item => item.guid === this.TOTAL_GUIDS.TEMP_CURRENT)[0].status
        this.temp = newValue.filter(item => item.guid === this.TOTAL_GUIDS.TEMP_BAR)[0].status
        this.minTemp = newValue.filter(item => item.guid === this.TOTAL_GUIDS.TEMP_BAR)[0].min_value
        this.maxTemp = newValue.filter(item => item.guid === this.TOTAL_GUIDS.TEMP_BAR)[0].max_value
      },
      deep: true
    },
    inductorInfo: {
      handler (newValue) {
        // this.pm = newValue.filter(item => item.guid === this.TOTAL_GUIDS.PM)[0].status
      },
      deep: true
    }
  }
}
</script>
<style lang='less'>
.el-aside {
  .aside-wrap {
    height: 100%;
    color: white;
    display: flex;
    flex-direction: column;
    background-color: #24262e;
    .logo {
      height: 32px;
      line-height: 32px;
      // text-align: center;
      display: flex;
      align-items: center;
      .logo-pic {
        display: inline-block;
        height: 36px;
        width: 36px;
        // TODO 要配置logo
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin: 0 5px 0 12px;
      }
      .roomName {
        // flex: 1;
        box-sizing: border-box;
        padding-left: 12px;
        width: 185px;
        // height: 48px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .logout {
        flex: 1;
        // display: inline-block;
        height: 36px;
        // width: 12px;
        color: #006eff;
        text-align: center;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        .logout-icon {
          display: inline-block;
          height: 24px;
          width: 24px;
          background-image: url("../../assets/images/asiderMenu/房间切换_未选中.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    .user {
      margin-bottom: 10px;
      height: 48px;
      line-height: 48px;
      display: flex;
      justify-content: center;
      .user-title {
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 120px;
        text-align: center;
      }
    }
    .meeting-status {
      height: 60px;
      // line-height: 60px;
      text-align: center;
      .title {
        font-size: 16px;
        vertical-align: middle;
      }
      .status {
        display: inline-block;
        height: 18px;
        width: 18px;
        background-color: #555b68;
        border-radius: 11px;
        vertical-align: middle;
        &.active {
          background-color: #0dc573;
        }
      }
    }
    .device-info {
      // margin-bottom: 32px;
      .temperature {
        // height: 180px;
        height: 200px;
        display: flex;
        .left {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding-bottom: 70px;
          .count-wrap {
            height: 30px;
            width: 30px;
            background: #3c445a;
            color: #9ea2ad;
          }
        }
        .center {
          flex: 2;
          // border: solid 1px #444b57;
          display: flex;
          flex-direction: column;
          // align-items: center;
          // justify-content: center;
          // padding-top:30px;
          .setting {
            height: 120px;
            width: 120px;
            // flex: 1;
            border: solid 5px #afb7c8;
            border-radius: 50%;
            background-color: #e3e7f1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: #323644;
            position: relative;
            .setting-num {
              margin-bottom: 12px;
              margin-top: 10px;
              img {
                width: 20px;
                height: 20px;
                position: absolute;
                top: 22%;
                right: 15%;
              }
              span {
                letter-spacing: 0px;
                &:nth-child(1) {
                  // font-size: 38px;
                  font-size: 45px;
                  font-weight: bold;
                }
                &:nth-child(2) {
                  vertical-align: top;
                }
              }
              &.length {
                img {
                  top: 19%;
                  right: 10%;
                }
                span {
                  &:nth-child(1) {
                    font-size: 50px;
                    font-weight: bold;
                  }
                }
              }
            }
            span {
              font-size: 40px;
              letter-spacing: 2px;
            }
          }
          .indoor {
            // background: red;
            font-size: 14px;
            height: 44px;
            line-height: 66px;
            // font-size: 14px;
            text-align: center;
            width: 100%;
          }
        }
        .right {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding-bottom: 70px;
          .count-wrap {
            height: 30px;
            width: 30px;
            background: #3c445a;
            color: #9ea2ad;
          }
        }
      }
    }
    .aside-main {
      flex: 1;
      .tac {
        .el-menu {
          border: 0;
          background-color: #262932;
          .el-menu-item {
            color: white;
            height: 80px;
            background-color: #262932;
            display: flex;
            align-items: center;
            box-sizing: border-box;
            padding-left: 27px !important;
            border-bottom: 1px solid #444b57;
            .icon-video-wrap {
              width: 52px;
              .icon-video {
                display: inline-block;
                // flex: 1;
                height: 30px;
                width: 30px;
                background-image: url("../../assets/images/asiderMenu/icon_视频会议.png");
                background-repeat: no-repeat;
                background-size: 100% 100%;
              }
            }
            .icon-local-wrap {
              width: 52px;
              .icon-local {
                display: inline-block;
                // flex: 1;
                height: 30px;
                width: 30px;
                background-image: url("../../assets/images/asiderMenu/icon_本地会议.png");
                background-repeat: no-repeat;
                background-size: 100% 100%;
              }
            }
            .icon-rest-wrap {
              width: 52px;
              .icon-rest {
                display: inline-block;
                // flex: 1;
                height: 30px;
                width: 30px;
                background-image: url("../../assets/images/asiderMenu/icon_休闲模式.png");
                background-repeat: no-repeat;
                background-size: 100% 100%;
              }
            }
            .icon-leave-wrap {
              width: 52px;
              .icon-leave {
                display: inline-block;
                // flex: 1;
                height: 30px;
                width: 30px;
                background-image: url("../../assets/images/asiderMenu/icon_离开模式.png");
                background-repeat: no-repeat;
                background-size: 100% 100%;
              }
            }

            &.is-active {
              background-color: #006eff;
              span {
                span {
                  color: white;
                }
              }
            }
            .el-icon-menu {
            }
            span {
              line-height: 20px;
              b {
                font-size: 18px;
                margin-bottom: 10px;
                display: inline-block;
              }
              span {
                font-size: 15px;
                color: #555b68;
              }
            }
          }
        }
      }
    }
    .air {
      height: 60px;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      padding-left: 40px;
      span {
        // flex: 1;
        font-size: 18px;
        // text-align: center;
        &:nth-child(2) {
          margin-top: 12px;
          color: #59be79;
        }
      }
      .textBox {
        width: 100%;
        height: 40px;
        margin: 0 auto;
        overflow: hidden;
        position: relative;
        .text {
          z-index: 2000;
          font-size: 16px;
          width: 100%;
          height: 26px;
          position: absolute;
          color: #59be79;
          bottom: 0;
        }
      }
      .slide-enter-active,
      .slide-leave-active {
        transition: all 0.5s linear;
      }
      .slide-enter {
        transform: translateY(20px) scale(1);
        opacity: 1;
      }
      .slide-leave-to {
        transform: translateY(-20px) scale(0.8);
        opacity: 0;
      }
    }
    .version {
      position: relative;
      height: 24px;
      span {
        position: absolute;
        right: 16px;
        color: gray;
      }
    }
  }
}
.el-message-box__wrapper {
  .el-message-box {
    border: none;
    background-color: #292b33;
    height: 300px;
    width: 500px;
    .el-message-box__header {
      height: 20%;
      .el-message-box__title {
        span {
          color: #fbfbfb;
          font-size: 30px;
        }
      }
    }
    .el-message-box__content {
      height: 30%;
      .el-message-box__message {
        p {
          font-size: 20px;
          color: #fbfbfb;
        }
      }
    }
    .el-message-box__btns {
      display: flex;
      justify-content: space-around;
      .el-button {
        height: 40px;
        width: 120px;
        border: none;
        span {
          font-size: 18px;
        }
      }
      .el-button:nth-child(2) {
        background-color: #2971f6;
      }
    }
  }
}
</style>
