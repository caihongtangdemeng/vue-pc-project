import axios from 'axios'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'
const ajax =axios.create({
  baseURL:'/api',
  timeout:20000
})
ajax.interceptors.request.use((config)=>{
  Nprogress.start()

  config.headers['userTempId']=store.state.user.userTempId
  return config
})
ajax.interceptors.response.use(
  response=>{
    Nprogress.done()
    return response.data
  },
  error=>{
    Nprogress.done()
    alert('请求出错：'+error.message||'未知错误')
    // return new Promise(()=>{}) 终断promise链
    return Promise.reject(error)  //返回失败的promise
  }
)
export default ajax


