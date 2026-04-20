import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly TOKEN_KEY = 'token';

  constructor(private cookieService: CookieService) {}

  setToken(token: string): void {
    this.cookieService.set(this.TOKEN_KEY, token, {
      path: '/', // for all routes
      // secure: true, for https
      sameSite: 'Strict', // secure cookie level
      expires: 7, // time in days
    });
  }

  getToken(): string | null {
    return this.cookieService.get(this.TOKEN_KEY) ?? "not set";
  }

  hasToken(): boolean {
    return !!this.getToken();
  }

  clearToken(): void {
    this.cookieService.delete(this.TOKEN_KEY);
  }

  clearAllCookies(): void {
    this.cookieService.deleteAll('/');
  }
}
