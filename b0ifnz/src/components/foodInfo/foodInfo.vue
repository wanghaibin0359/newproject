<template>
<div class="foodInfo" ref='wrap'>
  <div class="wrapper">
    <button @click='clickHide'>撤退</button>
    <img class="img" :src="food.image" alt="" width='100%' height="375"id="img">
    <div class="title">
      <h1 class="name">{{food.name}}</h1>
      <div class="info">
       <span class="sellCount">月售{{food.sellCount}}份</span><span class="sellCount">好评率{{food.sellCount}}%</span>
       <!--  <span class="sellCount">{{food.sellCount}}</span>
       <span class="rating">{{food.rating}}</span> -->
      </div>
      <div class="priceall">
        <span class="now">￥{{food.price}}</span>
        <span class="old" v-show="food.oldPrice!=''">￥{{food.oldPrice}}</span>
      </div>
      <div class="cartcontrol">
        <div class='addshopcar' v-if="!food.count||food.count===0" class="button" @click='add'>加入购物车</div>
        <cartcontrol v-else  :foods="food"></cartcontrol>
      </div>
    </div>
    <div class="banner"></div>
    <div class="goodsInfo">
      <h1 class="titles">商品介绍</h1>
      <p class="content">{{food.info}}</p>
    </div>
     <div class="banner"></div>
     <div class="rating">
       <h1 class="titles">商品评价</h1>

     </div>
     <div class="empty"></div>
  </div>
</div>
</template>
<script>
  import Vue from 'vue';
  import BScroll from 'better-scroll';
// import BScroll from 'better-scroll';
// import lable from '../label/lable.vue';
 import cartcontrol from '../cartcontrol/cartcontrol.vue';
//  const ERRORS = 0;
	export default {
    components: {cartcontrol},
		name: 'foodInfo',
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      clickHide () {
        this.$emit('hide');
      },
      add (event) {
        if (!event._constructed) {
            return false;
          }
          if (!this.food.count) {
            Vue.set(this.food, 'count', 1);
          } else {
            this.food.count++;
          }
      }
    },
    mounted () {
      this.wrapper = new BScroll(this.$refs.wrap, {
          click: true,
          startY: 0
      })
      this.$nextTick(() => {
         this.wrapper.refresh();
      })
    },
    watch: {
     /* food () {
         this.$nextTick(() => {
          this.wrapper.refresh();
          // this.wrapper.scrollTo(0, 0, 100, 'linear');
        })
      }*/
    }
   }
</script>
<style lang="less" scoped>
  @import '../../minxi/minix.less';
  .foodInfo{

      overflow: hidden;
      position: fixed;
      top:0;
      left:0;
      width:100%;
      z-index:100;
      background-color: pink;
      height:100%;
      opacity: 1;
      transform:translate3d(0,0,0);
      &.infofood-enter-active,&.infofood-leave-active{
       transition: all .5s;
      }
      &.infofood-enter,&.infofood-leave-active{
        opacity: 0;
        transform: translate3d(100%,0,0);
       
      }
      .empty{
        width:100%;
        height: 46px;
      }
      .title{
        position: relative;
        padding: 18px;
        .name{
          font-weight: 700;
          font-size:14px;
          line-height: 14px;
          color:rgb(7,17,27);
          margin-bottom:8px;
        }
        .info{
           font-size:10px;
           color:rgb(147,153,159);
           line-height: 10px;
           margin-bottom:18px;
          .sellCount{
             margin-right: 12px;
          }
        }
         .priceall{
           .now{
             margin-right: 8px;
             font-size: 14px;
             color: rgb(240, 20, 20) ;
           }
           .old{
             text-decoration: line-through;
             font-size: 10px;
             color: rgb(147, 153, 159);
           }
         }
         .cartcontrol{
         position: absolute;
          right: 18px;
          bottom:18px;
          .addshopcar{
            border-radius: 24px;
            box-sizing: border-box;
            padding:0 12px;
            font-size:10px;
            color:white;
            line-height: 24px;
            background-color: rgb(0,160,220);
          }
         }
      }
      .banner{
        position: relative;
        width:100;
        height: 16px;
        background-color: #f3f5f7;
        &::before{
          width:100%;
          top:0;
          position: absolute;
          display: block;
          content:"";
           border-top:1px solid rgba(7, 17, 27,.1);
        }
        &::after{
           width:100%;
          bottom:0;
          position: absolute;
          display: block;
          content:"";
          border-bottom:1px solid rgba(7, 17, 27,.1);
        }
      }
      .goodsInfo{
        padding:18px;
        .content{
          padding:6px 8px 0;
          font-size:12px;
          font-weight: 200;
          color:rgb(77,85,93);
          line-height: 24px;
        }
      }
    }
</style>
