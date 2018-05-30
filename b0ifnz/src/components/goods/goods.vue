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
              <li v-for="i in item.foods" class='foodlis'>
                <div class="content">
                  <div class="img">
                    <img :src="i.icon" alt="" width="57" height="57">
                  </div>
                  <div class="contentRight">
                    <h2 class="title">{{i.name}}</h2>
                    <div class="description">{{i.description}}</div>
                    <div class="sellAndRating">
                      <span class="sellCount">月售{{i.sellCount}}份</span><span class="sellCount">好评率{{i.sellCount}}</span>
                    </div>
                    <div class="priceall">
                      <span class="now">￥{{i.price}}</span>
                      <span v-show="i.oldPrice" class="old">￥{{i.oldPrice}}</span>
                    </div>
                  </div>
                </div>
                <div class="cartwrapper">
                  <cartcontrol :foods="i"></cartcontrol>
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
  import cartcontrol from '../cartcontrol/cartcontrol.vue';
//  const ERRORS = 0;
	export default {
    components: {lable, cartcontrol},
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
        this.$nextTick().then(() => {
            this.siderbar.refresh();
            this.content.refresh();
            this._initScrollHeight();
          }, 0)
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
          &.current{

            position: relative;
            font-size: 12px;
            color:rgb(240,20,20);
            line-height: 14px;
            margin-top:-1px;
            z-index: 10;
            font-weight: 700;
            background-color: #fff;
            .icon{
              .border-none();
            }

          }
          span{
            display: inline-block;
          }
          .icon{
            text-align: center;
            .border-1px(1px,solid,rgba(7,17,27,0.1));
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
        .foods{
          padding:0 18px;
          .foodlis{
            position: relative;
            padding: 18px 0;
            .border-1px(1px,solid,rgba(7,17,27,0.1));
            .cartwrapper{
              position: absolute;
              bottom: 16px;
              right:0;
            }
             .content{
               display: flex;
               position: relative;
              .img,.contentRight{
                display:inline-block;
                vertical-align: top;
              }
                 .img{
                   flex:0 0 57px;
                 }
                 .contentRight{
                   flex:1 ;
                 }
               .contentRight{
                 margin-left: 10px;
                 .title{
                   margin: 2px 0 8px 0;
                   font-size:14px;
                   color:rgb(7,17,28);
                   line-height: 14px;
                 }
                 .description,.sellAndRating{
                   margin: 8px 0;
                   font-size:10px;
                   color:rgb(147,153,159);
                   line-height: 10px;
                 }
                 .sellAndRating{
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


               }
            }

          }
        }
      }
    }
  }
</style>
