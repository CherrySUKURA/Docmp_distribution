<template>
	<view class="index-content">
		<view class="condition-content">
			<view class="flex">
				<button type="primary" @click="open" class="condition-btn">筛选</button>
				<button type="primary" @click="condition_click('all')" class="condition-btn">清除筛选条件</button>
			</view>
			<uni-popup ref="popup" type="bottom" class="condition-popup" :maskClick="maskClick" :animation="true">
				<view class="condition-lee">
					<view class="block-view">
						<view class="block_left" @click="close">取消</view>
						<view class="block-right" @click="condition_click">完成</view>
					</view>
					<view class="title-content">
						<view class="title">供应商选择</view>
					</view>
					<view class="condition-select">
						<picker mode="selector" @change="bindPickerChange" :value="ChannelIndex" :range="ChannelList">
							<view class="condition-uni-input">{{ChannelList[ChannelIndex]}}</view>
						</picker>
					</view>
					<view class="title-content" >
						<view class="title">日期选择</view>
					</view>
					<view class="condition-select">
						<!-- <picker mode="date" @change="bindDateChange"  :start="startDate" :end="endDate" :value="date"> -->
						<picker mode="date" @change="bindDateChange" :value="date" fields="month">
							<view class="condition-uni-input">{{date}}</view>
						</picker>
					</view>
					<button type="primary" class="condition-lee-btn" @click="condition_click">搜索</button>
				</view>
			</uni-popup>
		</view>
		<view class="number">
			<view class="title-content" >
				<view class="title">订单信息</view>
			</view>
			<view class="number-flex">
<!-- 				<text v-if="OrderNumber.length == 0" class="tosettext">无内容</text> -->
				<view v-for="(item,index) in OrderNumber" v-if="OrderNumber.length != 0" class="number-box" :key="index">
					<view>{{item.name}}</view>
					<view>{{item.number}}</view>
				</view>
			</view>
		</view>
		<view class="qiun-columns">
			<view class="title-content" >
				<view class="title">礼盒信息</view>
			</view>
			<view class="qiun-charts">
				<!-- <text v-if="chartData.series.length == 0" class="tosettext">无内容</text> -->
				<canvas v-if="chartData.series.length != 0" canvas-id="canvasPie" id="canvasPie" v-show="canvasStyle" class="charts" @touchstart="touchPie"></canvas>
			</view>
		</view>
		<view class="qiun-columns">
			<view class="title-content" >
				<view class="title">物流信息</view>
			</view>
			<view class="qiun-charts">
				<!-- <text v-if="chartData.seriesline.length == 0" class="tosettext">无内容</text> -->
				<canvas v-if="chartData.seriesline.length != 0" canvas-id="canvasline" id="canvasline" v-show="canvasStyle" class="charts"></canvas>
			</view>
		</view>
	</view>
</template>

