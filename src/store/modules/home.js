import {reqBaseCategoryList} from '@/api'
const state={
  baseCategoryList:[]
}
const mutations={
  RECEIVE_GATEGORYS(state,categorys){
    state.baseCategoryList=categorys.splice(0,categorys.length-2) //超出2个去掉
  }
}
const actions={
  async getBaseCategoryList({commit}){
    const result =await reqBaseCategoryList()
    if(result.code===200){
      const categorys=result.data
      commit('RECEIVE_GATEGORYS',categorys)
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