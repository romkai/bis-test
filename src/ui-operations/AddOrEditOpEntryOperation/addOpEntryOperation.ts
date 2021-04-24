import operationStarter from '@/ui-operations/OperationStarter';
import { TAddOpEntryOperationInput, TAddOpEntryOperationResult } from './types/AddOrEditOpEntryTypes';

export default function addOpEntryOperation(input: TAddOpEntryOperationInput): Promise<TAddOpEntryOperationResult> {
	return operationStarter.execute<TAddOpEntryOperationInput, TAddOpEntryOperationResult>(input, import('./OpEntryEditDialog.vue'));
}
