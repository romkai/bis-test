import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, BootstrapVueIcons, LayoutPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import MainContext from '@/helpers/MainContext';

import './assets/style/main.scss'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(LayoutPlugin, { breakpoints: ['xs', 'sm', 'lg', 'xl', 'xxl'] })

Vue.config.productionTip = false

MainContext.setup(store);

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
