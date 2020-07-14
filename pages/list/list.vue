<template>
	<view class="list-body">
		<view class="condition-content">
			<button type="primary" @click="open" class="condition-btn">筛选</button>
			<uni-popup ref="popup" type="bottom" class="condition-popup" :maskClick="maskClick">
				<view class="condition-lee">
					<view class="block-view">
						<view class="block_left" @click="close">取消</view>
						<view class="block-right" @click="condition_click">完成</view>
					</view>
					<view class="title-content" v-if="publicstates == 0 ? true : false">
						<view class="title">状态选择</view>
					</view>
					<view class="condition-select"  v-if="publicstates == 0 ? true : false">
						<picker mode="selector" @change="bindPickerChange" :value="index" :range="array">
							<view class="condition-uni-input">{{array[index]}}</view>
						</picker>
					</view>
					<view class="title-content" >
						<view class="title">电话号码</view> 
					</view>
					<view class="condition-select">
						<input value="" type="text" v-model="inputValue" placeholder="请输入电话号码" />
					</view>
					<button type="primary" class="condition-lee-btn" @click="condition_click">搜索</button>
				</view>
			</uni-popup>
		</view>
		<view class="order-time">{{publicstates == 0 ? Orderstates : Afterstates}}</view>
		<view class="list-item" v-for="(item,index) in list" @click="skip(item.sales_Order_No)" :key="index">
			<view class="order-flex">
					<view>
						<view class="label">收件人</view>
						<view class="item-body">{{publicstates == 0 ? item.client_Name : item.client_Name}}</view>
					</view>
					<view>
						<view class="label">联系方式</view>
						<view class="item-body">{{publicstates == 0 ? item.client_Contact : item.client_Contact}}</view>
					</view>
					<view>
						<view class="label">省市</view>
						<view class="item-body">{{publicstates == 0 ? item.provinces : item.add_Loc_1 + item.add_Loc_2 + item.add_Loc_3}}</view>
					</view>
			</view>
			<uni-tag :text="item.order_Status_Desc" :type="publicstates == 0 ? no(item.aftersales_Status) : 'primary'" class="list-tag" :circle="true" size="small"></uni-tag>
		</view>
		<view class="fixed">
			<uni-pagination show_icon="true" :total="total" :current="current" @change="pagination"></uni-pagination>
		</view>
	</view>
</template>

