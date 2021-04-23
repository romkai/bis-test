import Vue from 'vue';
import Vuex from 'vuex';
import { TOpEntry } from '@/blogic/entities/OpEntry';
import { TAccount } from '@/blogic/entities/Account';
import { TOpDate } from '@/blogic/entities/OpDate';
import accountsData from '@/store/json/acct.json';
import opDatesData from '@/store/json/opdate.json';
import opEntriesData from '@/store/json/doc.json';
import { orderBy } from 'lodash';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		opEntries: opEntriesData.Doc.map((op, index) => ({ ...op, Id: index+1 })) as TOpEntry[], // Нужно ключевое поле для операций
		accounts: accountsData.AcctAcct as TAccount[],
		opDates: opDatesData.OpDate as TOpDate[],
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
			state.opEntries = state.opEntries.filter(op => op.AcctDB !== account.Acct && op.AcctCr !== account.Acct);
		},

		// OpDates
		CREATE_OP_DATE(state, opDate: TOpDate) {
			state.opDates.push(opDate);
		},
		UPDATE_OP_DATE(state, opDate: TOpDate) {
			const index = state.opDates.findIndex(item => item.OpDate === opDate.OpDate);
			if (index === -1) return;
			state.opDates.splice(index, 1, opDate);
		},
		DELETE_OP_DATE(state, opDate: TOpDate) {
			const index = state.opDates.findIndex(item => item.OpDate === opDate.OpDate);
			if (index === -1) return;
			state.opDates.splice(index, 1);
			// Удалим связанные записи из операций
			state.opEntries = state.opEntries.filter(op => op.OpDate !== opDate.OpDate);
		},

		// OpEntries
		CREATE_OP_ENTRY(state, op: TOpEntry) {
			op.Id = state.opEntries.reduce((max, op) => Math.max(max, op.Id), 0) + 1;
			state.opEntries.push(op);
		},
		UPDATE_OP_ENTRY(state, op: TOpEntry) {
			const index = state.opEntries.findIndex(item => item.Id === op.Id);
			if (index === -1) return;
			state.opEntries.splice(index, 1, op);
		},
		DELETE_OP_ENTRY(state, op: TOpEntry) {
			const index = state.opEntries.findIndex(item => item.Id === op.Id);
			if (index === -1) return;
			state.opEntries.splice(index, 1);
		},
	},

	actions: {
		// Accounts
		createAccount(context, account: TAccount) {
			return context.commit('CREATE_ACCOUNT', account);
		},
		updateAccount(context, account: TAccount) {
			return context.commit('UPDATE_ACCOUNT', account);
		},
		deleteAccount(context, account: TAccount) {
			return context.commit('DELETE_ACCOUNT', account);
		},
		// OpEntries
		createOpEntry(context, op: TOpEntry) {
			return context.commit('CREATE_OP_ENTRY', op);
		},
		updateOpEntry(context, op: TOpEntry) {
			return context.commit('UPDATE_OP_ENTRY', op);
		},
		deleteOpEntry(context, op: TOpEntry) {
			return context.commit('DELETE_OP_ENTRY', op);
		},
		// OpDates
		createOpDate(context, opDate: TOpDate) {
			return context.commit('CREATE_OP_DATE', opDate);
		},
		updateOpDate(context, opDate: TOpDate) {
			return context.commit('UPDATE_OP_DATE', opDate);
		},
		deleteOpDate(context, opDate: TOpDate) {
			return context.commit('DELETE_OP_DATE', opDate);
		},
	},

	getters: {
		// Отсортированные данные
		opEntries: (state) => {
			return orderBy(state.opEntries, ['OpDate', 'AcctDB', 'AcctCr', 'Amount']);
		},
		opDates: (state) => {
			return orderBy(state.opDates,  ['OpDate'], ['desc']);
		},
		accounts: (state) => {
			return orderBy(state.accounts,  ['Acct']);
		},
	},

	modules: {},
});
