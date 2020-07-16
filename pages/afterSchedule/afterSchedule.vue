<template>
	<view class="afterSchedule-content">
		<uni-drawer ref="drawer">
			<view style="padding: 30rpx 10rpx;">
				<uni-list class="drawer">
					<uni-list-item  class="drawer-item" v-for="(item,index) in checkedAll" :key="index" @click="misclick(index)">{{RM(item)}}</uni-list-item>
				</uni-list>
			</view>
		</uni-drawer>
		<button type="default" @click="open()">侧边栏</button>
		<view v-for="(item,index) in checkedAll" :key="index" v-if="index == seeindex">
			<form @submit="formSubmit" @reset="formRest" class="form-content">
					<view class="RM">{{RM(item)}}</view>
					<view class="form-item form-column">
						<view class="title">
							RM单号
						</view>
						<view class="form-picker">
							<input class="form-input" :disabled="true" :value="RM(item)" placeholder="这是一个输入框" />
						</view>
					</view>
					<view class="form-item form-column">
						<view class="title">
							售后类型
						</view>
						<view class="form-picker">
							<picker @change="afterSavTypeChange" name='sav_type' :value="afterSavTypekey" :range="afterSavTypeArray">
								<view>{{afterSavTypeArray[afterSavTypekey]}}</view>
							</picker>
						</view>
					</view>
					<view class="form-item form-column">
						<view class="title">
							售后原因
						</view>
						<view class="form-picker">
							<picker @change="afterSavReasonChange" name='sav_reason' :value="afterSavReasonkey" :range="afterSavReasonArray">
								<view>{{afterSavReasonArray[afterSavReasonkey]}}</view>
							</picker>
						</view>
					</view>
					<view class="form-item form-column">
						<view class="title">
							拦截状态
						</view>
						<view class="form-picker">
							<picker @change="afterSavLogisticsChange" name='sav_logistics' :value="afterSavLogisticskey" :range="afterSavLogisticsArray">
								<view>{{afterSavLogisticsArray[afterSavLogisticskey]}}</view>
							</picker>
						</view>
					</view>
					<view class="form-item form-column">
						<view class="title">
							涉及金额
						</view>
						<view class="form-picker">
							<input class="form-input" v-model="savRefund" name='sav_refund' :placeholder="this.$public_.formatNumber(0)" />
						</view>
					</view>
					<view class="form-item form-column" style="display: none;">
						<view class="title">
							行号
						</view>
						<view class="form-picker">
							<input class="form-input" name='line_no' :value="item" placeholder="这是一个输入框" />
						</view>
					</view>
					<view class="form-item form-column" style="display: none;">
						<view class="title">
							单号
						</view>
						<view class="form-picker">
							<input class="form-input" name='sales_order_no' :value="details_list[0].ZD" placeholder="这是一个输入框" />
						</view>
					</view>
					<view class="form-item form-column">
						<view class="title">
							售后诉求
						</view>
						<view class="uni-textarea">
							<textarea class="form-input" v-model="comment" name='comment'/>
						</view>
					</view>
				<button type="primary" form-type="submit">提交</button>
			</form>
		</view>
	</view>
</template>

