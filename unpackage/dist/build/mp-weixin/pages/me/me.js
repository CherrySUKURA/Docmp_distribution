(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/me/me"],{"0e2e":function(e,n,t){"use strict";t.r(n);var o=t("8da4"),s=t.n(o);for(var u in o)"default"!==u&&function(e){t.d(n,e,(function(){return o[e]}))}(u);n["default"]=s.a},2261:function(e,n,t){"use strict";(function(e){t("6da9");o(t("66fd"));var n=o(t("c3b7"));function o(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("543d")["createPage"])},"472c":function(e,n,t){"use strict";var o=t("be80"),s=t.n(o);s.a},"64b4":function(e,n,t){"use strict";var o={uniPopup:function(){return Promise.all([t.e("common/vendor"),t.e("components/uni-popup/uni-popup")]).then(t.bind(null,"77c1"))}},s=function(){var e=this,n=e.$createElement;e._self._c},u=[];t.d(n,"b",(function(){return s})),t.d(n,"c",(function(){return u})),t.d(n,"a",(function(){return o}))},"8da4":function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var t={components:{},data:function(){return{nickName:"用户名",avatarUrl:"../../static/userimg.png",maskClick:!1,ifsee:!0}},onShow:function(){},methods:{RequestUserData:function(e){this.$public_.loginRequestHttp("role/auto_login","Get",e,this.loginCallBack,this.defeat)},loginCallBack:function(n){var t=this;e.setStorage({key:"storage_key",data:n.data,success:function(o){"setStorage:ok"==o.errMsg?(t.ifsee=!1,e.getStorage({key:"storage_key",success:function(e){"getStorage:ok"==e.errMsg?(t.nickName=e.data.name,t.avatarUrl=e.data.face,t.$public_.token1(e.data.access_token),n.data.first_register?t.$public_.showToast("登陆成功","success",2e3,t.open):t.$public_.showToast("登陆成功","success",2e3,null)):t.$public_.showToast("登陆失败","none",2e3,null)},fail:function(){t.$public_.showToast("登陆失败","none",2e3,null)}})):t.$public_.showToast("登陆失败","none",2e3,null)},fail:function(){t.$public_.showToast("登陆失败","none",2e3,null)}})},callback:function(e){this.close(),this.$public_.showToast(e.msg,"success",2e3,this.open)},defeat:function(e){this.$public_.showToast("登陆失败","none",2e3,null)},open:function(){this.$refs.phone.open()},close:function(){this.$refs.phone.close()},login:function(){var n=this;e.login({provider:"weixin",success:function(t){if("login:ok"==t.errMsg){var o,s=t.code;e.getUserInfo({provider:"weixin",success:function(e){"getUserInfo:ok"==e.errMsg?(o={code:s,userInfo:e.userInfo},n.RequestUserData(o)):n.$public_.showToast("登陆失败","none",2e3,null)}})}else n.$public_.showToast("登陆失败","none",2e3,null)}})},decryptPhoneNumber:function(n){var t=this;"getPhoneNumber:ok"===n.detail.errMsg?e.getStorageSync({key:"storage_key",success:function(e){console.log(e);var o={uuid:e.data.uuid,endata:n.detail.encryptedData,iv:n.detail.iv};t.$public_.RequestHttp("role/security/mini_program/bind","Post",o,t.callback,t.defeat)}}):this.$refs.phone.close()}}};n.default=t}).call(this,t("543d")["default"])},be80:function(e,n,t){},c3b7:function(e,n,t){"use strict";t.r(n);var o=t("64b4"),s=t("0e2e");for(var u in s)"default"!==u&&function(e){t.d(n,e,(function(){return s[e]}))}(u);t("472c");var a,c=t("f0c5"),i=Object(c["a"])(s["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],a);n["default"]=i.exports}},[["2261","common/runtime","common/vendor"]]]);