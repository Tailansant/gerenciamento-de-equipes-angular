import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyRoutingModule } from './company-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module'; 
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

import { DesignersListPageComponent } from './pages/designers-list-page/designers-list-page.component';
import { DesignerFormPageComponent } from './pages/designer-form-page/designer-form-page.component';
import { TeamsListPageComponent } from './pages/teams-list-page/teams-list-page.component';
import { TeamFormPageComponent } from './pages/team-form-page/team-form-page.component';

@NgModule({
    declarations: [
        DesignersListPageComponent,
        DesignerFormPageComponent,
        TeamsListPageComponent,
        TeamFormPageComponent
    ],
    imports: [
        CommonModule,
        CompanyRoutingModule, 
        ReactiveFormsModule,
        SharedModule, 
        MatTableModule,
        MatIconModule
    ]
})
export class CompanyModule { }