import { Component, OnInit } from '@angular/core';
import { UserInfor } from 'src/app/models/user.infor';
import { BaseComponent } from 'src/app/pages/base/base.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent extends BaseComponent implements OnInit {
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

  ngOnInit(): void {
    this.getUserInfor();
  }

  goToSignUp() {
    this.router.navigate(['/signup']);
  }

  goToSignIn() {
    this.router.navigate(['/signin']);
  }
}
