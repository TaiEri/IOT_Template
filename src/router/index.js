import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

//  解决vue-router升级引起的promise报错问题
const originalPush = Router.prototype.replace
Router.prototype.replace = function replace (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
  routes
})

export default router
