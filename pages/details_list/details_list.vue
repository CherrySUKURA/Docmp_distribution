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
									<checkbox :value="item.HH" :checked="checkedAll.includes((item.HH))" :disabled="DJZT?true:false"></checkbox>
								</view>
								<view class="left-content">{{item.HH}}</view>
								<view class="right-content">
									<view>{{item.PP}}|{{item.PM}}</view>
									<view>{{item.SKU}}</view>
									<view>{{item.WLGS}}</view>
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
					<scroll-view class="logistics" :scroll-top="scrollTop" scroll-y="true" @scrolltoupper="upper" @scrolltolower="lower"
                @scroll="scroll">
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
	import logistics from '../../components/xinyu-logistics/xinyu-logistics.vue'
	export default {
		data() {
			return {
				allChecked:false,//是否被选中
				checkedAll:[], //复选框选中的值
				"DJZT": false,
				details_list: [
						{
							name: "单证号",
							ZD: "SO202005270564"
						},
						{
							name: "单据类型",
							ZD: "正常销售单"
						},
						{
							name: "单据状态",
							ZD: '物流单号已返回 | 未发货'
						},
						{
							name: "设计包裹数",
							ZD: "1"
						},
						{
							name: "渠道商",
							ZD: "适盒"
						},
						{
							name: "收件人",
							ZD: "阮蓉 1588884895"
						},
						{
							name: "省市区",
							ZD: "浙江省 杭州市 临安区"
						},
						{
							name: "地址",
							ZD: "绿城玉兰花园锦城街道玉兰花园6幢三单元605室"
						}
				],
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				list:[
					{
						"HH": '1',
						"SKU": 'RL0061',
						"PP": "空刻AirMeter",
						"PM": "烛光意面四盒装（2番茄2奶油)",
						"WLGS": "嘉兴--申通"
					},
					{
						"HH": '2',
						"SKU": 'RL0061',
						"PP": "空刻AirMeter",
						"PM": "烛光意面四盒装（2番茄2奶油)",
						"WLGS": "嘉兴--申通"
					},
					{
						"HH": '3',
						"SKU": 'RL0061',
						"PP": "空刻AirMeter",
						"PM": "烛光意面四盒装（2番茄2奶油)",
						"WLGS": "嘉兴--申通"
					},
					{
						"HH": '4',
						"SKU": 'RL0061',
						"PP": "空刻AirMeter",
						"PM": "烛光意面四盒装（2番茄2奶油)",
						"WLGS": "嘉兴--申通"
					}
				],
				wlInfo: {
				    delivery_status: 0, //快递状态 1已签收 2配送中
				    post_name: '韵达快递', //快递名称
				    logo: 'https://cdn.kuaidi100.com/images/all/56/yunda.png', //快递logo
				    exp_phone: '95546', //快递电话
				    post_no: '4304678557725', //快递单号
				    addr: '江西省南昌市青云谱区', //收货地址
				    //物流信息
				    list: [{
				            "time": "2020-04-12 13:00:57",
				            "timeArr": ['2020-04-12', '13:00:57'],
				            "context": "江西南昌青云谱区 快件已被 丰巢智能柜 代签收。",
				            "location": ""
				        },
				        {
				            "time": "2020-04-12 12:58:53",
				            "timeArr": ['2020-04-12', '12:58:53'],
				            "context": "江西南昌青云谱区 进行派件扫描；派送业务员：张三；联系电话：88888888888",
				            "location": ""
				        },
				        {
				            "time": "2020-04-11 15:45:44",
				            "timeArr": ['2020-04-11', '15:45:44'],
				            "context": "江西南昌分拨中心 从站点发出，本次转运目的地：江西南昌青云谱区",
				            "location": ""
				        },
				        {
				            "time": "2020-04-11 15:08:45",
				            "timeArr": ['2020-04-11', '15:08:45'],
				            "context": "江西南昌分拨中心 在分拨中心进行卸车扫描",
				            "location": ""
				        },
				        {
				            "time": "2020-04-10 17:42:41",
				            "timeArr": ['2020-04-10', '17:42:41'],
				            "context": "浙江义乌分拨中心 进行装车扫描，发往：江西南昌分拨中心",
				            "location": ""
				        },
				        {
				            "time": "2020-04-10 17:39:38",
				            "timeArr": ['2020-04-10', '17:39:38'],
				            "context": "浙江义乌分拨中心 在分拨中心进行称重扫描",
				            "location": ""
				        },
				        {
				            "time": "2020-04-10 16:02:46",
				            "timeArr": ['2020-04-10', '16:02:46'],
				            "context": "浙江义乌城西公司 进行下级地点扫描，发往：江西南昌地区包",
				            "location": ""
				        },
				        {
				            "time": "2020-04-10 15:48:42",
				            "timeArr": ['2020-04-10', '15:48:42'],
				            "context": "浙江义乌城西公司城西营销部 进行揽件扫描",
				            "location": ""
				        }
				    ]
				}
			}
		},
		methods: {
			checkboxChange (e) {
				let values = e.detail.value;
				this.checkedAll = values;
				if(this.checkedAll.length>0 && this.checkedAll.length == this.list.length){
					this.allChecked = true;
				}else {
					this.allChecked =false
				}
				console.log(this.checkedAll)
				
			},
			allChoose(e){
				let chooseItem = e.detail.value;
				if(chooseItem[0] == 'all'){
					this.allChecked = true;
					for(let item of this.list){
						let itemVal = String(item.HH);
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
			upper(e){
				console.log(e)
			},
			lower(e){
				console.log(e)
			},
			scroll(e){
				this.old.scrollTop += e.detail.scrollTop
			},
		},
		components: {
			logistics
		},
		mounted() {
			
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
		height: 200rpx;
		text-align: left;
	}
	.WLXX_BTN{
		width: 50rpx;
		height: 50rpx;
		background: url(../../static/WLXX.png) no-repeat;
		background-size: 100% 100%;
		display: block;
		margin-right: 0;
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
