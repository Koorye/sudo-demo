import Vue from 'vue'
import App from './App'
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.globalUserID="向日葵"
Vue.prototype.globalUserSculptrue="/static/icon/sculptrue_boy.png"

const app = new Vue({
    ...App
})
app.$mount()
