<template>
	<view class="index-content">
		<view class="condition-content">
			<button type="primary" @click="open" class="condition-btn">打开弹窗</button>
			<uni-popup ref="popup" type="bottom" class="condition-popup" :maskClick="maskClick">
				<view class="condition-lee">
					<view class="block-view">
						<view class="block_left" @click="close">取消</view>
						<view class="block-right" @click="condition_click">完成</view>
					</view>
					<view class="title-content" >
						<view class="title">供应商选择</view>
					</view>
					<view class="condition-select">
						<picker mode="selector" @change="bindPickerChange" :value="index" :range="array">
							<view class="condition-uni-input">{{array[index]}}</view>
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
				<view class="title">本月订单</view>
			</view>
			<view class="number-flex">
				<view v-for="(item,index) in number" class="number-box">
					<view>{{item.name}}</view>
					<view>{{item.number}}</view>
				</view>
			</view>
		</view>
		<view class="qiun-columns">
			<view class="title-content" >
				<view class="title">饼状图</view>
			</view>
			<view class="qiun-charts">
				<canvas canvas-id="canvasPie" id="canvasPie" :class="canvasStyle" class="charts" @touchstart="touchPie"></canvas>
			</view>
		</view>
	</view>
</template>

<script>
	import uCharts from '../../js_sdk/u-charts/u-charts/u-charts.js'
	let _self;
	let canvaPie=null;
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				index: 0,
				array:[],
				date: currentDate,
				canvasStyle: "",
				order: [
					{
						"Code": "10086",
						"Place": "员工内购",
						"OrderQuantity": "35",
						"ParcelNumber": "53",
						"OrderAmount": "3,030.00",
						"ExtraFreight": "0.00",
						"Payment": "3,03.00",
						"AccountBalance": "0.00"
					
					},
					{
						"Code": "10086",
						"Place": "员工内购",
						"OrderQuantity": "35",
						"ParcelNumber": "53",
						"OrderAmount": "3,030.00",
						"ExtraFreight": "0.00",
						"Payment": "3,03.00",
						"AccountBalance": "0.00"
					
					},
					{
						"Code": "10086",
						"Place": "花田社区",
						"OrderQuantity": "35",
						"ParcelNumber": "53",
						"OrderAmount": "3,030.00",
						"ExtraFreight": "0.00",
						"Payment": "3,03.00",
						"AccountBalance": "0.00"
					
					},
					{
						"Code": "10086",
						"Place": "广州农博",
						"OrderQuantity": "35",
						"ParcelNumber": "53",
						"OrderAmount": "3,030.00",
						"ExtraFreight": "0.00",
						"Payment": "3,03.00",
						"AccountBalance": "0.00"
					
					},
					{
						"Code": "10086",
						"Place": "饼饼精选",
						"OrderQuantity": "35",
						"ParcelNumber": "53",
						"OrderAmount": "3,030.00",
						"ExtraFreight": "0.00",
						"Payment": "3,03.00",
						"AccountBalance": "0.00"
					
					},
					{
						"Code": "10086",
						"Place": "小乔店铺",
						"OrderQuantity": "35",
						"ParcelNumber": "53",
						"OrderAmount": "3,030.00",
						"ExtraFreight": "0.00",
						"Payment": "3,03.00",
						"AccountBalance": "0.00"
					
					}
				],
				number:[
					{
						name: "订单金额",
						number: "3,030.00"
					},
					{
						name: "订单数",
						number: "35"
					},
					{
						name: "包裹数",
						number: "53"
					},
					{
						name: "付款到账",
						number: "3,030.00"
					},
					{
						name: "账户余额",
						number: "0.00"
					}
				],
				chartData: {
				  "series": [
					  {
						"name": "一班",
						"data": 50
					  }, 
					  {
						"name": "二班",
						"data": 30
					  }, 
					  {
						"name": "三班",
						"data": 20
					  }
				  ]
				},
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
				serverData:'',
				maskClick: false
			}
		},
		computed: {
			//给一个可选的范围，开始时间和结束时间
			// startDate() {
			// 	return this.getDate('start');
			// },
			// endDate() {
			// 	return this.getDate('end');
			// }
		},
		components: {
			
		},
		onLoad() {
			_self = this;
			this.cWidth=uni.upx2px(750);
			this.cHeight=uni.upx2px(500);
			this.showPie("canvasPie",this.chartData)
			this.$ajax.ajax('http://jsonplaceholder.typicode.com/users','Get',{}).then(
				(res) => {
					console.log(res)
				}).catch(
				(err) => {
					console.log(err)
				})
		},
		methods: {
			bindPickerChange(e){//选择器选择后的回调函数
				this.index = e.target.value
			},
			bindDateChange(e) {//选择器选择后的回调函数
				this.date = e.target.value
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
					$this:_self,
					canvasId: canvasId,
					type: 'pie',
					fontSize:11,
					legend:{show:true},
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					series: chartData.series,
					animation: true,
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					dataLabel: true,
					extra: {
						pie: {
						  lableWidth:15
						}
					},
				});
			},
			touchPie(e){//点击饼图后的效果
				canvaPie.showToolTip(e, {
					format: function (item) {
						return item.name + ':' + item.data 
					}
				});
			},
			open() {//开启弹出层
				this.canvasStyle = 'show';
				this.$refs.popup.open()
			},
			close() {//关闭弹出层
				this.$refs.popup.close()
				this.canvasStyle = ''
			},
			condition_click(){//搜索button点击事件
				alert(this.array[this.index])
				alert(this.date)
				this.$refs.popup.close()
			}
		},
		created() {
			let arraies = new Array()
			this.order.forEach( item => {
				arraies.push(item.Place)
			})
			let newarray = new Set(arraies)
			newarray.forEach( item => {
				this.array.push(item)
			})
		}
	}
</script>

<style scoped>
	.index-content{
		width: 100%;
		box-sizing: border-box;
		padding: 20rpx;
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
	}
	.number-flex{
		display: flex;
		flex-flow: row wrap;
		justify-content: space-evenly;
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
	.qiun-padding{
		padding:2%; 
		width:96%;
	}
	.qiun-wrap{
		display:flex; 
		flex-wrap:wrap;
	}
	.qiun-rows{
		display:flex; 
		flex-direction:
		row !important;
	}
	.qiun-columns{
		display:flex; 
		flex-direction:column !important; 
		margin-top: 20rpx;
	}
	.qiun-charts{
		width: 100%; 
		height:500rpx;
		background-color: #FFFFFF;
	}
	.charts{
		width: 100%; 
		height:500rpx;
	}
	.show{
		display: none;
	}
	
</style>