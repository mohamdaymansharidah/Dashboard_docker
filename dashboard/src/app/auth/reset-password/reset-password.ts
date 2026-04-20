import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Api } from '../../service/api';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Toast } from '../../service/toast';
import { Auth } from '../../service/auth';
import { confirmPasswordValidator } from '../Vaildtors/confirm-password';
import { CommonModule, NgClass } from '@angular/common';
import { ButtonDirective } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  imports: [ButtonDirective, InputText, ReactiveFormsModule, NgClass, CommonModule],

  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword {
  form!: FormGroup;

  constructor(
    private router: Router,
    private api: Api,
    private fb: FormBuilder,
    private toast: Toast,
    private authService: Auth,
  ) {}

  ngOnInit(): void {
    this.FormRegister();
  }
  FormRegister() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  onSubmit() {
    if (this.form.invalid || this.email?.errors) {
      this.form.markAllAsTouched();
      return;
    }

    const formData = this.form.value;

    this.api.store('reset-password', formData).subscribe({
      next: (response: any) => {
        this.toast.success('Account created successfully');

        // Store auth token if returned from API
        this.authService.setToken(response.token);
        //for user data (username and email in local storeage) :) or :(

        this.authService.setUserData({
          username: response.username,
          email: response.email,
        });
        // Handle registration success - redirect to welcome page
      },
      error: (err) => {
        if (err.error?.length) {
          this.toast.error(err.error[0].description);
        } else {
          //for email validation i currently work on it if i dont forget
          this.toast.error('Something went wrong');
        }
      },
    });
  }
}
