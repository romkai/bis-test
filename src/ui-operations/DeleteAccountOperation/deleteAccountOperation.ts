import confirmOperation from '@/ui-operations/ConfirmOperation/confirmOperation';
import { TAccount } from '@/blogic/entities/Account';
import nothingToDo from '@/ui-operations/nothingToDo';
import store from '@/store/index';

export default function(account: TAccount): Promise<void> {
	return confirmOperation({
		title: 'Удаление счета',
		text: 'Вы действительно хотите удалить этот счет?',
	})
		.then(() => store.dispatch('deleteAccount', account))
		.catch(nothingToDo);
}
