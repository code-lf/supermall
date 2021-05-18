<template>
<div class="detail">
  <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
  <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
  <detail-swiper :topImages="topImages"/>
  <detail-base-info :goods="goods"/>
  <detail-shop-info :shop="shop"/>
    <detail-goods-info :detail-info="detailInfo" @imagesLoad="imagesLoad"/>
    <detail-param-info ref="params" :param-info="paramInfo"/>
    <detail-comment-info ref="comment" :comment-info="commentInfo"/>
    <goods-list ref="recommend" :goods="recommends"/>
  </scroll>
  <back-top @click.native="backTop" v-show="isShowBackTop"/>
  <deatail-bottom-bar @addCart="addCart"/>
  <toast/>
</div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import Scroll from "../../components/common/scroll/Scroll";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import GoodsList from "../../components/content/goods/GoodsList";
  import {debounce} from "../../common/utils";
  import DeatailBottomBar from "./childComps/DeatailBottomBar";
  import {backTopMinXin} from "../../common/mixin";


  import Toast from "../../components/common/toast/Toast";
  export default {
    name: "Detail",
    data(){
      return{
        iid:null,
        topImages:[],
        goods: {},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommends:[],
        itemParams:{},
        themeTopYs:[],
        getThemeTopY:null,

        // message:'',
        // show:false

      }
    },
    mixins:[backTopMinXin],
    methods:{
      //购物车监听添加
      addCart(){
        //获取展示信息
        const product={}
        product.image=this.topImages[0]
        product.title=this.goods.title
        product.desc=this.goods.desc
        product.price=this.goods.realPrice
        product.iid=this.iid
        this.$store.dispatch('addCart',product).then(res=>{
          // this.message=res
          // this.show=true
          // setTimeout(()=>{
          //   this.show=false
          //   this.message=''
          // },1500)
          this.$toast.show(res)
        })
      },
      imagesLoad(){
        // this.$refs.scroll.refresh()
        const refresh=debounce(this.$refs.scroll.refresh,50)
        refresh()
        this.getThemeTopY()
      },
      titleClick(index){
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],250)
      },
      //详情页滚动做出对应标题栏改变
      contentScroll(position){
       const positionY=-position.y
        for (let i=0; i< this.themeTopYs.length-1;i++){
          if(positionY>this.themeTopYs[ parseInt(i)]&& positionY<this.themeTopYs[i+1]&&this.$refs.nav.currentIndex!=i){
            this.$refs.nav.currentIndex=i
          }
        }
        this.listenShoBackTop(position)
      }
    },
    components:{
      GoodsList,
      DetailNavBar,DetailSwiper,DetailBaseInfo,DetailShopInfo,
      Scroll,DetailGoodsInfo,DetailParamInfo,DetailCommentInfo,
      DeatailBottomBar,Toast
  },
    created() {
      getRecommend().then(res=>{
         this.recommends=res.data.data.list
      })
      this.getThemeTopY=debounce(()=>{
        this.themeTopYs=[]
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop+this.$refs.recommend.$el.offsetTop)
      },500)
      this.iid=this.$route.params.iid
      getDetail(this.iid).then(res=>{
        const data=res.data.result
        //取出轮播图的数据
        this.topImages=data.itemInfo.topImages
        //数据整合传递
        //取出商品的信息
        this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        //取出店铺的信息
        this.shop=new Shop(data.shopInfo)
        //取出详情的信息
        this.detailInfo=data.detailInfo
        //取出参数的信息
        this.itemParams=data.itemParams
        //取出评论的信息
        this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)
        if(data.rate.cRate!==0){
          this.commentInfo=data.rate.list[0]
        }
      })
    }
  }
</script>

<style scoped>
.detail{
  background-color: #fff;
  position: relative;
  z-index: 999;
  height: 100vh;
}
  .content{
    height: calc(100% - 44px - 49px);
  }
  .detail-nav{
    left: 0;
    right: 0;
    position: fixed;
    z-index: 9;
    background-color: #ffffff;
  }
</style>
