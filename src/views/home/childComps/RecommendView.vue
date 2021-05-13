<template>
<div class="recommends">
  <div v-for="item in recommends" class="recommendsitem">
    <a :href="item.link">
      <img :src="item.image" alt="">
      <div>{{item.title}}</div>
    </a>
  </div>
</div>
</template>

<script>
  export default {
    name: "RecommendView",
    props:{
      recommends:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
.recommends{
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 12px;
  padding: 15px 0 16px;
  border-bottom: 8px solid #eee;
}
.recommendsitem{
    flex: 1;
}
  .recommendsitem img{
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
  }
</style>
