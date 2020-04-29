<template>
  <el-container>
    <el-container>
      <el-aside width="22%" class="aside">
        <arl-asider />
      </el-aside>
      <el-main class="main-container">
        <div class="bus-wrap">
          <div class="bus-main">
            <router-view />
          </div>
          <div class="bus-control">
            <!-- 会议屏 -->
            <router-link to="/confscreen">
              <ModuleButton :class="{active:activeBtn==='screen'}" @click.native="choose('screen')">
                <span slot="icon">
                  <i class="conf-screen"></i>
                </span>
                <span slot="title">会议屏</span>
              </ModuleButton>
            </router-link>
            <!-- 视频切换 -->
            <router-link to="/videoswitch">
              <ModuleButton :class="{active:activeBtn==='tv'}" @click.native="choose('tv')">
                <span slot="icon">
                  <i class="video-exchange"></i>
                </span>
                <span slot="title">视频切换</span>
              </ModuleButton>
            </router-link>
            <!-- 音量控制 -->
            <router-link to="/voice">
              <ModuleButton :class="{active:activeBtn==='voice'}" @click.native="choose('voice')">
                <span slot="icon">
                  <i class="voice"></i>
                </span>
                <span slot="title">音量控制</span>
              </ModuleButton>
            </router-link>
            <!-- 灯光控制 -->
            <router-link to="/bulb">
              <ModuleButton :class="{active:activeBtn==='bulb'}" @click.native="choose('bulb')">
                <span slot="icon">
                  <i class="bulb"></i>
                </span>
                <span slot="title">灯光控制</span>
              </ModuleButton>
            </router-link>
            <!-- 空调控制 -->
            <router-link to="/aircondition">
              <ModuleButton :class="{active:activeBtn==='air'}" @click.native="choose('air')">
                <span slot="icon">
                  <i class="air"></i>
                </span>
                <span slot="title">空调控制</span>
              </ModuleButton>
            </router-link>
            <!-- 门禁控制 -->
            <!-- <router-link to="/door">
              <ModuleButton :class="{active:activeBtn==='door'}" @click.native="choose('door')">
                <span slot="icon">
                  <i class="door"></i>
                </span>
                <span slot="title">门禁控制</span>
              </ModuleButton>
            </router-link>-->
            <!-- 窗帘控制 -->
            <router-link to="/curtain">
              <ModuleButton
                :class="{active:activeBtn==='curtain'}"
                @click.native="choose('curtain')"
              >
                <span slot="icon">
                  <i class="curtain"></i>
                </span>
                <span slot="title">窗帘控制</span>
              </ModuleButton>
            </router-link>
            <!-- 视频会议 -->
            <router-link to="/videoconference">
              <ModuleButton :class="{active:activeBtn==='video'}" @click.native="choose('video')">
                <span slot="icon">
                  <i class="video"></i>
                </span>
                <span slot="title">视频会议</span>
              </ModuleButton>
            </router-link>
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import ModuleButton from './ModuleButton'
import { pushMessage } from '../../socket/index'
import { mapState } from 'vuex'
export default {
  name: 'Main',
  data () {
    return {
      tipIsDisplay: true,
      activeBtn: ''
    }
  },
  components: {
    ModuleButton
  },
  methods: {
    tipsCloseCallback () {
      this.tipIsDisplay = false
    },
    choose (type) {
      this.activeBtn = type
    },
    socketCallback (data) {
      // console.log(data)
    }
  },
  created () {
  },
  async mounted () {
    const token = sessionStorage.getItem('connection_token')
    if (!token) {
      pushMessage({
        type: 'login',
        token: this.userInfo.token,
        user_type: 'ipad',
        user_name: this.userInfo.user,
        user_id: this.userInfo.user_id
      }, this.socketCallback)
    }

    // 保证刷新时的按钮高亮
    const arr = this.$route.path.split('/')
    this.activeBtn = arr[arr.length - 1]

    // 发送会议室信息
    this.$loading({ fullscreen: true, text: '设备正在努力连接中...', background: 'rgba(0, 0, 0, 0.8)' })
    if (this.connection_token) {
      console.log('============ Main-Mounted的时候发送info =============')
      pushMessage({
        type: 'info',
        use_room_list: [localStorage.getItem('room_id')],
        connection_token: this.connection_token
      }, this.socketCallback)
    }
  },
  beforeDestroy () {
    const messageBox = document.getElementsByClassName('el-message-box__wrapper')
    // 从未创建弹窗元素 不执行close
    if (!messageBox[0]) return
    // 创建弹窗元素并关闭了 不执行close
    if (messageBox[0].style.display === 'none') return
    this.$msgbox.close()
    // if (this.$msgbox) {
    //   this.$msgbox.close()
    // }
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo,
      connection_token: state => state.connection_token
    }),
    currentRoom () {
      return localStorage.getItem('room_flag')
    }
  },
  watch: {
    $route (to) {
      if (to.path.includes('home')) {
        this.activeBtn = ''
      }
    },
    connection_token (newValue) {
      console.log('============ Token来了的时候发送info =============')
      pushMessage({
        type: 'info',
        use_room_list: [localStorage.getItem('room_id')],
        connection_token: newValue
      }, this.socketCallback)
    }
  }
}
</script>
<style lang="less">
@import "../../styles/public.less";
.background-img-common {
  display: inline-block;
  .size(44px, 44px);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
#app {
  background-color: #202228;

  .el-header {
    padding: 0;
    height: 34px !important;
    background-color: #e57470;
  }

  .aside {
    background-color: #1d2023;
    padding: 10px 0 10px 0;
  }

  .main-container {
    background-color: #1d2023;
    box-sizing: border-box;
    padding: 10px 10px 10px 10px;

    .bus-wrap {
      height: 100%;
      display: flex;
      flex-direction: column;

      .bus-main {
        flex: 1;
        position: relative;
      }

      .bus-control {
        background-color: #24262e;
        height: 120px;
        display: flex;
        align-items: center;
        justify-content: space-around;

        .conf-screen:extend(.background-img-common) {
          background-image: url("../../assets/images/bottomMenu/icon_会议屏.png");
        }

        .video-exchange:extend(.background-img-common) {
          .size(44px, 44px);
          background-image: url("../../assets/images/bottomMenu/icon_视频切换.png");
        }

        .voice:extend(.background-img-common) {
          background-image: url("../../assets/images/bottomMenu/icon_音量控制.png");
        }

        .bulb:extend(.background-img-common) {
          background-image: url("../../assets/images/bottomMenu/icon_灯光控制.png");
        }
        .curtain:extend(.background-img-common) {
          background-image: url("../../assets/images/bottomMenu/icon_窗帘控制.png");
        }
        .video:extend(.background-img-common) {
          background-image: url("../../assets/images/bottomMenu/icon_视频会议.png");
        }
        .air:extend(.background-img-common) {
          background-image: url("../../assets/images/bottomMenu/icon_air.png");
        }
        .door:extend(.background-img-common) {
          background-image: url("../../assets/images/bottomMenu/icon_door.png");
        }

        .active {
          background-color: #006eff;
        }
      }
    }
  }
}
</style>
