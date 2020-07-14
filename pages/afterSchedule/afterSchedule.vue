<template>
	<view class="afterSchedule-content">
		<form @submit="formSubmit" @reset="formRest" class="form-content">
			<view class="form-item form-column">
				<view class="title">
					RM单号
				</view>
				<view class="form-picker">
					<input class="form-input" name="input" placeholder="这是一个输入框" />
				</view>
			</view>
			<view class="form-item form-column">
				<view class="title">
					售后类型
				</view>
				<view class="form-picker">
					<picker @change="bindPickerChange" :value="index" :range="array">
						<view>{{array[index]}}</view>
					</picker>
				</view>
			</view>
			<view class="form-item form-column">
				<view class="title">
					售后原因
				</view>
				<view class="form-picker">
					<picker @change="bindPickerChange" :value="index" :range="array">
						<view>{{array[index]}}</view>
					</picker>
				</view>
			</view>
			<view class="form-item form-column">
				<view class="title">
					拦截状态
				</view>
				<view class="form-picker">
					<picker @change="bindPickerChange" :value="index" :range="array">
						<view>{{array[index]}}</view>
					</picker>
				</view>
			</view>
			<view class="form-item form-column">
				<view class="title">
					涉及金额
				</view>
				<view class="form-picker">
					<input class="form-input" name="input" placeholder="这是一个输入框" />
				</view>
			</view>
			<view class="form-item form-column">
				<view class="title">
					售后诉求
				</view>
				<view class="uni-textarea">
					<textarea class="form-input" placeholder-style="color:#F76260" placeholder="占位符字体是红色的"/>
				</view>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				array: ['中国','美国','巴西','日本'],
				index: 0
			}
		},
		methods: {
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			}
		}
	}
</script>

<style>
	.afterSchedule-content{
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
	}
	.uni-textarea{
		width: 80%;
		height: 300rpx;
		font-size: 32rpx;
		border: 1rpx solid rgba(200,0,0,0.1);
	}
</style>
