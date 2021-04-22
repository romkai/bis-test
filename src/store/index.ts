import Vue from 'vue';
import Vuex from 'vuex';
import { sortBy, orderBy } from 'lodash';
import { TOpEntry } from '@/blogic/entities/OpEntry';
import { TAccount } from '@/blogic/entities/Account';
import { TOpDate } from '@/blogic/entities/OpDate';
import accountsData from '@/store/json/acct.json';
import opDatesData from '@/store/json/opdate.json';
import operationsData from '@/store/json/doc.json';
import timeoutPromise from '@/helpers/timeoutPromise';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		operations: operationsData.Doc.map((op, index) => ({ ...op, Id: index+1 })) as TOpEntry[], // Нужно ключевое поле для операций
		accounts: accountsData.AcctAcct as TAccount[],
		operatingDates: opDatesData.OpDate as TOpDate[],
	},

	mutations: {

		// Accounts
		CREATE_ACCOUNT(state, account: TAccount) {
			state.accounts.push(account);
		},
		UPDATE_ACCOUNT(state, account: TAccount) {
			const index = state.accounts.findIndex(item => item.Acct === account.Acct);
			if (index === -1) return;
			state.accounts.splice(index, 1, account);
		},
		DELETE_ACCOUNT(state, account: TAccount) {
			const index = state.accounts.findIndex(item => item.Acct === account.Acct);
			if (index === -1) return;
			state.accounts.splice(index, 1);
			// Удалим связанные записи из операций
			state.operations = state.operations.filter(op => op.AcctDB !== account.Acct && op.AcctCr !== account.Acct);
		},

		// Operating Dates
		CREATE_OPERATING_DATE(state, opDate: TOpDate) {
			state.operatingDates.push(opDate);
		},
		UPDATE_OPERATING_DATE(state, opDate: TOpDate) {
			const index = state.operatingDates.findIndex(item => item.OpDate === opDate.OpDate);
			if (index === -1) return;
			state.operatingDates.splice(index, 1, opDate);
		},
		DELETE_OPERATING_DATE(state, opDate: TOpDate) {
			const index = state.operatingDates.findIndex(item => item.OpDate === opDate.OpDate);
			if (index === -1) return;
			state.operatingDates.splice(index, 1);
			// Удалим связанные записи из операций
			state.operations = state.operations.filter(op => op.OpDate !== opDate.OpDate);
		},

		// Operations
		CREATE_OPERATION(state, op: TOpEntry) {
			op.Id = state.operations.reduce((max, op) => Math.max(max, op.Id), 0) + 1;
			state.operations.push(op);
		},
		UPDATE_OPERATION(state, op: TOpEntry) {
			const index = state.operations.findIndex(item => item.Id === op.Id);
			if (index === -1) return;
			state.operations.splice(index, 1, op);
		},
		DELETE_OPERATION(state, op: TOpEntry) {
			const index = state.operations.findIndex(item => item.Id === op.Id);
			if (index === -1) return;
			state.operations.splice(index, 1);
		},
	},

	actions: {

		// Accounts
		createAccount(context, account: TAccount) {
			// timeoutPromise - имитация запроса к серверу 100мс
			return timeoutPromise().then(() => context.commit('CREATE_ACCOUNT', account));
		},
		updateAccount(context, account: TAccount) {
			return timeoutPromise().then(() => context.commit('UPDATE_ACCOUNT', account));
		},
		deleteAccount(context, account: TAccount) {
			return timeoutPromise().then(() => context.commit('DELETE_ACCOUNT', account));
		},

		// Operations
		createOperation(context, op: TOpEntry) {
			return context.commit('CREATE_OPERATION', op);
		},
		updateOperation(context, op: TOpEntry) {
			return context.commit('UPDATE_OPERATION', op);
		},
		deleteOperation(context, op: TOpEntry) {
			return context.commit('DELETE_OPERATION', op);
		},

		// Operating Dates
		createOperatingDate(context, opDate: TOpDate) {
			return timeoutPromise().then(() => context.commit('CREATE_OPERATING_DATE', opDate));
		},
		updateOperatingDate(context, opDate: TOpDate) {
			return timeoutPromise().then(() => context.commit('UPDATE_OPERATING_DATE', opDate));
		},
		deleteOperatingDate(context, opDate: TOpDate) {
			return timeoutPromise().then(() => context.commit('DELETE_OPERATING_DATE', opDate));
		},
	},

	getters: {

		// Отсортированные данные
		accounts: (state): TAccount[] => sortBy(state.accounts, 'Acct'),
		operations: (state): TOpEntry[] => sortBy(state.operations, ['OpDate', 'AcctDB', 'AcctCr', 'Amount']),
		operatingDates: (state): TOpDate[] => orderBy(state.operatingDates,  ['OpDate'], ['desc']),

	},

	modules: {},
});
