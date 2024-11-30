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
import { ArtirstAddMusicComponent } from './pages/artirst-add-music/artirst-add-music.component';
import { ArtirstTracksComponent } from './pages/artirst-tracks/artirst-tracks.component';
import { ArtirstUploadTrackCloudinaryComponent } from './pages/artirst-upload-track-cloudinary/artirst-upload-track-cloudinary.component';
import { ArtirstUploadTrackMetaDataComponent } from './pages/artirst-upload-track-meta-data/artirst-upload-track-meta-data.component';
import { DetailComponent } from './pages/detail/detail.component';


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
    ArtirstAddMusicComponent,
    ArtirstTracksComponent,
    ArtirstUploadTrackCloudinaryComponent,
    ArtirstUploadTrackMetaDataComponent,
    DetailComponent
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