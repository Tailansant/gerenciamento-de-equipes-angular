import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module'; 
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module'; 
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon'; 

import { CompaniesListPageComponent } from './pages/companies-list-page/companies-list-page.component';
import { CompanyFormPageComponent } from './pages/company-form-page/company-form-page.component';

@NgModule({
    declarations: [
        CompaniesListPageComponent,
        CompanyFormPageComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule, 
        ReactiveFormsModule,
        SharedModule, // Importe o SharedModule para ter acesso aos componentes e módulos do Material
        MatTableModule,
        MatIconModule
    ]
})
export class AdminModule { }