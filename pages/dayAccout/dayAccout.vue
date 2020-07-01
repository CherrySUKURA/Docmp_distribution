<template>
	<view class="dayAccout-content">
		<view class="title-content" >
			<view class="title">到账流水</view>
		</view>
		<view class="table_box">
			<view class="table-header">
				<view class="table-header-item">收款日期</view>
				<view class="table-header-item">金额</view>
				<view class="table-header-item">备注</view>
			</view>
			<view class="table-body">
				<view class="table-body-item" v-for="(item,index) in items" :key="index">
					<view>{{item.AR_Date}}</view>
					<view>{{$public_.formatNumber(item.total_money)}}</view>
					<view>{{item.info}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items: [],
				DayAccoutParam: {
					"cusId": ""
				}
			}
		},
		onShow() {
			this.RequestData(this.DayAccoutParam)
		},
		methods: {
			RequestData(DayAccoutParam){
				this.$public_.RequestHttp("account/accountRunning","Get",DayAccoutParam,this.DayAccoutCallBack,this.defeat,this.DayAccoutlose)
			},
			DayAccoutCallBack(e){
				if(e.data.data.length == 0){
					this.$public_.showToast("没有流水数据","none",2000,null)
				}
				this.items = e.data.data
			},
			DayAccoutlose(e){
				this.items = []
			},
			defeat(e){
				console.log(e)
			}
		}
	}
</script>

<style>
	.dayAccout-content{
		width: 100%;
		padding: 20rpx;
		box-sizing: border-box;
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
	.table_box{
		width: 100%;
		text-align: center;
	}
	.table-header{
		height: 50rpx;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-around;
	}
	.table-header-item{
		width: 100%;
		height: 100%;
		line-height: 50rpx;
		border: 1rpx solid rgba(0,0,0,0.1);
		font-size: 25rpx;
		background-color: #C0C0C0;
	}
	.table-body{
		width: 100%;
		height: 100%;
	}
	.table-body-item{
		width: 100%;
		height: 50rpx;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-around;
	}
	.table-body-item view{
		width: 100%;
		height: 100%;
		line-height: 50rpx;
		border: 1rpx solid rgba(0,0,0,0.1);
	}
</style>