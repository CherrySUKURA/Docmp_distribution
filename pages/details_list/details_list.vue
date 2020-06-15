<template>
	<view  class="details-content">
		<uni-list>
			<uni-list-item v-for="(item,index) in details_list" :key="index" :title="item.name" :rightText="item.ZD" :showArrow="false">
			</uni-list-item>
		</uni-list>
		<view class="uni-list">
			<view class="uni-list-all">
				<checkbox-group @change="allChoose">
					<label>
						<button type="primary" @click="">售后</button>
						<checkbox value="all" :disabled="DJZT?true:false" :class="{'checked':allChecked}" :checked="allChecked?true:false"></checkbox> 全选
					</label>
				</checkbox-group>
			</view>
			<view class="uni-list-cell">
				<checkbox-group @change="checkboxChange">
					<scroll-view class="check-list"  :scroll-top="scrollTop" :scroll-y="true">
						<label class="uni-list-cell-pd" v-for="(item,index) in list" :key="index">
							<view class="my-order">
								<view>
									<checkbox :value="String(item.lineNo)" :checked="checkedAll.includes(String(item.lineNo))" :disabled="DJZT?true:false"></checkbox>
								</view>
								<view class="left-content">{{String(item.lineNo)}}</view>
								<view class="right-content">
									<view>{{item.brand}} | {{item.brandName}}</view>
									<view>{{item.sellSku}}</view>
									<view>{{item.ForwarderName == null ? '无物流信息' : item.ForwarderName }}</view>
									<button @click="open(index)" :hover-stop-propagation="true" class="WLXX_BTN"></button>
								</view>
							</view>
						</label>
					</scroll-view>
				</checkbox-group>
			</view>
			<uni-popup ref="details_popup" type="center" class="popup-content">
				<view class="popup-center">
					<view class="popup-block">
						<view class="popup-block-left">
							<text>物流信息</text>
						</view>
						<view class="popup-block-right">
							<image src="../../static/close.png" @click="close"></image>
						</view>
					</view>
					<scroll-view class="logistics" :scroll-top="scrollTop" scroll-y="true" @scroll="scroll">
				<!-- <view class="logistics"> -->
					<logistics :wlInfo="wlInfo"></logistics>
				<!-- </view> -->
					</scroll-view>
				</view>
			</uni-popup>
		</view>
		
	</view>
</template>

