import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StorageService } from '../shared/services/storage.service';



@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private storage: StorageService,
        private router: Router
        ) {
        
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        console.log('ENTREI NO AUTHGUARD')
        return  this.storage.isUsuarioLogado()
            .pipe(tap(usuario => {
                if(!usuario) this.router.navigate(['/login'])
            }))
        
    }

}