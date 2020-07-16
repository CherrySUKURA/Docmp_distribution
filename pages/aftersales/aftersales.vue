<template>
	<view class="aftersales-content">
		<form class="form-content" @submit="formsubmit">
			<view class="form-item">
				<view class="title">
					涉及金额
				</view>
				<view class="form-picker">
					<input class="form-input" name="savRefund" :placeholder="this.$public_.formatNumber(0)" />
				</view>
			</view>
			<view class="form-item form-column">
				<view class="title">
					状态更新
				</view>
				<view class="form-picker">
					<picker @change="statusChange" name='sav_status' :value="afterSavStatuskey" :range="afterSavStatusArray">
						<view>{{afterSavStatusArray[afterSavStatuskey]}}</view>
					</picker>
				</view>
			</view>
			<view class="form-item">
				<view class="title">
					品牌售后反馈
				</view>
				<view class="uni-textarea">
					<textarea class="form-input" name='feedback'/>
				</view>
			</view>
			<button type="primary" form-type="submit">提交</button>
		</form>
	</view>
</template>

<script>
	import { mapState,mapAction,mapGetter,mapMutations } from 'vuex';
	export default {
		data() {
			return {
				afterSavStatus: [],
				afterSavStatusArray: [],
				afterSavStatuskey: 0
			}
		},
		onShow() {
			this.RequestHttpSelect()
		},
		methods: {
			RequestHttpSelect(){
				this.$public_.RequestHttp('afterSales/afterSavStatus','Post',{},this.afterSavStatusCallBack,this.defeat)
			},
			afterSavStatusCallBack(e){
				let data = e.data.data;
				this.afterSavStatus = data;
				this.afterSavStatusArray = [];
				data.forEach( (item,index) => {
					this.afterSavStatusArray.push(item.savStatusDesc)
				})
			},
			defeat(e){
				this.$public_.showToast(e.data.msg,'none',2000,null)
			},
			statusChange(e){
				this.afterSavStatuskey = e.detail.value
			},
			formsubmit(e){
				let data = e.detail.value
				data.sav_status = this.afterSavStatus[data.sav_status].savStatus
				data.id = this.after_list.id
				this.$public_.RequestHttp('afterSales/afterFeedback','Post',data,this.afterFeedbackCallBack,this.defeat)
				console.log(data)
			},
			afterFeedbackCallBack(e){
				uni.navigateTo({
					url: "/pages/details_list/details_list",
					success: () => {
						this.$public_.showToast('提交成功','none',2000,null)
					}
				})
			}
		},
		computed: {
			...mapState({
				after_list: state => state.after_list
			})
		}
	}
</script>

<style>
	.aftersales-content{
		width: 100%;
		padding: 40rpx;
		box-sizing: border-box;
	}
	.form-content{
		width: 100%;
	}
	.form-item{
		width: 100%;
		/* height: 80rpx; */
		display: flex;
		margin: 30rpx 0;
	}
	.title{
		width: 20%;
		height: 80rpx;
		font-size: 32rpx;
		line-height: 80rpx;
		color: #000000
	}
	.form-picker{
		width: 80%;
		height: 80rpx;
		font-size: 32rpx;
		line-height: 80rpx;
		box-sizing: border-box;
		border: 1rpx solid rgba(200,0,0,0.1);
		background-color: #FFFFFF;
		text-align: center;
	}
	.form-input{
		width: 100%;
		height: 100%;
		line-height: 80rpx;
		padding: 10rpx; 
		box-sizing: border-box;
	}
	.uni-textarea{
		width: 80%;
		height: 300rpx;
		font-size: 32rpx;
		border: 1rpx solid rgba(200,0,0,0.1);
	}
</style>
