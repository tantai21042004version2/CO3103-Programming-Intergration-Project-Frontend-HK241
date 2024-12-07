import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Role } from 'src/app/models/role';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiResponse } from 'src/app/responses/api.response';
import { NgForm } from '@angular/forms';
import { UserResponse } from 'src/app/responses/user/user.response';
import { LoginDTO } from 'src/app/dtos/login.dto';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent extends BaseComponent implements OnInit {
  @ViewChild('loginForm') loginForm!: NgForm;

  email: string;
  username: string;
  password: string;
  showPassword: boolean;
  validationMessage: string = '';

  roles: Role[] = [];
  selectedRole: Role | undefined;

  userResponse?: UserResponse;

  constructor() {
    super();
    this.email = '';
    this.username = '';
    this.password = '';
    this.showPassword = false;
  }


  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    const passwordInput = document.getElementById('login-password') as HTMLInputElement;
    passwordInput.type = this.showPassword ? 'text' : 'password';
  }


  ngOnInit(): void {
    this.roleService.getAllRole().subscribe({
      next: (apiResponse: ApiResponse) => {
        const roles = apiResponse.data;
        this.roles = roles;
        this.selectedRole = roles.length > 0 ? roles[0] : undefined;
      },
      error: (error: HttpErrorResponse) => {
        console.error(error?.error?.message ?? '');
      }
    });
  }

  validateInformation(): LoginDTO {
    const loginDTO: LoginDTO = {
      email: this.email,
      username: this.username,
      password: this.password,
      role_id: this.selectedRole?.id ?? 2
    }

    if (!this.email.includes('@')) {
      loginDTO.username = this.email;
      loginDTO.email = '';
    }
    return loginDTO;
  }

  getUserDetail(token: string): void {
    this.userService.getUserDetail(token).subscribe({
      next: (apiResponse2: ApiResponse) => {
        this.userResponse = {
          ...apiResponse2.data,
          date_of_birth: new Date(apiResponse2.data.date_of_birth),
        };
        this.userService.saveUserResponseTLS(this.userResponse);

        if (this.userResponse?.role.name === 'ADMIN') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      error: (error: HttpErrorResponse) => {
        this.validationMessage = 'Login failed. Please check your credentials.';
        console.error(error?.error?.message ?? '');
      }
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.validationMessage = 'Please enter valid email and password.';
      return;
    }

    if (!this.email || !this.password) {
      this.validationMessage = 'Please enter both email and password.';
      return;
    }

    if (!this.selectedRole) {
      this.validationMessage = 'Please select a role.';
      return;
    }

    const loginDTO = this.validateInformation();
    this.userService.login(loginDTO).subscribe({
      next: (apiResponse: ApiResponse) => {
        const { token } = apiResponse.data;
        this.tokenService.setToken(token);

        this.getUserDetail(token);
        debugger;
      },
      error: (error: HttpErrorResponse) => {
        this.validationMessage = 'Login failed. Please check your credentials.';
        console.error(error?.error?.message ?? '');
      }
    });
  }

  navigateToSignUp() {
    this.router.navigate(['/signup']);
  }
}