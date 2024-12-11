import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/pages/base/base.component';
import { User } from 'src/app/models/user';
import { UserInfor } from 'src/app/models/user.infor';


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent extends BaseComponent implements OnInit {
  token: string = '';
  userInfor: UserInfor = {
    id: 0,
    image_url: '',
    username: ''
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

  goToForArtists() {
    this.router.navigate(['artist/tracks']);
  }

  goToForAdmin() {
    this.router.navigate(['admin/dashboard']);
  }

  getUserInfor() {
    this.token = this.tokenService.getToken();
    this.userInfor.id = this.tokenService.getUserId();
    this.userInfor.image_url = this.tokenService.getImageUrl();
  }

  ngOnInit(): void {
    this.getUserInfor();
    console.log(this.userInfor);
  }

  goToProfile() {
    this.router.navigate(['/user/profile']);
  }

  logout() {
    this.tokenService.logout();
    this.router.navigate(['/']);
  }
}
