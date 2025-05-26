import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'; // Adicione Routes para o forChild
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // FormsModule já estava, ReactiveFormsModule é útil para formulários
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu'; // Para os menus de administração
import { MatSelectModule } from '@angular/material/select'; // Para o seletor de idioma
import { MatTooltipModule } from '@angular/material/tooltip'; // Para tooltips (botões de login/logout)
import { MatInputModule } from '@angular/material/input'; // Para campos de input
import { MatFormFieldModule } from '@angular/material/form-field'; // Para form fields do Material
import { MatTabsModule } from '@angular/material/tabs'; // Se usado em algum lugar no Core
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Para o spinner de carregamento

// Módulos de internacionalização (angular-l10n)
import { L10nTranslationModule, L10nIntlModule } from 'angular-l10n';
import { l10nConfig } from './constants/l10n-config'; // Verifique o caminho

// Componentes do Core Module
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { UnauthorizedPageComponent } from './pages/unauthorized-page/unauthorized-page.component'; // Novo componente

// Interceptors (se estiverem neste CoreModule)
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';

// Diretivas
import { RoleHasPermissionDirective } from '../auth/directives/role-has-permission.directive'; // Verifique o caminho da diretiva

const routes: Routes = [
  { path: '', component: WelcomePageComponent },
  // Adicione outras rotas específicas do CoreModule aqui, se houver
  { path: 'unauthorized', component: UnauthorizedPageComponent }, // Rota para acesso não autorizado
  { path: '404', component: NotFoundPageComponent }, // Rota de página não encontrada
  // CUIDADO: Rotas catch-all (**) devem ser as últimas nas configurações de rota principais do AppRoutingModule
  // { path: '**', redirectTo: '/404' },
];

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NotFoundPageComponent,
    WelcomePageComponent,
    UnauthorizedPageComponent, // Declarar o componente de página não autorizada
    RoleHasPermissionDirective, // Declarar a diretiva de permissão
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes), // Usado para rotas específicas do CoreModule
    HttpClientModule, // Necessário para chamadas HTTP
    FormsModule, // Para formulários de template-driven
    ReactiveFormsModule, // Geralmente útil para formulários reativos, adicionei por boa prática
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule, // Novo Material
    MatSelectModule, // Novo Material
    MatTooltipModule, // Novo Material
    MatFormFieldModule, // Novo Material
    MatInputModule, // Novo Material
    MatTabsModule, // Novo Material (se for usado)
    MatProgressSpinnerModule, // Para o spinner de carregamento

    // Módulos de internacionalização
    L10nTranslationModule.forRoot(l10nConfig),
    L10nIntlModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NotFoundPageComponent,
    WelcomePageComponent,
    UnauthorizedPageComponent, // Exportar o componente
    RoleHasPermissionDirective, // Exportar a diretiva para uso em outros módulos
  ],
  providers: [
    // Provedores de interceptores HTTP
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
})
export class CoreModule {}