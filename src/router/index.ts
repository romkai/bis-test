import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
	{
		path: '/',
		name: 'home',
		redirect: { name: 'accounts' },
	},
	{
		path: '/accounts',
		name: 'accounts',
		component: () => import('@/views/accounts/Accounts.vue')
	},
	{
		path: '/op-dates',
		name: 'op-dates',
		component: () => import('@/views/op-dates/OpDates.vue')
	},
	{
		path: '/op-entries',
		name: 'op-entries',
		component: () => import('@/views/op-entries/OpEntries.vue')
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router;
