<template>
<div id="shopcart">
  <div class="wraps" @click="clickOpenShopCar">
    <span class="iconwrapper">
    <span class="icon">
        <span class="iconinner icon-shopping_cart" :class="{showfoonds:checkedFoods>0}"></span>
        <span v-show="checkedFoods>0" class="checkedFoods">{{checkedFoods}}</span>
      </span>
    </span>
    <span class="content">
      <span class="totalprices">
        <span class="price">￥{{allPrice}}</span>
        <span class="dispatching">另需配送费￥{{seller.deliveryPrice}}元</span>
      </span>
    </span>
    <span class="pay" :class="{changepay:payfor}" @click.stop.prevent="payforfn()">{{pay}}</span>
    <div class="ball-wrapper">
      <div class="balls" v-for="ball in balls" >
      <transition name="ball-animal" @before-enter="beforeDrop" @enter="droping" @after-enter="afterDrop">
         <div class="ball"  v-show="ball.show">
          <div class="inner inner-hook"></div>
         </div>
      </transition>
      </div>
    </div>
  </div>
   <transition name="fade">
        <div class="shopInfo" v-show="shopInfo">
          <div class="title">
          <span class="titlewarp">
             <span class="shopcart">购物车</span>
            <span class="clear" @click="clickClear">清空</span>
          </span>
          </div>
          <div class="wrapper" ref="shopcarBall">
            <ul>
              <li class="food" v-for="item in selectFoods">
                <div class="content">
                  <span class="names">{{item.name}}</span>
                  <span class="price">￥{{item.price*item.count}}</span>
                  <div class="cartcontrol-wrapper">
                   <cartcontrol :foods="item"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
   </transition>
  <transition name="bgc">
      <div class="background" v-show="shopInfo" @click="shopcartHide"></div>
  </transition>
  </div>
</template>

<script>
// import Vue from 'vue';
import BScroll from 'better-scroll';
import cartcontrol from '../cartcontrol/cartcontrol.vue';
    export default {
        components: {cartcontrol},
        name: 'shopcart',
        data () {
          return {
            shopInfo: false, // 购物详情
            payfor: false, // 是否结算
            allPrice: 0,
            balls: [
              {
                show: false
              },
              {
                show: false
              },
              {
                show: false
              },
              {
                show: false
              },
              {
                show: false
              },
              {
                show: false
              },
              {
                show: false
              },
              {
                show: false
              }
            ],
            dropBalls: [],
            selectFoods: []
          }
        },
        computed: {
          foods () {
            return this.$store.state.goods
          },
          seller () {
            return this.$store.state.seller
          },
          checkedFoods () {
            let self = this;
            self.selectFoods = [];
            self.allPrice = 0;
            let foodsAllCount = 0;
            // goods.foods.count
            this.foods.forEach((v, i) => {
                  v.foods.forEach((v, i) => {
                    if (v.count && v.count > 0) {
                      self.selectFoods.push(v);
                      foodsAllCount += v.count;
                      self.allPrice += (v.price * v.count);
                    }
                  })
            })
            return foodsAllCount
          },
          pay () {
            // minPrice
            let Strings = '';
            if (this.checkedFoods === 0) {
              this.payfor = false;
              Strings = '￥' + this.seller.minPrice + '起送';
              return Strings
            } else {
              let chajia = this.seller.minPrice - this.allPrice;
                if (chajia > 0) {
                  this.payfor = false;
                  Strings = '还差￥' + chajia + '起送';
                } else {
                  this.payfor = true;
                  Strings = '结算';
                }
              return Strings
            }
          }
        },
      methods: {
        clickClear () {
          this.selectFoods.forEach((v, i) => {
              v.count = 0;
          })
        },
        shopcartHide () {
           this.shopInfo = false;
         },
        clickOpenShopCar () {
            if (this.selectFoods.length > 0) {
              this.shopInfo = !this.shopInfo;
              if (this.shopInfo) {
                if (!this.shopScroll) {
                  this.$nextTick(() => {
                    this.batterScroll();
                  })
                } else {
                  this.$nextTick(() => {
                    this.shopScroll.refresh();
                  })
                }
              }
            } else {
                this.shopInfo = false;
            }
          },
        payforfn () {
          if (!this.payfor) {
              return false;
          }
          window.alert(`需要支付${this.allPrice + this.seller.deliveryPrice}`)
        },
        drop (el) {
            for (let i = 0; i < this.balls.length; i++) {
              let item = this.balls[i];
              if (!item.show) {
                item.show = true;
                item.el = el;
                this.dropBalls.push(item);
                return
              }
            }
        },
        beforeDrop (el) {
          let lengths = this.balls.length;
           while (lengths--) {
             let ball = this.balls[lengths];
             if (ball.show) {
               let rect = ball.el.getBoundingClientRect();
               let x = rect.left - 30;
               let y = -(window.innerHeight - rect.top - 24);
               el.style.display = '';
               el.style.webkitTransform = `translate3d(0px,${y}px,0)`;
               el.style.transform = `translate3d(0px,${y}px,0)`;
               let inner = el.getElementsByClassName('inner-hook')[0];
                inner.style.webkitTransform = `translate3d(${x}px,0px,0)`;
               inner.style.transform = `translate3d(${x}px,0px,0)`;
             }
           }
        },
        droping (el, done) {
          /* eslint-disable no-unused-vars */
          let rf = el.offsetLeft;
          this.$nextTick(() => {
             el.addEventListener('transitionend', () => {
               done()
             });
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
           let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = 'translate3d(0,0,0)';
           inner.style.transform = 'translate3d(0,0,0)';
          });
        },
        afterDrop (el) {
          let ball = this.dropBalls.shift();
          if (ball) {
            ball.show = false;
            el.style.display = 'none';
          }
        },
        batterScroll () {
          this.shopScroll = new BScroll(this.$refs.shopcarBall, {
            click: true
          });
        }
      },
      watch: {
        selectFoods () {
          if (this.selectFoods.length === 0) {
                this.shopInfo = false;
          }
        }
      }
      }
