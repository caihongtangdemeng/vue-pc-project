//所有接口请求函数
import ajax from './ajax'

export const reqBaseCategoryList=()=>ajax('/product/getBaseCategoryList') //首页三级分类get请求
export const reqLogin=(mobile,password)=>ajax.post('/user/passport/login',{mobile,password}) //登录post请求




