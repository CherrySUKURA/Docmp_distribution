import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import public_ from './common/js/public_.js'
Vue.prototype.$store = store
Vue.prototype.$public_ = public_
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
