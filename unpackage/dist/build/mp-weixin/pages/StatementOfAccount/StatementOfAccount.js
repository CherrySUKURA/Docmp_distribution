(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/StatementOfAccount/StatementOfAccount"],{"0366":function(t,e,a){"use strict";var n=a("9dba"),i=a.n(n);i.a},"25dc":function(t,e,a){"use strict";a.r(e);var n=a("f342"),i=a.n(n);for(var c in n)"default"!==c&&function(t){a.d(e,t,(function(){return n[t]}))}(c);e["default"]=i.a},"339b":function(t,e,a){"use strict";(function(t){a("6da9");n(a("66fd"));var e=n(a("63ec"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("543d")["createPage"])},"63ec":function(t,e,a){"use strict";a.r(e);var n=a("696c"),i=a("25dc");for(var c in i)"default"!==c&&function(t){a.d(e,t,(function(){return i[t]}))}(c);a("0366");var o,s=a("f0c5"),u=Object(s["a"])(i["default"],n["b"],n["c"],!1,null,"add0d84c",null,!1,n["a"],o);e["default"]=u.exports},"696c":function(t,e,a){"use strict";var n={uniPopup:function(){return Promise.all([a.e("common/vendor"),a.e("components/uni-popup/uni-popup")]).then(a.bind(null,"77c1"))},zzxTabs:function(){return a.e("components/zzx-tabs/zzx-tabs").then(a.bind(null,"ee78"))}},i=function(){var t=this,e=t.$createElement,a=(t._self._c,t.__map(t.items,(function(e,a){var n=t.__map(t.lists,(function(e,a){var n=t.$public_.formatNumber(e.order_total_money),i=t.$public_.formatNumber(e.sal_total_expenditure),c=t.$public_.formatNumber(e.sal_after_total_money);return{$orig:t.__get_orig(e),g0:n,g1:i,g2:c}}));return{$orig:t.__get_orig(e),l0:n}})));t.$mp.data=Object.assign({},{$root:{l1:a}})},c=[];a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return c})),a.d(e,"a",(function(){return n}))},"9dba":function(t,e,a){},f342:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={components:{},data:function(){var t=this.getDate({format:!0});return{maskClick:!1,startDate:t,endDate:t,items:["全部"],current:0,lists:[],sum:[],accoutParam:{cus_id:"",simplified:"",start_date:"",end_date:"",page_size:"10",page_no:"1"},channelParam:{cusId:""},exportParam:{cus_id:"",date:"",simplified:""}}},onShow:function(){this.RequestData(this.accoutParam),this.RequestDataOnce(this.channelParam)},methods:{RequestData:function(t){this.$public_.RequestHttp("account/accountCheckListNew","Post",t,this.accoutCallBack,this.defeat),this.$public_.RequestHttp("account/accountCheckAllAmount","Post",t,this.accountAmountCallBack,this.defeat)},RequestDataOnce:function(t){this.$public_.RequestHttp("dealer/getDealer","Get",t,this.channelCallBack,this.defeat)},RequestExportOrderData:function(t,e){this.$public_.RequestHttp(e,"Post",t,this.urlCallBack,this.defeat)},urlCallBack:function(t){var e=t.data.data[0];this.$public_.RequestDownload(e,this.success,this.defeat)},success:function(e){if(200===e.statusCode){var a=e.tempFilePath;t.saveFile({tempFilePath:a,success:function(e){console.log(e.savedFilePath),t.openDocument({filePath:e.savedFilePath,success:function(t){return console.log("成功打开文档")}})},fail:function(){return console.log("下载失败")}})}},accoutCallBack:function(t){0==t.data.data.length&&this.$public_.showToast("没有订单数据","none",2e3,null),this.lists=t.data.data},accountAmountCallBack:function(t){var e=t.data.data;this.sum=[{money_name:"总金额",money:this.$public_.formatNumber(e.order_money_total)},{money_name:"总付款",money:this.$public_.formatNumber(e.buy_money_total)},{money_name:"余额",money:this.$public_.formatNumber(e.receivable_balance_total)}]},channelCallBack:function(t){var e=this,a=t.data.data;a.forEach((function(t,a){e.items.push(t)}))},defeat:function(t){console.log(t)},startDateChange:function(t){this.startDate=t.detail.value},endDateChange:function(t){this.endDate=t.detail.value},condition_click:function(t){"all"==t?(this.startDate=this.getDate(),this.endDate=this.getDate(),this.accoutParam.start_date="",this.accoutParam.end_date=""):(this.accoutParam.start_date=this.startDate,this.accoutParam.end_date=this.endDate),this.RequestData(this.accoutParam),this.$refs.popup.close()},onClickItem:function(t){this.current!==t.currentIndex&&(this.current=t.currentIndex),0==this.current?this.accoutParam.simplified="":this.accoutParam.simplified=this.items[this.current],this.RequestData(this.accoutParam)},derive:function(t,e){var a;a="Order"==t?"order/exportOrder":"order/exportOrderDetail",this.exportParam.date=this.lists[e].order_Date,this.exportParam.simplified=this.lists[e].simplified,this.RequestExportOrderData(this.exportParam,a)},getDate:function(t){var e=new Date,a=e.getFullYear(),n=e.getMonth()+1,i=e.getDay();return n=n>9?n:"0"+n,i=i>9?i:"0"+i,"".concat(a,"-").concat(n,"-").concat(i)},open:function(){this.$refs.popup.open()},close:function(){this.$refs.popup.close()}}};e.default=a}).call(this,a("543d")["default"])}},[["339b","common/runtime","common/vendor"]]]);