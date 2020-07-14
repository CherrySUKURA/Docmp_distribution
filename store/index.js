import Vue from 'vue'
import Vuex from 'vuex'
import search from './search.js'
import rankingList from './rankingList.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	
	state: {
		"Orderstate": "",
		"Afterstate": "",
		"publicstate": "",
		"ChannelList": "",
		"OrderNumber": "",
		"checkedAll": [],
		"details_list": []
	}, 
	mutations: {
		Orderstatu: function (state,newVal){
			state.Orderstate = newVal
		},
		Afterstatu: function (state,newVal){
			state.Afterstate = newVal
		},
		publicstatu: function (state,newVal){
			state.publicstate = newVal
		},
		channel: function (state,newVal){
			state.ChannelList = newVal
		},
		OrderCode: function (state,newVal){
			state.OrderNumber = newVal
		},
		checkedAllnew: function (state,newVal,name){
			state.name = newVal
		}
	},
	actions: {
		
	},
	getters: {
		
	},
	modules: {
		search: search,
		rankingList: rankingList
	}
})
export default store