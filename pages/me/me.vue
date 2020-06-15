<template>
	<view>
<!-- 		<view class="searchbar">
			<v-searchbar></v-searchbar>
		</view> -->
		<view class="userinfo">
			<view class="userlook">
				<image :src="avatarUrl"></image>
			</view>
			<text class="usertext">{{nickName}}</text>
			<button class="userbtn" type="primary" open-type="getPhoneNumber" @getPhoneNumber="getPhoneNumber" @click="login" withCedentials="true">微信授权获取用户信息</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				indexnumber: 4,
				code: "",
				SessionKey: "",
				encrypteddData: "",
				iv: "",
				OpenId: "",
				nickName: "用户名",
				avatarUrl: "../../static/userimg.png",
				siCanUse: uni.getStorageSync('isVanUse')//默认为true，记录当前用户是否是第一次授权使用的
			}
		},
		methods: {
			RequestUserData(param){
				this.$public_.RequestHttp('','Post',param,this.loginCallBack,this.defeat)
			},
			getPhoneNumber(e){//获取电话号码
				console.log(e)
			},
			login(){
				uni.login({
					success(res) {
						if(res.code){
							let param = {
								code: res.code
							}
							this.RequestUserData(param)
						}else {
							console.log('登陆失败' + res.errMsg)
						}
					}
				})
			}
		},
		components: {
		},
		onShow() {
			if(wx.hideHomeButton){  
			    wx.hideHomeButton();  
			}  
		},
		// onLoad() {
		// 	this.login()
		// }
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
	.userbtn{
		width: 600rpx;
		margin-top: 200rpx;
	}
</style>
