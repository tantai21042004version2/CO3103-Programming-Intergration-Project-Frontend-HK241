import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserService } from './services/user.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {
    constructor(private userService: UserService, private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const requiredRoles = next.data['roles'] as Array<string>;
        const userResponse = this.userService.getUserResponseTLS();

        debugger;
        if (userResponse && requiredRoles.includes(userResponse.role.name.toString())) {
            debugger;
            return true;
        } else {
            this.router.navigate(['/no-access']);
            return false;
        }
    }
}   