<template>
	<view class="list-body">
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
</style>
