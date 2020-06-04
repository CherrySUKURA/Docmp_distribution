<template>
	<view class="rankingList-content">
		<view class="afterSale-list">
			<uni-list class="list-content-list">
				<uni-list-item v-for="(item,index) in getDate" @click="a(item.DDZT)" :title="item.DDZT" :key="index"  :show-badge="false" class="list-content-item">
					<template v-slot:right="">
						<view  class="badge-content">
							<uni-badge :text="item.badgetext" type="success" class="list-content-badge"size="small"></uni-badge>
						</view>
					</template>
				</uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				getDate: [
					{
						DDZT: "物流单号已返回 | 未发货",
						badgetext: "12"
					},
					{
						DDZT: "问题件 | 需查看具体派送失败原因",
						badgetext: "12"
					},
					{
						DDZT: "订单取消 | 未发货",
						badgetext: "12"
					},
					{
						DDZT: "订单多发 | 取消 | 已出库需拦截",
						badgetext: "12"
					},
					{
						DDZT: "客户未收货 | 退回仓库",
						badgetext: "12"
					}
				]
			}
		},
		methods: {
			a(i){
				this.$store.commit("Value",i)
				uni.navigateTo({
					url: '../../pages/list/list'
				})
			}
		}
	}
</script>

<style scoped>
	.badge-content{
		display: flex;
	}
</style>
