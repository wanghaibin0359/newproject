<template>
		<span class='subs' :class='starclass'></span>
</template>
<script>
	export default {
		name: 'star',
		props: {
			starclass: {
				type: String,
				default: ''
			}
		}
	};
</script>
<style lang='less' scoped>
@import '../../minxi/bgcimg.less';
	
		.subs{
			display: inline-block;
			width:100%;
			height: 100%;
			background-size: 100%;
		}
		

			.star_on_3{
				.bgcimg('../components/star/star48_on@');
			}
			.star_half_3{
				.bgcimg('../components/star/star48_half@');
			}
			.star_off_3{
				.bgcimg('../components/star/star48_off@');
			}
			.star_on_2{
				.bgcimg('../components/star/star36_on@');
			}
			.star_half_2{
				.bgcimg('../components/star/star36_half@');
			}
			.star_off_2{
				.bgcimg('../components/star/star36_off@');
			}
			.star_on_1{
				.bgcimg('../components/star/star24_on@');
			}
			.star_half_1{
				.bgcimg('../components/star/star24_half@');
			}
			.star_off_1{
				.bgcimg('../components/star/star24_off@');
			}
		
</style>
