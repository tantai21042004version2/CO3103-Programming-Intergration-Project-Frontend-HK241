import { Component, OnInit } from '@angular/core';
import { Artist } from 'src/app/models/artirst';
import { BaseComponent } from '../base/base.component';
import { Song } from 'src/app/models/song';


@Component({
  selector: 'app-admin-approve-track',
  templateUrl: './admin-approve-track.component.html',
  styleUrls: ['./admin-approve-track.component.scss']
})
export class AdminApproveTrackComponent extends BaseComponent implements OnInit {
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
    this.getAllApprovedTracks();
  }

  getUserInfor() {
    this.token = this.tokenService.getToken();
    this.adminInfor.id = this.tokenService.getUserId();
    this.adminInfor.image_url = this.tokenService.getImageUrl();
  }

  getAllApprovedTracks() {
    this.songService.getAllSong({ page: 1, limit: 100, keyword: '', album_id: '' }).subscribe({
      next: (apiResponse) => {
        if (apiResponse.status === 'OK') {
          this.tracks = apiResponse.data.songs;
        }
      },
      error: (error) => {
        this.showNotification('Failed to get all approved tracks', false);
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
    if (this.actionType === 'reject') {
      this.songService.rejectSong(this.selectedTrack.id, this.token).subscribe({
        next: (apiResponse) => {
          if (apiResponse.status === 'OK') {
            this.showNotification('Track rejected', true);
          }
        },
        error: (error) => {
          this.showNotification('Failed to reject track', false);
        }
      });
    }
    this.closeConfirmModal();
  }



  cancelAction() {
    this.closeConfirmModal();
  }

  showNotification(message: string, success: boolean) {
    this.notificationMessage = message;
    this.isSuccess = success;
    setTimeout(() => {
      this.notificationMessage = null
      window.location.reload();
    }, 3000);
  }

  goToDetail(id: number) {
    this.router.navigate(['/song', id]);
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
