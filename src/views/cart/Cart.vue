<template>
 <div class="cart">
   <nav-bar class="nav-bar">
     <div  class="" slot="center">购物车({{cartLength}})</div>
   </nav-bar>
   <cart-list/>
   <cart-bottom-bar/>
 </div>
</template>

<script>
  import CartList from "./cartlist/CartList";
  import NavBar from "../../components/common/navbar/NavBar";
  import CartBottomBar from "./cartlist/CartBottomBar";
  import {mapGetters} from 'vuex'
  export default {
    name: "Cart",
    data(){
      return{

      }
    },
    computed:{
      ...mapGetters(['cartLength'])
    },
    components:{
      NavBar,CartList,CartBottomBar
    }
  }
</script>

<style scoped>
.nav-bar{
  background-color: var(--color-high-text);
  color: #fff;
}
.cart{
  height: 100vh;
}
</style>
