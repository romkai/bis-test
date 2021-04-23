function checkCRUD(permissions: string, op: 'C'|'R'|'U'|'D'): boolean {
	return permissions.indexOf(op) >= 0;
}

export default checkCRUD;
