import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-artirst-albums',
  templateUrl: './artirst-albums.component.html',
  styleUrls: ['./artirst-albums.component.scss']
})
export class ArtirstAlbumsComponent extends BaseComponent{
  navigateToOverview() {
    this.router.navigate(['/artist/overview']);
  }

  navigateToTracks() {
    this.router.navigate(['/artist/tracks']);
  }

  navigateToNewTrack() {
    this.router.navigate(['/artist/tracks/upload-track-cloudinary']);
  }
}
