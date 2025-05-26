import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { BoardModule } from './board/board.module';
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin/admin.module'; 
import { CompanyModule } from './company/company.module';

// Importar todos os reducers
import { authReducer } from './store/reducers/auth.reducer';
import { boardReducer } from './store/reducers/board.reducer';
import { boardsReducer } from './store/reducers/boards.reducer';
import { notificationsReducer } from './store/reducers/notifications.reducer';
import { searchReducer } from './store/reducers/search.reducer';
import { companiesReducer } from './store/reducers/companies.reducer'; 
import { designersReducer } from './store/reducers/designers.reducer'; 
import { teamsReducer } from './store/reducers/teams.reducer';

// Importar todos os effects
import { AuthEffects } from './store/effects/auth.effects';
import { BoardEffects } from './store/effects/board.effects';
import { BoardsEffects } from './store/effects/boards.effects';
import { SearchEffects } from './store/effects/search.effects';
import { CompaniesEffects } from './store/effects/companies.effects'; 
import { DesignersEffects } from './store/effects/designers.effects'; 
import { TeamsEffects } from './store/effects/teams.effects';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatDialogModule,
    MatSnackBarModule,
    CoreModule,
    AuthModule,
    BoardModule,
    SharedModule,
    AdminModule, 
    CompanyModule, 
    StoreModule.forRoot({
      auth: authReducer,
      board: boardReducer,
      boards: boardsReducer,
      notifications: notificationsReducer,
      search: searchReducer,
      companies: companiesReducer, 
      designers: designersReducer,
      teams: teamsReducer,      
    }),
    EffectsModule.forRoot([
      AuthEffects,
      BoardEffects,
      BoardsEffects,
      SearchEffects,
      CompaniesEffects, 
      DesignersEffects, 
      TeamsEffects,      
    ]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }