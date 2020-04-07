import {reqBaseCategoryList} from '@/api'
import { reqBanners, reqFloors } from '../../api'
const state={
  baseCategoryList:[],
  banners:[],
  floors:[]
}
const mutations={
  RECEIVE_GATEGORYS(state,categorys){
    state.baseCategoryList=categorys.splice(0,categorys.length-2) //超出2个去掉
  },
  RECEIVE_BANNERS(state,banners){
    state.banners=banners
  },
  RECEIVE_FLOORS(state,floors){
    state.floors=floors
  }
}
const actions={
  async getBaseCategoryList({commit}){
    const result =await reqBaseCategoryList()
    if(result.code===200){
      const categorys=result.data
      commit('RECEIVE_GATEGORYS',categorys)
    }
  },
  async getBanners({commit}){
    const result=await reqBanners()
    if(result.code===200){
      const banners=result.data
      commit('RECEIVE_BANNERS',banners)
    }
  },
  async getFloors({commit}){
    const result=await reqFloors()
    if(result.code===200){
      const floors=result.data
      commit('RECEIVE_FLOORS',floors)
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