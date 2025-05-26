import { Directive, Input, TemplateRef, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as AuthSelectors from '../../store/selectors/auth.selectors';
import { UserRole } from '../../core/enums/user-role.enum'; // Importar o enum de papéis

@Directive({
selector: '[appRoleHasPermission]'
})
export class RoleHasPermissionDirective implements OnInit, OnDestroy {
@Input('appRoleHasPermission') requiredRole!: UserRole;
private sub: Subscription | null = null;

constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private store: Store
) { }

ngOnInit(): void {
    this.sub = this.store.select(AuthSelectors.selectUserRole).subscribe(userRole => {
    this.updateView(userRole);
    });
}

private updateView(userRole: UserRole | null): void {
    this.viewContainer.clear();
    if (userRole && this.checkPermission(userRole, this.requiredRole)) {
    this.viewContainer.createEmbeddedView(this.templateRef);
    }
}

private checkPermission(currentUserRole: UserRole, requiredRole: UserRole): boolean {
    // Lógica de permissão:
    // Admin pode fazer tudo
    // Empresa pode fazer o que é de Empresa
    // Projetista pode fazer o que é de Projetista
    if (currentUserRole === UserRole.ADMIN) {
    return true;
    }
    return currentUserRole === requiredRole;
}

ngOnDestroy(): void {
    if (this.sub) {
    this.sub.unsubscribe();
    }
}
}