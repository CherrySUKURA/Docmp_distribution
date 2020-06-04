import Vue from 'vue'
import Vuex from 'vuex'
import search from './search.js'
import rankingList from './rankingList.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	
	state: {
		"public": ""
	}, 
	mutations: {
		Value: function (state,newVal){
			state.public = newVal
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