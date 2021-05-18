import Vue from 'vue'
import Vuex from 'vuex'
import getters from "./getters";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList:[]
  },
  mutations: {
    addCounter(state,payload){
      payload.count++
    },
    addToCart(state,payload){
      payload.count=1
      payload.checked=true
      state.cartList.push(payload)
    }
  },
  actions: {
    addCart(context,payload){
     return new Promise((resolve, reject) => {
       let oldProduct=context.state.cartList.find(item=>item.iid===payload.iid)
       if(oldProduct){
         context.commit('addCounter',oldProduct)
         resolve('添加商品+1')
       }else {
         context.commit('addToCart',payload)
         resolve('成功添加新商品')
       }
     })
    }
  },
  getters,
  modules: {
  }
})
