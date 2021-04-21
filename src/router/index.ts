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
		path: '/operating-dates',
		name: 'operating-dates',
		component: () => import('@/views/operating-dates/OperatingDates.vue')
	},
	{
		path: '/operations',
		name: 'operations',
		component: () => import('@/views/operations/Operations.vue')
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router;
