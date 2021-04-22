import confirmOperation from '@/ui-operations/ConfirmOperation/confirmOperation';
import { TOpEntry } from '@/blogic/entities/OpEntry';
import MainContext from '@/helpers/MainContext';
import nothingToDo from '@/ui-operations/nothingToDo';

export default function(opEntry: TOpEntry): Promise<void> {
	return confirmOperation({
		title: 'Удаление операции',
		text: 'Вы действительно хотите удалить эту операцию?',
	})
		.then(() => MainContext.$store.dispatch('deleteOpEntry', opEntry))
		.catch(nothingToDo);
}
