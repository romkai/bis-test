export type TOpDate = {
	OpDate: string;
	OpStatus: string;
}

export function isOpDate(obj: unknown): obj is TOpDate {
	return !!(obj as TOpDate).OpDate;
}
