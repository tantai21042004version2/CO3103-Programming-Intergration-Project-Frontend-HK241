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

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomepageComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'song/:id', component: DetailComponent },
    { path: 'artist/albums', component: ArtirstAlbumsComponent },
    { path: 'artist/album-upload', component: ArtirstAlbumUploadComponent },
    { path: 'artist/album-detail', component: ArtirstAlbumDetailComponent },
    { path: 'artist/overview', component: ArtirstoverviewComponent },
    { path: 'artist/tracks', component: ArtirstTracksComponent },
    { path: 'artist/tracks/upload-track-cloudinary', component: ArtirstUploadTrackCloudinaryComponent },
    { path: 'artist/tracks/upload-track-meta-data', component: ArtirstUploadTrackMetaDataComponent },
    { path: 'admin/songs/pending', component: AdminPendingTrackComponent, canActivate: [RoleGuard], data: { roles: ['ADMIN'] } },
    { path: 'admin/songs/approved', component: AdminApproveTrackComponent, canActivate: [RoleGuard], data: { roles: ['ADMIN'] } },
    { path: 'admin/albums/pending', component: AdminPendingAlbumComponent, canActivate: [RoleGuard], data: { roles: ['ADMIN'] } },
    { path: 'admin/albums/approved', component: AdminApproveAlbumComponent, canActivate: [RoleGuard], data: { roles: ['ADMIN'] } },
    { path: 'admin/user-list', component: AdminUserListComponent, canActivate: [RoleGuard], data: { roles: ['ADMIN'] } },
    { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [RoleGuard], data: { roles: ['ADMIN'] } },
    { path: 'no-access', component: NoaccessComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
