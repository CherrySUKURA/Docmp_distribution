import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	rankingList: {
		DDZT:""
	}
}
const mutations = {
	Value: function (state,newVal){
		state.rankingList.DDZT = newVal
	}
}

const store = new Vuex.Store({
	state,
	mutations
})

export default store