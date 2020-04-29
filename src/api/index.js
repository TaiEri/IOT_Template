import ajax from './ajax'

// 环境的切换
let baseURL = ''
if (process.env.NODE_ENV === 'development') {
  baseURL = '/api'
} else if (process.env.NODE_ENV === 'debug') {
  baseURL = ''
} else if (process.env.NODE_ENV === 'production') {
  baseURL = 'http://api.123dailu.com/'
}
console.log(baseURL)
// 管理URL
const loginURL = 'xxx'

// 业务请求
export const loginReq = function (data) {
  console.log('=================登录========================')
  return ajax(loginURL, data, 'POST')
}
