import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Artist } from 'src/app/models/artirst';
import { Song } from 'src/app/models/song';
import { Album } from 'src/app/models/album';
import { Genre } from 'src/app/models/genre';
import { convertResponseToAlbum } from 'src/app/utils/to.album';

@Component({
  selector: 'app-admin-pending-album',
  templateUrl: './admin-pending-album.component.html',
  styleUrls: ['./admin-pending-album.component.scss']
})
export class AdminPendingAlbumComponent extends BaseComponent implements OnInit {
  adminInfor: Artist = {
    id: 0,
    username: '',
    image_url: '',
    artist_name: '',
    biography: '',
  };
  token: string = '';

  albums: Album[] = [];


  ngOnInit(): void {
    this.getUserInfor();
    this.getAllPendingAlbums();
  }

  getUserInfor() {
    this.token = this.tokenService.getToken();
    this.adminInfor.id = this.tokenService.getUserId();
    this.adminInfor.image_url = this.tokenService.getImageUrl();
  }

  getAllPendingAlbums() {
    this.albumService.getAllPendingAlbum({ page: 1, limit: 100, keyword: '' }, this.token).subscribe({
      next: (apiResponse) => {
        if (apiResponse.status === 'OK') {
          this.albums = apiResponse.data.albums.map(convertResponseToAlbum);
        }
      },
      complete: () => {
        console.log(this.albums);
      },
      error: (error) => {
        this.showNotification('Failed to get all approved albums', false);
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
        : `Description for "${track.name}"? for delete`;
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
      console.log(this.selectedTrack);
      this.albumService.approveAlbum(this.selectedTrack.id, this.token, { "is_approved": 0, description: this.description }).subscribe({
        next: (apiResponse) => {
          if (apiResponse.status === 'OK') {
            this.showNotification('Album rejected', true);
          }
        },
        error: (error) => {
          this.showNotification('Failed to delete album', false);
        }
      });
    }
    else if (this.actionType === 'approve') {
      this.albumService.approveAlbum(this.selectedTrack.id, this.token, { "is_approved": 1, description: this.description }).subscribe({
        next: (apiResponse) => {
          this.showNotification('Album approved', true);
        },
        error: (error) => {
          this.showNotification('Failed to approve album', false);
        }
      });
    }
  }

  cancelAction() {
    this.closeConfirmModal();
  }

  showNotification(message: string, success: boolean) {
    this.notificationMessage = message;
    this.isSuccess = success;
    setTimeout(() => {
      this.notificationMessage = null;
      window.location.reload();
    }, 2000);
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

  navigateToOverview() {
    this.router.navigate(['/artist/overview']);
  }

  navigateToNewTrack() {
    this.router.navigate(['/artist/tracks/upload-track-cloudinary']);
  }

  navigateToTracks() {
    this.router.navigate(['/artist/tracks']);
  }
}
