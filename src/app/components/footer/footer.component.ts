import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/pages/base/base.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent extends BaseComponent {
  goToSignUp() {
    this.router.navigate(['/signup']);
  }

  goToSignIn() {
    this.router.navigate(['/signin']);
  }
}
