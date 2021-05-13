<template>
<div class="detail">
  <detail-nav-bar/>
</div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  export default {
    name: "Detail",
    data(){
      return{
        iid:null
      }
    },
    components:{
      DetailNavBar
  },
    created() {
      this.iid=this.$route.params.iid
    }
  }
</script>

<style scoped>

</style>
