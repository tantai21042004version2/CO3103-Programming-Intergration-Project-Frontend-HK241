import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/pages/base/base.component';
import { ApiResponse } from 'src/app/responses/api.response';
import { UserDetailResponse } from 'src/app/responses/user/user.detail.response';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends BaseComponent {
  userResponse: UserDetailResponse | null = null;

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
    if (this.tokenService.getToken() !== null) {
      this.userService.getUserDetail(this.tokenService.getToken()).subscribe({
        next: (apiResponse: ApiResponse) => {
          this.userResponse = apiResponse.data;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        }
      });
    }
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  logout() {
    this.tokenService.removeToken();
    window.location.reload();
  }
}
