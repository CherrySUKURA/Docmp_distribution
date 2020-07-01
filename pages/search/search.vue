<template>
	<view class="search-content">
		<view class="condition-content">
			<button type="primary" @click="open" class="condition-btn">筛选</button>
			<button type="primary" @click="condition_click('all')" class="condition-btn">清除筛选条件</button>
			<uni-popup ref="popup" type="bottom" class="condition-popup" :maskClick="maskClick">
				<view class="condition-lee">
					<view class="block-view">
						<view class="block_left" @click="close">取消</view>
						<view class="block-right" @click="condition_click('time')">完成</view>
					</view>
					<view class="title-content" >
						<view class="title">开始时间</view>
					</view>
					<view class="condition-select">
						<picker mode="date" @change="StartDataTime" :value="startData" fields="day">
							<view class="condition-uni-input">
								{{startData}}
							</view>
						</picker>
					</view>
					<view class="title-content" >
						<view class="title">结束时间</view>
					</view>
					<view class="condition-select">
						<picker mode="date" @change="endDataTime" :value="endData" fields="day">
							<view class="condition-uni-input">
								{{endData}}
							</view>
						</picker>
					</view>
					<button type="primary" class="condition-lee-btn" @click="condition_click('time')">搜索</button>
				</view>
			</uni-popup>
		</view>
		<view class="list-content">
			<uni-list class="list-content-list">
				<text v-if="OrderAllDay.length == 0" class="tosettext">无内容</text>
				<uni-list-item v-if="OrderAllDay.length != 0" v-for="(item,index) in OrderAllDay" @click="skip(item.Order_Date)" :title="item.Order_Date" :key="index"  :show-badge="false" class="list-content-item">
					<template v-slot:right="">
						<view  class="badge-content">
							<uni-badge :text="OrderAllAmount[index].order_total_amount" type="primary" class="list-content-badge" size="small"></uni-badge>
							<uni-badge :text="OrderAllAfter[index].allAfterSalesStatusAmount" type="success" class="list-content-badge"size="small"></uni-badge>
						</view>
					</template>
				</uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	import searchs from '../../store/search.js';
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				startData: currentDate,
				endData: currentDate,
				maskClick: false,
				OrderAllDay: [],
				OrderAllAmount: [{}],
				OrderAllAfter: [{}],
				Parameter: {
				 "cus_id":"",
				 "start_date":"",
				 "end_date":""
				}
			}
		},
		onShow() {	
			this.RequestData(this.Parameter)     //请求数据
		},
		methods: {
			RequestData(Parameter){
				this.$public_.RequestHttp('order/orderAllDay',"Post",Parameter,this.DayCallBack,this.defeat,this.Daylosed);//请求订单列表订单天数数据
				this.$public_.RequestHttp('order/orderAllAmount',"Post",Parameter,this.AmoutCallBack,this.defeat,this.Amoutlosed);//请求订单列表订数数据
				this.$public_.RequestHttp('order/orderAllAfter',"Post",Parameter,this.AfterCallBack,this.defeat,this.Afterlosed);//请求订单列表售后订单数数据
			},
			DayCallBack(e){
				if(e.data.data.length == 0){
					this.$public_.showToast("没有订单列表数据","none",2000,null)
				}
				this.OrderAllDay = e.data.data;
			},
			AmoutCallBack(e){
				this.OrderAllAmount = e.data.data;
			},
			AfterCallBack(e){
				this.OrderAllAfter = e.data.data;
			},
			Daylosed(e){
				this.OrderAllDay = []
			},
			Amoutlosed(e){
				this.OrderAllAmount = [{}]
			},
			Afterlosed(e){
				this.OrderAllAfter = [{}]
			},
			defeat(e){
				console.log(e)
			},
			StartDataTime(e) {//选择器选择后的回调函数
				this.startData = e.detail.value;
			},
			endDataTime(e) {//选择器选择后回调
				this.endData = e.detail.value;
			},
			condition_click(type) {
				if(type == 'all'){
					this.startData = this.getDate();
					this.endData = this.getDate();
					this.Parameter.start_date = "";
					this.Parameter.end_date = "";
				}else if(type == "time"){
					this.Parameter.start_date = this.startData;
					this.Parameter.end_date = this.endData;
				}
				this.RequestData(this.Parameter);
				this.$refs.popup.close();
			},
			getDate(type) {//时间
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDay();
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			open() {//打开弹出层
				this.$refs.popup.open();
			},
			close() {//关闭弹出层
				this.$refs.popup.close();
			},
			skip(i){
				this.$store.commit("Orderstatu",i);
				this.$store.commit("publicstatu",0);
				uni.navigateTo({
					url: '../../pages/list/list'
				})
			}
		},
	}
</script>

<style scoped>
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
	.condition-btn{
		margin-bottom: 20rpx;
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
	.tosettext{
		color: #C0C0C0;
		display: block;
		text-align: center;
	}
</style>
