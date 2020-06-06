<template>
	<view class="list-body">
		<view class="condition-content">
			<button type="primary" @click="open" class="condition-btn">打开窗口</button>
			<uni-popup ref="popup" type="bottom" class="condition-popup" :maskClick="maskClick">
				<view class="condition-lee">
					<view class="block-view">
						<view class="block_left" @click="close">取消</view>
						<view class="block-right" @click="condition_click">完成</view>
					</view>
					<view class="title-content" >
						<view class="title">状态选择</view>
					</view>
					<view class="condition-select">
						<picker mode="selector" @change="bindPickerChange" :value="index" :range="array">
							<view class="condition-uni-input">{{array[index]}}</view>
						</picker>
					</view>
					<view class="title-content" >
						<view class="title">电话号码</view> 
					</view>
					<view class="condition-select">
						<input value="" type="text" :value="inputValue" placeholder="请输入电话号码" />
					</view>
					<button type="primary" class="condition-lee-btn" @click="condition_click">搜索</button>
				</view>
			</uni-popup>
		</view>
		<view class="order-time">{{data}}</view>
		<view class="list-item" v-for="(item,index) in list" @click="a()">
			<view class="order-flex">
				<view class="order-left">
					<view class="label">收件人</view>
					<view class="item-body">{{item.recipients}}</view>
				</view>
				<view class="order-right">
					<uni-tag :text="item.state" :type="item.state=='异常'?'error':'primary'" class="list-tag" :circle="true" size="small"></uni-tag>
				</view>
			</view>
			<view class="order-flex">
				<view class="order-left">
					<view class="label">联系方式</view>
					<view class="item-body">{{item.phone}}</view>
				</view>
				<view class="order-right">
					<view class="label">省市</view>
					<view class="item-body">{{item.omit}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState,mapAction,mapGetter,mapMutations } from 'vuex'
	export default {
		data() {
			return {
				index: 0,
				array: ['完成','售后'],
				maskClick: false,
				inputValue: "",
				data: "",
				list: [
					{
						date: "2020-5-28",
						state: "异常",
						recipients: "王梓航",
						phone: "***********",
						omit: "浙江省"
					},
					{
						date: "2020-5-28",
						state: "正常",
						recipients: "王梓航",
						phone: "***********",
						omit: "浙江省杭州市"
					},
					{
						date: "2020-5-28",
						state: "正常",
						recipients: "王梓航",
						phone: "***********",
						omit: "浙江省"
					}
					
					
				]
			}
		},
		methods: {
			open() {
				this.$refs.popup.open()
			},
			close() {//关闭弹出层
				this.$refs.popup.close()
			},
			condition_click() {
				alert(this.array[this.index])
				this.$refs.popup.close()
			},
			bindPickerChange(e){
				this.index = e.target.value
			},
			a(){
				uni.navigateTo({
					url: '../../pages/details_list/details_list'
				})
			}
		},
		computed: {
			...mapState({
				public : state => state.public
			}),
			ZD: function() {
				return this.public
			}
		},
		created() {
			this.data = this.ZD
		}
	}
</script>

<style>
	.list-body{
		padding: 20rpx;
	}
	.list-item{
		width: 100%;
		padding: 20rpx;
		box-sizing: border-box;
		border: 1rpx solid rgba(0,0,0,0.1);
	}
	.order-flex{
		width: 100%;
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
		margin-top: 20rpx;
	}
	.label{
		display: inline-block;
		width: 150rpx;
		text-align:justify;
		text-justify:distribute-all-lines;/*ie6-8*/
		text-align-last:justify;/* ie9*/
		-moz-text-align-last:justify;/*ff*/
		-webkit-text-align-last:justify;/*chrome 20+*/
		position: relative;
	}
	.item-body{
		width: 150rpx;
		display: inline-block;
		text-align: left;
		margin-left: 40rpx;
	}
	.label::after {
		content: ":";
		position: absolute;
		right: -20rpx;
	}
	.order-time{
		height: 50rpx;
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
</style>
