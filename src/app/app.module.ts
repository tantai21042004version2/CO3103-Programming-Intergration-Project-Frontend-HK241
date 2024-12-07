import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AudioPlayerComponent } from './components/audio-player/audio-player.component';
import { HeaderComponent } from './components/header/header.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { BannerComponent } from './components/banner/banner.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { TrendingComponent } from './components/trending/trending.component';
import { CardComponent } from './components/card/card.component';
import { FooterComponent } from './components/footer/footer.component';
import { NoaccessComponent } from './pages/noaccess/noaccess.component';
import { ArtirstoverviewComponent } from './pages/artirstoverview/artirstoverview.component';
import { ArtirstTracksComponent } from './pages/artirst-tracks/artirst-tracks.component';
import { ArtirstUploadTrackCloudinaryComponent } from './pages/artirst-upload-track-cloudinary/artirst-upload-track-cloudinary.component';
import { ArtirstUploadTrackMetaDataComponent } from './pages/artirst-upload-track-meta-data/artirst-upload-track-meta-data.component';
import { DetailComponent } from './pages/detail/detail.component';
import { ArtirstAlbumsComponent } from './pages/artirst-albums/artirst-albums.component';
import { ArtirstAlbumUploadComponent } from './pages/artirst-album-upload/artirst-album-upload.component';
import { ArtirstAlbumDetailComponent } from './pages/artirst-album-detail/artirst-album-detail.component';
import { ArtirstProfileControlComponent } from './pages/artirst-profile-control/artirst-profile-control.component';
import { ArtirstAboutComponent } from './pages/artirst-about/artirst-about.component';
import { AdminUserListComponent } from './pages/admin-user-list/admin-user-list.component';
import { AdminPendingTrackComponent } from './pages/admin-pending-track/admin-pending-track.component';
import { AdminApproveTrackComponent } from './pages/admin-approve-track/admin-approve-track.component';
import { AdminPendingAlbumComponent } from './pages/admin-pending-album/admin-pending-album.component';
import { AdminApproveAlbumComponent } from './pages/admin-approve-album/admin-approve-album.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';


@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent,
    AppComponent,
    AudioPlayerComponent,
    HeaderComponent,
    HomepageComponent,
    BannerComponent,
    SearchbarComponent,
    TrendingComponent,
    CardComponent,
    FooterComponent,
    NoaccessComponent,
    ArtirstoverviewComponent,
    ArtirstTracksComponent,
    ArtirstUploadTrackCloudinaryComponent,
    ArtirstUploadTrackMetaDataComponent,
    DetailComponent,
    ArtirstAlbumsComponent,
    ArtirstAlbumUploadComponent,
    ArtirstAlbumDetailComponent,
    ArtirstProfileControlComponent,
    ArtirstAboutComponent,
    AdminUserListComponent,
    AdminPendingTrackComponent,
    AdminApproveTrackComponent,
    AdminPendingAlbumComponent,
    AdminApproveAlbumComponent,
    AdminDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }