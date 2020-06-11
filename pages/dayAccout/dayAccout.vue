<template>
	<view class="dayAccout-content">
		<view class="title-content" >
			<view class="title">到账流水</view>
		</view>
		<view class="table_box">
			<view class="table-header">
				<view class="table-header-item">到账日期</view>
				<view class="table-header-item">金额</view>
				<view class="table-header-item">结算日期</view>
			</view>
			<view class="table-body">
				<view class="table-body-item" v-for="(item,index) in item" :key="index">
					<view>{{item.DZdate}}</view>
					<view>{{item.monay}}</view>
					<view>{{item.JSdate}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				item: [
					{
						DZdate: "2020-03-14",
						monay: "3,000.00",
						JSdate: "2020-03-14"
					},
					{
						DZdate: "2020-03-14",
						monay: "3,000.00",
						JSdate: "2020-03-14"
					},
					{
						DZdate: "2020-03-14",
						monay: "3,000.00",
						JSdate: "2020-03-14"
					},
					{
						DZdate: "2020-03-14",
						monay: "3,000.00",
						JSdate: "2020-03-14"
					},
					{
						DZdate: "2020-03-14",
						monay: "3,000.00",
						JSdate: "2020-03-14"
					},
					{
						DZdate: "2020-03-14",
						monay: "3,000.00",
						JSdate: "2020-03-14"
					}
				]
			}
		},
		methods: {
			
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
