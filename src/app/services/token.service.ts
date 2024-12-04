import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
    providedIn: 'root',
})
export class TokenService {
    private readonly TOKEN_KEY = 'access_token';
    private jwtHelperService = new JwtHelperService();
    localStorage?: Storage;

    constructor(@Inject(DOCUMENT) private document: Document) {
        this.localStorage = document.defaultView?.localStorage;
    }

    getToken(): string { return this.localStorage?.getItem(this.TOKEN_KEY) ?? ''; }

    setToken(token: string): void { this.localStorage?.setItem(this.TOKEN_KEY, token); }

    getUserId(): number {
        let token = this.getToken();
        if (!token) {
            return 0;
        }
        let userObject = this.jwtHelperService.decodeToken(token);
        return 'userId' in userObject ? parseInt(userObject['userId']) : 0;
    }

    getImageUrl(): string {
        let token = this.getToken();
        if (!token) {
            return '';
        }
        let userObject = this.jwtHelperService.decodeToken(token);
        return 'image_url' in userObject ? userObject['image_url'] : '';
    }

    removeToken(): void {
        this.localStorage?.removeItem(this.TOKEN_KEY);
    }


}