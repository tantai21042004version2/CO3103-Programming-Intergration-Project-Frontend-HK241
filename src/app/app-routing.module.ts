import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { NoaccessComponent } from './pages/noaccess/noaccess.component';
import { ArtirstAddMusicComponent } from './pages/artirst-add-music/artirst-add-music.component';
import { ArtirstoverviewComponent } from './pages/artirstoverview/artirstoverview.component';
import { RoleGuard } from './role.guard';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomepageComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'artist/add-music', component: ArtirstAddMusicComponent, canActivate: [RoleGuard], data: { roles: ['ARTIST'] } },
    { path: 'artist/overview', component: ArtirstoverviewComponent, canActivate: [RoleGuard], data: { roles: ['ARTIST'] } },
    { path: 'no-access', component: NoaccessComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
