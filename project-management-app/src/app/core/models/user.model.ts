import { UserRole } from '../enums/user-role.enum';

export interface User {
id: string;
name: string;
email: string;
role: UserRole; // Definindo os papéis
companyId?: string; // Para usuários do tipo DESIGNER, qual empresa ele pertence
}