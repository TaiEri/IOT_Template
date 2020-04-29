import Vue from 'vue'
import Vuex from 'vuex'
import { LIGHT_INFO, CURTAIN_INFO, VIDEO_MEETING_INFO, MODE_INFO, SCREEN_INFO, VOICE_INFO, SWITCH_VIDEO_INFO, OUTPUT, AIR_SPEED_INFO, ENVIR_INFO, DOOR_INFO } from '../utils/constant'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    isControling: false, // 是否正在控制中
    divideRoom: false, // 是否主动分房
    chooseDivideBtn: false, // 是否主动点击分房按钮
    divideInfo: {}, // 分房信息
    device_UDID: '', // ipad设备唯一标识码
    roomName: '', // 房间名
    userInfo: {}, // 用户信息
    room_list: [], // 房间列表
    connection_token: '', // 验证信息
    lightInfo: [], // 灯光信息
    matrixInputInfo: [], // 矩阵输入信息
    matrixOutputInfo: [], // 矩阵输出信息
    inductorInfo: [], // 人体感应
    modeInfo: [], // 模式信息
    airConditionInfo: [], // 空调信息
    airSpeedInfo: [], // 空调风速信息
    confScreenInfo: [], // 会议屏信息
    voiceInfo: [], // 音量信息
    curtainInfo: [], // 窗帘信息
    videoInfo: [], // 视频会议信息
    switchVideo: [], // 视频切换-输入信息
    outPutInfo: [], // 视频切换-输出信息
    doorInfo: []
  },
  actions: {
    getDivideInfo ({ commit }, data) {
      commit('getDivideInfo', data)
    },
    updateDivideBtn ({ commit }, data) {
      commit('updateDivideBtn', data)
    },
    updateDevideStatus ({ commit }, data) {
      commit('updateDevideStatus', data)
    },
    saveUDID ({ commit }, data) {
      commit('saveUDID', data)
    },
    controlStatus ({ commit }, data) {
      commit('controlStatus', data)
    },
    getUserInfo ({ commit }, data) {
      commit('getUserInfo', data)
    },
    getRoomList ({ commit }, data) {
      commit('getRoomList', data)
    },
    getAllInfo ({ commit }, data) {
      commit('getAllInfo', data)
    },
    updateDevice ({ commit }, data) {
      commit('updateDevice', data)
    },
    getConnectToken ({ commit }, data) {
      commit('getConnectToken', data)
    }
  },
  mutations: {
    getDivideInfo (state, data) {
      state.divideInfo = data
    },
    updateDivideBtn (state, data) {
      state.chooseDivideBtn = data
    },
    updateDevideStatus (state, data) {
      state.divideRoom = data
    },
    saveUDID (state, data) {
      state.device_UDID = data
    },
    controlStatus (state, data) {
      state.isControling = data
    },
    getUserInfo (state, data) {
      state.userInfo = data
    },
    getRoomList (state, data) {
      // 先置空
      state.room_list = []
      state.room_list.push(...data)
    },
    getConnectToken (state, data) {
      state.connection_token = data
    },
    getAllInfo (state, data) {
      const infoStr = JSON.stringify(data)
      const info = JSON.parse(infoStr)
      state.roomName = info.room_name
      // 灯光
      state.lightInfo = info[LIGHT_INFO]
      // 窗帘
      state.curtainInfo = info[CURTAIN_INFO]
      // 视频会议
      state.videoInfo = info[VIDEO_MEETING_INFO]
      // 模式
      state.modeInfo = info[MODE_INFO]
      // 会议屏
      state.confScreenInfo = info[SCREEN_INFO]
      // 视频切换-输入
      state.switchVideo = info[SWITCH_VIDEO_INFO]
      // 视频切换-输出
      state.outPutInfo = info[OUTPUT]
      // 环境
      // if (info[MODE_INFO].filter(item => item.name === 'PM2.5').length > 0) {
      //   console.log('-------------pm2.5')
      //   const pm = JSON.stringify(info[MODE_INFO].filter(item => item.name === 'PM2.5')[0])
      //   state.inductorInfo.push(JSON.parse(pm))
      // }
      state.inductorInfo = info[ENVIR_INFO]
      // 侧边空调
      const tempBar = JSON.stringify(info[MODE_INFO].filter(item => item.name === '温度条')[0])
      const currentTemp = JSON.stringify(info[MODE_INFO].filter(item => item.name === '当前温度')[0])
      state.airConditionInfo.push(JSON.parse(tempBar))
      state.airConditionInfo.push(JSON.parse(currentTemp))
      // 音量控制
      state.voiceInfo = info[VOICE_INFO]
      // 空调风速控制
      state.airSpeedInfo = info[AIR_SPEED_INFO]
      // 门禁控制
      state.doorInfo = info[DOOR_INFO]
    },
    updateDevice (state, data) {
      const guid = data.guid
      const status = data.status
      let info = []
      let diff = false
      let dataFlag = ''

      if (state.lightInfo.some(item => item.guid === guid)) {
        // 灯光控制
        info = state.lightInfo
        dataFlag = 'light'
      } else if (state.airConditionInfo.some(item => item.guid === guid)) {
        // 模式控制(存在一个问题,因为mode数据里也有空调的数据,所以必须放在mode前面)
        info = state.airConditionInfo
        dataFlag = 'air'
      } else if (state.inductorInfo.some(item => item.guid === guid)) {
        // 环境控制
        info = state.inductorInfo
        dataFlag = 'inductor'
      } else if (state.voiceInfo.some(item => item.guid === guid)) {
        // 模式控制
        // console.log('模式也跟着变化了================================')
        info = state.voiceInfo
        dataFlag = 'voice'
      } else if (state.modeInfo.some(item => item.guid === guid)) {
        // 模式控制
        info = state.modeInfo
        dataFlag = 'mode'
      } else if (state.switchVideo.some(item => item.guid === guid)) {
        // 视频切换-输出
        info = state.switchVideo
        dataFlag = 'switchVideo'
      } else if (state.outPutInfo.some(item => item.guid === guid)) {
        // 视频切换-输入
        info = state.outPutInfo
        dataFlag = 'outPutInfo'
      } else if (state.curtainInfo.some(item => item.guid === guid)) {
        // 窗帘控制
        info = state.curtainInfo
        dataFlag = 'curtain'
      } else if (state.videoInfo.some(item => item.guid === guid)) {
        // 视频会议控制
        info = state.videoInfo
        dataFlag = 'video_meeting'
      } else if (state.confScreenInfo.some(item => item.guid === guid)) {
        // 视频会议控制
        info = state.confScreenInfo
        dataFlag = 'screen'
      } else if (state.airSpeedInfo.some(item => item.guid === guid)) {
        // 视频会议控制
        info = state.airSpeedInfo
        dataFlag = 'air_speed'
      } else if (state.doorInfo.some(item => item.guid === guid)) {
        // 门禁控制
        info = state.doorInfo
        dataFlag = 'door'
      }
      // 优化判断处理
      // 空调风速互斥
      if (dataFlag === 'air_speed') {
        info.forEach((item, index) => {
          if (item.guid === guid) {
            if (item.status !== status) {
              diff = true
              info.forEach(item => {
                item.status = 'off'
              })
            }
            item.status = status
          }
        })
      } else {
        info.forEach((item, index) => {
          if (item.guid === guid) {
            if (item.status !== status) {
              diff = true
            }
            item.status = status
          }
        })
      }

      // 正式更新数据
      if (diff) {
        switch (dataFlag) {
          case 'curtain':
            state.curtainInfo = []
            state.curtainInfo.push(...info)
            break
          case 'light':
            state.lightInfo = []
            state.lightInfo.push(...info)
            break
          case 'voice':
            state.voiceInfo = []
            state.voiceInfo.push(...info)
            break
          case 'air':
            state.airConditionInfo = []
            state.airConditionInfo.push(...info)
            break
          case 'inductor':
            state.inductorInfo = []
            state.inductorInfo.push(...info)
            break
          case 'mode':
            state.modeInfo = []
            state.modeInfo.push(...info)
            break
          case 'screen':
            state.confScreenInfo = []
            state.confScreenInfo.push(...info)
            break
          case 'switchVideo':
            state.switchVideo = []
            state.switchVideo.push(...info)
            break
          case 'video_meeting':
            state.videoInfo = []
            state.videoInfo.push(...info)
            break
          case 'outPutInfo':
            state.outPutInfo = []
            state.outPutInfo.push(...info)
            break
          case 'air_speed':
            state.airSpeedInfo = []
            state.airSpeedInfo.push(...info)
            break
          case 'door':
            state.doorInfo = []
            state.doorInfo.push(...info)
            break
          default:
            break
        }
      }
    }
  },
  getters: {
  }
})

export default store
