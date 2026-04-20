import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../../service/auth';
import { Toast } from '../../../service/toast';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  constructor(
    private authService: Auth,
    private router: Router,
    private Tost: Toast,
  ) {}

  changePassword() {
    this.router.navigate(['dashboard/forget-password']);
  }
  dashboardGo() {
    this.router.navigate(['dashboard']);
  }
  logout() {
    this.Tost.success('Logged out successfully');
    this.authService.logout();
  }
}
