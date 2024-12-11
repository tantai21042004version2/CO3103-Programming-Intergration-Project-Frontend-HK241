import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-artirst-profile-control',
  templateUrl: './artirst-profile-control.component.html',
  styleUrls: ['./artirst-profile-control.component.scss']
})
export class ArtirstProfileControlComponent extends BaseComponent {
  navigateToTracks() {
    this.router.navigate(['/artist/tracks']);
  }

  navigateToNewTrack() {
    this.router.navigate(['/artist/tracks/upload-track-cloudinary']);
  }
}
