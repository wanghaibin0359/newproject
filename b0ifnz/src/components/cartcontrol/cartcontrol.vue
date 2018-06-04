<template>
  <div class="wrap">
    <transition name="move">
      <span  v-show="foods.count && foods.count>0" class="decrease icon-remove_circle_outline" @click="decrease"></span>
    </transition>
      <span class="cart-content" v-show="foods.count && foods.count>0">{{foods.count}}</span>
      <span class="add icon-add_circle"  @click="add"></span>

  </div>
</template>

<script>
  import Vue from 'vue';
    export default {
      name: 'cartcontrol',
      data () {
        return {
          count: 0
        }
      },
      props: {
        foods: {
          type: Object,
          default: function() {
            return {}
          }
        }
      },
      methods: {
        add (event) {
            console.log('add')
          if (!event._constructed) {
            return false;
          }
          if (!this.foods.count) {
            Vue.set(this.foods, 'count', 1);
          } else {
            this.foods.count++;
          }
          // this.$store.state.el = event.target;
          this.$store.commit({
            type: 'drop',
            el: event.target,
            vm: this
          })
        },
        decrease (event) {
          if (!event._constructed) {
            return false;
          }
          this.foods.count--;
        }
      }
    }
</script>

<style lang="less" scoped>
  @import '../../common/fonts/style.css';
  .wrap{

    span{

      display: inline-block;
      vertical-align: top;
      font-size:24px;
      color:rgb(0,160,220);
      line-height:24px;
    }
    .cart-content{
      font-size:10px;
      color:rgb(147,153,159);
      line-height:24px;
    }
    .decrease{
      opacity: 1;
      transform: translate3d(0, 0, 0);
      transition: all 0.4s linear;
      transform: rotate(180deg);
      &.move-enter-active, &.move-leave-active{
        transition: all 0.4s linear;
    }
      &.move-enter, &.move-leave-to{
        opacity: 0;
        transform: translate3d(30px, 0, 0) rotate(0);

      }

    }

  }
</style>
