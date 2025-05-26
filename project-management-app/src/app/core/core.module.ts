import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { L10nTranslationModule, L10nIntlModule } from 'angular-l10n';
import { l10nConfig } from './constants/l10n-config';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { UnauthorizedPageComponent } from './pages/unauthorized-page/unauthorized-page.component';

import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';

import { RoleHasPermissionDirective } from '../auth/directives/role-has-permission.directive';

const routes: Routes = [
  { path: '', component: WelcomePageComponent },
  { path: 'unauthorized', component: UnauthorizedPageComponent },
  { path: '404', component: NotFoundPageComponent },
];

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NotFoundPageComponent,
    WelcomePageComponent,
    UnauthorizedPageComponent,
    RoleHasPermissionDirective,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatProgressSpinnerModule,

    L10nTranslationModule.forRoot(l10nConfig),
    L10nIntlModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NotFoundPageComponent,
    WelcomePageComponent,
    UnauthorizedPageComponent,
    RoleHasPermissionDirective,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
})
export class CoreModule {}