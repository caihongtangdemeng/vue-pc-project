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
  },

  
  async addToCart2({dispatch},{skuId,skuNum}){
    const result=await reqAddToCart(skuId,skuNum)
    if(result.code===200){
      dispatch('getCartList')
    }else{
      alert(error.message||'添加失败')
    }
  },

  // 删除某个购物项
  async deleteCartItem({commit},skuId){
    const result=await reqDeleteCartItem(skuId)

    return result.code===200? '' : result.message||'删除失败'
  },

  async deleteCartItem2({commit},skuId){
    const result=await reqDeleteCartItem(skuId)
    if(result.code!==200){
      throw new Error('删除失败')
      //return Promise.reject(new Error('删除失败))
    }
  },
//改变勾选项状态
  async checkCartItem({commit},{skuId,isChecked}){
    const result=await reqCheckCartItem(skuId,isChecked)
    if(result.code!==200){
      throw new Error('勾选项失败')
    }
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
  },
  //所有勾选项数组
  selectedItems(state){
    return state.cartList.filter((item,index)=>item.isChecked===1)

    // return state.cartList.reduce((pre,item)=>{
    // return item.isChecked===1? pre.push(item) : pre
    //   },[])
  }

}
export default{
  state,
  mutations,
  actions,
  getters
}