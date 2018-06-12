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
          </div>
          <div class="heard">
            <i class="icon-favorite"></i>
            <span>已收藏</span>
          </div>
          <div class="head-content">
            <span class="minprice"><span class=""></span>{{sellers.minPrice}}</span>
            <span class="deliveryPrice">{{sellers.deliveryPrice}}</span>
            <span class="deliveryTime">{{sellers.deliveryTime}}</span>
          </div>
        </div>
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
</style>
