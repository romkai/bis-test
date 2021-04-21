import operationStarter from '../OperationStarter';
import { TEditOpDateOperationInput, TEditOpDateOperationResult } from './types/AddOrEditOpDateTypes';

export default function editOpDateOperation(input: TEditOpDateOperationInput): Promise<TEditOpDateOperationResult> {
	return operationStarter.execute<TEditOpDateOperationInput, TEditOpDateOperationResult>(input, import('./OpDateEditDialog.vue'));
}
