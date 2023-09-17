import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { LoginComponent } from './safe/login/login.component';
import { SignupComponent } from './safe/signup/signup.component';
import { SinglePostComponent } from './pages/single-post/single-post.component';
import { ForumComponent } from './pages/forum/forum.component';
import { AccountComponent } from './safe/account/account.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'aboutUs', component: AboutUsComponent },
  { path: 'terms-conditions', component: TermsAndConditionsComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'post', component: SinglePostComponent },
  { path: 'forum', component: ForumComponent },
  { path: 'account', component: AccountComponent },
  { path: 'create-post', component: CreatePostComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
