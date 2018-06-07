<template>
  <div class="wrapper">
   <div class="rating-type">
     <span class="block block2" :class="{'block-active':selectType === 2}" @click="clickChange(2,$event)">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
     <span class="block block0" :class="{'block-active':selectType === 0}" @click="clickChange(0,$event)">{{desc.positive}}<span class="count">{{positive.length}}</span></span>
     <span class="block block1" :class="{'block-active':selectType === 1}" @click="clickChange(1,$event)">{{desc.negative}}<span class="count">{{negative.length}}</span></span>
   </div>
    <div class="filterRating">
      <span class="icon icon-check_circle" :class="{'icon-active':contentType}" @click="onlycontent"></span><span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>
<script>
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
    export default {
      name: 'ratingSelect',
      props: {
        desc: {
          type: Object,
          default () {
            return {
              all: '全部',
              positive: '满意',
              negative: '不满意'
            }
          }
        },
        ratings: {
          type: Array,
          default () {
            return []
          }
        },
        selectType: {
          type: Number,
          default: ALL
        },
        contentType: {
          type: Boolean,
          default: false
        }
      },
      computed: {
        positive () {
          return this.ratings.filter((item) => {
            return item.rateType === POSITIVE;
          })
        },
        negative () {
          return this.ratings.filter((item) => {
            return item.rateType === NEGATIVE;
          })
        }
      },
      methods: {
        clickChange (type, event) {
          if (!event._constructed) {
            return false;
          }
          this.$emit('select', type);
        },
        onlycontent () {
          this.$emit('onlycontent');
        }
      }
    }
</script>
<style lang="less" scoped>
  @import '../../minxi/minix.less';
  .wrapper{
    .rating-type{
      position: relative;
      padding-bottom:16px;
      .border-1px(1px solid rgba(7, 17, 27, 0.1));
      .block{
        display:inline-block;
        padding: 0 12px;
        margin-right:8px;
        background-color: pink;
        font-size:14px;
        line-height: 24px;
        border-radius:5px;
        color:rgb(77,85,93);
        .count{
          margin-left: 2px;
          font-size: 8px;
        }
      }
      .block-active{
        color:rgb(255,255,255);
      }
      .block2 {
        background-color: rgb(0,160,260);
      }
      .block0 {
        background-color: rgba(0,160,260,.2);
      }
      .block1 {
        background-color: rgba(77,85,93,.2);
      }
    }
    .filterRating{
      margin-top:12px;
      span{
        display:inline-block;
        vertical-align: top;
      }
      .icon{
        color:rgb(147,153,159);
        font-size:24px;
        line-height: 24px;
        margin-right: 4px;
      }
      .icon-active{
        color:rgb(0,160,260);
      }
      .text{
        font-size:12px;
        line-height: 24px;
        color:rgb(147,153,159);
      }
    }
  }
</style>
