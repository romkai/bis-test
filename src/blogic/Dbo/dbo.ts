import IAccountsMgr from '@/blogic/Dbo/types/IAccountsMgr';
import IOpDatesMgr from '@/blogic/Dbo/types/IOpDatesMgr';
import IOpEntriesMgr from '@/blogic/Dbo/types/IOpEntriesMgr';
import accountsModule from '@/store/modules/accountsModule';
import opDatesModule from '@/store/modules/opDatesModule';
import opEntriesModule from '@/store/modules/opEntriesModule';

class Dbo {
	constructor(
		public accountsMgr: IAccountsMgr,
		public opDatesMgr: IOpDatesMgr,
		public opEntriesMgr: IOpEntriesMgr
	) {
		//
	}
}

export default new Dbo(accountsModule, opDatesModule, opEntriesModule);
