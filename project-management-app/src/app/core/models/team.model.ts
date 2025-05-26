export interface Team {
id: string;
name: string;
description: string;
companyId: string; // ID da empresa à qual a equipe pertence
designerIds: string[]; // IDs dos projetistas que compõem a equipe
}