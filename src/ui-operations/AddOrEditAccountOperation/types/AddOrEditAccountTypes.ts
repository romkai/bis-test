import { TAccount } from '@/blogic/entities/Account';

export type TAddAccountOperationInput = void

export type TAddAccountOperationResult = {
	account: TAccount;
};

export type TEditAccountOperationInput = {
	account: TAccount;
}

export type TEditAccountOperationResult = {
	account: TAccount;
}

export function isAccountEditing(input: TAddAccountOperationInput|TEditAccountOperationInput): input is TEditAccountOperationInput {
	return !!input && !!(<TEditAccountOperationInput>input).account;
}

