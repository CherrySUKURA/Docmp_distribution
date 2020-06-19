<template>
	<view class="StatementOfAccount-content">
		<view class="pos-top">
			<view class="condition-content">
				<view class="flex">
					<button type="primary" @click="open" class="condition-btn">打开弹窗</button>
					<button type="primary" @click="condition_click('all')" class="condition-btn">查看全部</button>
				</view>
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
							<picker mode="date" @change="startDateChange" :value="startDate" fields="day">
								<view class="condition-uni-input">{{startDate}}</view>
							</picker>
						</view>
						<view class="title-content" >
							<view class="title">结束时间</view>
						</view>
						<view class="condition-select">
							<picker mode="date" @change="endDateChange" :value="endDate" fields="day">
								<view class="condition-uni-input">{{endDate}}</view>
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
			<view v-for="(item,index) in items" v-show="current === index" :key="index">
				
					<view class="box"  v-for="(item,index) in lists" :key="index">
						<view class="box-top">
							{{item.order_Date}}
						</view>
						<view class="box-flex">
							<view class="box-left">
								<view>
									<view class="label">订单数</view>
									<view class="item-body">{{item.order_amount_total}}</view>
								</view>
								<view>
									<view class="label">包裹数</view>
									<view class="item-body">{{item.parcel_amount_total}}</view>
								</view>
								<view>
									<view class="label">订单金额</view>
									<view class="item-body">{{$public_.formatNumber(item.order_total_money)}}</view>
								</view>
								<view>
									<view class="label">额外运费</view>
									<view class="item-body">{{$public_.formatNumber(item.sal_total_expenditure)}}</view>
								</view>
								<view>
									<view class="label">售后金额</view>
									<view class="item-body">{{$public_.formatNumber(item.sal_after_total_money)}}</view>
								</view>
								<!-- <view>
									<view class="label">应收余额</view>
									<view class="item-body">{{item.receivable_balance}}</view>
								</view> -->
							</view>
							<view class="box-right">
								<view class="download-btn" @click="derive('Order',index)">导出订单</view>
								<view class="download-btn" @click="derive('detail',index)">导出明细</view>
							</view>
						</view>
					</view>
			</view>
		</view>
		<view class="pos-bottom">
			<view class="tale">
				<view class="tale-box" v-for="(item,index) in sum" :key="index">
					<navigator :url="item.money_name == '总付款' ? '../../pages/dayAccout/dayAccout' : ''">
						<view class="monay-class" :class="item.money_name == '总付款' ? 'active' : ''">{{item.money}}</view>
						<view class="monay">{{item.money_name}}</view>
					</navigator>
				</view>
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
				startDate: currentDate,
				endDate: currentDate,
				items: ['全部'],
				current: 0,
				lists: [],
				sum:[],
				accoutParam: {
					"cus_id":"%",
					"simplified":"",
					"start_date":"",
					"end_date":"",
					"page_size":"10",
					"page_no":"1"
				},
				channelParam: {
					"cusId": "%"
				},
				exportParam: {
				    "cus_id":"%",
				    "date":"",
				    "simplified":""
				}
			}
		},
		onLoad(){
			this.RequestData(this.accoutParam);
			this.RequestDataOnce(this.channelParam);
		},
		methods: {
			RequestData(accoutParam){
				this.$public_.RequestHttp("account/accountCheckListNew","Post",accoutParam,this.accoutCallBack,this.defeat);
				this.$public_.RequestHttp("account/accountCheckAllAmount","Post",accoutParam,this.accountAmountCallBack,this.defeat);
			},
			RequestDataOnce(channelParam){
				this.$public_.RequestHttp("dealer/getDealer","Get",channelParam,this.channelCallBack,this.defeat);
			},
			RequestExportOrderData(exportParam,url){
				this.$public_.RequestHttp(url,"Post",exportParam,this.urlCallBack,this.defeat)
			},
			urlCallBack(e){
				let url = e.data.data[0]
				this.$public_.RequestDownload(url,this.success,this.defeat)
			},
			success(e) {
				if (e.statusCode === 200) {
					let tempFIlePath = e.tempFilePath;
					uni.saveFile({
						tempFilePath : tempFIlePath,
						success:(res)=>{
							 // res.savedFilePath文件的保存路径
							 // 保存成功并打开文件
							 console.log(res.savedFilePath)
							 uni.openDocument({
								filePath:res.savedFilePath,
								success:(res)=>console.log('成功打开文档')
							})
						},
						fail:()=>console.log('下载失败')
					})
				}
			},
			accoutCallBack(e){
				if(e.data.data.length == 0){
					this.$public_.showToast("没有订单数据","none",2000,"null")
					// return false
				}
				this.lists = e.data.data
			},
			accountAmountCallBack(e){
				let data = e.data.data
				this.sum = [
					{
						"money_name": '总金额',
						"money":this.$public_.formatNumber(data.order_money_total)
					},
					{
						"money_name": '总付款',
						"money": this.$public_.formatNumber(data.buy_money_total)
					},
					{
						"money_name": '余额',
						"money": this.$public_.formatNumber(data.receivable_balance_total)
					}
				]
			},
			channelCallBack(e){
				let data = e.data.data
				data.forEach( (item,index) => {
					this.items.push(item)
				})
			},
			defeat(e){
				console.log(e)
			},
			startDateChange(e) {//选择器选择后的回调函数
				this.startDate = e.detail.value
			},
			endDateChange(e) {
				this.endDate = e.detail.value
			},
			condition_click(type) {//搜索button点击事件
				if(type == "all"){
					this.startDate = this.getDate();
					this.endDate = this.getDate();
					this.accoutParam.start_date = "";
					this.accoutParam.end_date = "";
				}else{
					this.accoutParam.start_date = this.startDate;
					this.accoutParam.end_date = this.endDate;
				}
				this.RequestData(this.accoutParam)
				this.$refs.popup.close();
			},
			onClickItem(e) {
				if(this.current !== e.currentIndex) {
					this.current = e. currentIndex;
				}
				if(this.current == 0){
					this.accoutParam.simplified = ""
				}else{
					this.accoutParam.simplified = this.items[this.current]
				}
				this.RequestData(this.accoutParam)
			},
			derive(type,index) {
				let url
				if(type == 'Order'){
					url = "order/exportOrder"
				}else {
					url = "order/exportOrderDetail"
				}
				this.exportParam.date = this.lists[index].order_Date;
				this.exportParam.simplified = this.lists[index].simplified;
				this.RequestExportOrderData(this.exportParam,url)
			},
			getDate(type) {//时间
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDay();
				
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day
				return `${year}-${month}-${day}`;
			},
			open() {//开启弹出层
				this.$refs.popup.open()
			},
			close() {//关闭弹出层
				this.$refs.popup.close()
			}
		}
	}
