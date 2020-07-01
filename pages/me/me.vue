<template>
	<view>
		<view class="userinfo">
			<view class="userlook">
				<image :src="avatarUrl"></image>
			</view>
			<text class="usertext">{{nickName}}</text>
			<button v-if="ifsee" class="userbtn btntop" type="primary" open-type="getUserInfo" @click="login">微信获取用户消息</button>
		</view>
		<uni-popup ref="phone" class="bindPhone" :maskClick="maskClick" :animation="true">
			<view class="bindPhone-content">
				绑定手机
				<button class="phonebtn" type="default" open-type="getPhoneNumber" @getphonenumber="decryptPhoneNumber">绑定手机账户</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nickName: "用户名",
				avatarUrl: "../../static/userimg.png",
				maskClick: false,
				ifsee: true
			}
		},
		onShow() {

		},
		methods: {
			RequestUserData(param){
				this.$public_.loginRequestHttp('role/auto_login','Get',param,this.loginCallBack,this.defeat)
			},
			loginCallBack(e){
				uni.setStorage({
					key: 'storage_key',
					data: e.data,
					success: (res) => {
						if(res.errMsg == "setStorage:ok"){
							this.ifsee = false
							uni.getStorage({
								key:"storage_key",
								success: (ress) => {
									if(ress.errMsg == "getStorage:ok"){
										this.nickName = ress.data.name;
										this.avatarUrl = ress.data.face;
										this.$public_.storagedata(ress.data)
										if(e.data.first_register){
											this.$public_.showToast("登陆成功","success",2000,this.open)
										}else{
											this.$public_.showToast("登陆成功","success",2000,null)
										}
									}else{
										this.$public_.showToast("登陆失败","none",2000,null)
									}
								},
								fail:() => {
									this.$public_.showToast("登陆失败","none",2000,null)
								}
							})
						}else{
							this.$public_.showToast("登陆失败","none",2000,null)
						}
					},
					fail:() => {
						this.$public_.showToast("登陆失败","none",2000,null)
					}
				})
			},
			callback(e){
				this.close()
				this.$public_.showToast(e.msg,"success",2000,this.open)
			},
			defeat(e){
				this.$public_.showToast("登陆失败","none",2000,null)
			},
			open(){
				this.$refs.phone.open()
			},
			close(){
				this.$refs.phone.close()
			},
			login(){
				uni.login({
					provider:'weixin',
					success:(res) => {
						if(res.errMsg == "login:ok"){
							let code = res.code;
							let param 
							uni.getUserInfo({
								provider: 'weixin',
								success:(res) => {
									if(res.errMsg == "getUserInfo:ok"){
										param = {
											code: code,
											userInfo: res.userInfo,
										}
										this.RequestUserData(param)
									}else{
										this.$public_.showToast("登陆失败","none",2000,null)
									}
								}
							})
						}else{
							this.$public_.showToast("登陆失败","none",2000,null)
						}
					},
					fail: (res) => {
						this.$public_.showToast("用户取消授权，登陆失败","none",2000,null)
					}
				})
			},
			decryptPhoneNumber(e){//获取电话号码
				if(e.detail.errMsg === 'getPhoneNumber:ok'){
					uni.getStorage({
						key:'storage_key',
						success: (res) => {
							let param = {
								uuid: res.data.uuid,
								endata: e.detail.encryptedData,
								iv: e.detail.iv
							}
							this.$public_.RequestHttp('role/security/mini_program/bind','Post',param,this.callback,this.defeat)
						}
					})
				}else{
					this.$refs.phone.close()
				}
			}
		}
	}
</script>

<style>
	.bottombar{
		width: 100%;
		height: 150rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		padding-bottom: 20rpx;
		background-color: #FFFFFF;
	}
	.userinfo{
		text-align: center;
		line-height: 100rpx;
	}
	.userlook{
		width: 200rpx;
		height: 200rpx;
		margin: auto;
		margin-top: 150rpx;
	}
	.userlook image{
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.btntop{
		margin-top: 200rpx;
	}
	.userbtn{
		width: 600rpx;
	}
	.bindPhone{
		width: 100%;
		height: 100%;
	}
	.bindPhone-content{
		width: 600rpx;
		height: 300rpx;
		background-color: #FFFFFF;
	}
	.phonebtn{
		width: 300rpx;
		height: 70rpx;
		font-size: 25rpx;
	}
</style>
