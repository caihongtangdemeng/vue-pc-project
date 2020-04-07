import axios from 'axios'
import nProgress from 'nprogress'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const ajax =axios.create({
  baseURL:'/api',
  tiomeout:20000,
})

ajax.interceptors.request.use((config)=>{
  Nprogress.start()
  return config
})

ajax.interceptors.response.use(
  response=>{

    NProgress.done()//隐藏进度条
    return response.data


  },
  error=>{
    NProgress.done()//隐藏进度条


    alert('请求出错:'+error.message||'未知错误')
    return Promise.reject(error)
  }
)

export default ajax