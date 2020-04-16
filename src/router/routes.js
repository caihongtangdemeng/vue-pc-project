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
    name:'AddCartSuccess',
    path:'/addcartsuccess',
    component:AddCartSuccess,
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
    }
  }, 
  {
    path:'/trade',
    component:Trade,
    
  }, 
  {
    path:'/pay',
    component:Pay,
   //把query参数映射成props传递给路由组件
   props:route=>({orderId:route.query.orderId})
  }, 
  {
    path:'/paysuccess',
    component:PaySuccess,
   
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