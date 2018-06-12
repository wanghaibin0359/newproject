<template>
  <div class="seller">
      <div class="wrapper">
        <div class="head">
          <div class="head-title">
            <div class="title">{{sellers.name}}</div>
            <div class="star">
              <ul class="starul">
                <li class="starli" v-for='item in ratingStarArray(sellers.foodScore)' ><star :starclass="item"></star></li>
              </ul>
              <span class="text">({{sellers.ratingCount}})</span>
              <span class="text">月售{{sellers.sellCount}}单</span>
            </div>
            <div class="heart">
              <div class="heartClick">
                <i class="icon-favorite"></i>
              </div>
              <span class="collect">已收藏</span>
            </div>
          </div>
          <ul class="head-content">
            <li class="minprice float">
              <h2 class="sign">起送价</h2>
              <div>
                <span class="bigTime">{{sellers.minPrice}}</span>
                <span class="unit">元</span>
              </div>
            </li>
            <li class="deliveryPrice float">
              <h2 class="sign">商家配送</h2>
              <div>
                <span class="bigTime">{{sellers.deliveryPrice}}</span>
                <span class="unit">元</span>
              </div>
            </li>
            <li class="deliveryTime float">
              <h2 class="sign">平均配送时间</h2>
              <div>
                <span class="bigTime">{{sellers.deliveryTime}}</span>
                <span class="unit">分钟</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="banner"></div>
      </div>
  </div>
</template>
<script>
  import star from '../star/star.vue';
  import {getStarArray} from 'src/common/util/computedStar';
 // import BScroll from 'better-scroll';
  const STARSIZE = 2;
  const STARCOUNT = 5;
	export default {
    components: {star},
		name: 'seller',
    data () {
      return {
        sellers: {}
      }
    },
    mounted () {
      this.sellers = this.$store.state.seller
		},
    methods: {
      ratingStarArray() {
        let ss = getStarArray(STARCOUNT, STARSIZE, this.sellers.score);
        return ss
      }
    }
	};
</script>
<style lang="less" scoped>
  @import '../../minxi/minix.less';
  .seller{
    position:absolute;
    top:174px;
    bottom:46px;
    overflow: hidden;
    width:100%;
    .head{
      padding: 18px;
      .head-title{
        position: relative;
        padding-bottom: 18px;
        .border-1px(1px solid rgba(7, 17, 27, 0.1));
        .heart{
          position: absolute;
          right: 0;
          top:0;
          .heartClick{
            text-align: center;
            font-size:24px;
            color:rgb(240,20,20);
            line-height: 24px;
          }
          .collect{
            font-size:10px;
            color:rgb(77,85,93);
            line-height: 10px;
          }
        }
        .title{
          margin-bottom:8px;
          font-size:14px;
          color:rgb(7,17,27);
          line-height: 14px;
        }
        .text{
          display: inline-block;
          vertical-align: top;
          font-size:10px;
          color:rgb(77,85,93);
          line-height: 16px;
          margin-right: 12px;
        }
      }
      .head-content{
        padding-top: 18px;
        overflow: hidden;
        display: flex;
        flex-direction: row;
        .float{
          text-align: center;
          flex:1;
          border-right:1px solid rgba(7,17,27,.1) ;
          &:last-child{
            border:none;
          }
          .sign{
            font-size:10px;
            color:rgb(147,153,159);
            line-height: 10px;
            margin-bottom: 4px;
          }
          .bigTime{
            font-size:24px;
            font-weight: 200;
            color: rgb(7, 17, 27);
            line-height:24px;
          }
          .unit{
            font-size:10px;
            font-weight: 200;
            color: rgb(7, 17, 27);
            line-height:24px;
          }
        }
      }
    }
  }
  .banner{
    position: relative;
    width:100%;
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
  .star{
    .starul{
      margin-right: 8px;
      vertical-align: top;
      display: inline-block;
      overflow: hidden;
      .starli{
         float:left;
         width:16px;
         height: 16px;
         margin-right: 4px;
         &:last-child{
           margin:0;
         }
       }
    }
  }
</style>
