import { L10nConfig } from 'angular-l10n';

import { i18nAsset } from './i18n';

export const l10nConfig: L10nConfig = {
  format: 'language',
  providers: [{ name: 'app', asset: i18nAsset }],
  fallback: true,
  cache: true,
  keySeparator: '.',
  defaultRouting: true,
  defaultLocale: {
    language: 'en',
  },
  schema: [
    {
      locale: {
        language: 'en',
      },
      dir: 'ltr',
      text: 'English',
    },
    {
      locale: {
        language: 'ru',
      },
      dir: 'ltr',
      text: 'Russia',
    },
  ],
};

export enum Languages {
  english = 'EN',
  russian = 'RU',
}
