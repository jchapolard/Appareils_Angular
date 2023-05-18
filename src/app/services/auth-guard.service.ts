import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable} from 'rxjs';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

// Un service est, par défaut, injectable ailleurs.
// Si vous avez besoin des éléments d'un service dans un autre, 
// il vous faut le décorateur  @Injectable().
// Service qui permet de vérifier une authentification ou une identité.
@Injectable()
export class AuthGuard implements CanActivate {
	
	// Pour injecter un service dans un autre service, 
	// utiliser le décorateur  @Injectable
	constructor(private authService: AuthService,
		private router: Router) { }
	 
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): 
			Observable<boolean> | Promise<boolean> | boolean { 
			
		if(this.authService.isAuth) {
			// Accès à la route protégée
			return true;
		} else {
			// Redirection de l'utilisateur vers la page d'authentification
			this.router.navigate(['/auth']);
			return false; // Ajout de cette ligne pour retourner false lorsque l'accès est refusé
		}
	
	}
		
		
}