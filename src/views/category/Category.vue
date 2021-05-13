<template>
  <div>
  <h1>购物车</h1>
  </div>

</template>

<script>
  // import BScroll from "better-scroll";
  export default {
    name: "Category",
    data(){
      return{
        scroll:null
      }
    },
    created() {
    },
    // mounted() {
    //   this.scroll=new BScroll('.wrapper',{
    //     probeType:3,
    //     pullUpLoad:true
    //   })
    //   // this.scroll.on('scroll',position=>console.log(position))
    //   this.scroll.on('pullingUp',()=>console.log('position'))
    // }
  }
</script>

<style scoped>
/*.wrapper{*/
/*  background-color: #5ea732;*/
/*  height: 150px;*/
/*}*/
</style>
