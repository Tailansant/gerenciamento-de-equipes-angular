import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesListPageComponent } from './pages/companies-list-page/companies-list-page.component';
import { CompanyFormPageComponent } from './pages/company-form-page/company-form-page.component';
import { AdminGuard } from 'src/app/core/guards/admin.guard'; 

const routes: Routes = [
    {
        path: 'companies',
        component: CompaniesListPageComponent,
        canActivate: [AdminGuard] // Protege a rota com o guard de administrador
    },
    {
        path: 'companies/new',
        component: CompanyFormPageComponent,
        canActivate: [AdminGuard]
    },
    {
        path: 'companies/edit/:id',
        component: CompanyFormPageComponent,
        canActivate: [AdminGuard]
    },
    {
        path: '', redirectTo: 'companies', pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }