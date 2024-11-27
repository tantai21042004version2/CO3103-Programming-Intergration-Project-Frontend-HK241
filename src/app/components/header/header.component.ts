import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/pages/base/base.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends BaseComponent {
  goToSignIn() {
    this.router.navigate(['/signin']);
  }

  goToSignUp() {
    this.router.navigate(['/signup']);
  }
}
