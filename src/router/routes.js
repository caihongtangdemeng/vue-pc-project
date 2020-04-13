import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Login from '@/pages/Login'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
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



]