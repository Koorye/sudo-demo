import Vue from 'vue'
import App from './App'
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.requestURL = "http://106.14.197.71:8080/api-v1"
Vue.prototype.globalUserID = "向日葵"
Vue.prototype.globalUserSculptrue = "/static/icon/sculptrue_boy.png"
Vue.prototype.globalVersion = '1.1.1 Beta'

const app = new Vue({
    ...App
})
app.$mount()
