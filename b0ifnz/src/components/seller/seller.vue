<template>
  <div class="seller" ref="seller">
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
            <div class="heart" @click="toggleFavorite">
              <div class="heartClick">
                <i class="icon-favorite" :class="{'active':favorite}"></i>
              </div>
              <span class="collect">{{favoriteText}}</span>
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
        <div class="bulletin">
          <div class="bulletin-title">
            <h2 class="title">公告与活动</h2>
            <div class="content">{{sellers.bulletin}}</div>
          </div>
          <ul>
                <li   v-for="item in sellers.supports" class="discountItem">
                  <span  class="inline-block"><lable 	:datas="item.type" :size='2'></lable></span>
                  <span class="info inline-block">{{item.description}}</span>
                </li>
          </ul>
        </div>
        <div class="banner"></div>
        <div class="pics">
          <h1 class="title">商家实景</h1>
          <div class="pic-wrapper" ref="picWrapper">
            <ul class="pic-list" ref="picList">
              <li class="pic-item" v-for="pic in sellers.pics">
                <img :src="pic" width="120" height="90">
              </li>
            </ul>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll';
  import star from '../star/star.vue';
  import lable from '../label/lable.vue';
  import {getStarArray} from 'src/common/util/computedStar';
  import {saveStore, getStore} from '../../common/util/store.js';
 // import BScroll from 'better-scroll';
  const STARSIZE = 2;
  const STARCOUNT = 5;
	export default {
    components: {star, lable},
		name: 'seller',
    data () {
      return {
        ids: this.$route.params.id,
        favorite: (() => {
            return getStore(this.$route.params.id, 'favorite', false)
        })()
      }
    },
    computed: {
      favoriteText () {
        return this.favorite ? '已收藏' : '收藏'
      },
      sellers () {
        return this.$store.state.seller;
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.sroll = new BScroll(this.$refs.seller, {
          click: true,
          startY: 0
        })
        let picWidth = 120;
        let margin = 6;
        let width = (picWidth + margin) * this.sellers.pics.length - margin;
        this.$refs.picList.style.width = width + 'px';
       this.pics = new BScroll(this.$refs.picWrapper, {
          scrollX: true
        })
      })
		},
    methods: {
      ratingStarArray() {
        let ss = getStarArray(STARCOUNT, STARSIZE, this.sellers.score);
        return ss
      },
      toggleFavorite () {
        if (!this.ids) {
          window.alert('请登录！')
          return false
        }
        // 获取ID；
        this.favorite = !this.favorite;
        saveStore(this.ids, 'favorite', this.favorite);
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
          width:36px;
          position: absolute;
          right: 0;
          top:0;
          .heartClick{
            text-align: center;
            font-size:24px;
            line-height: 24px;
            color: #d4d6d9;
            .active{
              color:rgb(240,20,20);
            }
          }
          .collect{
            width:100%;
            display:inline-block;
            text-align: center;
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
    .bulletin{
      padding:18px 18px 0;
      .bulletin-title{
        .title{
          margin-bottom: 12px;
          line-height: 14px;
          color: rgb(7, 17, 27);
          font-size: 14px;
        }
        .content{
          position: relative;
          padding-bottom:16px;
          margin:12px;
          margin-bottom:0;
          font-size:12px;
          color:rgb(240,20,20);
          font-weight: 200;
          line-height: 24px;
          .border-1px(1px solid rgba(7, 17, 27, 0.1));
        }
      }
      .discountItem{
        position: relative;
        .border-1px(1px solid rgba(7, 17, 27, 0.1));
        margin:16px 12px;
        padding-bottom: 16px;
        &:last-child{
          .border-none()
        }
        .inline-block{
          display:inline-block;
          vertical-align: top;
        }
        .info{
          font-weight:200;
          font-size:12px;
          color:rgb(7,17,27);
          line-height: 16px;
        }
      }
    }
    .pics{
      padding: 18px;
      .title{
        margin-bottom: 12px;
        line-height: 14px;
        color: rgb(7, 17, 27);
        font-size: 14px;
      }
      .pic-wrapper{
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        .pic-list{
          font-size: 0;
        }
      }
      .pic-item{
        display: inline-block;
        margin-right: 6px;
        width: 120px;
        height: 90px;
        &:last-child{
        margin: 0;
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
