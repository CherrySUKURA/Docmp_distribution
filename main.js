import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import ajax from './common/js/public_.js'
Vue.prototype.$store = store
Vue.prototype.$ajax = ajax

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