<script>
	import { mapState,mapAction,mapGetter,mapMutations } from 'vuex';
	import logistics from '../../components/xinyu-logistics/xinyu-logistics.vue'
	export default {
		components: {
			logistics
		},
		data() {
			return {
				allChecked:false,//是否被选中
				checkedAll:[], //复选框选中的值
				"DJZT": false,
				details_list: [],
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				list:[],
				wlInfo: {
				    delivery_status: "", //快递状态 1已签收 2配送中
				    post_name: '', //快递名称
				    logo: 'https://cdn.kuaidi100.com/images/all/56/yunda.png', //快递logo
				    // exp_phone: '95546', //快递电话
				    post_no: '', //快递单号
				    addr: '', //收货地址
				    //物流信息
				    list: []
				},
				Parameter: {
					"salesOrderNo": ""
				}
			}
		},
		onLoad() {
			this.Parameter.salesOrderNo = this.OrderNumbers
			this.RequestData(this.Parameter)
		},
		methods: {
			RequestData(Parameter){
				this.$public_.RequestHttp('order/dealerOrderInfo',"Get",Parameter,this.DealerInfoCallBack,this.defeat);//请求订单列表订单天数数据
				this.$public_.RequestHttp('order/orderListDetails',"Get",Parameter,this.OrderListDetailsCallBack,this.defeat);//请求订单列表订单天数数据
			},
			DealerInfoCallBack(e){
				let data = e.data.data[0];
				this.wlInfo.addr = data.Add_Full;
				this.details_list = [
					{
						name: "单证号",
						ZD: data.Sales_Order_No
					},
					{
						name: "单据类型",
						ZD: data.Order_Type_Desc
					},
					{
						name: "单据状态",
						ZD: data.Order_Status_Desc
					},
					{
						name: "涉及包裹数",
						ZD: data.parcel_total
					},
					{
						name: "渠道商",
						ZD: data.simplified
					},
					{
						name: "收件人",
						ZD: data.Client_Name + " " +data.Client_Contact
					},
					{
						name: "省市区",
						ZD: data.Provinces
					},
					{
						name: "地址",
						ZD: data.Add_Full
					}
				]
			},
			OrderListDetailsCallBack(e) {
				let data = e.data.data
				this.list = data;
				data.forEach((item,index) => {
					let forwarderName
					if(data[index].forwarderName){
						forwarderName = data[index].forwarderName.splice('-')
					}else{
						forwarderName = '无物流公司'
					}
					this.wlInfo.post_name = forwarderName
					this.wlInfo.post_no = data[index].parcelNo
					this.wlInfo.delivery_status = data[index].parcelStatus;
					if(item.parcelInfo){
						let  parcelInfoes = JSON.parse(item.parcelInfo).reverse();
						parcelInfoes.forEach((item1,index1) => {
							let data = item1.AcceptTime.split(" ")
							let list = {
						            "time": item1.AcceptTime,
						            "timeArr": data,
						            "context": item1.AcceptStation,
						            "location": ""
						        }
							this.wlInfo.list.push(list)
						})
					}
				})
			},
			defeat(e){
				console.log(e)
			},
			checkboxChange (e) {
				let values = e.detail.value;
				this.checkedAll = values;
				if(this.checkedAll.length>0 && this.checkedAll.length == this.list.length){
					this.allChecked = true;
				}else {
					this.allChecked =false
				}
			},
			allChoose(e){
				let chooseItem = e.detail.value;
				if(chooseItem[0] == 'all'){
					this.allChecked = true;
					for(let item of this.list){
						let itemVal = String(item.lineNo);
						if(!this.checkedAll.includes(itemVal)){
							this.checkedAll.push(itemVal) 
						}
					}
				}else{
					this.allChecked = false;
					this.checkedAll=[];
				}
			},
			afterSale(){
				//售后口子
			},
			open(i){
				this.$refs.details_popup.open()
			},
			close() {
				this.$refs.details_popup.close()
			},
			scroll(e){
				this.old.scrollTop += e.detail.scrollTop
			},
		},
		computed:{
			...mapState({
				OrderNumber: state => state.OrderNumber
			}),
			OrderNumbers: function() {
				return this.OrderNumber
			}
		}
	}
</script>

<style>
	.details-content{
		width: 100%;
		padding: 20rpx;
		box-sizing: border-box;
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
	.my-order{
		display: flex;
		flex-flow: row nowrap;
	}
	
	.left-content{
		width: 120rpx;
		height: 200rpx;
		/* line-height: 150rpx; */
		text-align: center;
	}
	.right-content{
		/* height: 200rpx; */
		width: 100%;
		position: relative;
		text-align: left;
	}
	.WLXX_BTN{
		width: 50rpx;
		height: 50rpx;
		background: url(../../static/WLXX.png) no-repeat;
		background-size: 100% 100%;
		display: block;
/* 		margin-right: 0;
		margin-bottom: 0; */
		position: absolute;
		bottom: 20rpx;
		right: 0;
	}
	.btn{
		width: 100rpx;
		height: 50rpx;
	}
	.check-list{
		width: 100%;
		height: 700rpx;
	}
	.uni-list{
	}
	.uni-list-all {
	   width: 100%;
	   height: 150rpx;
	   line-height: 75rpx;
	}
	.uni-list-cell {
		width: 100%;
		height: 200rpx;
		padding-top: 50rpx;
		box-sizing: border-box;
	}
	.popup-center{
		width: 600rpx;
		height: 1000rpx;
		background-color: #FFFFFF;
		padding: 20rpx;
		box-sizing: border-box;
	}
	.popup-block{
		width: 100%;
		height: 50rpx;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
	}
	.popup-block-left{
		height: 50rpx;
	}
	.popup-block-right{
		width: 50rpx;
		height: 50rpx;
	}
	.popup-block-right image{
		width: 100%;
		height: 100%;
	}
	.logistics{
		width: 100%;
		height: 920rpx;
		box-sizing: border-box;
		padding:40rpx 0 20rpx 0;
	}
</style>
