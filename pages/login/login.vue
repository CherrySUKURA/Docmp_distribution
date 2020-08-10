<template>
	<view class="login-content">
		<view class="logo">
			<view class="logo-img">
				<image src="../../static/logo.jpg"></image>
			</view>
		</view>
		<view class="user">
			<view v-if="choose" class="userLogin">
				<view class="item">
					<image src="../../static/username.png" class="icon"></image>
					<input type="text" v-model="login.username" placeholder="输入用户名" maxlength="12" class="user-input username" id="username-input" :adjust-position="false" />
				</view>
				<view class="item">
					<image src="../../static/password.png" class="icon"></image>
					<input type="text" v-model="login.password" placeholder="输入密码" :password="true" maxlength="12" class="user-input password" id="password-input" :adjust-position="false">
				</view>
			</view>
			<view v-if="!choose" class="userLogin">
				<view class="item">
					<image src="../../static/Phone.png" class="icon"></image>
					<input type="text" v-model="PhoneLogin.mobile" placeholder="输入手机号" maxlength="11" class="user-input phone" id="phone-input" :adjust-position="false" />
				</view>
				<view class="item">
					<image src="../../static/choose.png" class="icon"></image>
					<input type="text" v-model="PhoneLogin.code" placeholder="输入验证码" maxlength="6" class="user-input verification" id="verification-input" :adjust-position="false">
					<button class="send" @click="sendChoose()" :disabled="ifSendChoose">{{ifSendChoose == false ? text : text + 's后重新发送'}}</button>
				</view>
			</view>
			<button class="login-btn" @click="RquestUserData()">登录</button>
			<text class="tag">注：仅热麦合作伙伴可使用，如需登录请联系所在省区客服</text>
			<button type="default" class="chooseBtn" @click="chooseChange()">{{choose == true ? '短信验证码登录' : '账号密码登录'}}</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				login: {//账户密码登录请求条件
					username: "",
					password: ""
				},
				PhoneLogin: {//手机号验证登录请求条件
					code: "",
					mobile: ""
				},
				param: {//发送手机号验证码
					mobile: ""
				},
				choose: true,//选择如何登录
				ifSendChoose: false,//发送是否成功
				text: '发送验证码',//发送按钮显示的字
				myreg: /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\d{8})$///手机号验证
			}
		},
		onShow() {
			uni.hideHomeButton()//禁用小程序默认返回首页按钮
		},
		methods: {
			//登录请求
			RquestUserData(){
				if(this.choose){
					if(this.login.username == ""){
						this.$public_.showToast('请输入用户名','none',2000,null)
						return false
					}
					if(this.login.password == ""){
						this.$public_.showToast('请输入密码','none',2000,null)
						return false
					}
					this.$public_.loginRequestHttp('role/security/mini_program/login',"Post",this.login,this.loginCallBack,this.defeat)
				}else{
					if(this.PhoneLogin.mobile == ""){
						this.$public_.showToast('请输入手机号','none',2000,null)
						return false
					}
					if(!this.myreg.test(this.PhoneLogin.mobile)){
						this.$public_.showToast('请输入合法手机号！','none',2000,null)
						return false
					}
					if(this.PhoneLogin.code == ""){
						this.$public_.showToast('请输入验证码','none',2000,null)
						return false
					}
					this.$public_.loginRequestHttp('role/loginPhone','Post',this.PhoneLogin,this.loginCallBack,this.defeat)
				}
			},
			//登录请求回调
			loginCallBack(e){
				if(e.data.data.checkOut){
					uni.setStorage({
						key: 'token',
						data: e.header.Authorization,
						success: (res) => {
							uni.getStorage({
								key: 'token',
								success: (ress) => {
									this.$public_.storagedata(ress.data)
									if(e.data.data.phone){
										uni.switchTab({
											url:"/pages/index/index",
											success: (res) => {
												this.$public_.showToast('登录成功','success',2000,null)
											}
										})
									}else{
										// if(this.choose){
											uni.navigateTo({
												url: '../bindPhone/bindPhone'
											})
										// }else {
										// 	uni.switchTab({
										// 		url:"/pages/index/index",
										// 		success: (res) => {
										// 			this.$public_.showToast('登录成功','success',2000,null)
										// 		}
										// 	})
										// }
									}
								}
							})
						}
					})
				}else{
					this.$public_.showToast(e.data.msg,'none',2000,null)
				}
			},
			//发送验证码
			sendChoose(){
				if(this.PhoneLogin.mobile != ""){
					if(this.myreg.test(this.PhoneLogin.mobile)){
						this.param.mobile = this.PhoneLogin.mobile;
						this.$public_.loginRequestHttp(`role/sendSmsCode/${this.param.mobile}`,'Post',this.param,this.setCallBack,this.defeat)
					}else {
						this.$public_.showToast('请输入有效手机号码！','none',2000,null)
					}
				}else{
					this.$public_.showToast('请输入手机号','none',2000,null)
				}
			},
			//发送验证码回调
			setCallBack(e){
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
			},
			//选择登陆方式事件
			chooseChange(){
				this.choose = !this.choose
			}
		}
	}
</script>

<style>
	.login-content{
		width: 100%;
		height: 100vh;
		background-color: #CC6729;
		padding: 0 40rpx;
		box-sizing: border-box;
	}
	.logo{
		width: 100%;
		height: 350rpx;
		position: relative;
	}
	.logo-img{
		width: 180rpx;
		height: 180rpx;
		border-radius: 50%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
	}
	.logo-img image{
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.user{
		width: 100%;
		height: 550rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		padding: 40rpx 25rpx 40rpx 25rpx;
		box-sizing: border-box;
		overflow: hidden;
	}
	.user::before{
		content: "";
		display: table;
	}
	.userLogin{
		width: 100%;
	}
	.item{
		width: 100%;
		height: 70rpx;
		background-color: #F8F8F8;
		position: relative;
		margin-top: 20rpx;
		border-radius: 10rpx;
	}
	.icon{
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		left: 15rpx;
		top: 50%;
		transform: translateY(-50%);
	}
	.send{
		width: 200rpx;
		height: 100%;
		position: absolute;
		top: 0;
		right: 0;
		font-size: 25rpx;
		line-height: 70rpx;
		z-index: 1000;
	}
	.user-input{
		width: 100%;
		height: 100%;
		border-radius: 10rpx;
		padding-left: 70rpx;
		box-sizing: border-box;
	}
	.login-btn{
		width: 100%;
		height: 70rpx;
		border-radius: 10rpx;
		margin-top: 50rpx;
		background-color: #CC6729;
		line-height: 70rpx;
		text-align: center;
		color: #FFFFFF;
		font-size: 25rpx;
	}
	.tag{
		font-size: 20rpx;
	}
	.chooseBtn{
		width: 300rpx;
		height: 60rpx;
		font-size: 25rpx;
		line-height: 60rpx;
		background-color: #fcfcfc;
		border-radius: 25rpx;
		margin-top: 60rpx;
	}
</style>
