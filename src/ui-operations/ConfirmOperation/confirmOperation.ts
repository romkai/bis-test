import { TConfirmOperationInput, TConfirmOperationResult } from './types/ConfirmTypes';
import operationStarter from '../OperationStarter';

export default function confirmOperation(input: TConfirmOperationInput): Promise<TConfirmOperationResult> {
	return operationStarter.execute<TConfirmOperationInput, TConfirmOperationResult>(input, import('./ConfirmDialog.vue'));
}
