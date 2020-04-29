// *************** 此文件专用保存方法工具 *************** \\
import dayjs from 'dayjs'

// 获取当前时间
const getTime = function () {
  return dayjs().format('HH:mm')
}
// 获取年/月/日
const getDate = function () {
  return dayjs().format('YYYY/MM/DD')
}
// 获取星期
const getWeek = function () {
  let day
  switch (dayjs().get('day')) {
    case 0:
      day = '天'
      break
    case 1:
      day = '一'
      break
    case 2:
      day = '二'
      break
    case 3:
      day = '三'
      break
    case 4:
      day = '四'
      break
    case 5:
      day = '五'
      break
    case 6:
      day = '六'
      break
    default:
      break
  }
  return '星期' + day
}
// 动态请求头
const getHost = function (url) {
  let host = null
  // if (typeof url === 'undefined' || url === null)
  url = window.location.href
  const regex = /(\w+):\/\/([^/:]+)(:\d*)?/
  const match = url.match(regex)
  if (typeof match !== 'undefined' && match !== null) {
    host = match[0]
  }
  return host
}

export {
  getHost,
  getWeek,
  getTime,
  getDate
}
