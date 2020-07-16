<template>
	<view  class="details-content">
		<uni-list>
			<uni-list-item v-for="(item,index) in details_list" :key="index" :title="item.name" :rightText="item.ZD" :showArrow="false">
			</uni-list-item>
		</uni-list>
		<view class="uni-list">
			<view class="uni-list-all">
				<checkbox-group @change="allChoose">
					<!-- <label> -->
						<button type="primary" @click="afterSchedule()">售后</button>
						<checkbox value="all" :disabled="DJZT?true:false" :class="{'checked':allChecked}" :checked="allChecked?true:false"></checkbox> 全选
					<!-- </label> -->
				</checkbox-group>
			</view>
			<view class="uni-list-cell">
				<checkbox-group @change="checkboxChange" class="check-box">
					<!-- <scroll-view class="check-list"  :scroll-top="scrollTop" :scroll-y="true"> -->
						<label class="uni-list-cell-pd" v-for="(item,index) in list" :key="index">
							<view class="my-order">
								<view>
									<checkbox :value="String(item.lineNo)" :checked="checkedAll.includes(String(item.lineNo))" :disabled="item.lineStatus == 1 ?true:false"></checkbox>
								</view>
								<view class="left-content">{{String(item.lineNo)}}</view>
								<view class="right-content">
									<view>{{item.brand}} | {{item.brandName}}</view>
									<view>{{item.sellSku}}</view>
									<view>{{item.ForwarderName == null ? '无物流信息' : item.ForwarderName }}</view>
									<uni-tag :text="item.linepage" :type="item.lineStatus == 0 ? 'default' : item.lineStatus == 1 ? 'primary' : 'error'" class="list-tag" :circle="true" size="small"></uni-tag>
									<button @click="open(index)" :hover-stop-propagation="true" class="WLXX_BTN"></button>
								</view>
							</view>
						</label>
					<!-- </scroll-view> -->
				</checkbox-group>
			</view>
			<view class="uni-list-cell">
				<scroll-view class="check-list" :scroll-top="scrollTop" :scroll-y="true">
					<view class="after-sales" v-for="(item,index) in after_list" :key="index">
						<view class="flex">
							<view class="title">售后时间：</view>
							<view class="content" v-html="item.dateInfo"></view>
						</view>
						<view class="flex">
							<view class="title">行号：</view>
							<view class="content" v-text="item.lineNo"></view>
						</view>
						<view class="flex">
							<view class="title">赔付金额：</view>
							<view class="content" v-html="$public_.formatNumber(item.savRefund)"></view>
						</view>
						<view class="flex">
							<view class="title">售后附言：</view>
							<view class="content" v-html="item.comment"></view>
						</view>
						<view class="flex">
							<view class="title">品牌反馈：</view>
							<view class="content" v-html="item.feedback"></view>
						</view>
						<view class="flex">
							<view class="title">售后物流：</view>
							<view class="content" v-html="item.savLogisticsDesc"></view>
						</view>
						<view class="flex">
							<view class="title">售后理由：</view>
							<view class="content" v-html="item.savReasonDesc"></view>
						</view>
						<view class="flex">
							<view class="title">售后类型：</view>
							<view class="content" v-html="item.savTypeDesc"></view>
						</view>
						<uni-tag :text="item.savStatus == 9 ? '已完结' : '进行中'" :type="item.savStatus == 9 ? 'success' : 'warning'" class="list-tag" :circle="true" size="mini"></uni-tag>
						<button :disabled="item.savStatus == 9" @click="afterFeedbBack(item)">添加反馈</button>
					</view>
				</scroll-view>
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
					<logistics :wlInfo="index"></logistics>
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
				"DJZT": "",
				details_list: [],//订单详情数据
				after_list:[],
				scrollTop: 0,//滚动条距离上方的距离
				old: {
					scrollTop: 0
				},
				list:[],//包装数据
				Order:[],//物流数据
				index: {},//单个物流数据
				addr:"",//收货地址
				Parameter: {//请求条件对象
					"salesOrderNo": ""
				}
			}
		},
		onShow() {
			this.Parameter.salesOrderNo = this.OrderNumbers//请求条件的订单号
			this.RequestData(this.Parameter)//请求数据
		},
		methods: {
			RequestData(Parameter){
				this.$public_.RequestHttp('order/dealerOrderInfo',"Get",Parameter,this.DealerInfoCallBack,this.defeat);//请求订单详情数据
				this.$public_.RequestHttp('order/orderListDetails',"Get",Parameter,this.OrderListDetailsCallBack,this.defeat);//请求包装数据
				this.$public_.RequestHttp('afterSales/afterSchedule',"Get",Parameter,this.afterScheduleCallBack,this.defeat);//请求售后状态数据
			},
			//订单详情回调
			DealerInfoCallBack(e){
				let data = e.data.data[0];
				this.addr = data.Add_Full;
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
						ZD: data.Provinces
					}
				]
			},
			//包装数据回调
			OrderListDetailsCallBack(e) {
				let data = e.data.data
				let forwarderName
				let wlInfo
				let array = []
				data.forEach((item,index) => {
					this.$public_.RequestHttp('order/lineStatus',"Get",{"lineStatus": item.lineStatus},(e) => {
						item.linepage = e.data.data[0].lineStatusDesc
					},this.defeat)
					array.push(item)
				})
				this.list = array;
				data.forEach((item,index) => {
					if(data[index].forwarderName){
						forwarderName = data[index].forwarderName.splice('-')
					}else{
						forwarderName = '无物流公司'
					}
					wlInfo = {
						delivery_status: data[index].parcelStatus, //快递状态 1已签收 2配送中
						post_name: forwarderName, //快递名称
						// logo: 'https://cdn.kuaidi100.com/images/all/56/yunda.png', //快递logo
						// exp_phone: '95546', //快递电话
						post_no: data[index].parcelNo, //快递单号
						addr: '', //收货地址
						//物流信息
						list: []
					}
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
							wlInfo.list.push(list)
						})
					}
					this.Order.push(wlInfo)
				})
			},
			//售后回调
			afterScheduleCallBack(e){
				let data = e.data.data
				this.after_list = data
			},
			//异常回调
			defeat(e){
				console.log(e)
			},
			//多选选择执行事件
			checkboxChange (e) {
				let values = e.detail.value;
				this.checkedAll = values;
				if(this.checkedAll.length>0 && this.checkedAll.length == this.list.length){
					this.allChecked = true;
				}else {
					this.allChecked =false
				}
			},
			//全选执行事件
			allChoose(e){
				let chooseItem = e.detail.value;
				if(chooseItem[0] == 'all'){
					this.allChecked = true;
					for(let item of this.list){
						if(item.lineStatus != 1){
							let itemVal = String(item.lineNo);
							if(!this.checkedAll.includes(itemVal)){
								this.checkedAll.push(itemVal) 
							}
						}
					}
				}else{
					this.allChecked = false;
					this.checkedAll=[];
				}
			},
			//售后按钮执行事件
			afterSchedule(){
				//售后口子
				if(this.checkedAll.length != 0){
					this.$store.commit("checkedAllnew",this.checkedAll)
					this.$store.commit("detailsList",this.details_list)
					uni.navigateTo({
						url: "/pages/afterSchedule/afterSchedule"
					})
				}else{
					this.$public_.showToast('请选择需提交的订单','none',2000,null)
				}
			},
			//售后反馈按钮执行事件
			afterFeedbBack(e){
				this.$store.commit('afterList',e)
				uni.navigateTo({
					url: "/pages/aftersales/aftersales"
				})
			},
			//开启弹出窗
			open(i){
				this.index = this.Order[i]
				this.index.addr = this.addr
				this.$refs.details_popup.open()
			},
			//关闭弹出窗
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
	.uni-list{
		width: 100%;
		height: 100%;
	}
	.uni-list-all {
	    width: 100%;
	    height: 150rpx;
	    line-height: 75rpx;
	}
	.uni-list-cell {
		width: 100%;
		min-height: 80rpx;
		padding-top: 50rpx;
		box-sizing: border-box;
	}
	.check-box{
		width: 100%;
		height: 100%;
	}
	.check-list{
		width: 100%;
		height: 100%;
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
	.after-sales{
		width: 100%;
		margin-top: 20rpx;
		border: 1rpx solid rgba(0,0,0,0.1);
		padding: 20rpx;
		box-sizing: border-box;
	}
	.flex{
		display: flex;
		font-size: 20rpx;
	}
	.title{
		/* width: 25%; */
		width: 100rpx;
		text-align: right;
	}
	.content{
		width: calc(100%-100rpx);
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
