const checkPermissions = (permissions: string, op: 'C'|'R'|'U'|'D'): boolean => permissions.indexOf(op) >= 0;

export default checkPermissions;
