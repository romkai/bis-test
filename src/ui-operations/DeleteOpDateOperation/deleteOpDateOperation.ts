import confirmOperation from '@/ui-operations/ConfirmOperation/confirmOperation';
import MainContext from '@/helpers/MainContext';
import { TOpDate } from '@/entities/OpDate';
import nothingToDo from '@/ui-operations/nothingToDo';

export default function(opDate: TOpDate): Promise<void> {
	return confirmOperation({
		title: 'Удаление опер.дня',
		text: 'Вы действительно хотите удалить этот опер.день?',
	})
		.then(() => MainContext.$store.dispatch('deleteOperatingDate', opDate))
		.catch(nothingToDo);
}
