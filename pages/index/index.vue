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
					<view :class="'numberstyle' + index">{{item.number}}</view>
					<view>{{item.name}}</view>
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
			<view class="title-content">
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
	let canvaPie=null;//饼图
	let canvaColumn = null;//柱状图
	export default {
		data() {
			const currentDate = this.getDate({//默认时间
				format: true
			})
			return {
				ChannelIndex: 0,   //渠道选择列表默认显示选项
				ChannelList:["全部"],//渠道选择列表所有选项
				date: currentDate, //时间选择列表时间选项
				canvasStyle: true, //控制饼图是否显示
				OrderNumber: [],        //订单数据
				chartData: {       //图数据
					"series": [],
					"categories": ["分拣", "揽收", "运输", "签收", "问题", "取消"],
					"seriesline": [
						{
							"name": "物流状态信息",
							"data": [0,0,0,0,0,0]
						}
					]
				},
				cWidth:'',         //图宽度
				cHeight:'',        //图高度
				pixelRatio:1,
				maskClick: false,  //控制点击弹出层灰色部分是否关闭弹出层
				OrderParameter: {//请求首页数据条件对象
					"cus_id":'',
					"date":"",
					"simplified":"",
				},
				getDealerParameter: {//请求筛选渠道数据条件对象
					'cusId':''
				}
			}
		},
		onShow() {
			this.RequestData(this.OrderParameter);     //请求数据
			this.RequestDataOnce(this.getDealerParameter);//请求一次数据
		},
		methods: {
			RequestData(OrderParameter){
				this.$public_.RequestHttp('order/allOrder',"Post",OrderParameter,this.OrderCallBack,this.defeat);//请求首页订单数据
				this.$public_.RequestHttp('order/allOrderBox',"Post",OrderParameter,this.iconCallBack,this.defeat);//请求首页图表数据
				this.$public_.RequestHttp("order/allOrderLogistics","Post",OrderParameter,this.iconLineCallBack,this.defeat)//请求首页圆柱图数据
			},
			RequestDataOnce(getDealerParameter){
				this.$public_.RequestHttp("dealer/getDealer","Get",getDealerParameter,this.apply,this.defeat);//请求筛选渠道数据
			},
			//请求筛选渠道数据回调
			apply(e){
				let order = e.data.data;
				this.ChannelList = ['全部']
				order.forEach( item => {
					this.ChannelList.push(item);
				})
			},
			//请求首页订单数据回调
			OrderCallBack(e){
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
			//请求首页饼图数据回调
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
			//请求首页柱状图数据回调
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
			//失败会掉
			defeat(e){
				console.log(e)
			},
			//如果没有有数据执行事件
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
			//如果没有有数据执行事件
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
			//如果没有有数据执行事件
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
			showLine(canvasId,chartData) {//柱状图实例
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
		height: 250rpx;
		margin-top: 20rpx;
		background-color: #FFFFFF;
		box-sizing: border-box;
		position: relative;
	}
	.number-flex{
		width: 100%;
		padding-top: 20rpx;
		box-sizing: border-box;
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
		width: 33.3%;
		font-size: 25rpx;
		text-align: center;
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
	.numberstyle0{
		color: orange;
	}
	.numberstyle1{
		color: lightblue;
	}
	.numberstyle2{
		color: red;
	}
	.numberstyle3{
		color: lightgreen;
	}
	.numberstyle4{
		color: blue;
	}
</style>