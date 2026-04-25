import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { confirmPasswordValidator } from '../Vaildtors/confirm-password';
import { Router, RouterLink } from '@angular/router';
import { Toast } from '../../service/toast';
import { Api } from '../../service/api';
import { Auth } from '../../service/auth';
import { ButtonDirective, Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { CommonModule, NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, NgClass, CommonModule, ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
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
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    }, {
      validators: confirmPasswordValidator
});
  }
  get name() {
    return this.form.get('name');
  }

  get email() {
    return this.form.get('email');
  }


  get password() {
    return this.form.get('password');
  }

  get confirmPassword() {
    return this.form.get('confirmPassword');
  }



  onRegister() {
    if (this.form.invalid || this.email?.errors) {
      this.form.markAllAsTouched();
      return;
    }

    const formData = this.form.value;

    this.api.store('register', formData).subscribe({
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
        this.authService.handleRegistrationSuccess();
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
