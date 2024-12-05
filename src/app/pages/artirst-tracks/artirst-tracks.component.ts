import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-artirst-tracks',
  templateUrl: './artirst-tracks.component.html',
  styleUrls: ['./artirst-tracks.component.scss']
})
export class ArtirstTracksComponent extends BaseComponent {

  navigateToAddMusic() {
    this.router.navigate(['/artist/tracks/upload-track-cloudinary']);
  }
}
