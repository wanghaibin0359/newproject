<template>
	<div class="header">
		<div class="header-base">
			<div class="content-left inline-block">
        <img  :src="getsellers.avatar" alt="" width="64" height="64">
			</div>
			<div class="content-auto inline-block">
				<div class="title">
					<span class="sign">
          </span>
					<span class="sellername">{{getsellers.name}}</span>
				</div>
				<div class="arrivalTime">
					{{getsellers.description}}/{{getsellers.deliveryTime}}分到达
				</div>
				<div class="spacilOffer">
					<span v-show='description' class="inline-block sign">
						<lable 	:datas="description?description[0].type:0" :size='1'></lable>
					</span>
					<span class="info inline-block">{{description?description[0].description:''}}</span>
				</div>
			</div>
			<div @click="clickPopShow" class="clickbtn">
				<span>{{description?description.length:0}}个</span>
				<span  class="icon-keyboard_arrow_right"></span>
			</div>
		</div>
		<div class="bulletin" @click="clickPopShow">
			<div class="bulletin_wrapper">
				<span class="bulletin_img"></span>
				<span class="bulletin_content">{{getsellers.bulletin}}</span>
				<i class="bulletin_arrow icon-keyboard_arrow_right"></i>
			</div>
		</div>
		<div class="bgcImg">
			<img  :src="getsellers.avatar" alt="" >
		</div>
    <transition name="fade" >
        <div   class="popPage" v-show="popUp" ref="fades">
            <div class="detail-wrapper">
              <div class="wrap">
                <div class="title">
                  <span class="sellername">{{getsellers.name}}</span>
                  <div class="star" v-show="getsellers">
                    <ul class="starul">
                      <li class="starli" v-for='item in starArray' ><star :starclass="item"></star></li>
                    </ul>
                  </div>
                </div>
                <div class="fadeWarp">
                  <div class="discounts">
                    <div class="ctitle">
                      <div class="line"></div>
                      <div class="content">优惠信息</div>
                      <div class="line"></div>
                    </div>
                    <div class="content">
                      <ul>
                        <li v-show="description" v-for="item in description" class="discountItem">
                            <span  class="inline-block"><lable 	:datas="item.type" :size='2'></lable></span>
                          <span class="info inline-block">{{item.description}}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="notice">
                    <div class="ctitle">
                      <div class="line"></div>
                      <div class="content">商家公告</div>
                      <div class="line"></div>
                    </div>
                    <div class="content">{{getsellers.bulletin}}</div>
                  </div>

                </div>
              </div>

              <i class="closebtn icon-close"  @click="clickClosePage"></i>
            </div>

        </div>

    </transition>
	</div>
</template>
<script>
import BScroll from 'better-scroll';
import lable from '../label/lable.vue';
import star from '../star/star.vue';

import {getStarArray} from 'src/common/util/computedStar';

	const STARSIZE = 3;
	const STARCOUNT = 5;
	export default {
		components: {lable, star},
		props: {
			getsellers: {
				type: Object,
				default: function () {
					return {}
				}
			}
		},
		data () {
			return {
				descriptions: '',
				popUp: false
			}
		},
		computed: {
			description () {
				return this.getsellers.supports
			},
			starArray () {
				let ss = getStarArray(STARCOUNT, STARSIZE, this.getsellers.score);
				return ss
			}
		},
		methods: {
      clickPopShow () {
        this.popUp = true;
        this.$nextTick(() => {
           this.betterscroll.refresh();
          this.betterscroll.scrollTo(0, 0, 100, 'linear');
        })
      },
      clickClosePage () {
        this.popUp = false;
      }
		},
    mounted () {
       this.$nextTick(() => {
        this.betterscroll = new BScroll(this.$refs.fades, {
          click: true,
          startY: 0
        });
        this.betterscroll.on('scroll', (pos) => {
          console.log(pos.x + '~' + pos.y)
        })
      })
    }
	};
