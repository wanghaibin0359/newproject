<template>
<div class="goods" v-if="foods!==''">
	<div class="siderbar" ref="siders">
    <ul >
      <li @click="selectMenu(index,$event)" class="fooditem"  :class="{current:currentIndex===index}" v-for=" (item, index) in foods" ref="foodslist">
        <span class="icon">
          <span v-if="item.type !==-1" class="icons"><lable   	:datas="item.type" :size='3'></lable></span>
           {{item.name}}
        </span>

      </li>
    </ul>
  </div>
  <div class="content" ref="content">
      <ul ref="ul">
        <li class="type" v-for=" item in foods" ref="list">
          <div class="titleName"><span>{{item.name}}</span></div>
          <div class="foods">
            <ul>
              <li v-for="i in item.foods">
                <div class="content">
                  <div class="img">
                    <img :src="i.icon" alt="">
                  </div>
                  <span class="title">{{i.name}}</span>
                  <span class="description">{{i.description}}</span>
                  <span class="sellAndRating">
                    <span class="sellCount">月售{{i.sellCount}}份</span><span class="sellCount">好评率{{i.sellCount}}</span>
                  </span>
                  <span class="priceall">
                    <span class="price">￥{{i.price}}</span>
                    <span v-if="i.oldPrice" class="oldPrice">￥{{i.oldPrice}}</span>
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </li>
      </ul>

  </div>
</div>

</template>
<script>
  import BScroll from 'better-scroll';
  import lable from '../label/lable.vue';
//  const ERRORS = 0;
	export default {
    components: {lable},
		name: 'goods',
    data () {
      return {
        currentIndex: 0,
        foodsList: [],
        curentY: 0,
        nextIndex: 0
      }
    },
    computed: {
      foods () {
        return this.$store.state.goods;
      }
    },
    created () {
    },
    methods: {
      selectMenu (index, event) {
        if (!event._constructed) {
          return
        }
        this.currentIndex = index;
        this.content.scrollToElement(this.$refs.list[index], 300);
      },
      _initScrollHeight () {
        let eles = this.$refs.list;
        let curntHeight = 0;
        this.foodsList.push(curntHeight);
        for (let i = 0; i < eles.length; i++) {
             curntHeight = eles[i].clientHeight + curntHeight;
             this.foodsList.push(curntHeight);
        }
      },
      scrollcoent () {
        let lsit = this.foodsList;
        for (let i = 0; i < lsit.length - 1; i++) {
          let page1h = lsit[i];
          let page2h = lsit[i + 1];
          if (this.curentY > page1h && this.curentY < page2h) {
            return i
          }
        }
        return 0
      }
    },
    mounted () {
      let self = this;
      /* this.$nextTick(() => {
        this.siderbar.refresh();
        this.content.refresh();
        this._initScrollHeight();
      })*/
        this.siderbar = new BScroll(this.$refs.siders, {
          click: true,
          startY: 0
        });
        // betterscroll; probeType=2时，只有自己滚动触发scroll。为3时只要滚动，就触发scroll
        this.content = new BScroll(this.$refs.content, {
          click: true,
          startY: 0,
          probeType: 2
        });
        this.content.on('scroll', (pop) => {
          this.curentY = Math.abs(pop.y);
          this.nextIndex = this.scrollcoent();
          self.$nextTick(() => {
           // this.siderbar.refresh();
            this.currentIndex = this.nextIndex;
            this.siderbar.scrollToElement(this.$refs.foodslist[this.currentIndex]);
          })
        })
    },
    watch: {
      foods(news, old) {
       /* console.log(this.$refs.ul.children)
        console.log(this.$refs.ul.clientHeight)*/
        // 偶尔出现ul的高度意外变小，导致scroll只能滚动一半，是因为DOM过长，
        this.$nextTick().then(() => {
       /* console.log(this.$refs.ul.children)
        console.log(this.$refs.ul.clientHeight)*/
          setTimeout(() => {
            console.log(this.$refs.ul.children)
            console.log(this.$refs.ul.clientHeight)
            this.siderbar.refresh();
            this.content.refresh();
            this._initScrollHeight();
          }, 0)
        })
      }
    }
	};
</script>
<style lang="less" scoped>
  @import '../../minxi/minix.less';
  .goods{
    display: flex;
    width:100%;
    position:absolute;
    top:174px;
    bottom:46px;
    overflow: hidden;
    .siderbar{
      box-sizing: border-box;
      width:80px;
      background-color: #f3f5f7;
      flex:0 0 80px;
      ul{
        .fooditem{
          .border-1px(1px,solid,rgba(7,17,27,0.1));
          &.current{
            position: relative;
            font-size: 12px;
            color:rgb(240,20,20);
            line-height: 14px;
            margin-top:-1px;
            z-index: 10;
            font-weight: 700;
            background-color: #fff;
            .border-none();
          }
          text-align: left;
          width:56px;
          padding: 0 12px;
          position: relative;
          display: table;
          height: 54px;
          font-size: 12px;
          color:#4d555d;
          font-weight: 200;
          line-height: 14px;

          span{
            display: inline-block;
          }
          .icon{
            position: relative;
            display: table-cell;
            vertical-align: middle;

            .icons{
              display: inline-block;
              vertical-align: top;
              width: 12px;
              height: 12px;
            }

          }
        }
      }

    }
    .content{
      flex:1 1 auto;
      .type{
        margin-bottom: 18px;
        .titleName{
          height: 26px;
          width:100%;
          border-left:2px solid #d9dde1;
          background-color: #f3f5f7;
          box-sizing:border-box;
          padding-left:14px;
          span{
            font-size: 12px ;
            color:rgb(147,153,159);
            line-height: 26px;
          }
        }
      }
    }
  }
</style>
