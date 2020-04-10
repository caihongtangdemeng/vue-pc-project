//路由器对象模块
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'


// 修正Vue原型上的push 和replace方法
const originPush=VueRouter.prototype.push
const originReplace=VueRouter.prototype.replace
// 给成功回调函数指定一个默认的函数
VueRouter.prototype.push=function(location,onComplete=()=>{},onAbout) {
  return originPush.call(this,location,onComplete,onAbout)
}

// VueRouter.prototype.push=function(location,onComplete,onAbout) {
//   return originPush.call(this,location,onComplete,onAbout).catch(()=>{})
// }
VueRouter.prototype.replace=function (location,onComplete,onAbout) {
  return originReplace.call(this,location,onComplete,onAbout).catch(()=>{})
}
Vue.use(VueRouter)

export default new VueRouter({
  // mode:'hash',//路由路径带#号
  mode:'history',
  routes
})