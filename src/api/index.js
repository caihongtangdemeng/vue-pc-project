//所有接口请求函数
import ajax from './ajax'
import mockAjax from './mockAjax'

export const reqBaseCategoryList=()=>ajax('/product/getBaseCategoryList') //首页三级分类get请求

export const reqBanners=()=>mockAjax.get('/banners')
export const reqFloors=()=>mockAjax.get('/floors')

export const reqProductList = (searchParams) => ajax.post('/list',searchParams)
export const reqDetailInfo=(skuId)=>ajax.get(`/item/${skuId}`)
// reqBanners().then(result=>{
  //   console.log('result',result)
  // })
  
export const reqAddToCart=(skuId,skuNum)=>ajax.post(`/cart/addToCart/${skuId}/${skuNum}`)

export const reqCartList=()=>ajax.get('/cart/cartList')

export const reqCheckCartItem=(skuId,isChecked)=>ajax.get(`/cart/checkCart/${skuId}/${isChecked}`)
export const reqDeleteCartItem=(skuId)=>ajax.delete(`/cart/deleteCart/${skuId}`)
export const reqLogin=(mobile,password)=>ajax.post('/user/passport/login',{mobile,password}) //登录post请求
export const reqRegister=(userInfo)=>ajax.post('/user/passport/register',userInfo)
export const reqLogout=()=>ajax.get('/user/passport/logout')