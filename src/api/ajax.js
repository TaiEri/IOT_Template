import axios from 'axios'
import qs from 'querystring'
import { MessageBox } from 'element-ui'

// 请求超时时间
axios.defaults.timeout = 10000
// 设置post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.withCredentials = true

// 请求拦截器
axios.interceptors.request.use(function (config) {
  // 在请求发送之前需要做的事情
  // ...
  return config
}, function (error) {
  // 请求失败做的事情
  // ...
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(function (response) {
  // 任何在2xx范围的状态码都会触发此功能
  if (response.data.ret !== '0') {
    // 错误消息提示
    MessageBox.alert(response.data.msg, '消息提示')
  }
  // ....
  return response
}, function (error) {
  // 任何超出2xx范围的状态码都会触发此功能
  // ...
  return Promise.reject(error)
})

export default function (url, data = {}, method = 'GET') {
  // 判断请求方式,统一转换为大写
  method = method.toUpperCase()
  // 设置一个promise接收
  let promise
  return new Promise((resolve, reject) => {
    if (method === 'GET') {
      promise = axios.get(url, {
        params: data
      })
    } else if (method === 'POST') {
      promise = axios.post(url, qs.stringify(data))
    }
    promise.then((response) => {
      if (response.status === 200) {
        resolve(response.data)
      } else {
        reject(response.data)
      }
    }).catch((err) => {
      console.log(err)
    })
  })
}
