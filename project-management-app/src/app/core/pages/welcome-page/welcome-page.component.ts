import { Component, Inject } from '@angular/core';
import { L10nLocale, L10N_LOCALE } from 'angular-l10n';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent {
  constructor(@Inject(L10N_LOCALE) public locale: L10nLocale) {}
}
