<template>
  <div id="app">
    <div class="header-wrapper">
     <headers  :getsellers="getsellers"></headers>
    </div>
     <div class="tab border-1px">
       <div class="tab-item">
        <router-link to='goods' tag="a">商品</router-link>
       </div>
      <div class="tab-item">
        <router-link to='ratings' tag="a">评价</router-link>
       </div>
       <div class="tab-item">
       <router-link :to={name:'sellers',params:{id:ids}} tag="a">商家</router-link>
       <!--  <router-link :to={path:`seller/${ids}`} tag="a">商家</router-link>-->
       </div>
       <div class="underline"></div>
    </div>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <div v-if="shopcartFlag" class="shopbar">
      <shopcart ref="shopcarts"></shopcart>
    </div>
  </div>
</template>
<script>
import headers from 'src/components/header/header';
// import allAction from 'src/common/allAction/allAction';
import shopcart from 'src/components/shorpcart/shopcart';
import {urlParse} from 'src/common/util/urlParse';
 // const ERRORS = 0;
  export default {
    name: 'app',
    components: {headers, shopcart},
    data () {
      return {
        ids: (() => {
          let params = urlParse()['id'];
          return params
        })(),
        shopcartFlag: false,
        getratings: {}
      }
    },
    computed: {
      getsellers () {
        return this.$store.state.seller;
      }
    },
    created () {
      let self = this;
      this.$store.dispatch('asyncGetGoods').then((state) => {
        self.$nextTick(() => {
          this.$router.push('/goods');
          this.shopcartFlag = true;
        })
      });
      this.$store.dispatch('asyncGetSeller').then((datas) => {
        //   console.log(datas)
      })
     /* allAction(this.goods(), this.sellers(), this.ratings())
       .then((res) => {
        self.getgoods = self.$store.state.goods = res[0].data;
        self.getsellers = self.$store.state.seller = res[1].data;
        self.getratings = self.$store.state.ratings = res[2].data;
         this.$nextTick(() => {
           this.$router.push('/goods');
           this.shopcartFlag = true;
         })
      }).catch((rej) => {
        this.$openBox('商品请求报错！');
      });*/
      /* this.$ajax.all([this.goods(), this.sellers(), this.ratings()])
      .then(this.$ajax.spread(function (acct, perms) {
          console.log(acct)
          console.log(perms)
      })) */
      /* this.$ajax.get('/goods').then((res) => {
        if (res.errno === ERRORS) {
          this.$store.state.goods = res.data;
        } else {
          this.$openBox('商品请求报错！');
        }
      }).catch((rej) => {
        this.$openBox('商品请求报错！');
      }) */
    },
    mounted () {
      console.log(window.devicePixelRatio)
    },
    methods: {
    }
  }
</script>
<style lang="less" scoped>
 @import './minxi/minix.less';
  @click:rgb(77,85,93);
  @no-click:rgb(240,20,20);
  #app{
   .tab{
     position: relative;
      display:flex;
      width:100%;
      flex-wrap:wrap;
      .border-1px(1px,solid,rgba(7,17,27,0.1));
     .tab-item{
        flex:1 0 auto;
       a{
        text-align: center;
        box-sizing: border-box;
        height: 40px;
        padding:10px 0;
        width:100%;
        display:inline-block;
        line-height: 28px;
        font-size: 14px;
        color:@click;
        &.active{
          color:@no-click;
          }
       }
     }
    /*  &:after{
        content:'';
        width:100%;
      }*/
     .underline{
       z-index: 100;
       position:absolute;
       width:20px;
       height: 2px;
       left: 0;
       bottom:0;
       background-color: red;
     }
    }

    .shopbar{
      position: fixed;
      z-index: 300;
      bottom:0;
      height:46px;
      background-color:red;
      width:100%;
    }
  }
</style>
