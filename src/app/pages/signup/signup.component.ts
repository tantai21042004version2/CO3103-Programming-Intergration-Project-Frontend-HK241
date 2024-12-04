import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterDTO } from 'src/app/dtos/register.dto';
import { BaseComponent } from '../base/base.component';
import { ApiResponse } from 'src/app/responses/api.response';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent extends BaseComponent {
  @ViewChild('registerForm') registerForm!: NgForm;

  email: string;
  username: string;
  password: string;
  retypePassword: string;
  country: string;
  dateOfBirth: Date;
  roleId: number;
  errorMessage: string = '';

  constructor() {
    super();

    this.email = '';
    this.username = '';
    this.password = '';
    this.retypePassword = '';
    this.country = '';
    this.dateOfBirth = new Date();
    this.dateOfBirth.setFullYear(this.dateOfBirth.getFullYear() - 18);
    this.roleId = 2;
  }

  checkPasswordsMatch() {
    if (this.password !== this.retypePassword) {
      this.registerForm.form.controls['retypePassword']
        .setErrors({ 'passwordMismatch': true });
    } else {
      this.registerForm.form.controls['retypePassword'].setErrors(null);
    }
  }

  checkAge() {
    if (this.dateOfBirth) {
      const today = new Date();
      const birthDate = new Date(this.dateOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      if (age < 18) {
        this.registerForm.form.controls['dateOfBirth'].setErrors({ 'invalidAge': true });
      } else {
        this.registerForm.form.controls['dateOfBirth'].setErrors(null);
      }
    }
  }

  validateInformation(): void {
    if (this.username === '' || this.email === '') {
      this.errorMessage = 'You must enter both your username and email.';
    }
    else if (this.password === '' || this.retypePassword === '') {
      this.errorMessage = 'You must enter both your password and retype password.';
    }
    else if (this.password !== this.retypePassword) {
      this.errorMessage = 'Your password and retype password do not match.';
    }
    else if (this.dateOfBirth === null) {
      this.errorMessage = 'You must enter your date of birth.';
    } else if (this.country === '') {
      this.errorMessage = 'You must enter your country.';
    } else {
      this.errorMessage = '';
    }
  }

  register() {
    if (this.registerForm.invalid) {
      this.validateInformation();
    }

    const registerDTO: RegisterDTO = {
      email: this.email,
      username: this.username,
      password: this.password,
      retype_password: this.retypePassword,
      country: this.country,
      date_of_birth: this.dateOfBirth,
      role_id: 2
    }

    this.userService.register(registerDTO).subscribe({
      next: (apiResponse: ApiResponse) => {
        if (apiResponse.status === 'CREATED') {
          const confirmation = window
            .confirm('Đăng ký thành công, mời bạn đăng nhập. Bấm "OK" để chuyển đến trang đăng nhập.');
          if (confirmation) {
            this.router.navigate(['/signin']);
          }
        }
      },
      complete: () => {
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = error.error.message;
      }
    });
  }

  navigateToSignin() {
    this.router.navigate(['/signin']);
  }
}
