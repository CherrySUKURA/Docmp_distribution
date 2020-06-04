import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	search: {
		searchDate:""
	}
}
const mutations = {
	Value: function (state,newVal){
		state.search.searchDate = newVal
	}
}

const store = new Vuex.Store({
	state,
	mutations
})

export default store