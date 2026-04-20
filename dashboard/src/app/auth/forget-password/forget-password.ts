import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Api } from '../../service/api';
import { Toast } from '../../service/toast';
import { NgClass, NgIf } from '@angular/common';
import { ButtonDirective } from 'primeng/button';
import { InputText } from 'primeng/inputtext';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule, ButtonDirective, InputText, NgIf],
  templateUrl: './forget-password.html',
  styleUrl: './forget-password.css',
})
export class ForgetPassword {
  form!: FormGroup;
  emailSent = false;

  constructor(
    private router: Router,
    private api: Api,
    private fb: FormBuilder,
    private toast: Toast,
  ) {}

  ngOnInit(): void {
    this.initForgotPasswordForm();
  }

  initForgotPasswordForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get email() {
    return this.form.get('email');
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData = this.form.value;

    this.api.store('forgot-password', formData).subscribe({
      next: (response: any) => {
        this.toast.success('Password reset email sent successfully');
        this.router.navigate(['dashboard/reset-password'], { state: { email: formData.email } });
        this.emailSent = true;
      },
      error: (err) => {
        if (err.error?.length) {
          this.toast.error(err.error[0].description);
        } else {
          this.toast.error('Failed to send password reset email');
        }
      },
    });
  }

  getErrorMessage(field: any): string {
    if (field?.errors) {
      if (field.errors['required']) {
        return 'This field is required';
      }
      if (field.errors['email']) {
        return 'Please enter a valid email address';
      }
    }
    return '';
  }

  goBack() {
    this.router.navigate(['auth/login']);
  }
}
