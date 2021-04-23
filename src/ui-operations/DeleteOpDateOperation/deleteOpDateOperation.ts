import confirmOperation from '@/ui-operations/ConfirmOperation/confirmOperation';
import { TOpDate } from '@/blogic/entities/OpDate';
import nothingToDo from '@/ui-operations/nothingToDo';
import dbo from '@/blogic/classes/Dbo/Dbo';

export default function(opDate: TOpDate): Promise<void> {
	return confirmOperation({
		title: 'Удаление опер.дня',
		text: 'Вы действительно хотите удалить этот опер.день?',
	})
		.then(() => dbo.opDatesMgr.deleteOpDate(opDate))
		.catch(nothingToDo);
}
