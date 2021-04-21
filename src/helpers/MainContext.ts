import { Store } from 'vuex';

class MainContext {
	public store = {} as Store<any>;
	public setup(store: Store<any>) {
		this.store = store;
	}
	get $store() {
		return this.store;
	}
}

export default new MainContext();