<script>
	import uCharts from '../../js_sdk/u-charts/u-charts/u-charts.js'; 
	let canvaPie=null;
	let canvaColumn = null;
	export default {
		components: {
			
		},
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				ChannelIndex: 0,   //渠道选择列表默认显示选项
				ChannelList:["全部"],//渠道选择列表所有选项
				date: currentDate, //时间选择列表时间选项
				canvasStyle: true, //控制饼图是否显示
				OrderNumber: [],        //订单数据
				chartData: {       //饼图数据
					"series": [],
					"categories": ["分拣", "揽收", "运输", "签收", "问题", "取消"],
					"seriesline": [
						{
							"name": "物流状态信息",
							"data": [0,0,0,0,0,0]
						}
					]
				},
				cWidth:'',         //饼图宽度
				cHeight:'',        //饼图高度
				pixelRatio:1,
				maskClick: false,  //控制点击弹出层灰色部分是否关闭弹出层
				OrderParameter: {
					"cus_id":'',
					"date":"",
					"simplified":"",
				},
				getDealerParameter: {
					'cusId':''
				}
			}
		},
		onShow() {
			this.RequestData(this.OrderParameter);     //请求数据
			this.RequestDataOnce(this.getDealerParameter);
		},
		methods: {
			RequestData(OrderParameter){
				this.$public_.RequestHttp('order/allOrder',"Post",OrderParameter,this.OrderCallBack,this.defeat,this.Orderlosed);//请求首页订单数据
				this.$public_.RequestHttp('order/allOrderBox',"Post",OrderParameter,this.iconCallBack,this.defeat,this.iconlosed);//请求首页图表数据
				this.$public_.RequestHttp("order/allOrderLogistics","Post",OrderParameter,this.iconLineCallBack,this.defeat,this.iconLinelosed)//请求首页圆柱图数据
			},
			RequestDataOnce(getDealerParameter){
				this.$public_.RequestHttp("dealer/getDealer","Get",getDealerParameter,this.apply,this.defeat,this.getDealerlosed);//请求筛选渠道数据
			},
			apply(e){//回调
				let order = e.data.data;
				order.forEach( item => {
					this.ChannelList.push(item);
				})
				let newArray = new Set(this.ChannelList);
				this.$store.commit("channel",Array.from(newArray));
				this.ChannelList = this.$store.state.ChannelList;
			},
			OrderCallBack(e){//回调
				let data = e.data.data[0];
				if(data == null){
					this.$public_.showToast("没有订单信息数据","none",2000,null)
					this.Orderlosed()
					return false
				}
				this.OrderNumber = [
					{
						name: "订单金额",
						number: this.$public_.formatNumber(data.order_money)
					},
					{
						name: "订单数",
						number: data.order_amount
					},
					{
						name: "包裹数",
						number: data.parcel_amount
					},
					{
						name: "付款到账",
						number: this.$public_.formatNumber(data.pay_to_account_success)
					},
					{
						name: "账户余额",
						number: this.$public_.formatNumber(data.this_month_balance)
					}
				]
			},
			iconCallBack(e){
				let data = e.data.data[0];
				if(data == null){
					this.$public_.showToast("没有包装信息","none",2000,null)
					this.iconlosed()
					return false
				}	
				this.chartData.series = [
					{
						"name": "三盒",
						"data": data.gift_boxes
					}, 
					{
						"name": "四盒",
						"data": data.four_boxes_total
					}, 
					{
						"name": "五盒",
						"data": data.five_boxes_total
					},
				];
				this.cWidth=uni.upx2px(750);
				this.cHeight=uni.upx2px(500);
				this.showPie("canvasPie",this.chartData);
				
			},
			iconLineCallBack(e) {
				let data = e.data.data[0];
				if(data == null){
					this.$public_.showToast("没有物流信息","none",2000,null)
					this.iconLinelosed()
					return false
				}
				this.chartData.seriesline = [
					{
						"name": "物流状态信息",
						"data": [data.wait_sorting_total, data.LanShou_total, data.transit_total, data.sign_for_total, data.problem_piece_total, data.cancel_total]
					}
				];
				this.cWidth=uni.upx2px(750);
				this.cHeight=uni.upx2px(600);
				this.showLine("canvasline",this.chartData)
			},
			defeat(e){
				console.log(e)
			},
			Orderlosed(e){
				this.OrderNumber = [
					{
						name: "订单金额",
						number: this.$public_.formatNumber(0)
					},
					{
						name: "订单数",
						number: 0
					},
					{
						name: "包裹数",
						number: 0
					},
					{
						name: "付款到账",
						number: this.$public_.formatNumber(0)
					},
					{
						name: "账户余额",
						number: this.$public_.formatNumber(0)
					}
				];
			},
			iconlosed(e){
				this.chartData.series = [
					{
						"name": "三盒",
						"data": 0
					}, 
					{
						"name": "四盒",
						"data": 0
					}, 
					{
						"name": "五盒",
						"data": 0
					},
				]
				this.cWidth=uni.upx2px(750);
				this.cHeight=uni.upx2px(500);
				this.showPie("canvasPie",this.chartData);
			},
			iconLinelosed(e){
				this.chartData.seriesline = [
					{
						"name": "物流状态信息",
						"data": [0,0,0,0,0,0]
					}
				]
				this.cWidth=uni.upx2px(750);
				this.cHeight=uni.upx2px(600);
				this.showLine("canvasline",this.chartData)
			},
			getDealerlosed(e){
				this.ChannelList = ['全部']
			},
			bindPickerChange(e){//选择器选择后的回调函数
				this.ChannelIndex = e.target.value;
			},
			bindDateChange(e) {//选择器选择后的回调函数
				this.date = e.target.value;
			},
			getDate(type) {//时间
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
	
				// if (type === 'start') {
				// 	year = year - 60;
				// } else if (type === 'end') {
				// 	year = year + 60;
				// }
				month = month > 9 ? month : '0' + month;
				return `${year}-${month}`;
			},
			showPie(canvasId,chartData){//饼图实例
				canvaPie=new uCharts({
					$this:this,
					canvasId: canvasId,
					type: 'pie',
					fontSize:11,
					legend:{show:true},
					background:'#FFFFFF',
					pixelRatio:this.pixelRatio,
					series: chartData.series,
					animation: true,
					width: this.cWidth*this.pixelRatio,
					height: this.cHeight*this.pixelRatio,
					dataLabel: true,
					extra: {
						pie: {
						  lableWidth:15
						}
					},
				});
			},
			showLine(canvasId,chartData) {
				canvaColumn = new uCharts({
					$this:this,
					canvasId:canvasId,
					type: 'column',
					lefend:{show:true},
					fontSize: 11,
					background:'#FFFFFF',
					pixelRatio:1,
					animation: true,
					categories: chartData.categories,
					series: chartData.seriesline,
					xAxis: {
						disableGrid:true,
					},
					yAxis: {
						//disabled:true
					},
					dataLabel: true,
					width: this.cWidth,
					height: this.cHeight,
					extra: {
						column: {
							type:'group',
							width: 20
						}
					  }
				})
			},
			touchPie(e){//点击饼图后的效果
				canvaPie.showToolTip(e, {
					format: function (item) {
						return item.name + ':' + item.data 
					}
				});
			},
			open() {//开启弹出层
				this.canvasStyle = false;
				this.$refs.popup.open();
			},
			close() {//关闭弹出层
				this.$refs.popup.close();
				this.canvasStyle = true;
			},
			condition_click(type){//搜索button点击事件
				let date = this.date.replace("-","")
				if(type == 'all'){
					this.startDate = this.getDate();
					this.endDate = this.getDate();
					this.OrderParameter.simplified = "";
					this.OrderParameter.date = ""
				}else{
					if(this.ChannelIndex == 0){
						this.OrderParameter.simplified = "";
						this.OrderParameter.date = date
					}else{
						this.OrderParameter.simplified = this.ChannelList[this.ChannelIndex];
						this.OrderParameter.date = date
					}
				}
				
				this.RequestData(this.OrderParameter,this.getDealerParameter) ;
				this.close();
			}
		}
	}
