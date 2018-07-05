<template>
  <div class="ratings"  ref="ratings">
    <div class="wrapper">
      <div class="grade">
      <div class="left">
        <h1 >{{seller.score}}</h1>
        <div class="text">综合评分</div>
        <div class="text2">高于周边商家{{seller.rankRate}}%</div>
      </div>
      <div class="right">
        <span class="servieAttitude">
          <span class="right_text">服务态度</span>
          <span class="star count">
           <ul class="starul">
              <li class="starli" v-for='item in starArray' ><star :starclass="item"></star></li>
            </ul>
          </span>
          <span class="count">{{seller.serviceScore}}</span></span>
        <span class="servieAttitude">
          <span class="right_text">服务态度</span>
          <span class="star count">
             <ul class="starul">
                <li class="starli" v-for='item in starArray' ><star :starclass="item"></star></li>
             </ul>
          </span>
          <span class="count">{{seller.serviceScore}}</span>
        </span>
        <span class="servieAttitude"><span class="right_text">送达时间</span><span class="time">{{seller.deliveryTime}}分钟</span></span>
      </div>
    </div>
      <div class="banner"></div>
      <div class="ratingControl">
         <rating-select  :select-type="selectType" :content-type="contentType" :ratings="ratings" @select="changeSelectType" @onlycontent="onlyContentType"></rating-select>
    </div>
      <div class="banner"></div>
      <div class="ratingInf">
        <ul v-if="ratings.length>0">
          <li class="item" v-show="needShow(item.rateType, item.text)" v-for="item in ratings">
            <div class="left"><span class="head"><img :src="item.avatar" alt="" ></span></div>
            <div class="ratingWrapper">
              <div class="time">{{item.rateTime | formDate}}</div>
              <span class="uuids">{{item.username}}</span>

              <span class="ratingStar">
                 <ul class="starul">
                  <li class="starli" v-for='item in ratingStarArray(item.score)' ><star :starclass="item"></star></li>
                 </ul>
                <span class="deliveryTime">{{item.deliveryTime}}分钟送达</span>
              </span>
              <span class="content">{{item.text}}</span>
              <div class="ratingIcon">
                <span class="icon" :class="iconClass(item.rateType)"></span>
                <span class="label" v-for="single in  item.recommend" >{{single}}</span>
              </div>
            </div>
          </li>
        </ul>
        <div class="no-rating" v-else>暂无评价</div>
      </div>
    </div>
  </div>
</template>
<script>
  import star from '../star/star.vue';
  import ratingSelect from '../ratingSelect/ratingSelect.vue';
  import BScroll from 'better-scroll';
  import {formatDate} from '../../common/js/date';
  import {getStarArray} from 'src/common/util/computedStar';
  const STARSIZE = 2;
  const RATINGSTARSIZE = 1;
  const STARCOUNT = 5;
  const ALL = 2;
	export default {
    components: {star, ratingSelect},
		name: 'ratings',
    data () {
      return {
        ratings: {},
        seller: {},
        selectType: ALL,
        contentType: false
      }
    },
    computed: {
      starArray () {
        let ss = getStarArray(STARCOUNT, STARSIZE, this.seller.score);
        return ss
      }
    },
    methods: {
      iconClass (type) {
        let arr = [{'icon-thumb_up': type === 0}, {'icon-thumb_down': type === 1}];
        return arr
      },
      ratingStarArray (datas) {
        let ss = getStarArray(STARCOUNT, RATINGSTARSIZE, datas);
        return ss
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
    created () {
      console.log('ratings')
      this.ratings = this.$store.state.ratings;
      this.seller = this.$store.state.seller;
    },
    mounted () {
      // this.ratings = this.$store.state.ratings;
      this.wrapper = new BScroll(this.$refs.ratings, {
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
	};
</script>
<style lang="less" scoped>
  @import '../../common/fonts/style.css';
  @import '../../minxi/minix.less';
  .ratings{
    width: 100%;
    position: absolute;
    top: 174px;
    bottom: 46px;
    overflow: hidden;
   /* overflow: hidden;
    overflow: hidden;
    width:100%;*/
    .wrapper{
    }
    .grade{
      display:flex;
      padding:18px 0;
      .left{
        box-sizing: border-box;
        flex:0 0 138px;
        border-right:1px solid rgba(147,153,159,.3);
        text-align: center;
        h1{
          font-size: 24px;
          color:rgb(255,153,0);
          line-height: 28px;
          margin-bottom: 6px;
        }
        .text{
          font-size: 12px;
          color:rgb(7,17,27);
          line-height: 12px;
          margin-bottom: 8px;
        }
        .text2{
          font-size: 10px;
          color:rgb(147,153,159);
          line-height: 10px;
        }
      }
      .right{
        flex:1 1 auto;
        padding:0 24px;
        box-sizing: border-box;
        .servieAttitude{
          margin-bottom:8px;
          display:block;
          .right_text.star.count{
            display:inline-block;
          }
          .right_text{
            font-size: 12px;
            color:rgb(7,17,27);
            line-height: 18px;
            margin-right: 12px;
          }
          .star{
            margin-right: 12px;
            .starul{
              display: inline-block;
              overflow: hidden;
              .starli{
                float:left;
                width:12px;
                height: 12px;
                margin-right: 6px;
                &:last-child{
                  margin:0;
                }
              }
            }
          }
          .time{
            font-size: 10px;
            color:rgb(147,153,159);
            line-height: 10px;
          }
          .count{
            font-size: 12px;
            color:rgb(255,153,0);
            line-height: 18px;
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
    .ratingControl{
      padding:18px;
    }
    .ratingInf{
      padding:0 18px;
      .item {
        display:flex;
        position: relative;
        padding: 16px 0;
        .border-1px(1px solid rgba(7, 17, 27, 0.1));
        .left{
          flex: 0 0 28px;
          margin-right: 12px;
          .head{
            display: inline-block;
            width:28px;
            height: 28px;
            border-radius:50%;
            overflow: hidden;
            img{
              width:100%;
              height: 100%;
            }
          }
        }
        .ratingWrapper{
          width:100%;
          flex:1 1 auto;
          .time{
            float:right;
            font-size:10px;
            line-height: 12px;
            color:rgb(147,153,159);
          }
          .uuids{
            font-size:10px;
            line-height: 12px;
            color:rgb(7,17,27);
            display: block;
          }
          .ratingStar{
            display: block;
            margin-top:4px;
            margin-bottom:6px;
            ul{
              display: inline-block;
              .starli{
                width:10px;
                height: 10px;
                display:inline-block;
              }
            }

            .deliveryTime{
              margin-left:8px;
              display: inline-block;
              font-size:10px;
              font-weight:200;
              line-height: 12px;
              color:rgb(147,153,159);
            }
          }
          .content{
            font-size:12px;
            line-height: 18px;
            color:rgb(7,17,27);
          }
          .ratingIcon{
            span{
              display:inline-block;
            }
            .label{
              display: inline-block;
              margin: 0 8px 4px 0;
              font-size: 9px;
              padding: 3px 6px;
              border: 1px solid rgba(7, 17, 27, 0.1);
              border-radius: 1px;
              color: rgb(147, 153, 159);
              background: #fff;
            }
            .single{

            }
            .icon-thumb_up,.icon-thumb_down{
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
  }
</style>
