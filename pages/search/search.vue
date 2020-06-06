<template>
	<view class="search-content">
		<view class="condition-content">
			<button type="primary" @click="open" class="condition-btn">打开窗口</button>
			<uni-popup ref="popup" type="bottom" class="condition-popup" :maskClick="maskClick">
				<view class="condition-lee">
					<view class="block-view">
						<view class="block_left" @click="close">取消</view>
						<view class="block-right" @click="condition_click">完成</view>
					</view>
					<view class="title-content" >
						<view class="title">开始时间</view>
					</view>
					<view class="condition-select">
						<picker mode="date" @change="bindDateChange" :value="date" fields="month">
							<view class="condition-uni-input">{{date}}</view>
						</picker>
					</view>
					<view class="title-content" >
						<view class="title">结束时间</view>
					</view>
					<view class="condition-select">
						<picker mode="date" @change="bindDateChange" :value="date2" fields="month">
							<view class="condition-uni-input">{{date2}}</view>
						</picker>
					</view>
					<button type="primary" class="condition-lee-btn" @click="condition_click">搜索</button>
				</view>
			</uni-popup>
		</view>
		<view class="list-content">
			<uni-list class="list-content-list">
				<uni-list-item v-for="(item,index) in OrderDate" @click="a(item.Date)" :title="item.Date" :key="index"  :show-badge="true" class="list-content-item">
					<template v-slot:right="">
						<view  class="badge-content">
							<uni-badge :text="item.badgetext" type="primary" class="list-content-badge" size="small"></uni-badge>
							<uni-badge :text="item.badgetext" type="success" class="list-content-badge"size="small"></uni-badge>
						</view>
					</template>
					
				</uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	import searchs from '../../store/search.js'
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				date: currentDate,
				date2: currentDate,
				maskClick: false,
				order: [
					{
						"Code": "10086",
						"Place": "员工内购",
						"OrderQuantity": "35",
						"ParcelNumber": "53",
						"OrderAmount": "3,030.00",
						"ExtraFreight": "0.00",
						"Payment": "3,03.00",
						"AccountBalance": "0.00"
					
					},
					{
						"Code": "10086",
						"Place": "员工内购",
						"OrderQuantity": "35",
						"ParcelNumber": "53",
						"OrderAmount": "3,030.00",
						"ExtraFreight": "0.00",
						"Payment": "3,03.00",
						"AccountBalance": "0.00"
					
					},
					{
						"Code": "10086",
						"Place": "花田社区",
						"OrderQuantity": "35",
						"ParcelNumber": "53",
						"OrderAmount": "3,030.00",
						"ExtraFreight": "0.00",
						"Payment": "3,03.00",
						"AccountBalance": "0.00"
					
					},
					{
						"Code": "10086",
						"Place": "广州农博",
						"OrderQuantity": "35",
						"ParcelNumber": "53",
						"OrderAmount": "3,030.00",
						"ExtraFreight": "0.00",
						"Payment": "3,03.00",
						"AccountBalance": "0.00"
					
					},
					{
						"Code": "10086",
						"Place": "饼饼精选",
						"OrderQuantity": "35",
						"ParcelNumber": "53",
						"OrderAmount": "3,030.00",
						"ExtraFreight": "0.00",
						"Payment": "3,03.00",
						"AccountBalance": "0.00"
					
					},
					{
						"Code": "10086",
						"Place": "小乔店铺",
						"OrderQuantity": "35",
						"ParcelNumber": "53",
						"OrderAmount": "3,030.00",
						"ExtraFreight": "0.00",
						"Payment": "3,03.00",
						"AccountBalance": "0.00"
					
					}
				],
				OrderDate: [
					{
						Date: "2020-05-04",
						badgetext: "12",
						badgetext2: "11",
					},
					{
						Date: "2020-05-03",
						badgetext: "12",
						badgetext2: "11",
					},
					{
						Date: "2020-05-02",
						badgetext: "12",
						badgetext2: "11",
					},
					{
						Date: "2020-05-01",
						badgetext: "12",
						badgetext2: "11",
					},
					{
						Date: "2020-04-30",
						badgetext: "12",
						badgetext2: "11",
					}
				]
			}
		},
		methods: {
			bindDateChange(e) {//选择器选择后的回调函数
				console.log(this.date,this.date2)
			},
			getDate(type) {//时间
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				
				// if (type === 'start') {
				// 	year = year - 60;
				// } else if (type === 'end') {
				// 	year = year + 60;
				// }
				month = month > 9 ? month : '0' + month;
				return `${year}-${month}`;
			},
			open() {
				this.$refs.popup.open()
			},
			close() {//关闭弹出层
				this.$refs.popup.close()
			},
			condition_click() {
				console.log(this.date,this.date2)
				this.$refs.popup.close()
			},
			a(i){
				this.$store.commit("Value",i)
				uni.navigateTo({
					url: '../../pages/list/list'
				})
			}
		},
		computed: {
			
		},
		created(){
			
		},
		components: {
			
		}
	}
</script>

<style>
	.search-content{
		width: 100%;
		padding: 20rpx;
		box-sizing: border-box;
	}
	.condition-lee{
		width: 100%;
		background-color: #FFFFFF;
		padding: 20rpx 0 150rpx 0;
	}
	.block-view{
		width: 100%;
		height: 80rpx;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		line-height: 60rpx;
		padding: 0 40rpx;
		box-sizing: border-box;
		box-shadow: 0px 1px 1px -1px rgba(0,0,0,0.2);
	}
	.block_left{
		color: #999999;
		font-size: 40rpx;
	}
	.block-right{
		color: #007AFF;
		font-size: 40rpx;
	}
	.title-content{
		width:96%; 
		padding:10rpx 2%; 
		flex-wrap:nowrap;
		background-color: #FFFFFF;
		margin-top: 10rpx;
	}
	.title{
		border-left: 10rpx solid #0ea391; 
		padding-left: 10rpx; 
		font-size: 32rpx;
		color: #000000
	}
	.condition-select{
		width: 95%;
		height: 80rpx;
		line-height: 80rpx;
		box-sizing: border-box;
		border: 1rpx solid black;
		margin: auto;
		background-color: #FFFFFF;
		text-align: center;
	}
	.condition-select input{
		width: 100%;
		height: 100%;
		text-align: center;
	}
	.condition-lee-btn{
		width: 95%;
		height: 80rpx;
		line-height: 80rpx;
		margin-top: 20rpx;
	}
	.badge-content{
		display: flex;
	}
</style>