<script>
	import { mapState,mapAction,mapGetter,mapMutations } from 'vuex';
	export default {
		onShow() {
			this.RequestHttpSelect()
		},
		data() {
			return {
				afterSavType: [],
				afterSavTypeArray:[],
				afterSavReason: [],
				afterSavReasonArray: [],
				afterSavLogistics: [],
				afterSavLogisticsArray: [],
				afterSavTypekey: 0,
				afterSavReasonkey: 0,
				afterSavLogisticskey: 0,
				savRefund:"",
				comment: "",
				seeindex: 0
			}
		},
		methods: {
			RequestHttpSelect(){
				this.$public_.RequestHttp('afterSales/afterSavType','Post',{},this.afterSavTypeCallBack,this.defeat)
				this.$public_.RequestHttp('afterSales/afterSavReason','Post',{},this.afterSavReasonCallBack,this.defeat)
				this.$public_.RequestHttp('afterSales/afterSavLogistics','Post',{},this.afterSavLogisticsCallBack,this.defeat)
			},
			afterSavTypeCallBack(e){
				let data = e.data.data;
				this.afterSavType = data;
				this.afterSavTypeArray = [];
				data.forEach( (item,index) => {
					this.afterSavTypeArray.push(item.savTypeDesc)
				})
			},
			afterSavReasonCallBack(e){
				let data = e.data.data;
				this.afterSavReason = data;
				this.afterSavReasonArray = [];
				data.forEach( (item,index) => {
					this.afterSavReasonArray.push(item.savReasonDesc)
				})
			},
			afterSavLogisticsCallBack(e){
				let data = e.data.data;
				this.afterSavLogistics = data;
				this.afterSavLogisticsArray = [];
				data.forEach( (item,index) => {
					this.afterSavLogisticsArray.push(item.savLogisticsDesc)
				})
			},
			defeat(e){
				this.$public_.showToast(e.data.msg,'none',2000,null)
			},
			afterSavTypeChange(e) {
				this.afterSavTypekey = e.target.value
			},
			afterSavReasonChange(e) {
				this.afterSavReasonkey = e.target.value
			},
			afterSavLogisticsChange(e){
				this.afterSavLogisticskey = e.target.value
			},
			formSubmit(e){
				let data = e.detail.value
				data.sav_type = this.afterSavType[data.sav_type].savType
				data.sav_reason = this.afterSavReason[data.sav_reason].savReason
				data.sav_logistics = this.afterSavLogistics[data.sav_logistics].savLogistics
				let line = this.checkedAll.indexOf(data.line_no)
				this.checkedAll.splice(line,line+1)
				this.$public_.RequestHttp('afterSales/afterUploadFrom',"Post",data,this.afterUploadFromCallBack,this.defeat)
			},
			misclick(i){
				this.seeindex = i;
				this.afterSavTypekey = 0;
				this.afterSavReasonkey = 0;
				this.afterSavLogisticskey = 0;
				this.savRefund = "";
				this.comment = "";
				this.$refs.drawer.close()
			},
			afterUploadFromCallBack(){
				if(this.checkedAll.length == 0){
					uni.navigateTo({
						url: "/pages/details_list/details_list",
						success: () => {
							this.$public_.showToast('提交成功','none',2000,null)
						}
					})
				}else {
					this.afterSavTypekey = 0;
					this.afterSavReasonkey = 0;
					this.afterSavLogisticskey = 0;
					this.savRefund = "";
					this.comment = "";
				}
			},
			open(){
				this.$refs.drawer.open()
			}
		},
		computed:{
			...mapState({
				checkedAll: state => state.checkedAll,
				details_list: state => state.details_list
			}),
			RM: function() {
				return function(index){
					let number = this.details_list[0].ZD.substring(2,14)
					return "RM"+ `${number}`+ "000" + `${index}`
				}
			}
		}
	}
</script>

<style>
	.afterSchedule-content{
		width: 100%;
		padding: 40rpx;
		box-sizing: border-box;
	}
	.uni-list-item{
		font-size: 20rpx !important;
	}
	.form-content{
		width: 100%;
	}
	
	.RM{
		width: 100%;
		height: 80rpx;
		background-color: gray;
		color: #FFFFFF;
		font-size: 32rpx;
		padding-left: 30rpx;
		box-sizing: border-box;
		line-height: 80rpx;
	}
	.form-item{
		width: 100%;
		/* height: 80rpx; */
		display: flex;
		margin: 30rpx 0;
	}
	.title{
		width: 20%;
		height: 80rpx;
		font-size: 32rpx;
		line-height: 80rpx;
		color: #000000
	}
	.form-picker{
		width: 80%;
		height: 80rpx;
		font-size: 32rpx;
		line-height: 80rpx;
		box-sizing: border-box;
		border: 1rpx solid rgba(200,0,0,0.1);
		background-color: #FFFFFF;
		text-align: center;
	}
	.form-input{
		width: 100%;
		height: 100%;
		line-height: 80rpx;
		padding: 10rpx; 
		box-sizing: border-box;
	}
	.uni-textarea{
		width: 80%;
		height: 300rpx;
		font-size: 32rpx;
		border: 1rpx solid rgba(200,0,0,0.1);
	}
</style>
