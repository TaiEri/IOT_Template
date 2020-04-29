import ReconnectingWebSocket from 'reconnecting-websocket'
import store from '../store'
import CryptoJS from 'crypto-js'
import { loginReq } from '../api/index'
import { Loading } from 'element-ui'
import router from '../router'
// 连接地址
const url = 'xxx'
// socket对象
let websocket
// 重连状态
let reconnect
// 函数回调
let globalCallback
// 计时器
let loginTimer = 0
// 心跳计时器
let heartbeat = 0
// 用户信息
let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
console.log('本地获取用户相关信息', userInfo)
console.log('重连状态', reconnect)
// 初始化通道
function initPipe () {
  // 初始化weosocket
  console.log('========== 初始化socket ============')
  websocket = new ReconnectingWebSocket(url, null, { debug: true, reconnectInterval: 5000, timeoutInterval: 5000 })
  reconnect = false
  // 通道监听
  websocket.onmessage = function (e) {
    console.log('***************** socket接收到数据 ****************')
    listenPipe(e)
  }
  // 通道打开
  websocket.onopen = function () {
    console.log('============= socket已连接 ==============')

    clearInterval(heartbeat)
    heartbeat = setInterval(() => {
      pushMessage({
        type: 'heartbeat'
      })
      console.log('发送心跳')
    }, 10000)
  }
  // 通道关闭
  websocket.onclose = function () {
    console.log('================ socket连接关闭 =================')
    // 通道关闭之后再次连接之后就是重连状态
    reconnect = true
    clearInterval(heartbeat)
    Loading.service({ fullscreen: true, text: '断线重连中.....', background: 'rgba(0, 0, 0, 0.8)' })
  }
  // 通道错误
  websocket.onerror = function () {
    console.log('=============== socket连接发生错误 ================')
    // 连接发生错误之后再次连接之后就是重连状态
    reconnect = true
    clearInterval(heartbeat)
  }
}
// 推送数据
function pushMessage (data, callback) {
  // 接收回调
  globalCallback = callback
  if (websocket.readyState === websocket.OPEN) {
    // 若是ws开启状态
    websocket.send(JSON.stringify(data))
  } else if (websocket.readyState === websocket.CONNECTING) {
    // 若是 正在开启状态，则等待1s后重新调用
    setTimeout(function () {
      pushMessage(data, callback)
    }, 1000)
  } else {
    // 若未开启 ，则等待1s后重新调用
    setTimeout(function () {
      pushMessage(data, callback)
    }, 1000)
  }
}
// 关闭通道
function closePipe () {
  websocket.close()
}
// 刷新通道
function refreshPipe () {
  websocket.refresh()
}
// 监听通道
function listenPipe (e) {
  // 监听数据
  const data = JSON.parse(e.data)
  // 函数回调
  globalCallback && globalCallback(data)
  console.log('====== socket接受的数据 ==============', data)

  // ******** 数据处理模块
  if (data.type === 'info') {
    if (data.ret === 0) {
      // 统一关闭加载遮罩层
      Loading.service().close()
      // 该房间的全部设备数据
      const info = data.room_info_list[0]
      store.dispatch('getAllInfo', info)
    } else {
      // 如果info失败,则重新默认登录去获取login信息
      reLogin()
    }
  } else if (data.type === 'login') {
    if (data.ret === 0) {
      // 如果成功收到login消息,则
      if (loginTimer) {
        clearTimeout(loginTimer)
        loginTimer = 0
      }
      // 保存房间列表
      store.dispatch('getRoomList', data.room_list)
      store.dispatch('getConnectToken', data.connection_token)
      // localStorage.setItem('connection_token', data.connection_token)
      sessionStorage.setItem('connection_token', data.connection_token)
    } else {
      // 如果login失败,则重新默认登录去获取login信息
      reLogin()
    }
  } else if (data.type === 'channel_feedback') {
    // 同步其他设备控制的结果
    store.dispatch('updateDevice', data)
  } else if (data.type === 'control') {
    // 控制假反馈
    if (!store.state.isControling) {
      store.dispatch('updateDevice', data)
    }
  } else if (data.type === 'query') {
    // 查询反馈结果
    if (!store.state.isControling) {
      store.dispatch('updateDevice', data)
    }
  } else if (data.type === 'separate_out') {
    if (!store.state.divideRoom && (store.state.divideInfo === {} || store.state.divideInfo.mode !== data.mode)) {
      router.replace('/room_mode')
    }
    store.dispatch('updateDevideStatus', false)
    store.dispatch('updateDivideBtn', false)
    store.dispatch('getDivideInfo', data)
  }
}

// 重新登录请求方法
async function reLogin () {
  // Decrypt
  // const access = localStorage.getItem('access')
  const access = sessionStorage.getItem('access')
  const bytes = CryptoJS.AES.decrypt(access, 'aura')
  const originalText = bytes.toString(CryptoJS.enc.Utf8)
  const arr = originalText.split('&')
  const result = await loginReq({ username: arr[0], pwd: arr[1], dev_sn: store.state.device_UDID, company: arr[2] })
  // const result = await loginReq({ username: arr[0], pwd: arr[1] })
  if (result.ret === '0') {
    const info = { user: arr[0], ...result }
    store.dispatch('getUserInfo', info)
    // localStorage.setItem('userInfo', JSON.stringify(info))
    sessionStorage.setItem('userInfo', JSON.stringify(info))
    // localStorage.setItem('userInfo', CryptoJS.AES.encrypt(JSON.stringify(info), 'aura').toString())
    // decryptInfo = CryptoJS.AES.decrypt(localStorage.getItem('userInfo'), 'aura')
    // userInfo = JSON.parse(decryptInfo.toString(CryptoJS.enc.Utf8))
    // userInfo = JSON.parse(localStorage.getItem('userInfo'))
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    // 再次发送
    pushMessage({
      type: 'login',
      token: userInfo.token,
      user_type: 'ipad',
      user_name: userInfo.user,
      user_id: userInfo.user_id
    })
  }
}

// 默认启动
initPipe()

export {
  initPipe,
  closePipe,
  refreshPipe,
  pushMessage
}
