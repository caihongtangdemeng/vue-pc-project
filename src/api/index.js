//所有接口请求函数
import ajax from './ajax'

export const  reqBaseCategoryList=()=>{'/product/getBaseCategoryList'}
export const reqLogin =()=>ajax.post('/user/passport/login',{mobile,password})