



<template>
  <div class="tab-control">
    <div :class="{active:index==reindex}" v-for="(item,index) in titles" class="tab-control-item" @click="dianji(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    data(){
      return{
        reindex:0
      }
    },
    methods:{
      dianji(index){
        this.reindex=index
        this.$emit('tabClick',index)
      }
    },
    props:{
      titles:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
.tab-control{
  display: flex;
  text-align: center;
  font-size: 15px;
  line-height: 40px;
  height: 40px;

}
  .tab-control-item{
    flex: 1;
  }
  .tab-control-item span{
    padding: 5px;
  }
  .active span{
    color: var(--color-high-text);
    border-bottom: 3px solid var(--color-tint);
  }
</style>
