import confirmOperation from '@/ui-operations/ConfirmOperation/confirmOperation';
import { TAccount } from '@/blogic/Entities/Account';
import nothingToDo from '@/ui-operations/nothingToDo';
import dbo from '@/blogic/Dbo/dbo';

export default function(account: TAccount): Promise<void> {
	return confirmOperation({
		title: 'Удаление счета',
		text: 'Вы действительно хотите удалить этот счет?',
	})
		.then(() => dbo.accountsMgr.deleteAccount(account))
		.catch(nothingToDo);
}
