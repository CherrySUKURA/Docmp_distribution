<template>
	<view class="StatementOfAccount-content">
		<view class="pos-top">
			<view class="condition-content">
				<button type="primary" @click="open" class="condition-btn">打开弹窗</button>
				<uni-popup ref="popup" type="bottom" class="condition-popup" :maskClick="maskClick">
					<view class="condition-lee">
						<view class="block-view">
							<view class="block_left" @click="close">取消</view>
							<view class="block-right" @click="condition_click">完成</view>
						</view>
						<view class="title-content" >
							<view class="title">开始时间</view>
						</view>
						<view class="condition-select">
							<picker mode="date" @change="bindDateChange" :value="date" fields="month">
								<view class="condition-uni-input">{{date}}</view>
							</picker>
						</view>
						<view class="title-content" >
							<view class="title">结束时间</view>
						</view>
						<view class="condition-select">
							<picker mode="date" @change="bindDateChange" :value="date2" fields="month">
								<view class="condition-uni-input">{{date2}}</view>
							</picker>
						</view>
						<button type="primary" class="condition-lee-btn" @click="condition_click">搜索</button>
					</view>
				</uni-popup>
			</view>
			<view class="StatementOfAccount-content-list">
				<zzx-tabs :items="items" :current="current" @clickItem="onClickItem" ref="mytabs"></zzx-tabs>
			</view>
		</view>

		<view>
			<view v-for="(item,index) in items" v-show="current === index">
					<view class="box"  v-for="(item,index) in lists" >
						<view class="box-left">
							{{item.Code}}
						</view>
						<view class="box-center">
							<view>
								<view class="label">订单数</view>
								<view class="item-body">{{item.OrderQuantity}}</view>
							</view>
							<view>
								<view class="label">包裹数</view>
								<view class="item-body">{{item.ParcelNumber}}</view>
							</view>
							<view>
								<view class="label">订单金额</view>
								<view class="item-body">{{item.OrderAmount}}</view>
							</view>
							<view>
								<view class="label">额外运费</view>
								<view class="item-body">{{item.ExtraFreight}}</view>
							</view>
							<view>
								<view class="label">收款</view>
								<view class="item-body">{{item.Payment}}</view>
							</view>
						</view>
						<view class="box-right">
							<view class="download-btn" @click="a()">导出订单</view>
							<view class="download-btn" @click="b()">导出明细</view>
						</view>
					</view>
			</view>
		</view>
		<view class="pos-bottom">
			<view class="tale">
				<view class="tale-box">总金额</view>
				<view class="tale-box">总付款</view>
				<view class="tale-box">余额</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {
		},
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				maskClick: false,
				date: currentDate,
				date2: currentDate,
				items: ['全部','员工内购','花田社区','广州农博','饼饼精选','小乔店铺','小乔店铺','小乔店铺','小乔店铺'],
				current: 0,
				lists: [
					{
						"Code": "2020-3-31",
						"OrderQuantity": "35",
						"ParcelNumber": "53",
						"OrderAmount": "3,030.00",
						"ExtraFreight": "0.00",
						"Payment": "3,03.00",
						"AccountBalance": "0.00"
					},
					{
						"Code": "2020-3-31",
						"OrderQuantity": "35",
						"ParcelNumber": "53",
						"OrderAmount": "3,030.00",
						"ExtraFreight": "0.00",
						"Payment": "3,03.00",
						"AccountBalance": "0.00"
					},
					{
						"Code": "2020-3-31",
						"OrderQuantity": "35",
						"ParcelNumber": "53",
						"OrderAmount": "3,030.00",
						"ExtraFreight": "0.00",
						"Payment": "3,03.00",
						"AccountBalance": "0.00"
					},
					{
						"Code": "2020-3-31",
						"OrderQuantity": "35",
						"ParcelNumber": "53",
						"OrderAmount": "3,030.00",
						"ExtraFreight": "0.00",
						"Payment": "3,03.00",
						"AccountBalance": "0.00"
					},
					{
						"Code": "2020-3-31",
						"OrderQuantity": "35",
						"ParcelNumber": "53",
						"OrderAmount": "3,030.00",
						"ExtraFreight": "0.00",
						"Payment": "3,03.00",
						"AccountBalance": "0.00"
					},
					{
						"Code": "2020-3-31",
						"OrderQuantity": "35",
						"ParcelNumber": "53",
						"OrderAmount": "3,030.00",
						"ExtraFreight": "0.00",
						"Payment": "3,03.00",
						"AccountBalance": "0.00"
					}
				]
			}
		},
		methods: {
			bindDateChange(e) {//选择器选择后的回调函数
				console.log(this.date,this.date2)
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
			open() {//开启弹出层
				this.canvasStyle = 'show';
				this.$refs.popup.open()
			},
			close() {//关闭弹出层
				this.$refs.popup.close()
				this.canvasStyle = ''
			},
			condition_click() {//搜索button点击事件
				console.log(this.date,this.date2)
				this.$refs.popup.close()
			},
			onClickItem(e) {
				if(this.current !== e.currentIndex) {
					this.current = e. currentIndex;
				}
			},
			a() {
				
			},
			b() {
				
			},
		}
	}
