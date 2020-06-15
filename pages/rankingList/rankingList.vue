<template>
	<view class="rankingList-content">
		<view class="afterSale-list">
			<uni-list class="list-content-list">
				<uni-list-item v-for="(item,index) in getDate" @click="skip(item.Order_Status_Desc)" :title="item.Order_Status_Desc" :key="index"  :show-badge="false" class="list-content-item">
					<template v-slot:right="">
						<view  class="badge-content">
							<uni-badge :text="item.order_status_amount" type="success" class="list-content-badge"size="small"></uni-badge>
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
				getDate: [],
				AfterParameter: {
					"cusId": "%"
				}
			}
		},
		onLoad() {
			this.RequestData(this.AfterParameter);     //请求数据
		},
		methods: {
			RequestData(AfterParameter){
				this.$public_.RequestHttp("afterSales/afterOrderStatusAmount","Get",AfterParameter,this.AfterCallBack,this.defeat);//请求筛选渠道数据
			},
			AfterCallBack(e){
				this.getDate = e.data.data
			},
			defeat(e){
				
			},
			skip(i){
				this.$store.commit("Afterstatu",i);
				this.$store.commit("publicstatu",1);
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
