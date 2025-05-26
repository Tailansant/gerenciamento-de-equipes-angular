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

import { NgxSmoothDnDModule } from 'ngx-smooth-dnd'; // Módulo de Drag and Drop
import { L10nTranslationModule, L10nIntlModule } from 'angular-l10n'; // Módulos de internacionalização

// Componentes Shared
import { ConfirmPopupComponent } from './components/confirm-popup/confirm-popup.component';
import { CreateBoardPopupComponent } from './components/create-board-popup/create-board-popup.component';
import { InfoPopupComponent } from './components/info-popup/info-popup.component'; // Componente InfoPopup
import { NotificationSnackBarComponent } from './components/notification-snack-bar/notification-snack-bar.component';
// Se o TableComponent e ConfirmationModalComponent existirem, adicione-os
import { TableComponent } from './components/table/table.component'; // Assumindo que este é o caminho correto
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component'; // Assumindo que este é o caminho correto


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
    MatCardModule, // Importar MatCardModule
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatSelectModule,
    MatCheckboxModule,
    MatChipsModule, // Importar MatChipsModule
    MatIconModule, // Importar MatIconModule
    NgxSmoothDnDModule, // Importar NgxSmoothDnDModule
    L10nTranslationModule, // Importar L10nTranslationModule
    L10nIntlModule, // Importar L10nIntlModule
  ],
  exports: [
    ReactiveFormsModule, // Exportar para uso em outros módulos
    FormsModule, // Exportar para uso em outros módulos
    MatDialogModule,
    MatCardModule, // Exportar MatCardModule
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatSelectModule,
    MatCheckboxModule,
    MatChipsModule, // Exportar MatChipsModule
    MatIconModule, // Exportar MatIconModule
    NgxSmoothDnDModule, // Exportar NgxSmoothDnDModule
    L10nTranslationModule, // Exportar L10nTranslationModule
    L10nIntlModule, // Exportar L10nIntlModule
    ConfirmPopupComponent,
    CreateBoardPopupComponent,
    InfoPopupComponent, // Exportar InfoPopupComponent
    NotificationSnackBarComponent,
    TableComponent, // Exportar TableComponent
    ConfirmationModalComponent, // Exportar ConfirmationModalComponent
  ]
})
export class SharedModule { }