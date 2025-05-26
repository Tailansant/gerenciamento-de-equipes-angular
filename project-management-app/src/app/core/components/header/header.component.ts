import { Component, OnDestroy, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router'; // NavigationEnd para escutar mudanças de rota
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators'; // Operador map para Observables
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

// Imports para internacionalização (angular-l10n)
import {
  L10N_CONFIG,
  L10nConfig,
  L10N_LOCALE,
  L10nLocale,
  L10nTranslationService,
} from 'angular-l10n';
import { L10nSchema } from 'angular-l10n/lib/models/types';
import { Languages } from '../../constants/l10n-config'; 
import { i18nAsset } from '../../constants/i18n'; 

// Imports de ações e seletores NgRx
import { logout, updateAuthStateFromLocalStorage } from 'src/app/store/actions/auth.actions'; 
import { startSearchState } from 'src/app/store/actions/search.actions'; 
import * as AuthSelectors from 'src/app/store/selectors/auth.selectors';
import { getLoadStatus, getMessage, setMessage } from 'src/app/store/selectors/notifications.selectors'; 

// Componentes Shared
import { NotificationSnackBarComponent } from 'src/app/shared/components/notification-snack-bar/notification-snack-bar.component';o snack-bar

const SNACK_BAR_TIME_DELAY_MS = 1500;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  // Propriedades do NgRx (isLoggedIn$, userRole$)
  isLoggedIn$!: Observable<boolean>;
  userRole$!: Observable<string | null>; 

  // Propriedades de estado do componente
  isLogged = false;
  isLoad = false;
  isBoardsRoute = false;
  isSearchRoute = false;
  userId = ''; 

  // Propriedades de internacionalização
  lang: string | null = this.translation.getLocale().language.toUpperCase();
  schema: L10nSchema[] = this.l10nConfig.schema;
  EN = this.schema[0].locale;
  RU = this.schema[1].locale;

  // ViewChild para elementos do DOM
  @ViewChild('langs') langs!: ElementRef;
  @ViewChild('searchInput') searchValue!: ElementRef;

  // Gerenciamento de subscriptions
  subscription = new Subscription();

  constructor(
    private store: Store,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    @Inject(L10N_LOCALE) public locale: L10nLocale,
    @Inject(L10N_CONFIG) private l10nConfig: L10nConfig,
    private translation: L10nTranslationService,
    private router: Router,
  ) {}

  ngOnInit() {
    // Dispatch para atualizar estado de autenticação do localStorage (boa prática inicial)
    this.store.dispatch(updateAuthStateFromLocalStorage());

    // Observar o status de autenticação e o papel do usuário
    this.isLoggedIn$ = this.store.select(AuthSelectors.selectIsAuthenticated);
    this.userRole$ = this.store.select(AuthSelectors.selectUserRole);

    const subIsLogged = this.isLoggedIn$.subscribe((logged) => {
        this.isLogged = logged;
    });
    this.subscription.add(subIsLogged);

    // Escutar eventos de navegação para atualizar rotas
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const { url } = event;
        this.isBoardsRoute = url === '/boards';
        this.isSearchRoute = url.startsWith('/boards/search'); 
      }
    });

    // Subscrição para o ID do usuário (para pesquisa, etc.)
    const subUserId = this.store.select(AuthSelectors.getUserId).subscribe((id) => {
      if (id) {
        this.userId = id;
      } else {
        this.userId = '';
      }
    });
    this.subscription.add(subUserId);

    // Subscrição para mensagens de notificação (snack bar)
    const subMsg = this.store.select(getMessage).subscribe((msg) => {
      if (msg) {
        this.snackBar.openFromComponent(NotificationSnackBarComponent, {
          data: msg,
          duration: SNACK_BAR_TIME_DELAY_MS,
        });
        this.store.dispatch(setMessage({ msg: null }));
      }
    });
    this.subscription.add(subMsg);

    // Subscrição para o status de carregamento
    const subLoad = this.store.select(getLoadStatus).subscribe((status) => {
      this.isLoad = status;
    });
    this.subscription.add(subLoad);

    // Lógica de internacionalização (configuração inicial e carregamento)
    if (localStorage.getItem('lang')) {
      this.lang = localStorage.getItem('lang');
      if (this.lang === Languages.english) this.translation.setLocale(this.EN);
      if (this.lang === Languages.russian) this.translation.setLocale(this.RU);
    } else {
      localStorage.setItem('lang', this.lang!);
    }
    this.translation.addProviders([{ name: 'lazy', asset: i18nAsset }]);
    this.translation.loadTranslation([{ name: 'lazy', asset: i18nAsset }]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe(); 
  }

  // Método de logout (chamado pelo template)
  onLogout(): void { 
    this.store.dispatch(logout()); 
    this.router.navigate(['/auth/sign-in']); 
  }

  // Método para mudar o idioma
  setLocale(): void {
    const selectedLang = this.langs.nativeElement.value;
    if (selectedLang === Languages.english) {
      this.translation.setLocale(this.EN);
      this.lang = Languages.english;
    } else if (selectedLang === Languages.russian) { 
      this.translation.setLocale(this.RU);
      this.lang = Languages.russian;
    }
    localStorage.setItem('lang', this.lang!);
  }

  // Método para iniciar a pesquisa
  search() {
    this.store.dispatch(
      startSearchState({ userId: this.userId, value: this.searchValue.nativeElement.value }),
    );
  }
}