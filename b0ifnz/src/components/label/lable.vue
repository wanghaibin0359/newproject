<template>
<div>
	<div class="classMap" v-if="size===1":class="classMap[datas]"></div>
	<div class="classMap1" v-if="size===2" :class="classMap2[datas]"></div>
  <div class="classMap2" v-if="size===3" :class="classMap3[datas]"></div>
</div>
</template>
<script>
	export default {
		name: 'lable',
		data() {
			return {
				classMap: this.$store.state.classMap,
				classMap2: this.$store.state.classMap2,
        classMap3: this.$store.state.classMap3
			}
		},
		props: ['datas', 'size']
	};
</script>
<style lang="less" scoped>
@import '../../minxi/bgcimg.less';
div{
	width:100%;
	height: 100%;
	background-size: 100% 100%;
  .classMap{
    width:12px;
    height: 12px;
  }
  .classMap1{
    width:16px;
    height: 16px;
  }
  .classMap2{
    width:12px;
    height: 12px;
  }
	.decrease{
		.bgcimg('../components/header/decrease_1@');
	}
	.discount{
		.bgcimg('../components/header/discount_1@');
	}
	.special{
		.bgcimg('../components/header/special_1@');
	}
	.invoice{
		.bgcimg('../components/header/invoice_1@');
	}
	.guarantee{
		.bgcimg('../components/header/guarantee_1@');
	}
	.decrease2{
		.bgcimg('../components/header/decrease_2@');
	}
	.discount2{
		.bgcimg('../components/header/discount_2@');
	}
	.special2{
		.bgcimg('../components/header/special_2@');
	}
	.invoice2{
		.bgcimg('../components/header/invoice_2@');
	}
	.guarantee2{
		.bgcimg('../components/header/guarantee_2@');
	}
  .decrease3{
    .bgcimg('../components/goods/decrease_3@');
  }
  .discount3{
    .bgcimg('../components/goods/discount_3@');
  }
  .special3{
    .bgcimg('../components/goods/special_3@');
  }
  .invoice3{
    .bgcimg('../components/goods/invoice_3@');
  }
  .guarantee3{
    .bgcimg('../components/goods/guarantee_3@');
  }
}
</style>
