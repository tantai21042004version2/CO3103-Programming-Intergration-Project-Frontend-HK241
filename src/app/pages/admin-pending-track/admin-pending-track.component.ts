import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Artist } from '../../models/artirst';
import { Song } from '../../models/song';

@Component({
  selector: 'app-admin-pending-track',
  templateUrl: './admin-pending-track.component.html',
  styleUrls: ['./admin-pending-track.component.scss']
})
export class AdminPendingTrackComponent extends BaseComponent implements OnInit {
  adminInfor: Artist = {
    id: 0,
    username: '',
    image_url: '',
    artist_name: '',
    biography: '',
  };
  token: string = '';

  tracks: Song[] = [];

  ngOnInit(): void {
    this.getUserInfor();
    this.getPendingTracks();
  }

  getUserInfor() {
    this.token = this.tokenService.getToken();
    this.adminInfor.id = this.tokenService.getUserId();
    this.adminInfor.image_url = this.tokenService.getImageUrl();
  }

  getPendingTracks() {
    this.songService.getPendingTracks(this.token).subscribe({
      next: (apiResponse) => {
        if (apiResponse.status === "OK") {
          this.tracks = apiResponse.data.songs;
        }
      },
      complete: () => {
        console.log(this.tracks);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  showConfirmModal = false;
  description: string = '';
  confirmMessage = '';
  selectedTrack: any = null;
  actionType: string = '';
  notificationMessage: string | null = null;
  isSuccess: boolean = true;

  openConfirmModal(action: string, track: any) {
    this.actionType = action;
    this.selectedTrack = track;
    this.confirmMessage =
      action === 'approve'
        ? `Description for "${track.name}" for approval?`
        : `Description for "${track.name}"? for reject`;
    this.showConfirmModal = true;
  }


  closeConfirmModal() {
    this.showConfirmModal = false;
    this.confirmMessage = '';
    this.selectedTrack = null;
    this.actionType = '';
  }

  confirmAction() {
    if (this.actionType === 'approve') {
      this.approveTrack(this.selectedTrack);
    } else if (this.actionType === 'reject') {
      this.rejectTrack(this.selectedTrack);
    }
    this.closeConfirmModal();
  }


  cancelAction() {
    this.closeConfirmModal();
  }

  approveTrack(track: Song) {
    if (track.status === 'PENDING') {
      debugger;
      this.songService.approveSong(track.id, this.token).subscribe({
        next: (apiResponse) => {
          if (apiResponse.status === 'OK') {
            this.showNotification('Track approved', true);
          }
        },
        error: (error) => {
          this.showNotification(`Failed to approve track: ${error.error.message}`, false);
        }
      });
    } else {
      this.showNotification('Track is already approved', false);
    }
  }

  rejectTrack(track: Song) {
    if (track.status === 'PENDING') {
      this.songService.rejectSong(track.id, this.token).subscribe({
        next: (apiResponse) => {
          if (apiResponse.status === 'OK') {
            this.showNotification('Track rejected', true);
          }
        },
        error: (error) => {
          this.showNotification(`Failed to reject track: ${error.error.message}`, false);
        }
      });
    } else {
      this.showNotification('Track is already rejected', false);
    }
  }

  showNotification(message: string, success: boolean) {
    this.notificationMessage = message;
    this.isSuccess = success;
    setTimeout(() => {
      this.notificationMessage = null;
      window.location.reload();
    }, 2000);
  }

  navigateToApprovedTracks() {
    this.router.navigate(['/admin/songs/approved']);
  }

  navigateToPendingTracks() {
    this.router.navigate(['/admin/songs/pending']);
  }

  navigateToApprovedAlbums() {
    this.router.navigate(['/admin/albums/approved']);
  }

  navigateToPendingAlbums() {
    this.router.navigate(['/admin/albums/pending']);
  }


  navigateToDashboard() {
    this.router.navigate(['/admin/dashboard']);
  }

  navigateToUserList() {
    this.router.navigate(['/admin/user-list']);
  }

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  navigateToAddMusic() {
    this.router.navigate(['/artist/tracks/upload-track-cloudinary']);
  }

  navigateToNewTrack() {
    this.router.navigate(['/artist/tracks/upload-track-cloudinary']);
  }

  navigateToTracks() {
    this.router.navigate(['/artist/tracks']);
  }
}
