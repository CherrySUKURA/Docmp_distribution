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
			<button class="userbtn" type="primary" open-type="getUserInfo" @getphonenumber="getPhoneNumber" @getuserinfo="wxGetUserInfo" withCedentials="true">微信授权获取用户信息</button>
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
			wxGetUserInfo: function(res){
				//判断时候允许授权
				if (!res.detail.iv){
					uni.showToast({
						title: "你取消了授权，登录失败",
						icon: "none"
					});
					return false
				}
				//获取用户信息
				uni.getUserInfo({
					provider: 'weixin',
					success: infoRes => {
						console.log(infoRes)
						this.encrypteddData = infoRes.encryptedData;
						this.iv = infoRes.iv;
						this.nickName = infoRes.userInfo.nickName;
						this.avatarUrl = infoRes.userInfo.avatarUrl;
						uni.setStorageSync('isCanUse',false);//记录是否对此授权，false表示不是第一次授权
						// this.updateUserInfo();
					},fail:function (fail){console.log("fail:",fail)}
				})
			},
			login(){
				uni.showLoading({
					title: '登陆中...'
				});
				
				//1.wx获取登录用户code
				uni.login({
					provider: 'weixin',
					success: loginRes => {
						this.code = loginRes.code;
						if(!this.isVanUse) {
							//非第一次授权获取用户信息
							uni.getUserInfo({
								provider: 'weixin',
								success: infoRes => {
									console.log('login用户信息：',infoRes);
									//获取用户信息后向调用信息更新方法
									this.nickName = infoRes.userInfo.nickName;//昵称
									this.avatarUrl = infoRes.userInfo.avatarUrl//头像
									// this.updataUserInfo();//调用更新信息方法
								}
							});
						}
						//将用户登录code传递到后台置换用户SessionKey,OpenId等信息
						
						uni.hideLoading();
					},
				})
			},
			// updateUserInfo(){ //向后台更新信息
			// 	this.setName(this.nickName,this.avatarUrl)
			// 	let _this = this;
			// 	var obj ={
			// 		appid:"wx1b02a26b03110f06",
			// 		secret:"07bd35d41e7fb6a9bff173c728d6a096",
			// 		code:this.code
			// 	}
				
			// 	// 这一步一般是在后台  这里是为了测试
			// 	// 正常给 后台 5个测试 appId appsecret code(登录接口获取) encryptedData iv
				
			// 	htxcx(obj.appid,obj.secret,obj.code).then(res=>{
			// 		console.log("res:",res)
									
			// 		res.data.openid // 唯一
			// 		res.data.session_key 
			// 		this.encryptedData
			// 		this.iv
					
			// 		// 把这些参数通过接口传给后台 解密 获取手机号
					
					
			// 		return
			// 		uni.reLaunch({//信息更新成功后跳转到小程序首页
			// 			url: '/pages/index/index'
			// 		});
			// 	},err=>{
			// 		console.log("err:",err)
			// 	})
			// },
			getPhoneNumber(val){
				console.log(val)
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
