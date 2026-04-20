import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {TokenService} from './token-service';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private readonly KEYS = {
    USER_DATA:        'user_data',
    HAS_SEEN_WELCOME: 'has_seen_welcome',
  };
  constructor(private router: Router,private tokenService: TokenService) {}

  setToken(token: string) {
    this.tokenService.setToken(token);
  }

  isAuthenticated(): boolean {
    return this.tokenService.hasToken();
  }

  setUserData(userData: any): void {
    localStorage.setItem(this.KEYS.USER_DATA, JSON.stringify(userData));
  }
  isNewUser(): boolean {
    return localStorage.getItem(this.KEYS.HAS_SEEN_WELCOME) !== 'true';
  }

  handleLoginSuccess(): void {
    this.isNewUser()
      ? this.router.navigate(['/welcome'])
      : this.router.navigate(['/dashboard']);
  }

  resetNewUserStatus(): void {
    localStorage.removeItem(this.KEYS.HAS_SEEN_WELCOME);
  }
  handleRegistrationSuccess(): void {
    this.resetNewUserStatus();
    this.router.navigate(['/welcome']);
  }

  // --- Logout ---
  logout(): void {
    this.tokenService.clearAllCookies();
    localStorage.removeItem(this.KEYS.USER_DATA);
    this.router.navigate(['/auth/login']);
  }
}
