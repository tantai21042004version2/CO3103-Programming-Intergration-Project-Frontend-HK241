import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/pages/base/base.component';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent extends BaseComponent {
  navigateToUpload(): void {
    this.router.navigate(['/artist/tracks']);
  }
}
