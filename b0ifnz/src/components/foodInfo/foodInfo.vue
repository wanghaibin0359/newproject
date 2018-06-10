<template>
<div class="foodInfo" ref='wrap'>
  <div class="wrapper">
    <div class="img" id="img">
      <img class="imginfo" :src="food.image" alt=""  >
      <div class="back" @click="clickHide">
        <i class="icon-arrow_lift"></i>
      </div>
    </div>
    <div class="title">
      <h1 class="name">{{food.name}}</h1>
      <div class="info">
       <span class="sellCount">月售{{food.sellCount}}份</span><span class="sellCount">好评率{{food.sellCount}}%</span>
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
       <rating-select  :desc="desc" :select-type="selectType" :content-type="contentType" :ratings="food.ratings" @select="changeSelectType" @onlycontent="onlyContentType"></rating-select>
     </div>
    <div class="ratingInf">
      <ul v-if="food.ratings.length>0">
        <li class="item" v-show="needShow(item.rateType, item.text)" v-for="item in food.ratings">
          <div class="time">{{item.rateTime | formDate}}</div>
          <div class="personId">
            <span class="uuids">{{item.username}}</span>
            <span class="head"><img :src="item.avatar" alt="" width="12" height="12"></span>
          </div>
          <div class="ratingIcon"><span class="icon" :class="iconClass(item.rateType)"></span><span class="content">{{item.text}}</span></div>
        </li>
      </ul>
      <div class="no-rating" v-else>暂无评价</div>
    </div>
     <div class="empty"></div>
    </div>
</div>
</template>
<script>
  import Vue from 'vue';
  import BScroll from 'better-scroll';
 import cartcontrol from '../cartcontrol/cartcontrol.vue';
 import ratingSelect from '../ratingSelect/ratingSelect.vue';
 import {formatDate} from '../../common/js/date';
//  const ERRORS = 0;
  const ALL = 2;
	export default {
    components: {cartcontrol, ratingSelect},
		name: 'foodInfo',
    data () {
      return {
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        },
        selectType: ALL,
        contentType: false
      }
    },
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      clickHide () {
        this.$emit('hide');
      },
      iconClass (type) {
        let arr = [{'icon-thumb_up': type === 0}, {'icon-thumb_down': type === 1}];
        return arr
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
      },
      needShow (type, text) {
        if (this.contentType) {
          if (!text) {
            return false
          } else {
            if (this.selectType !== ALL) {
              return type === this.selectType
            } else {
              return true
            }
          }
        }
        if (this.selectType !== ALL) {
            return type === this.selectType
        } else {
          return true
        }
      },
      changeSelectType (type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.wrapper.refresh();
        })
      },
      onlyContentType () {
        this.contentType = !this.contentType;
        this.$nextTick(() => {
          this.wrapper.refresh();
        })
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
    filters: {
      formDate (time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    }
   }
</script>
<style lang="less" scoped>
  @import '../../common/fonts/style.css';
  @import '../../minxi/minix.less';
  .foodInfo{
      overflow: hidden;
      position: fixed;
      top:0;
      left:0;
      width:100%;
      z-index:100;
      background-color: white;
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
      .img{
      position: relative;
      width:100%;
      padding-top:100%;
      height: 0;
      .imginfo{
        position: absolute;
        left:0;
        top:0;
        width: 100%;
        height: 100%;
      }
      .back{
        position: absolute;
        top: 10px;
        left: 0;
        .icon-arrow_lift{
          display: block;
          padding: 10px;
          font-size: 20px;
          color: #fff;
        }
      }
    }
      .empty{
        width:100%;
        height: 50px;
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
      .rating{
        position: relative;
        padding:18px;
        .titles{
          margin-bottom:18px;
        }
        .border-1px(1px solid rgba(7, 17, 27, 0.1));
        .no-rating{
          padding: 16px 0;
          font-size: 12px;
          color: rgb(147, 153, 159);
        }

      }
    .ratingInf{
      padding:0 18px;
      .item{
        position:relative;
        padding:16px 0;
        .border-1px(1px solid rgba(7, 17, 27, 0.1));
        .time{
          line-height: 12px;
          font-size: 10px;
          color: rgb(147, 153, 159);
          margin-bottom: 6px;
        }
        .personId{
          position:absolute;
          right:0;
          top:16px;
          .head,.uuids{
            display:inline-block;
            vertical-align: top;
          }
          .uuids{
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
          .head{
            overflow: hidden;
            border-radius: 50%;
            margin: 0 12px 0 0;
          }
        }
        .ratingIcon{
          line-height: 16px;
          font-size: 12px;
          color: rgb(7, 17, 27);
          .icon-thumb_up, .icon-thumb_down{
            margin-right: 4px;
            line-height: 16px;
            font-size: 12px;
          }
          .icon-thumb_up{
            color: rgb(0, 160, 220);
          }
          .icon-thumb_down{
            color: rgb(147, 153, 159);
          }
        }
      }
    }
    }
</style>
