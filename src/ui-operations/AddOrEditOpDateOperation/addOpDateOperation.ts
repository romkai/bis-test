import operationStarter from '@/ui-operations/OperationStarter';
import { TAddOpDateOperationInput, TAddOpDateOperationResult } from './types/AddOrEditOpDateTypes';

export default function addOpDateOperation(input: TAddOpDateOperationInput): Promise<TAddOpDateOperationResult> {
	return operationStarter.execute<TAddOpDateOperationInput, TAddOpDateOperationResult>(input, import('./OpDateEditDialog.vue'));
}
