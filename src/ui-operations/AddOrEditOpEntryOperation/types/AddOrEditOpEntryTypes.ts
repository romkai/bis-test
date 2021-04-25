import { TOpEntry } from '@/blogic/Entities/OpEntry';

export type TAddOpEntryOperationInput = {
	opEntry: Partial<TOpEntry>;
};

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
	return (<TEditOpEntryOperationInput>input).opEntry.Id > 0;
}

