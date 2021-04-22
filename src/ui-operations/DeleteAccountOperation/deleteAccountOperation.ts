import confirmOperation from '@/ui-operations/ConfirmOperation/confirmOperation';
import MainContext from '@/helpers/MainContext';
import { TAccount } from '@/blogic/entities/Account';
import nothingToDo from '@/ui-operations/nothingToDo';

export default function(account: TAccount): Promise<void> {
	return confirmOperation({
		title: 'Удаление счета',
		text: 'Вы действительно хотите удалить этот счет?',
	})
		.then(() => MainContext.$store.dispatch('deleteAccount', account))
		.catch(nothingToDo);
}
