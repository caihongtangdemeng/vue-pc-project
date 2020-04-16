import {getUUID} from '@/utils/storageUtils'
import {reqLogin,reqRegister,reqLogout} from '@/api'


const state={
  //初始化userInfo，可能是localStorage内存中的字符串，需要解析，也可能是{}
  userInfo:JSON.parse(localStorage.getItem('USER_INFO_KEY'))||{},
  userTempId:getUUID()
}
const mutations={
RECEIVE_USER_INFO(state,userInfo){
  state.userInfo=userInfo
},
RESET_USER_INFO(state){
  state.userInfo={}
}
}
const actions={
  async login({commit},{mobile,password}){
    const result =await reqLogin(mobile,password)
    if(result.code===200){
      const userInfo=result.data
      commit('RECEIVE_USER_INFO',userInfo)
      //保存在localStorage内存中，userInfo 是对象转化为字符串
      localStorage.setItem('USER_INFO_KEY',JSON.stringify(userInfo))
    }else{
      throw new Error(result.message||'登录失败');
    }
  },

  async register({commit},userInfo){
    const result=await reqRegister(userInfo)
    if(result.code!==200){
      throw new Error(result.message||'注册失败')
    }
  },

  async logout ({commit}){
    const result =await reqLogout()
    if(result.code!==200){
      throw new Error(result.message||'退出登录失败')
    }else{
      commit('RESET_USER_INFO')
      //清除localStorage内存中的userInfo数据
      localStorage.removeItem('USER_INFO_KEY')
    }
  }
}
const getters={}
export default{
  state,
  mutations,
  actions,
  getters
}