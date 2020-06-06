import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import RequestHttp from './common/js/public_.js'
Vue.prototype.$store = store
Vue.prototype.$RequestHttp = RequestHttp

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
