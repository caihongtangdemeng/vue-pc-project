import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Login from '@/pages/Login'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import MyOrder from '@/pages/Center/MyOrder'
import GroupBuy from '@/pages/Center/GroupBuy'
import store from '@/store'
export default[
  {
    path:'/',
    component:Home
  }, 
  { 
    name:'search',//如果时params参数需要指定此名称
    path:'/search/:keyword?',  //? params参数可以不传
    component:Search,
    porps:(route)=>({keyword1:route.params.keyword,keyword2:route.query.keyword})
  }, 
  {
    name:'detail',
    path:'/detail/:skuId',
    component:Detail,
  }, 
  {
    // c.只有携带的skuId和skuNum以及sessionStorage中有skuInfo数据, 才能查看添加购物车成功的界面
    name:'AddCartSuccess',
    path:'/addcartsuccess',
    component:AddCartSuccess,
    beforeEnter(to,from,next){
      const skuInfo=JSON.parse(window.sessionStorage.getItem('SKU_INFO_KEY'))
      const {skuId,skuNum} =to.query
      if(skuId&&skuNum&&skuInfo){
        next()
      }else{
        next(from.path)
      }
    }
  },
  {
    name:'shopcart',
    path:'/shopcart',
    component:ShopCart,
  },
  
  {
    path:'/register',
    component:Register,
    meta:{
      isHideFooter:true //标识footer是否隐藏 true注册和登录都隐藏
    }
  },
  {
    path:'/login',
    component:Login,
    meta:{
      isHideFooter:true 
    },
    //路由独享守卫  未登录才能看到登录页面
    // beforeEnter:(to,from,next)=>{
    //   if(store.state.user.userInfo.name){
    //     next('/')
    //   }else{
    //   next()
    // }
    // }
  }, 
  {
    /*  d.只能从购物车界面, 才能跳转到交易界面 */
    path:'/trade',
    component:Trade,
    beforeEnter(to,from,next){
      if(from.path==='/shopcart'){
        next()
      }else{
         next('/shopcart')
      }
    }
    
  }, 
  {
    /* e.只能从交易界面, 才能跳转到支付界面 */
    path:'/pay',
    component:Pay,
   //把query参数映射成props传递给路由组件
   props:route=>({orderId:route.query.orderId}),

   beforeEnter(to,from,next){
     if(from.path==='/trade'){
       next()
     }else{
       next('/trade')
     }
   }
  }, 


    /* f.只有从支付界面, 才能跳转到支付成功的界面 */
  {
    path:'/paysuccess',
    component:PaySuccess,
   beforeEnter(to,from,next){
     if(from.path==='/pay'){
       next()
     }else{
       next('/pay')
     }
   }
  }, 
  {
    path:'/center',
    component:Center,
    children:[
      {
        path:'/center/myorder',
        component:MyOrder,
      },
      {
        path:'groupbuy', //简写
        component:GroupBuy,
      },
      {
        path:'', //重定向 或者'/center'
        redirect:'/center/myorder',
      },
    ]
  }, 


]