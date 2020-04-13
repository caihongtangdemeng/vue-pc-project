//所有接口请求函数
import ajax from './ajax'
import mockAjax from './mockAjax'

export const reqBaseCategoryList=()=>ajax('/product/getBaseCategoryList') //首页三级分类get请求
export const reqLogin=(mobile,password)=>ajax.post('/user/passport/login',{mobile,password}) //登录post请求

export const reqBanners=()=>mockAjax.get('/banners')
export const reqFloors=()=>mockAjax.get('/floors')

export const reqProductList = (searchParams) => ajax.post('/list',searchParams)
export const reqDetailInfo=(skuId)=>ajax.get(`/item/${skuId}`)
// reqBanners().then(result=>{
//   console.log('result',result)
// })




