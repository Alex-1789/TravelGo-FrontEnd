import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {AboutUsComponent} from './pages/about-us/about-us.component';
import {TermsAndConditionsComponent} from './pages/terms-and-conditions/terms-and-conditions.component';
import {ContactUsComponent} from './pages/contact-us/contact-us.component';
import {LoginComponent} from './safe/login/login.component';
import {SignupComponent} from './safe/signup/signup.component';
import {SinglePostComponent} from './pages/single-post/single-post.component';
import {ForumComponent} from './pages/forum/forum.component';
import {AccountComponent} from './safe/account/account.component';
import {CreatePostComponent} from './components/post/create-post/create-post.component';
import {TripsComponent} from './pages/trips/trips.component';
import {CreateTripComponent} from './components/trip/create-trip/create-trip.component';
import {SingleTripComponent} from './pages/single-trip/single-trip.component';
import {BusinessOfferComponent} from './pages/business-offer/business-offer.component';
import {CreateOfferComponent} from './components/offer/create-offer/create-offer.component';
import {SingleOfferComponent} from './pages/single-offer/single-offer.component';
import {ModeratorUserAccessComponent} from './safe/moderator-user-access/moderator-user-access.component';
import {AccountUpdateComponent} from "./safe/account-update/account-update.component";
import {PostEditComponent} from "./components/post/post-edit/post-edit.component";
import {OfferEditComponent} from "./components/offer/offer-edit/offer-edit.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'aboutUs', component: AboutUsComponent},
  {path: 'terms-conditions', component: TermsAndConditionsComponent},
  {path: 'contact', component: ContactUsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'post', component: SinglePostComponent},
  {path: 'forum', component: ForumComponent},
  {path: 'account', component: AccountComponent},
  {path: 'account-update', component: AccountUpdateComponent},
  {path: 'create-post', component: CreatePostComponent},
  {path: 'edit-post', component: PostEditComponent},
  {path: 'trips', component: TripsComponent},
  {path: 'create-trip', component: CreateTripComponent},
  {path: 'trip', component: SingleTripComponent},
  {path: 'business-offer', component: BusinessOfferComponent},
  {path: 'create-offer', component: CreateOfferComponent},
  {path: 'edit-offer', component: OfferEditComponent},
  {path: 'offer', component: SingleOfferComponent},
  {path: 'moderator', component: ModeratorUserAccessComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
