<template>
  <div class="wrap">
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
    <span class="pay">{{pay}}</span>
  </div>
</template>

<script>
// import Vue from 'vue';
    export default {
        name: 'shopcart',
        data () {
          return {
            allPrice: 0
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
            self.allPrice = 0;
            let foodsAllCount = 0;
            // goods.foods.count
            console.log(this.foods)
            this.foods.forEach((v, i) => {
                  v.foods.forEach((v, i) => {
                    if (v.count && v.count > 0) {
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
              Strings = '￥' + this.seller.minPrice + '起送';
              return Strings
            } else {
              let chajia = this.seller.minPrice - this.allPrice;
                if (chajia > 0) {
                  Strings = '还差￥' + chajia + '起送';
                } else {
                  Strings = '结算';
                }
              return Strings
            }
          }
        }
      }
</script>

<style lang="less" scoped>
  @import '../../common/fonts/style.css';
  .wrap{
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
       margin:16px 0;
        .price{
          padding-right: 12px;
          border-right:1px solid rgba(255,255,255,.1);
          font-size: 14px;
          font-weight:700;
          color:rgba(255,255,255,.4);
         /*  line-height:  46px; */

        }
        .dispatching{
          margin-left: 12px;
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
    }
  }
</style>
