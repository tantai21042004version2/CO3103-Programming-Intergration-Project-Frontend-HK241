import { Component, OnInit, ViewChild } from '@angular/core';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { BaseComponent } from '../base/base.component';
import { NgForm } from '@angular/forms';
import { ApiResponse } from 'src/app/responses/api.response';

@Component({
  selector: 'app-user-reset-password',
  templateUrl: './user-reset-password.component.html',
  styleUrls: ['./user-reset-password.component.scss']
})
export class UserResetPasswordComponent extends BaseComponent implements OnInit {
  @ViewChild('resetPasswordForm') resetPasswordForm!: NgForm;

  role: Role = { id: 0, name: '' };
  userDetail: User = {
    id: 0,
    email: '',
    username: '',
    artist_name: '',
    password: '',
    country: '',
    date_of_birth: '',
    role: this.role,
    biography: '',
    image_url: '',
    created_at: '',
    updated_at: ''
  };
  token: string = '';

  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor() {
    super();
    this.getUserInfor();
  }

  getUserInfor() {
    this.token = this.tokenService.getToken();
    this.userDetail.id = this.tokenService.getUserId();
    this.userDetail.image_url = this.tokenService.getImageUrl();
  }

  ngOnInit(): void { }

  resetPassword() {
    if (this.newPassword !== this.confirmPassword) {
      return;
    }

    this.userService.resetPassword({
      current_password: this.oldPassword,
      new_password: this.newPassword,
      retype_new_password: this.confirmPassword
    }, this.token).subscribe(
      (response: ApiResponse) => {
        console.log(response);
        if (response.status === "OK") {
          this.tokenService.removeToken();
          this.router.navigate(['/signin']);
        }
      }
    );
  }
}
