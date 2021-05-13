<template>
  <tab-bar>
    <ta-bar-item   path="/home">
      <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" alt="">
      <div slot="item-text">首页</div>
    </ta-bar-item>
    <ta-bar-item   path="/category">
      <img slot="item-icon" src="~assets/img/tabbar/category.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg" alt="">
      <div slot="item-text">分类</div>
    </ta-bar-item>
    <ta-bar-item   path="/cart">
      <img slot="item-icon" src="~assets/img/tabbar/cart.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/cart_active.svg" alt="">
      <div slot="item-text">购物车</div>
    </ta-bar-item>
    <ta-bar-item   path="/profile">
      <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg" alt="">
      <div slot="item-text">我的</div>
    </ta-bar-item>
  </tab-bar>
</template>

<script>
  import TaBarItem from "components/common/tabbar/TaBarItem";
  import TabBar from "components/common/tabbar/TabBar";
  export default {
    name: "MainTabBar",
    components: {
      TabBar,TaBarItem
    }

  }
</script>

<style scoped>

</style>
