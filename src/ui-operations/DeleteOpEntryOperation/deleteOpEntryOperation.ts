import confirmOperation from '@/ui-operations/ConfirmOperation/confirmOperation';
import { TOpEntry } from '@/blogic/entities/OpEntry';
import nothingToDo from '@/ui-operations/nothingToDo';
import dbo from '@/blogic/classes/Dbo/Dbo';

export default function(opEntry: TOpEntry): Promise<void> {
	return confirmOperation({
		title: 'Удаление операции',
		text: 'Вы действительно хотите удалить эту операцию?',
	})
		.then(() => dbo.opEntriesMgr.deleteOpEntry(opEntry))
		.catch(nothingToDo);
}
