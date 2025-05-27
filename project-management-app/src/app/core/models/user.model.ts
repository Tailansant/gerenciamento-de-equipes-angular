import { UserRole } from '../enums/user-role.enum';

export interface User {
login: any;
id: string;
name: string;
email: string;
role: UserRole;
companyId?: string;
}
