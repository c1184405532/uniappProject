import Vue from 'vue'
import App from './App'

import store from './store'
import global from "./js_sdk/globalUtils.js"

Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.global = global
App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
