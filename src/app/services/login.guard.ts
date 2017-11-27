import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';


@Injectable()
export class LoginGuard implements CanActivate {
    constructor(private authServise: AuthService, private router: Router) {
    }

    canActivate(): boolean{
        let isLoggedIn = this.authServise.isAuth();
        if (!isLoggedIn) {
            this.router.navigate(['/login']);
        }
        return isLoggedIn;
    }
}