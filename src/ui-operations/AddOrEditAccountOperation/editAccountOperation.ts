import operationStarter from '@/ui-operations/OperationStarter';
import { TEditAccountOperationInput, TEditAccountOperationResult } from './types/AddOrEditAccountTypes';

export default function editAccountOperation(input: TEditAccountOperationInput): Promise<TEditAccountOperationResult> {
	return operationStarter.execute<TEditAccountOperationInput, TEditAccountOperationResult>(input, import('./AccountEditDialog.vue'));
}
