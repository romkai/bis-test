import operationStarter from '@/ui-operations/OperationStarter';
import { TAddAccountOperationInput, TAddAccountOperationResult } from './types/AddOrEditAccountTypes';

export default function addAccountOperation(input: TAddAccountOperationInput): Promise<TAddAccountOperationResult> {
	return operationStarter.execute<TAddAccountOperationInput, TAddAccountOperationResult>(input, import('./AccountEditDialog.vue'));
}
