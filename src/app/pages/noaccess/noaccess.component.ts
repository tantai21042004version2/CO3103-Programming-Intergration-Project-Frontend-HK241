import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-noaccess',
  templateUrl: './noaccess.component.html',
  styleUrls: ['./noaccess.component.scss']
})
export class NoaccessComponent extends BaseComponent {
  goHome() {
    this.router.navigate(['/home']);
  }
}
