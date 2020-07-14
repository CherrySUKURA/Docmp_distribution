<template>
	<view class="bindPhone-content">
		<button class="jump" @click="jumpIndex()">跳过</button>
		<view class="bindContent">
			<h1 class="title">绑定手机号</h1>
			<view class="item">
				<image src="../../static/Phone.png" class="icon"></image>
				<input type="text" v-model="bindePhone.mobile" placeholder="输入手机号" maxlength="11" class="user-input phone" id="phone-input" :adjust-position="false" />
			</view>
			<view class="item">
				<image src="../../static/choose.png" class="icon"></image>
				<button class="send" @click="bindChoose()" :disabled="ifSendChoose">{{ifSendChoose == false ? text : text + 's后重新发送'}}</button>
				<input type="text" v-model="bindePhone.code" placeholder="输入验证码" maxlength="6" class="user-input verification" id="verification-input" :adjust-position="false">
			</view>
			<button type="default" class="bindBtn" @click="RequestHttpBind()">绑定手机号</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bindePhone: {//绑定条件对象
					mobile: "",
					code: ""
				},
				PhoneChoose: {//发送验证码条件对象
					mobile: ""
				},
				text: '发送验证码',//发送按钮文字
				myreg: /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\d{8})$/,//手机号验证
				ifSendChoose: false//是否发送成功
			}
		},
		onShow() {
			uni.hideHomeButton()//禁用返回首页按钮
		},
		methods: {
			//跳转到首页
			jumpIndex(){
				uni.switchTab({
					url: "/pages/index/index"
				})
			},
			//绑定手机号
			RequestHttpBind(){
				if(this.bindePhone.mobile == ""){
					this.$public_.showToast('请输入手机号','none',2000,null)
					return false
				}
				if(!this.myreg.test(this.bindePhone.mobile)){
					this.$public_.showToast('请输入合法手机号！','none',2000,null)
					return false
				}
				if(this.bindePhone.code == ""){
					this.$public_.showToast('请填写验证码','none',2000,null)
					return false
				}
				this.$public_.RequestHttp('role/userBindPhone','Post',this.bindePhone,this.userBindPhoneCallBack,this.defeat)
			},
			//绑定手机号回调
			userBindPhoneCallBack(e){
				if(e.data.data.checkOut){
					// this.$public_.showToast('绑定成功','success',2000,null)this.$public_.showToast('绑定成功','success',2000,null)
					// setTimeout(() => {
						uni.switchTab({
							url:"/pages/index/index",
							success: (res) => {
								this.$public_.showToast('绑定成功','success',2000,null)
							}
						})
					// },2000)
				}else{
					this.$public_.showToast(e.data.msg,'none',2000,null)
				}
			},
			//发送验证
			bindChoose(){
				if(this.bindePhone.mobile != ""){
					if(this.myreg.test(this.bindePhone.mobile)){
						this.PhoneChoose.mobile = this.bindePhone.mobile
						this.$public_.RequestHttp(`role/sendBindPhoneCode/${this.bindePhone.mobile}`,'Post',this.PhoneChoose,this.bindPhoneCallBack,this.defeat)
					}else {
						this.$public_.showToast('请输入有效手机号码！','none',2000,null)
					}
				}else{
					this.$public_.showToast('请输入手机号','none',2000,null)
				}
			},
			//发送验证回调
			bindPhoneCallBack(e){
				if(e.data.data.checkOut){
					if(!this.ifSendChoose){
						this.ifSendChoose = true
						this.text = 60
					}
					this.$public_.showToast(e.data.msg,'none',2000,null)
					let settm = setInterval(() => {
						this.text = this.text-1
						if(this.text == 0){
							clearInterval(settm)
							this.text = '重新发送',
							this.ifSendChoose = false
						}
					},1000)
				}else{
					this.$public_.showToast(e.data.msg,'none',2000,null)
				}
			},
			//失败回调
			defeat(e){
				this.$public_.showToast(e.msg,'none',2000,null)
			}
		}
	}
</script>

<style>
	.bindPhone-content{
		width: 100%;
		height: 100vh;
		padding: 100rpx 50rpx 0 50rpx;
		box-sizing: border-box;
		position: relative;
	}
	.jump{
		width: 100rpx;
		height: 50rpx;
		font-size: 20rpx;
		position: absolute;
		top: 10rpx;
		right: 10rpx;
		background-color: inherit;
	}
	.bindContent{
		width: 100%;
		height: 400rpx;
	}
	.title{
		font-size: 60rpx;
	}
	.item{
		width: 100%;
		height: 100rpx;
		position: relative;
		margin-top: 40rpx;
	}
	.icon{
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
	}
	.user-input{
		width: 100%;
		height: 100%;
		border-bottom: 1rpx solid rgba(0,0,0,0.1);
		font-size: 40rpx;
		line-height: 100rpx;
		padding-left: 80rpx;
		box-sizing: border-box;
	}
	.send{
		width: 200rpx;
		height: 100%;
		position: absolute;
		top: 0;
		right: 0;
		font-size: 25rpx;
		line-height: 100rpx;
		z-index: 1000;
		background-color: inherit;
	}
	.bindBtn{
		width: 100%;
		height: 80rpx;
		margin-top: 50rpx;
		background-color: inherit;
	}
</style>
