<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item,index) in cartList" :key="index" :item-info="item"/>
    </scroll>
  </div>
</template>

<script>
  import Scroll from "../../../components/common/scroll/Scroll";
  import CartListItem from "./CartListItem";
  import {mapGetters} from "vuex";
  export default {
    name: "CartList",
    data(){
      return{

      }
    },
    components:{
      CartListItem,Scroll
    },
    computed:{
      ...mapGetters(['cartList'])
    },
    activated() {
      this.$refs.scroll.refresh()
    },
  }
</script>

<style scoped>
  .content{
    height:100%;
  }
  .cart-list{
    height:calc(100% - 44px - 49px - 40px);
    overflow: hidden;
  }
</style>
