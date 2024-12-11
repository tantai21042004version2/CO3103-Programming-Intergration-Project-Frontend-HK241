import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Artist } from 'src/app/models/artirst';
import { Album } from 'src/app/models/album';
import { convertResponseToAlbum } from 'src/app/utils/to.album';
import { AdminDashboard } from 'src/app/models/admin.dashboard';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent extends BaseComponent implements OnInit {
  adminInfor: Artist = {
    id: 0,
    username: '',
    image_url: '',
    artist_name: '',
    biography: '',
  };
  token: string = '';

  adminDashboard: AdminDashboard = {
    total_users: 0,
    total_artists: 0,
    total_active_users: 0,
    total_albums: 0,
    total_approved_albums: 0,
    total_pending_albums: 0,
    total_songs: 0,
    total_approved_songs: 0,
    total_pending_songs: 0,
  }

  ngOnInit(): void {
    this.getUserInfor();
    this.getAdminDashboard();
  }

  getUserInfor() {
    this.token = this.tokenService.getToken();
    this.adminInfor.id = this.tokenService.getUserId();
    this.adminInfor.image_url = this.tokenService.getImageUrl();
  }

  getAdminDashboard() {
    this.userService.getAdminDashboard(this.token).subscribe({
      next: (apiResponse) => {
        if (apiResponse.status === 'OK') {
          this.adminDashboard = apiResponse.data;
        }
      },
      error: (error) => {
        this.showNotification('Failed to get admin dashboard', false);
      }
    })
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

  confirmAction() { }

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

  navigateToDashboard() {
    this.router.navigate(['/admin/dashboard']);
  }

  navigateToUserList() {
    this.router.navigate(['/admin/user-list']);
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

  navigateToAddMusic() {
    this.router.navigate(['/artist/tracks/upload-track-cloudinary']);
  }

  navigateToNewTrack() {
    this.router.navigate(['/artist/tracks/upload-track-cloudinary']);
  }

  navigateToTracks() {
    this.router.navigate(['/artist/tracks']);
  }

  navigateToProfile() {
    this.router.navigate(['/user/profile']);
  }

  logout() {
    this.tokenService.removeToken();
    this.router.navigate(['/']);
  }
}
