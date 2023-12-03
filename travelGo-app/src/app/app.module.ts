import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { CategoryNavbarComponent } from './components/global/category-navbar/category-navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { TripsComponent } from './pages/trips/trips.component';
import { SinglePostComponent } from './pages/single-post/single-post.component';
import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { CommentFormComponent } from './comments/comment-form/comment-form.component';
import { CommentListComponent } from './comments/comment-list/comment-list.component';
import { BusinessOfferComponent } from './pages/business-offer/business-offer.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { LoginComponent } from './safe/login/login.component';
import { SignupComponent } from './safe/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ForumComponent } from './pages/forum/forum.component';
import { PostCardComponent } from './components/post/post-card/post-card.component';
import { AccountComponent } from './safe/account/account.component';
import { CreatePostComponent } from './components/post/create-post/create-post.component';
import { TripCardComponent } from './components/trip/trip-card/trip-card.component';
import { OfferCardComponent } from './components/offer/offer-card/offer-card.component';
import { CreateTripComponent } from './components/trip/create-trip/create-trip.component';
import { CreateOfferComponent } from './components/offer/create-offer/create-offer.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SingleOfferComponent } from './pages/single-offer/single-offer.component';
import { SingleTripComponent } from './pages/single-trip/single-trip.component';
import { MatIconModule } from '@angular/material/icon';
import { defineComponents, IgcRatingComponent } from '../../node_modules/igniteui-webcomponents';
import {NgToastModule} from 'ng-angular-popup';
import {
  CarouselCaptionComponent,
  CarouselComponent, CarouselControlComponent,
  CarouselIndicatorsComponent,
  CarouselInnerComponent,
  CarouselItemComponent
} from "@coreui/angular";
import {CarouselHomeComponent} from "./components/global/carousel-home/carousel-home.component";
import { ModeratorUserAccessComponent } from './safe/moderator-user-access/moderator-user-access.component';
import { RatingCardComponent } from './components/trip/rating-card/rating-card.component';
import { AccountUpdateComponent } from './safe/account-update/account-update.component';
import { AddDocumentComponent } from './components/trip/add-document/add-document.component';
import { PostEditComponent } from './components/post/post-edit/post-edit.component';
import { ProfileImageComponent } from './components/user-profile/profile-image/profile-image.component';
import { ProfileMenuComponent } from './components/user-profile/profile-menu/profile-menu.component';
import {OfferEditComponent} from "./components/offer/offer-edit/offer-edit.component";


defineComponents(IgcRatingComponent);
@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    HeaderComponent,
    CategoryNavbarComponent,
    FooterComponent,
    HomeComponent,
    TripsComponent,
    SinglePostComponent,
    TermsAndConditionsComponent,
    ContactUsComponent,
    CommentFormComponent,
    CommentListComponent,
    AboutUsComponent,
    LoginComponent,
    SignupComponent,
    ForumComponent,
    PostCardComponent,
    AccountComponent,
    CreatePostComponent,
    TripCardComponent,
    OfferCardComponent,
    OfferEditComponent,
    CreateTripComponent,
    CreateOfferComponent,
    SingleOfferComponent,
    SingleTripComponent,
    BusinessOfferComponent,
    CarouselHomeComponent,
    ModeratorUserAccessComponent,
    RatingCardComponent,
    AccountUpdateComponent,
    AddDocumentComponent,
    PostEditComponent,
    ProfileImageComponent,
    ProfileMenuComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatInputModule,
        MatFormFieldModule,
        MatNativeDateModule,
        BrowserAnimationsModule,
        MatIconModule,
        NgToastModule,
        CarouselIndicatorsComponent,
        CarouselComponent,
        CarouselInnerComponent,
        CarouselItemComponent,
        CarouselCaptionComponent,
        CarouselControlComponent,
        FormsModule,
    ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
