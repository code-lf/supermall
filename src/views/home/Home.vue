<template>
  <div id="home">
      <nav-bar class="home-nav">
        <div slot="center">购物街</div>
      </nav-bar>
    <tab-control @tabClick="tabClick"  ref="taControl1"
                 class="tabcontrol"
                 :titles="['流行','新款','精选']"  v-show="isTabFixed"/>
    <scroll class="content" ref="scroll" :probe-type="3"
            @scroll="contentscroll"
            @pullingUp="loadMore"
            :pullUpLoad="true">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control @tabClick="tabClick"  ref="taControl2"
                   :titles="['流行','新款','精选']"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    </div>
</template>
<script>
  import NavBar from "components/common/navbar/NavBar";
  import HomeSwiper from "./childComps/HomeSwiper";
  import TabControl from "components/content/tabControl/TabControl";

  import {getHomeMultidata,getHomeGoods} from "network/home";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";
  import {debounce} from "common/utils";

  export default {
    name: "Home",
    data(){
      return{
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]}
        },
        currentType:'pop',
        isShowBackTop:false,
        tabOffsetTop:0,
        isTabFixed:false,
        savey:0
      }
    },
    activated() {
      this.$refs.scroll.scrollTo(0,this.savey,0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      this.savey=this.$refs.scroll.getScrollY()
    },
    mounted() {
      const refresh=debounce(this.$refs.scroll.refresh,50)
      this.$bus.$on('itemimageLoad',()=>{
         refresh()
      })
      // this.tabOffsetTop=this.$refs.tabOffsetTop.$el.offsetTop
    },
    computed:{
      showGoods(){
       return this.goods[this.currentType].list
      }
    },
    components:{
      NavBar,HomeSwiper,RecommendView,FeatureView,TabControl,
      GoodsList,Scroll,BackTop
      // ,BackTop
    },
    created() {
      this.getHomeMultidata()
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    methods: {

      //事件监听
      tabClick(index){
        switch (index) {
          case 0:
            this.currentType='pop'
            break
          case 1:
            this.currentType='new'
            break
          case 2:
            this.currentType='sell'
            break
        }
        //因为方法名相同所以点击事件两个组件都会进行页面的跳转事件，只是相对应的组件reindex值未发生改变，
        //进行统一更改就可以了，其实就是样式做出了改变。
        this.$refs.taControl2.reindex=index
        this.$refs.taControl1.reindex=index
      },
      backClick(){
        this.$refs.scroll.scrollTo(0,0)
      },
      //网络请求
      getHomeMultidata(){
        getHomeMultidata().then(res => {
          this.banners = res.data.data.banner.list
          this.recommends = res.data.data.recommend.list
        })
      },
      getHomeGoods(type){
        const page=this.goods[type].page+1
        getHomeGoods(type,page).then(res=>{
          this.goods[type].list.push(...res.data.data.list)
           this.goods[type].page+=1
          this.$refs.scroll.finishPullUp()
        })
      }
      ,
      contentscroll(position){
       this.isShowBackTop=(-position.y)> 1000
        //吸顶效果
        this.isTabFixed=(-position.y)>this.tabOffsetTop

      },
      loadMore(){
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad(){
        console.log(this.tabOffsetTop=this.$refs.taControl2.$el.offsetTop);
      }
    }

  }
</script>
<style scoped>
  #home{
    position: relative;
    height: 100%;
  }
.home-nav{
  background-color: var(--color-tint);
  color: #fff;
  position: relative;
  z-index: 999;
}
.tabcontrol{
  position: relative;
  z-index: 999;
  background-color: #fff;
}
  .content{
    position: absolute;
    top: 44px;
    height:calc(100vh - 93px);
  }
</style>
