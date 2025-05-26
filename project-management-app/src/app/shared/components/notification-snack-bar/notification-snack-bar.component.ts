import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notification-snack-bar',
  templateUrl: './notification-snack-bar.component.html',
  styleUrls: ['./notification-snack-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NotificationSnackBarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) {}
}
