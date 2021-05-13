<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="back">
        <img src="~assets/img/common/back.svg">
      </div>
      <div slot="center" class="title">
      <div class="title-item" @click="titleClick(index)" :class="{active:index==currentIndex}" v-for="(item,index) in titles">{{item}}</div>
    </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  export default {
    name: "DetailNavBar",
    data(){
      return{
        titles:['商品','参数','评论','推荐'],
        currentIndex:0
      }
    },
    components:{
      NavBar
    },
    methods:{
      titleClick(index){
        this.currentIndex=index
      },
      back(){
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
.title{
  display: flex;

}
  .title-item{
    flex: 1;
  }
  .active{
    color: var(--color-high-text);
  }
  .back{
    margin-top: 6px;
  }
</style>

