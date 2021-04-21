import confirmOperation from '@/ui-operations/ConfirmOperation/confirmOperation';
import { TOpEntry } from '@/entities/OpEntry';
import MainContext from '@/helpers/MainContext';
import { TAccount } from '@/entities/Account';
import { TOpDate } from '@/entities/OpDate';
import nothingToDo from '@/ui-operations/nothingToDo';

export default function(opDate: TOpDate) {
	return confirmOperation({
		title: 'Удаление опер.дня',
		text: 'Вы действительно хотите удалить этот опер.день?',
	})
		.then(() => MainContext.$store.dispatch('deleteOperatingDate', opDate))
		.catch(nothingToDo);
}