</script>

<style scoped>
	.StatementOfAccount-content{
		width: 100%;
		/* height: 100%; */
		box-sizing: border-box;
		padding: 230rpx 20rpx 100rpx 20rpx;
	}
	.pos-top{
		padding:20rpx;
		/* #ifdef H5 */
		padding: 100rpx 20rpx 0 20rpx;
		/* #endif */
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		background-color: #FFFFFF;
		/* height: 200rpx; */
		z-index: 100;
/* 		padding: 20rpx; */
		/* padding: 100rpx 20rpx 0 20rpx; */
		box-sizing: border-box;

	}
	.pos-bottom{
		padding:20rpx;
		/* #ifdef H5 */
		padding: 0 20rpx 100rpx 20rpx;
		/* #endif */
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		z-index:99;
		background-color: #FFFFFF;
		/* padding: 0 20rpx 100rpx 20rpx; */
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
	.StatementOfAccount-content-list{
		width: 100%;
		height: 100rpx;
		margin-top: 20rpx;
	}
/* 	.all-box{
		width: 100%;
		height: calc(100vh - 300rpx);
	} */
	.box{
		width: 100%;
		display: flex;
		flex-flow: row nowrap;
		margin:  0 0 40rpx 0;
		border: 1rpx solid rgba(0,0,0,0.1);
		padding: 20rpx;
		box-sizing: border-box;
	}
	.box-left{
		width: 200rpx;
		/* height: 160rpx; */
		line-height: 160rpx;
		/* border-right:1rpx solid rgba(0,0,0,0.1); */
	}
	.box-center{
		width: 400rpx;
		/* height: 160rpx; */
	}
	.box-right{
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
		width: 150rpx;
		display: inline-block;
		text-align: left;
		margin-left: 40rpx;
	}
	.label::after {
		content: ":";
		position: absolute;
		right: -20rpx;
	}
	.download-btn{
		width: 95rpx; 
		padding:8px;  
		background-color: #428bca;  
		border-color: #357ebd;  
		color: #fff;  
		-moz-border-radius: 10px;  
		-webkit-border-radius: 10px;  
		border-radius: 10px; /* future proofing */  
		-khtml-border-radius: 10px; /* for old Konqueror browsers */  
		text-align: center;  
		vertical-align: middle;  
		border: 1px solid transparent;  
		font-weight: 900;  
		margin-top: 10rpx;
		font-size: 20rpx;
	}
	.tale{
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-around;
		width: 100%;
		height: 80rpx;
	}
	.tale-box{
		width: 33.3%;
		height: 100%;
		text-align: center;
	}
</style>
