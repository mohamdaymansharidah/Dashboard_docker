import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Api } from '../../service/api';
import { Toast } from '../../service/toast';
import { Auth } from '../../service/auth';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { InputText } from 'primeng/inputtext';
import { ButtonDirective } from 'primeng/button';
import { LoginResponse } from '../../types/LoginResponse';
import { login } from '../../types/Login';

@Component({
  selector: 'app-login',
  imports: [InputText, ReactiveFormsModule, NgClass, RouterLink, ButtonDirective, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  form!: FormGroup;

  constructor(
    private router: Router,
    private api: Api,
    private fb: FormBuilder,
    private toast: Toast,
    private authService: Auth,
  ) {}
  ngOnInit(): void {
    this.initLoginForm();
  }
  initLoginForm() {
    this.form = this.fb.group({
      Username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(12)]],
    });
  }
  get Username() {
    return this.form.get('Username');
  }

  get password() {
    return this.form.get('password');
  }

  onLogin() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const formData = this.form.value;

    this.api.store<login, LoginResponse>('login', formData).subscribe({
      next: (response: LoginResponse) => {
        this.toast.success('Login successful');

        // Store auth token if returned from API

        this.authService.setToken(response.token);

        this.authService.setUserData({
          username: response.username,
          email: response.email,
        });

        // Handle login success - redirect based on new user status
        this.authService.handleRegistrationSuccess();
        console.log('Login response:', response);
      },
      error: (err) => {
        this.toast.error('Invalid email or password');
        console.log(err);
      },
    });
  }
}
