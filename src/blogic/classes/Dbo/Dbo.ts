import AccountsMgr from '@/blogic/classes/AccountsMgr/AccountsMgr';
import OpDatesMgr from '@/blogic/classes/OpDatesMgr/OpDatesMgr';
import OpEntriesMgr from '@/blogic/classes/OpEntriesMgr/OpEntriesMgr';
import { IAccountsMgr } from '@/blogic/classes/AccountsMgr/types/AccountsMgrTypes';
import { IOpDatesMgr } from '@/blogic/classes/OpDatesMgr/types/OpDatesMgrTypes';
import { IOpEntriesMgr } from '@/blogic/classes/OpEntriesMgr/types/OpEntriesMgrTypes';

class Dbo {
	constructor(
		public accountsMgr: IAccountsMgr,
		public opDatesMgr: IOpDatesMgr,
		public opEntriesMgr: IOpEntriesMgr
	) {
		//
	}
}

export default new Dbo(AccountsMgr, OpDatesMgr, OpEntriesMgr);
