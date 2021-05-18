<template>
  <div class="toast" v-show="isshow">
    <div >{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    data(){
      return{
        message:'',
        isshow:false
        }
    },
    methods:{
      show(message,time=1500){
        this.message=message
        this.isshow=true
        setTimeout(()=>{
          this.message=''
          this.isshow=false
        },time)
      }
    }
  }
</script>

<style scoped>
  .toast{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border-radius: 5px;
    background-color: rgba(0,0,0,.8);
    padding: 5px 10px;
    color: #ffffff;
    z-index: 9999;
  }
</style>
