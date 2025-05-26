import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // FormsModule e ReactiveFormsModule
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card'; // MatCardModule para cards
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar'; // Para indicadores de carregamento
import { MatSelectModule } from '@angular/material/select'; // Para seletores
import { MatCheckboxModule } from '@angular/material/checkbox'; // Para checkboxes
import { MatChipsModule } from '@angular/material/chips'; // MatChipsModule para chips
import { MatIconModule } from '@angular/material/icon'; // MatIconModule para ícones

import { NgxSmoothDnDModule } from 'ngx-smooth-dnd';
import { L10nTranslationModule, L10nIntlModule } from 'angular-l10n';

// Componentes Shared
import { ConfirmPopupComponent } from './components/confirm-popup/confirm-popup.component';
import { CreateBoardPopupComponent } from './components/create-board-popup/create-board-popup.component';
import { InfoPopupComponent } from './components/info-popup/info-popup.component'; // Componente InfoPopup
import { NotificationSnackBarComponent } from './components/notification-snack-bar/notification-snack-bar.component';
import { TableComponent } from './components/table/table.component'; 
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component'; correto


@NgModule({
  declarations: [
    ConfirmPopupComponent,
    CreateBoardPopupComponent,
    InfoPopupComponent, // Declarar InfoPopupComponent
    NotificationSnackBarComponent,
    TableComponent, // Declarar TableComponent
    ConfirmationModalComponent, // Declarar ConfirmationModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatCardModule, 
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatSelectModule,
    MatCheckboxModule,
    MatChipsModule, 
    MatIconModule, 
    NgxSmoothDnDModule, 
    L10nTranslationModule, 
    L10nIntlModule,
  ],
  exports: [
    ReactiveFormsModule, 
    FormsModule, 
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatSelectModule,
    MatCheckboxModule,
    MatChipsModule, 
    MatIconModule, 
    NgxSmoothDnDModule, 
    L10nTranslationModule,
    L10nIntlModule, 
    ConfirmPopupComponent,
    CreateBoardPopupComponent,
    InfoPopupComponent,
    NotificationSnackBarComponent,
    TableComponent, 
    ConfirmationModalComponent,
  ]
})
export class SharedModule { }