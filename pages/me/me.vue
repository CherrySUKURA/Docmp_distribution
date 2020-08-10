<template>
	<view class="mine">
		<view class="usermine">
			<view class="mine_detail">
				<image :src="adminImg"></image>
			</view>
			<view class="username">
				<view class="name">{{username}}</view>
				<view class="status">
					<image src="../../static/vip.png"></image>
					{{status}}
				</view>
			</view>
		</view>
		<view class="minecontent">
			<view class="mineList">
				<view class="list-item" @click="jump()">
					<view class="list-item-text">
						<image class="icon" src="../../static/ .png"></image>
						<view class="title">绑定手机号</view>
					</view>
					<view class="list-item-CZ">
						<image src="../../static/jump.png" class="jump"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="logOut">
			<button type="warn" @click="logOut()">退出登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		 data() {
			 return {
				 username: "用户名",//用户名
				 status: "普通用户",//用户等级
				 adminImg: "../../static/logo.jpg"//用户头像
			 }
		 },
		 onShow() {
		 	this.RequestHttpData()//请求用户数据
		 },
		 methods: {
			 RequestHttpData(){
				 this.$public_.RequestHttp('role/userInfo','Post',{},this.userCallBack,this.defeat)//请求用户数据
			 },
			 //退出登录事件
			 logOut(){
				 this.$public_.RequestHttp('role/loginOut','Post',{},this.removeCallBack,this.defeat)
			 },
			 //请求用户数据回调
			 userCallBack(e){
				 this.username = e.data.data.name;
				 this.status = e.data.data.responsibilityDesc
				 if(e.data.data.face){
					 this.adminImg = e.data.data.face
				 }
			 },
			 //退出登录回调
			 removeCallBack(e){
				 uni.removeStorage({
					key: 'token',
					success: (res) => {
						uni.redirectTo({
							url: "../login/login"
						})
					}
				 })
			 },
			 //失败回调
			 defeat(e){
				 console.log(e)
			 },
			//跳转页面
			 jump(){
				 uni.navigateTo({
				 	url: "../bindPhone/bindPhone"
				 })
			 }
		 }
	}
</script>

<style>
	.mine{
		width: 100%;
		min-height: 100vh;
		padding: 30rpx;
		box-sizing: border-box;
		position: relative;
	}
	.usermine{
		width: 100%;
		height: 230rpx;
		background: #CC6729;
		position: relative;
		color: #FFFFFF;
		border-radius: 15rpx;
	}
	.mine_detail{
		width: 100rpx;
		height: 100rpx;
		position: absolute;
		left: 40rpx;
		top: 50%;
		transform: translateY(-50%);
		border-radius: 50%;
	}
	.mine_detail image{
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.username{
		position: absolute;
		left: 150rpx;
		top: 50%;
		transform: translateY(-50%);
		font-size: 30rpx;
	}
	.name{
		padding-left: 10rpx;
	}
	.status{
		margin-top: 20rpx;
		padding: 2rpx 10rpx 2rpx 50rpx;
		background-color: #111A34;
		color: #FFFFFF;
		border-radius: 25rpx;
		position: relative;
	}
	.status image{
		width: 50rpx;
		height: 50rpx;
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
	}
	.minecontent {
		width: 100%;
		margin: 20rpx 0;
	}
	.mineList{
		width: 100%;
		box-shadow: 0 0 1px rgba(0,0,0,0.5);/*blur值为15px*/
		border-radius: 15rpx;
		box-sizing: border-box;
	}
	.list-item{
		border-bottom: 1rpx solid rgba(0,0,0,0.1);
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		padding: 0 40rpx;
		box-sizing: border-box;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
	}
	.list-item-text{
		height: 100%;
		font-size: 25rpx;
	}
	.icon{
		width: 40rpx;
		height: 40rpx;
		margin-right: 20rpx;
		display: inline-block;
		transform: translateY(15rpx);
	}
	.title{
		display: inline-block;
	}
	.list-item-CZ{
		/* margin-top: 5rpx; */
	}
	.jump{
		width: 20rpx;
		height: 20rpx;
	}
	.jump image{
		width: 100%;
		height: 100%;
	}
	.logOut{
		width: 100%;
		position: absolute;
		bottom: 10rpx;
		left: 0;
		padding: 30rpx;
		box-sizing: border-box;
	}
</style>