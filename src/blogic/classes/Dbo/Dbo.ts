import AccountsMgr from '@/blogic/classes/AccountsMgr/AccountsMgr';
import OpDatesMgr from '@/blogic/classes/OpDatesMgr/OpDatesMgr';
import OpEntriesMgr from '@/blogic/classes/OpEntriesMgr/OpEntriesMgr';
import { IAccountsMgr } from '@/blogic/classes/Dbo/types/AccountsMgrTypes';
import { IOpDatesMgr } from '@/blogic/classes/Dbo/types/OpDatesMgrTypes';
import { IOpEntriesMgr } from '@/blogic/classes/Dbo/types/OpEntriesMgrTypes';

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
