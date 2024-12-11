import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserInfor } from 'src/app/models/user.infor';
import { BaseComponent } from 'src/app/pages/base/base.component';
import { ApiResponse } from 'src/app/responses/api.response';
import { UserDetailResponse } from 'src/app/responses/user/user.detail.response';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrls: ['./default-header.component.scss']
})
export class DefaultHeaderComponent extends BaseComponent implements OnInit {
  userInfor: UserInfor = {
    id: 0,
    image_url: '',
    username: ''
  }
  token: string = '';

  getUserInfor() {
    this.token = this.tokenService.getToken();
    this.userInfor.id = this.tokenService.getUserId();
    this.userInfor.image_url = this.tokenService.getImageUrl();
  }

  goToSignIn() {
    this.router.navigate(['/signin']);
  }

  goToSignUp() {
    this.router.navigate(['/signup']);
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.getUserInfor();
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  logout() {
    this.tokenService.removeToken();
    this.router.navigate(['/']);
  }
}

