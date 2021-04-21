import { TOpEntry } from '@/entities/OpEntry';

export type TAddOpEntryOperationInput = void;

export type TAddOpEntryOperationResult = {
	opEntry: TOpEntry;
};

export type TEditOpEntryOperationInput = {
	opEntry: TOpEntry;
}

export type TEditOpEntryOperationResult = {
	opEntry: TOpEntry;
}

export function isOpEntryEditing(input: TAddOpEntryOperationInput|TEditOpEntryOperationInput): input is TEditOpEntryOperationInput {
	return !!input && !!(<TEditOpEntryOperationInput>input).opEntry;
}

