import confirmOperation from '@/ui-operations/ConfirmOperation/confirmOperation';
import { TOpEntry } from '@/entities/OpEntry';
import MainContext from '@/helpers/MainContext';
import nothingToDo from '@/ui-operations/nothingToDo';

export default function(opEntry: TOpEntry) {
	return confirmOperation({
		title: 'Удаление операции',
		text: 'Вы действительно хотите удалить эту операцию?',
	})
		.then(() => MainContext.$store.dispatch('deleteOperation', opEntry))
		.catch(nothingToDo);
}
