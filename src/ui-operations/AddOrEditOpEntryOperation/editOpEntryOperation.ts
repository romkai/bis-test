import operationStarter from '@/ui-operations/OperationStarter';
import { TEditOpEntryOperationInput, TEditOpEntryOperationResult } from './types/AddOrEditOpEntryTypes';

export default function editOpEntryOperation(input: TEditOpEntryOperationInput): Promise<TEditOpEntryOperationResult> {
	return operationStarter.execute<TEditOpEntryOperationInput, TEditOpEntryOperationResult>(input, import('./OpEntryEditDialog.vue'));
}
