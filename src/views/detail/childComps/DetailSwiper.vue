<template>
<swiper class="swiper-item">
  <swiper-item  v-for="item in topImages">
    <img :src="item" alt="">
  </swiper-item>
</swiper>
</template>

<script>
  import {Swiper,SwiperItem} from 'components/common/swiper'
  export default {
    name: "DetailSwiper",
    components:{
      Swiper,SwiperItem
    },
    props:{
      topImages:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
.swiper-item{
  height: 280px;
}
</style>