</script>

<style scoped>
	.index-content{
		width: 100%;
		box-sizing: border-box;
		padding: 20rpx;
	}
	.flex{
		width: 100%;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-evenly;
	}
	.condition-btn{
		width: 100%;
		margin: 0 10rpx;
	}
	.condition-lee{
		width: 100%;
		background-color: #FFFFFF;
		padding: 20rpx 0 150rpx 0;
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
		font-size: 20rpx;
		line-height: 80rpx;
		box-sizing: border-box;
		border: 1rpx solid black;
		margin: auto;
		background-color: #FFFFFF;
		text-align: center;
	}
	.condition-lee-btn{
		width: 95%;
		height: 80rpx;
		line-height: 80rpx;
		margin-top: 20rpx;
	}
	.number{
		width: 100%;
		height: 550rpx;
		margin-top: 20rpx;
		background-color: #FFFFFF;
		box-sizing: border-box;
		position: relative;
	}
	.number-flex{
		display: flex;
		flex-flow: row wrap;
		justify-content: space-evenly;
	}
	.tosettext{
		color: #C0C0C0;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translateX(-50%);
	}
	.number-box{
		width: 200rpx;
		height: 200rpx;
		border-radius: 25rpx;
		border: 1rpx solid black;
		margin-top: 20rpx;
	}

	page{
		background:#F2F2F2;
		width: 750rpx;
		overflow-x: hidden;
	}
	.qiun-columns{
		width: 100%;
		height: 600rpx;
		margin-top: 20rpx;
		position: relative;
	}
	.qiun-charts{
		width: 100%; 
		height: 100%;
		background-color: #FFFFFF;
	}
	.charts{
		width: 100%; 
		height:100%;
	}
</style>