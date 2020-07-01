<script>
export default {
	onLaunch: function() {

	},
	onShow: function() {
		// this.$public_.token1("")
	},
	onHide: function() {
		// uni.removeStorage({
		// 	key:"storage_key",
		// 	success:() => {
		// 		this.$public_.token1("")
		// 	}
		// })
	}
};
</script>

<style>
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
*{
	font-size: 25rpx;
}
</style>
