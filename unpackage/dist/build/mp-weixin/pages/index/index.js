(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"0629":function(t,e,a){"use strict";a.r(e);var i=a("0e3a"),n=a("e870");for(var r in n)"default"!==r&&function(t){a.d(e,t,(function(){return n[t]}))}(r);a("2e84");var s,o=a("f0c5"),l=Object(o["a"])(n["default"],i["b"],i["c"],!1,null,"ee094486",null,!1,i["a"],s);e["default"]=l.exports},"0e3a":function(t,e,a){"use strict";var i={uniPopup:function(){return Promise.all([a.e("common/vendor"),a.e("components/uni-popup/uni-popup")]).then(a.bind(null,"77c1"))}},n=function(){var t=this,e=t.$createElement;t._self._c},r=[];a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return r})),a.d(e,"a",(function(){return i}))},"13ad":function(t,e,a){},"1a75":function(t,e,a){"use strict";(function(t){a("6da9");i(a("66fd"));var e=i(a("0629"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("543d")["createPage"])},"2e84":function(t,e,a){"use strict";var i=a("13ad"),n=a.n(i);n.a},7306:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=n(a("aad0"));function n(t){return t&&t.__esModule?t:{default:t}}var r=null,s={components:{},data:function(){var t=this.getDate({format:!0});return{ChannelIndex:0,ChannelList:["全部"],date:t,canvasStyle:!0,OrderNumber:[],chartData:{series:[],categories:["分拣","揽收","运输","签收","问题","取消"],seriesline:[]},cWidth:"",cHeight:"",pixelRatio:1,maskClick:!1,OrderParameter:{cus_id:"",date:"",simplified:""},getDealerParameter:{cusId:""}}},onShow:function(){this.RequestData(this.OrderParameter),this.RequestDataOnce(this.getDealerParameter)},methods:{RequestData:function(t){this.$public_.RequestHttp("order/allOrder","Post",t,this.OrderCallBack,this.defeat),this.$public_.RequestHttp("order/allOrderBox","Post",t,this.iconCallBack,this.defeat),this.$public_.RequestHttp("order/allOrderLogistics","Post",t,this.iconLineCallBack,this.defeat)},RequestDataOnce:function(t){this.$public_.RequestHttp("dealer/getDealer","Get",t,this.apply,this.defeat)},apply:function(t){var e=this,a=t.data.data;a.forEach((function(t){e.ChannelList.push(t)}));var i=new Set(this.ChannelList);this.$store.commit("channel",Array.from(i)),this.ChannelList=this.$store.state.ChannelList},OrderCallBack:function(t){var e=t.data.data[0];if(null==e)return this.$public_.showToast("没有订单信息数据","none",2e3,null),this.OrderNumber=[],!1;var a=[{name:"订单金额",number:this.$public_.formatNumber(e.order_money)},{name:"订单数",number:e.order_amount},{name:"包裹数",number:e.parcel_amount},{name:"付款到账",number:this.$public_.formatNumber(e.pay_to_account_success)},{name:"账户余额",number:this.$public_.formatNumber(e.this_month_balance)}];this.OrderNumber=a},iconCallBack:function(e){var a=e.data.data[0];if(null==a)return this.$public_.showToast("没有饼图数据","none",2e3,null),this.series=[],!1;var i=[{name:"三盒",data:a.gift_boxes},{name:"四盒",data:a.four_boxes_total},{name:"五盒",data:a.five_boxes_total}];this.chartData.series=i,this.cWidth=t.upx2px(750),this.cHeight=t.upx2px(500),this.showPie("canvasPie",this.chartData)},iconLineCallBack:function(e){var a=e.data.data[0];if(null==a)return this.$public_.showToast("没有柱形图数据","none",2e3,null),this.chartData.seriesline=[],!1;var i=[{name:"物流状态信息",data:[a.wait_sorting_total,a.LanShou_total,a.transit_total,a.sign_for_total,a.problem_piece_total,a.cancel_total]}];this.chartData.seriesline=i,this.cWidth=t.upx2px(750),this.cHeight=t.upx2px(600),this.showLine("canvasline",this.chartData)},defeat:function(t){console.log(t)},bindPickerChange:function(t){this.ChannelIndex=t.target.value},bindDateChange:function(t){this.date=t.target.value},getDate:function(t){var e=new Date,a=e.getFullYear(),i=e.getMonth()+1;return i=i>9?i:"0"+i,"".concat(a,"-").concat(i)},showPie:function(t,e){r=new i.default({$this:this,canvasId:t,type:"pie",fontSize:11,legend:{show:!0},background:"#FFFFFF",pixelRatio:this.pixelRatio,series:e.series,animation:!0,width:this.cWidth*this.pixelRatio,height:this.cHeight*this.pixelRatio,dataLabel:!0,extra:{pie:{lableWidth:15}}})},showLine:function(t,e){new i.default({$this:this,canvasId:t,type:"column",lefend:{show:!0},fontSize:11,background:"#FFFFFF",pixelRatio:1,animation:!0,categories:e.categories,series:e.seriesline,xAxis:{disableGrid:!0},yAxis:{},dataLabel:!0,width:this.cWidth,height:this.cHeight,extra:{column:{type:"group",width:20}}})},touchPie:function(t){r.showToolTip(t,{format:function(t){return t.name+":"+t.data}})},open:function(){this.canvasStyle=!1,this.$refs.popup.open()},close:function(){this.$refs.popup.close(),this.canvasStyle=!0},condition_click:function(t){var e=this.date.replace("-","");"all"==t?(this.startDate=this.getDate(),this.endDate=this.getDate(),this.OrderParameter.simplified="",this.OrderParameter.date=""):0==this.ChannelIndex?(this.OrderParameter.simplified="",this.OrderParameter.date=e):(this.OrderParameter.simplified=this.ChannelList[this.ChannelIndex],this.OrderParameter.date=e),this.RequestData(this.OrderParameter,this.getDealerParameter),this.close()}}};e.default=s}).call(this,a("543d")["default"])},e870:function(t,e,a){"use strict";a.r(e);var i=a("7306"),n=a.n(i);for(var r in i)"default"!==r&&function(t){a.d(e,t,(function(){return i[t]}))}(r);e["default"]=n.a}},[["1a75","common/runtime","common/vendor"]]]);