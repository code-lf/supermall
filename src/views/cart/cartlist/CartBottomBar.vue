<template>
<div class="bottom-bar">
<div class="check-conent">
  <check-button @click.native="checkall" class="check-button" :isChecked="isChecked"/>
  <span>全选</span>
</div>
  <div class="totalPrice">
    合计：{{totalPrice}}
  </div>
  <div class="calculate" @click="calcClick">
    去计算({{checkLength}})
  </div>
</div>
</template>

<script>
  import CheckButton from "../../../components/common/checkButton/CheckButton";
  export default {
    name: "CartBottomBar",
    data(){
      return{
        isChecked:false
      }
    },
    components:{
      CheckButton
    },
    computed:{
      totalPrice(){
        return '¥'+this.$store.state.cartList.filter(n=>{
          return n.checked
        }).reduce((preValue,item)=>{
          return preValue+item.price * item.count
        },0).toFixed(2)
      },
      checkLength(){
        return this.$store.state.cartList.filter(n=>{
          return n.checked
        }).length
      }
    },
    watch:{
      checkLength(){
        if(this.checkLength!=this.$store.state.cartList.length)
        {
          this.isChecked=false
        }else {
          this.isChecked=true
        }
      }
    },
    methods:{
      calcClick(){
        if(!this.isChecked)
        {
          if(this.$store.state.cartList.length!=0){
            this.$toast.show('请选择要购买的商品')
          }else {
              this.$toast.show('请先加购商品到购物车')
          }
        }
      },
      checkall(){
        if(this.isChecked){
          this.$store.state.cartList.forEach(item=>item.checked=false)
        }else {
          this.$store.state.cartList.forEach(item=>item.checked=true)
        }
        // if(this.checkLength!=this.$store.state.cartList.length)
        // {
        //
        //   for (let i of this.$store.state.cartList){
        //     i.checked=true
        //   }
        // }else {
        //   for (let i of this.$store.state.cartList){
        //    i.checked=false
        //   }
        // }
      }
    }
  }
</script>

<style scoped>
.bottom-bar{
  background-color: #eee;
  height: 40px;
  position: relative;
  line-height: 40px;
  display: flex;
}
.totalPrice{
  margin-left: 18px;
  flex: 1;
}
.check-conent{
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}
  .check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .calculate{
    width: 100px;
    background-color: red;
    color: #fff;
    text-align: center;
  }
</style>