<script>
	import { mapState,mapAction,mapGetter,mapMutations } from 'vuex';
	export default {
		components:{
			
		},
		data() {
			return {
				index: 0,//订单状态默认选项
				array: ['全部'],//订单状态
				dataArray: [],//所有的订单数据
				maskClick: false,//单击灰色部分是否关闭弹出框
				inputValue: "",//电话号码
				total:"",//数据总条数
				current: 1,//分页默认第一页
				list: [],//订单数据列表	
				OrderParam:{//公共参数对象
				    "cus_id": "",//用户id
					"order_date": "",//订单页面用的字段
					"client_contact": "",//电话号码查询字段
					"after_sales_status": "",//售后状态查询字段
					"page_size": 10,//一页10条数据
					"page_no": 1,//第一页数据
					"order_status_desc":""//售后页面索引字段
				},
				StatusParam: {//获取状态列表对象参数
					"cusId": ""//用户id
				}
			}
		},
		onShow() {	
			this.OrderRequest();//获取列表数据
			this.StatusRequest();//获取查询字段的数据
		},
		methods: {
			OrderRequest(){//判断并请求的方法
				let url
				if(this.publicstates == 0){//判断是否是订单列表页面跳转
					this.OrderParam.order_date = this.Orderstates;//将订单列表页面传的索引数据传入参数对象
					url = "order/orderDayListInfo";//订单详细列表接口
				}
				if(this.publicstates == 1){//判断是否是售后列表页面跳转
					this.OrderParam.order_status_desc = this.Afterstates;//将售后列表页面传的索引数据传入参数对象
					url = "afterSales/allAfterOrderList";//售后详细列表接口
				}
				this.RequestData(url,this.OrderParam);//调用封装好的请求方法
			},
			StatusRequest(){//判断并请求的方法
				let statusUrl
				if(this.publicstates == 0){//同上
					statusUrl = "afterSales/allAfterStatusInfo"//订单详细列表渠道数据接口
				}
				if(this.publicstates == 1){//同上
					return false//售后详细列表不需要这个列表参数所以返回false不继续执行下去
				}
				this.RequestDataOnce(statusUrl,this.StatusParam)//调用封装好的请求方法
			},
			RequestData(url,OrderParam){//请求
				this.$public_.RequestHttp(url,"Post",OrderParam,this.StatusCallBack,this.defeat);//请求列表数据
			},
			RequestDataOnce(statusUrl,StatusParam){//请求
				this.$public_.RequestHttp(statusUrl,"Get",StatusParam,this.OrderStatusCallBack,this.defeat)//请求筛选列表数据
			},
			StatusCallBack(e){//回调
				if(e.data.data.length == 0){//判断是否有数据
					this.$public_.showToast("没有列表数据","none",2000,null)
				}
				this.list = e.data.data;//传入list渲染
				this.total = e.data.data_total//传入total渲染
			},
			OrderStatusCallBack(e){//回调
				this.array = ['全部']
				let data = e.data.data;
				if(data.length == 0){
					this.$public_.showToast("没有筛选数据","none",2000,null)
				}
				data.forEach( (item,index) => {//循环后判断并渲染
					if(this.publicstates == 0){
						//由于可能需要筛选全部的数据，所以在渲染的数组中事先加了一个全部的筛选条件，所以只能push进去
						this.array.push(item.orderStatusDesc)
					}
					if(this.publicstates == 1){
						this.array.push(item.Order_Status_Desc)
					}
					
				}) 
				this.dataArray = data//将整体数据存起备用
			},
			defeat(e){//失败回调
				console.log(e)
			},
			pagination(e){//分页回调
				this.OrderParam.page_no = e.current;
				this.OrderRequest()
			},	
			condition_click() {//点击筛选按钮后执行方法
				if(this.publicstates == 0){//判断
					//根据不同的选项传递不同的参数
					if(this.index != 0){
						this.OrderParam.after_sales_status = this.dataArray[this.index-1].aftersalesStatus;
						this.OrderParam.client_contact = this.inputValue;
					}else{//如果index为0查询全部的数据
						this.OrderParam.after_sales_status = "";
						this.OrderParam.client_contact = this.inputValue;
					}
				}
				if(this.publicstates == 1){//判断
					this.OrderParam.client_contact = this.inputValue;
				}
				this.OrderRequest()//请求
				this.$refs.popup.close()//关闭弹出层
				this.inputValue = "";//清空输入框
				this.OrderParam.client_contact = ""//清空请求后的参数对象
			},
			open() {//打开弹出层
				this.$refs.popup.open()
			},
			close() {//关闭弹出层
				this.$refs.popup.close()
			},
			bindPickerChange(e){//列表选择后的回调
				this.index = e.target.value
			},
			skip(i){//跳转页面方法
				this.$store.commit('OrderCode',i)
				uni.navigateTo({
					url: '../../pages/details_list/details_list'
				})
			}
		},
		computed: {
			...mapState({
				Orderstate : state => state.Orderstate,
				Afterstate : state => state.Afterstate,
				publicstate: state => state.publicstate
			}),
			Orderstates: function() {
				return this.Orderstate
			},
			Afterstates: function() {
				return this.Afterstate
			},
			publicstates: function() {
				return this.publicstate
			},
			no: function(){
				return function (item){
					switch (item) {
						case 0:
							return 'default';
							break;
						
						case 1:
							return 'primary';
							break;
						
						case 2:
							return 'success';
							break;
						
						case 3:
							return 'warning';
							break;
						case 4:
							return 'error';
					}
				}
			}
		}
	}
</script>

<style>
	.list-body{
		width: 100%;
		padding: 20rpx 20rpx 100rpx 20rpx;
		box-sizing: border-box;
	}
	.fixed{
		width: 100%;
		height: 100rpx;
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		left: 0;
		padding: 20rpx;
		background-color: #FFFFFF;
	}
	.list-item{
		width: 100%;
		padding: 20rpx;
		box-sizing: border-box;
		border: 1rpx solid rgba(0,0,0,0.1);
	}
	.order-flex{
		width: 100%;
		line-height: 50rpx;
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
		min-height: 400rpx;
		background-color: #FFFFFF;
		padding: 20rpx 0 50rpx 0;
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
