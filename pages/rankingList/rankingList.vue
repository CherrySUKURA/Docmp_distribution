<template>
	<view class="rankingList-content">
		<view class="afterSale-list">
			<uni-list class="list-content-list">
				<text v-if="getDate.length == 0" class="tosettext">无内容</text>
				<uni-list-item v-if="getDate.length != 0" v-for="(item,index) in getDate" @click="skip(item.Order_Status_Desc)" :title="item.Order_Status_Desc" :key="index"  :show-badge="false" class="list-content-item">
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
				getDate: [],//售后列表数据
				AfterParameter: {//请求售后列表的条件对象
					"cusId": ""
				}
			}
		},
		onShow() {
			this.RequestData(this.AfterParameter);     //请求数据
		},
		methods: {
			RequestData(AfterParameter){
				this.$public_.RequestHttp("afterSales/afterOrderStatusAmount","Get",AfterParameter,this.AfterCallBack,this.defeat);//请求售后列表数据
			},
			//请求售后列表数据回调
			AfterCallBack(e){
				if(e.data.data.length == 0){
					this.$public_.showToast("没有售后列表数据","none",2000,null)
				}
				this.getDate = e.data.data
			},
			//失败回调
			defeat(e){
				console.log(e)
			},
			//存储状态，跳转页面
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
	.tosettext{
		color: #C0C0C0;
		display: block;
		text-align: center;
		margin-top: 20rpx;
	}
</style>
