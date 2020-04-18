//路由器对象模块
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'



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

  const router=new VueRouter({
    // mode:'hash',//路由路径带#号
    mode:'history',
    routes,
    scrollBehavior(to,from,savedPosition){
      return{
        x:0,
        y:0
      }
    }
  })
//添加全局前置路由守卫
const checkPaths=['/pay','/trade','/center']
router.beforeEach((to,from,next)=>{
  const targetPath=to.path
  if(checkPaths.find(path=>targetPath.indexOf(path)===0)){
    if(store.state.user.userInfo.name){
      next()
    }else{
      next('/login?redirect='+targetPath)
    }
  }else{
    next()
  }
})


export default router