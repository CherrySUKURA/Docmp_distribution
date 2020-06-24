(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/uni-badge/uni-badge"],{"0de4":function(t,e,n){"use strict";n.r(e);var u=n("91de"),i=n("c19f");for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);n("3fce");var r,c=n("f0c5"),f=Object(c["a"])(i["default"],u["b"],u["c"],!1,null,"f2068f48",null,!1,u["a"],r);e["default"]=f.exports},1113:function(t,e,n){},"3fce":function(t,e,n){"use strict";var u=n("1113"),i=n.n(u);i.a},8034:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u={name:"UniBadge",props:{type:{type:String,default:"default"},inverted:{type:Boolean,default:!1},text:{type:[String,Number,Array],default:"0"},size:{type:String,default:"normal"}},data:function(){return{badgeStyle:""}},watch:{text:function(){this.setStyle()}},mounted:function(){this.setStyle()},methods:{setStyle:function(){this.badgeStyle="width: 35px"},onClick:function(){this.$emit("click")}}};e.default=u},"91de":function(t,e,n){"use strict";var u,i=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return u}))},c19f:function(t,e,n){"use strict";n.r(e);var u=n("8034"),i=n.n(u);for(var a in u)"default"!==a&&function(t){n.d(e,t,(function(){return u[t]}))}(a);e["default"]=i.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uni-badge/uni-badge-create-component',
    {
        'components/uni-badge/uni-badge-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("0de4"))
        })
    },
    [['components/uni-badge/uni-badge-create-component']]
]);
