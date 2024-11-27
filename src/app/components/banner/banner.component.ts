import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/pages/base/base.component';
import { ApiResponse } from 'src/app/responses/api.response';
import { UserDetailResponse } from 'src/app/responses/user.detail.response';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent extends BaseComponent implements OnInit {
  userResponse: UserDetailResponse | null = null;

  goToSignIn() {
    this.router.navigate(['/signin']);
  }

  goToSignUp() {
    this.router.navigate(['/signup']);
  }

  ngOnInit(): void {
    debugger;

    this.userService.getUserDetail(this.tokenService.getToken()).subscribe({
      next: (apiResponse: ApiResponse) => {
        this.userResponse = apiResponse.data;
      },
      error: (error: HttpErrorResponse) => {
        debugger;
        console.log(error);
      }
    });
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  logout() {
    this.tokenService.removeToken();
    window.location.reload();
  }
}