</script>

<style scoped>
	.StatementOfAccount-content{
		width: 100%;
		box-sizing: border-box;
		padding: 230rpx 20rpx 120rpx 20rpx;
	}
	.flex{
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-around;
	}
	.condition-btn{
		width: 100%;
		margin: 0 10rpx;
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
		z-index: 100;
		box-sizing: border-box;

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
		height: 80rpx;
		margin-top: 20rpx;
	}
	.box{
		width: 100%;
		margin:  0 0 40rpx 0;
		border: 1rpx solid rgba(0,0,0,0.1);
		padding: 20rpx;
		box-sizing: border-box;
		font-size: 25rpx;
	}
	.box-top{
		width: 100%;
		height: 40rpx;
		border-bottom: 1rpx solid rgba(0,0,0,0.1);
		/* line-height: 160rpx; */
	}
	.box-flex{
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
	}
	.box-left{
		width: 400rpx;
	}
	.box-right{
		/* width: 100%; */
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
		border: 1px solid transparent;  
		font-weight: 900; 
		margin-top: 10rpx;
		font-size: 20rpx;
		white-space: nowrap;
	}
	.pos-bottom{
		padding:20rpx;
		/* #ifdef H5 */
		padding: 20rpx 20rpx 120rpx 20rpx;
		/* #endif */
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		z-index:99;
		background-color: #FFFFFF;
		box-shadow: 20rpx 20px 20px 20px rgba(0,0,0,0.2);
		box-sizing: border-box;

	}
	.tale{
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-around;
		width: 100%;
		height: 100rpx;
	}
	.tale-box{
		width: 100%;
		height: 100%;
		text-align: center;
		line-height: 50rpx;
	}
	.monay{
		font-size: 30rpx;
		font-weight: 1000;
		color: #007AFF;
	}
	.monay-class{
		font-size: 30rpx;
		font-weight: 1000rpx;
	}
	.active{
		color: blue;
	}
</style>