</script>
<style lang="less" rel="stylesheet/less">
@import '../../minxi/bgcimg.less';
@import '../../common/fonts/style.css';
  .header{
  	position: relative;
    width:100%;
    background-color: rgba(7,17,27,.5);
    overflow: hidden;
    .popPage{
      position:fixed;
     /* overflow: auto;*/
      top:0;
      left:0;
      z-index: 100;
      width:100%;
      height: 100%;
      &.fade-enter-active{
        transition: all .5s;
      }
      &.fade-enter,&.fade-leave-active{
        opacity: 0;
        transition: all .5s;
      }
      background-color:rgba(7,17,27,.8);
     .detail-wrapper{
       min-height: 100%;
       position: relative;
       box-sizing: border-box;
       padding-bottom: 70px;
       .wrap{
         height: 100%;

         .title{
           padding:64px 0 28px 0;
           text-align: center;
           .sellername{
             display: inline-block;
             font-size:18px;
             font-weight: 700;
             color:rgb(255,255,255);
             line-height: 18px;
             margin-bottom: 18px;
           }
           .star{
             text-align: center;
             .starul{
               display: inline-block;
               overflow: hidden;
               .starli{
                 float:left;
                 width:20px;
                 height: 19px;
                 margin-right: 20px;
               }
             }
           }
         }

         .fadeWarp{
           padding-bottom: 70px;
           width:100%;
           color:rgb(255,255,255);
           .discounts,.notice{
             max-width: 100%;
             margin: 0 12px 28px;
             .ctitle{
               display: flex;
               margin-bottom: 24px;
               .content{
                 diplay:inline-block;
                 flex:0 1 auto;
                 padding: 0 12px;
                 font-size:14px;

                 font-weight: 700;
                 line-height: 14px;
               }
               .line{
                 flex: 1 0 auto;
                 margin-top: 6px;
                 border-top: 2px solid rgba(255, 255, 255, 0.2);

               }
             }
             .content{
               padding: 0px 12px;
             }
           }
           .discounts{
             .content{
               .discountItem{
                 margin-bottom: 12px;
                 span{
                   vertical-align: top;
                   display:inline-block;

                 }

                 .signIcon{
                   width:16px;
                   height: 16px;
                 }
                 .info{
                   margin-left:6px;
                   font-size:12px;
                   font-weight:400;
                   line-height:16px;
                 }
               }
             }
           }
           .notice{
             .content{
               font-size:12px;
               font-weight:400;
               line-height:24px;
             }
           }
         }
       }
       .closebtn{
         display: block;
         position:absolute;
         left: 50%;
         transform: translateX(-50%);
         bottom:32px;
         font-size: 32px;
         width:32px;
         height: 32px;
         color:rgba(255,255,255,.5);
       }
     }


    }
	  .bgcImg{
		position: absolute;
		z-index: -1;
		width:100%;
		height: 100%;
		top:0;
		left: 0;
		filter: blur(10px);
		img{
			width:100%;
			height: 100%;
		}
	}
    .header-base{
      padding:24px 0 18px 24px;
      position: relative;
      .clickbtn{
      		font-size: 0;
      		position: absolute;
      		bottom:16px;
      		right: 12px;
      		padding:7px 8px;
      		background-color: rgba(0,0,0,.2);
      		border-radius:18px;
			span{
				line-height:12px;
				font-size:10px;
				color:white;
				font-weight: 200;
				display: inline-block;
				&:first-child{
					margin-right: 2px;
				}
			}
      	}
      .content-auto{
        .title{
          margin:2px 0 8px 0;
          /* .sign{
           .bgcimg('../components/header/brand@');
            background-size:30px 18px;
            vertical-align: top;
            margin-right:6px;
            display: inline-block;
            width:30px;
            height:18px;

          } */
          .sellername{
            display: inline-block;
            vertical-align: top;
            font-size:16px;
            color:rgb(255,255,255);
            font-weight: bold;
            line-height: 18px;
          }
        }
        .arrivalTime{
          font-size:12px;
          color:rgb(255,255,255);
          font-weight: 200;
          line-height: 12px;
          margin-bottom:10px;
        }
        .spacilOffer{
          font-size:0px;
          color:rgb(255,255,255);
          font-weight: 200;
          line-height: 12px;

          .sign{
          	 margin-right:4px;
          }
          .info{
          	 font-size:12px;
          }
        }
      }
      .inline-block{
        margin-right:18px;
        vertical-align: top;
        display:inline-block;
      }
      .content-left{
        height: 64px;
          img{
            border-radius: 2px;
          }
      }

    }
    .bulletin{
    	width:100%;
    	height: 28px;
    	padding: 8px 12px;
    	background-color:rgba(7,17,27,.2);
    	box-sizing: border-box;
    	.bulletin_wrapper{
    		font-size: 0;
    		max-width:100%;
    		display: flex;
    		span{
    			display: inline-block;
    			vertical-align: top;
    			margin-right:4px;
    			&:last-child{
    				margin:0;
    			}
    		}
    		.bulletin_img{
    			flex: 0 0 22px;
    			.bgcimg('../components/header/bulletin@');
    			background-size: 22px 11px;
    		}
    		.bulletin_content{
    			flex: 1 1 auto;
    			text-overflow: ellipsis;
    			overflow: hidden;
    			white-space: nowrap;
    			font-size: 10px;
    			color:rgb(255,255,255);
    			font-weight: 200;
    		}
    		.bulletin_arrow{
    			flex: 0 0 auto;
    			font-size: 10px;
    			color:white;

    		}
    	}
    }
  }
</style>
