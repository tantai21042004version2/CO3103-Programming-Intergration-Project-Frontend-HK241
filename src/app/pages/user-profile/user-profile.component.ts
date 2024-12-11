import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { ApiResponse } from 'src/app/responses/api.response';
import { TokenService } from 'src/app/services/token.service';
import { BaseComponent } from '../base/base.component';
import { convertResponseToUser } from 'src/app/utils/to.user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent extends BaseComponent implements OnInit {
  role: Role = { id: 0, name: '' };
  userDetail: User = {
    id: 0,
    email: '',
    username: '',
    artist_name: '',
    password: '',
    country: '',
    date_of_birth: '',
    role: this.role,
    biography: '',
    image_url: '',
    created_at: '',
    updated_at: ''
  };
  token: string = '';

  selectedImage: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  triggerFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput?.click();
  }

  onImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedImage = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.selectedImage);
    }

    if (this.selectedImage) {
      this.userService.uploadProfileImage([this.selectedImage], this.token).subscribe(
        (response: ApiResponse) => {
          if (response.status === "OK") {
            window.location.reload();
          }
        }
      );
    }
  }

  constructor() {
    super();
    this.getUserInfor();
  }

  getUserInfor() {
    this.token = this.tokenService.getToken();
    this.userDetail.id = this.tokenService.getUserId();
    this.userDetail.image_url = this.tokenService.getImageUrl();
  }

  ngOnInit(): void {
    this.getUserDetail();
  }

  getUserDetail() {
    this.userService.getUserDetail(this.token).subscribe(
      (response: ApiResponse) => {
        this.userDetail = convertResponseToUser(response.data);
      });
  }

  navigateToChangePassword() {
    this.router.navigate(['/user/profile/change-password']);
  }
}