</script>

<style lang="less" scoped>
  @import '../../common/fonts/style.css';
  @import '../../minxi/minix.less';
  .background{
    z-index:200;
    position:fixed;
    left:0;
    top:0;
    bottom: 0;
    right: 0;
    background-color:rgba(7,17,27,.6);
    &.bgc-enter-active,&.bgc-leave-active{
      transition:all .4s linear;
    }
    &.bgc-enter,&.bgc-leave-to{
      background-color:rgba(7,17,27,0);
    }
  }
  .shopInfo{
      z-index:300;
      position:absolute;
      top:0;
      left:0;
      width:100%;
    background: #fff;
      transform: translate3d(0,-100%,0);
      &.fade-enter-active,&.fade-leave-active{
       transition: all .5s;
      }
      &.fade-enter,&.fade-leave-active{
        transform: translate3d(0,0,0);
      }
      .title{
        position: relative;
        width:100%;
        height:40px;
        background-color: #f3f5f7;
        .titlewarp{
          .border-1px(1px solid rgba(7, 17, 27, 0.1));
            margin:0 18px;
         .shopcart{
            font-size:14px;
            font-weight: 200;
            line-height: 40px;
          }
          .clear{
            margin-right: 18px;
            display: inline-block;
            float:right;
             font-size:12px;
            font-weight: 700;
            color:rgb(0,160,220);
            line-height: 40px;
          }
        }

      }
      .wrapper{
        max-height: 262px;
       overflow: hidden;
      }
     .food{
       background: #fff;
       .border-1px(1px solid rgba(7, 17, 27, 0.1));
        position: relative;
       margin: 0 18px;
       padding: 12px 0;
        box-sizing: border-box;
       .content{
         .names{
           line-height: 24px;
           font-size: 14px;
           color: rgb(7, 17, 27);
         }
         .price{
           position: absolute;
           right:68px;
           bottom: 12px;
           line-height: 24px;
           font-size: 14px;
           font-weight: 700;
           color: rgb(240, 20, 20);
         }
         .cartcontrol-wrapper{
           position: absolute;
           right: 0;
           bottom: 12px;
         }
       }
      }
    }
  .wraps{
    z-index: 350;
    position: relative;
    height: 100%;
    width:100%;
    display: flex;
    background-color: #141d27;
    span{
      display: inline-block;
      vertical-align: middle;
    }

    .iconwrapper{
      flex:0 0 80px;
       position: relative;
       .icon{
        position:absolute;
        padding:6px;
          left:15px;
          bottom:2px;
         height: 44px;
         width: 44px;
         border-radius: 50%;
         background-color: #141d27;
         .iconinner{
            width:44px;
            height: 44px;
            border-radius: 50%;
            background-color:#2b343c;
            font-size:24px;
            text-align: center;
            color:rgba(255,255,255,.4);
            line-height: 44px;
            &.showfoonds{
            color:rgb(255,255,255);
            background-color:rgb(0,160,220);
           }
         }

         .checkedFoods{
          border-radius: 10px;
            position:absolute;
            right: 0;
            top:0;
            padding: 0 6px;
            font-size: 9px;
            font-weight:700;
            color:rgb(255,255,255);
            line-height: 18px;
            background-color: rgb(240,20,20);
            box-shadow: 0px 4px 8px 0px rgba(0,0,0,.4);
         }
      }
    }
    .content{
      flex:1;
      .totalprices{
        overflow: hidden;
         margin:5px 0;
        .price{
          display: block;
          padding-right: 6px;
          /* border-right:1px solid rgba(255,255,255,.1); */
          font-size: 14px;
          font-weight:700;
          color:rgba(255,255,255,.4);
         /*  line-height:  46px; */

        }
        .dispatching{
          margin-left: 6px;
          font-size: 12px;
          font-weight:700;
          color:rgba(255,255,255,.4);
          /* line-height:  46px; */
        }
      }
    }
    .pay{
      background-color:#2b343c;
      box-sizing: border-box;
      padding:0 8px;
      flex:0 0 95px;
      width:95px;
      text-align: center;
      font-size: 12px;
      font-weight:700;
      color:rgb(255,255,255,.4);
      line-height: 46px;
      &.changepay{
        background-color: rgb(85,16,100);
      }
    }
    .ball-wrapper{
      .ball{
        left: 32px;
        bottom: 22px;

        position: fixed;

        z-index: 200;
        transition: all 0.4s cubic-bezier(.42,-0.74,.92,.55);
        .inner{
            width:16px;
            height:16px;
            border-radius: 50%;
            background: rgb(0, 160, 220);
            transition: all 0.4s linear;
        }
      }
    }
  }
</style>
