import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesignersListPageComponent } from './pages/designers-list-page/designers-list-page.component';
import { DesignerFormPageComponent } from './pages/designer-form-page/designer-form-page.component';
import { TeamsListPageComponent } from './pages/teams-list-page/teams-list-page.component';
import { TeamFormPageComponent } from './pages/team-form-page/team-form-page.component';
import { CompanyGuard } from 'src/app/core/guards/company.guard'; 

const routes: Routes = [
    {
        path: 'designers',
        component: DesignersListPageComponent,
        canActivate: [CompanyGuard]
    },
    {
        path: 'designers/new',
        component: DesignerFormPageComponent,
        canActivate: [CompanyGuard]
    },
    {
        path: 'designers/edit/:id',
        component: DesignerFormPageComponent,
        canActivate: [CompanyGuard]
    },
    {
        path: 'teams',
        component: TeamsListPageComponent,
        canActivate: [CompanyGuard]
    },
    {
        path: 'teams/new',
        component: TeamFormPageComponent,
        canActivate: [CompanyGuard]
    },
    {
        path: 'teams/edit/:id',
        component: TeamFormPageComponent,
        canActivate: [CompanyGuard]
    },
    {
        path: '', redirectTo: 'designers', pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CompanyRoutingModule { }