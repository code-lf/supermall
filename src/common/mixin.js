import BackTop from "../components/content/backTop/BackTop";
export  const backTopMinXin={
  components:{
    BackTop
  },
  data(){
  return{
    isShowBackTop:false
  }
  },
  methods:{
    backTop(){
      this.$refs.scroll.scrollTo(0,0,300)
    },
    listenShoBackTop(position){
      this.isShowBackTop=-position.y > 1000
    }
  }
}
