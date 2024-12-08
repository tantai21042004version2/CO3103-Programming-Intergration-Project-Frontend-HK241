import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Artist } from 'src/app/models/artirst';
import { Album } from 'src/app/models/album';
import { convertResponseToAlbum } from 'src/app/utils/to.album';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.scss']
})
export class AdminUserListComponent extends BaseComponent implements OnInit {
  adminInfor: Artist = {
    id: 0,
    username: '',
    image_url: '',
    artist_name: '',
    biography: '',
  };
  token: string = '';

  users: User[] = [];

  ngOnInit(): void {
    this.getUserInfor();
    this.getAllUsers();
  }

  getUserInfor() {
    this.token = this.tokenService.getToken();
    this.adminInfor.id = this.tokenService.getUserId();
    this.adminInfor.image_url = this.tokenService.getImageUrl();
  }

  getAllUsers() {
    this.userService.getAllUser({ page: 1, limit: 100, keyword: '' }, this.token).subscribe({
      next: (apiResponse) => {
        if (apiResponse.status === 'OK') {
          this.users = apiResponse.data.users;
          this.users.forEach(user => {
            user.role.id = apiResponse.data.users.role.id;
            user.role.name = apiResponse.data.users.role.name;
          });
        }
      },
      complete: () => {
        console.log(this.users);
      },
      error: (error) => {
        this.showNotification('Failed to get all users', false);
        console.log(error);
      }
    });
  }

  toArtist(user: User) {
    this.userService.toArtist(user.id, this.token).subscribe({
      next: (apiResponse) => {
        this.showNotification('User to artist', true);
      },
      error: (error) => {
        this.showNotification('Failed to to artist', false);
      }
    });
  }

  showConfirmModal = false;
  description: string = '';
  confirmMessage = '';
  selectedUser: any = null;
  actionType: string = '';
  notificationMessage: string | null = null;
  isSuccess: boolean = true;

  openConfirmModal(action: string, user: any) {
    this.actionType = action;
    this.selectedUser = user;
    this.confirmMessage =
      action === 'approve'
        ? `Description for "${user.username}" for to artist?`
        : `Description for "${user.username}"? for delete`;
    this.showConfirmModal = true;
  }

  closeConfirmModal() {
    this.showConfirmModal = false;
    this.confirmMessage = '';
    this.selectedUser = null;
    this.actionType = '';
  }

  confirmAction() {
    // if (this.actionType === 'reject') {
    //   console.log(this.selectedUser);
    //   this.userService.deleteUser(this.selectedUser.id, this.token, { "is_approved": 0, description: this.description }).subscribe({
    //     next: (apiResponse) => {
    //       if (apiResponse.status === 'OK') {
    //         this.showNotification('User deleted', true);
    //       }
    //     },
    //     error: (error) => {
    //       this.showNotification('Failed to delete user', false);
    //     }
    //   });
    // }
    if (this.actionType === 'approve') {
      this.userService.toArtist(this.selectedUser.id, this.token).subscribe({
        next: (apiResponse) => {
          this.showNotification('User has been to artist', true);
        },
        error: (error) => {
          this.showNotification('Failed to artist', false);
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
