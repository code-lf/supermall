<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    data(){
      return{
        scroll:null
      }
    },
    props:{
      probeType:{
        type:Number,
        default:0
        },
      pullUpLoad:{
        type:Boolean,
        default:false
      },

    },
    mounted() {
      this.scroll=new BScroll(this.$refs.wrapper,{
        click:true,
        pullUpLoad:this.pullUpLoad,
        probeType: this.probeType,
        observeDOM:true
      })
      if (this.probeType==2||this.probeType==3){
        this.scroll.on('scroll',(position)=>{
          this.$emit('scroll',position)
        })
      }
      if(this.pullUpLoad){
        this.scroll.on('pullingUp',()=>{
          this.$emit('pullingUp')

        })
      }

    },
    methods:{
      scrollTo(x,y,time){
        this.scroll.scrollTo(x,y,time)
      },
      finishPullUp(){
        this.scroll.finishPullUp()
      },
      refresh(){
        this.scroll.refresh()
      },
      getScrollY(){
        return this.scroll ? this.scroll.y:0
      }
    }
  }
</script>

<style scoped>

</style>
