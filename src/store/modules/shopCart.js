import {reqCartList,reqAddToCart,reqCheckCartItem,reqDeleteCartItem} from '@/api'

const state={
  cartList:[]
}
const mutations={
  RECEIVE_CART_LIST(state,cartList){
    state.cartList=cartList
  }
}
const actions={
  async getCartList({commit}){
    const result=await reqCartList()
    if(result.code===200){
      const cartList=result.data
      commit('RECEIVE_CART_LIST',cartList)
    }
  },
  async addToCart({commit},{skuId,skuNum,callback}){
    const result=await reqAddToCart(skuId,skuNum)
    // if(result.code===200){
    //   callback('')
    // }else{
    //   callback(result.message||'添加购物车失败')
    // }
    return result.code===200? '' : (result.message||'添加购物车失败')
  }
}
const getters={
  totalCount(state){
    return state.cartList.reduce((pre,item)=>{
      return item.isChecked===1 ? pre+item.skuNum :pre 
    },0)
  },

  totalPrice(state){
    return state.cartList.reduce((pre,item)=>{
      return item.isChecked===1 ? pre+item.skuNum*item.cartPrice : pre
    },0)
  },

  isAllChecked(state){
    return state.cartList.every((item,index)=>item.isChecked===1)
  }
}
export default{
  state,
  mutations,
  actions,
  getters
}