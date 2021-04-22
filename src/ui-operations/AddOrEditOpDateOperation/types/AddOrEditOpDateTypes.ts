import { TOpDate } from '@/blogic/entities/OpDate';

export type TAddOpDateOperationInput = void

export type TAddOpDateOperationResult = {
	opDate: TOpDate;
};

export type TEditOpDateOperationInput = {
	opDate: TOpDate;
}

export type TEditOpDateOperationResult = {
	opDate: TOpDate;
}

export function isOpDateEditing(input: TAddOpDateOperationInput|TEditOpDateOperationInput): input is TEditOpDateOperationInput {
	return !!input && !!(<TEditOpDateOperationInput>input).opDate;
}

