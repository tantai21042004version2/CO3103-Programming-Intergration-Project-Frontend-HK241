import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { NoaccessComponent } from './pages/noaccess/noaccess.component';
import { ArtirstoverviewComponent } from './pages/artirstoverview/artirstoverview.component';
import { RoleGuard } from './role.guard';
import { ArtirstTracksComponent } from './pages/artirst-tracks/artirst-tracks.component';
import { ArtirstUploadTrackCloudinaryComponent } from './pages/artirst-upload-track-cloudinary/artirst-upload-track-cloudinary.component';
import { ArtirstUploadTrackMetaDataComponent } from './pages/artirst-upload-track-meta-data/artirst-upload-track-meta-data.component';
import { DetailComponent } from './pages/detail/detail.component';
import { ArtirstAlbumUploadComponent } from './pages/artirst-album-upload/artirst-album-upload.component';
import { ArtirstAlbumsComponent } from './pages/artirst-albums/artirst-albums.component';
import { ArtirstAlbumDetailComponent } from './pages/artirst-album-detail/artirst-album-detail.component';
import { AdminPendingTrackComponent } from './pages/admin-pending-track/admin-pending-track.component';
import { AdminApproveTrackComponent } from './pages/admin-approve-track/admin-approve-track.component';
import { AdminPendingAlbumComponent } from './pages/admin-pending-album/admin-pending-album.component';
import { AdminApproveAlbumComponent } from './pages/admin-approve-album/admin-approve-album.component';
import { AdminUserListComponent } from './pages/admin-user-list/admin-user-list.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { ArtirstProfileControlComponent } from './pages/artirst-profile-control/artirst-profile-control.component';
import { ArtistAlbumUploadDetailComponent } from './pages/artist-album-upload-detail/artist-album-upload-detail.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomepageComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'song/:id', component: DetailComponent },
    { path: 'artist/albums', component: ArtirstAlbumsComponent },
    { path: 'artist/album-upload', component: ArtirstAlbumUploadComponent },
    { path: 'artist/album-upload-detail', component: ArtistAlbumUploadDetailComponent},
    { path: 'artist/album-detail/:id', component: ArtirstAlbumDetailComponent },
    { path: 'artist/artist-profile-control', component: ArtirstProfileControlComponent },
    { path: 'artist/overview', component: ArtirstoverviewComponent },
    { path: 'artist/tracks', component: ArtirstTracksComponent },
    { path: 'artist/tracks/upload-track-cloudinary', component: ArtirstUploadTrackCloudinaryComponent },
    { path: 'artist/tracks/upload-track-meta-data', component: ArtirstUploadTrackMetaDataComponent },
    { path: 'admin/songs/pending', component: AdminPendingTrackComponent },
    { path: 'admin/songs/approved', component: AdminApproveTrackComponent },
    { path: 'admin/albums/pending', component: AdminPendingAlbumComponent },
    { path: 'admin/albums/approved', component: AdminApproveAlbumComponent },
    { path: 'admin/user-list', component: AdminUserListComponent },
    { path: 'admin/dashboard', component: AdminDashboardComponent },
    { path: 'user/profile', component: UserProfileComponent },
    { path: 'no-access', component: NoaccessComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
