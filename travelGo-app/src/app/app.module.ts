import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { CategoryNavbarComponent } from './layout/category-navbar/category-navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { BussinessComponent } from './pages/bussiness/bussiness.component';
import { TripsComponent } from './pages/trips/trips.component';
import { SinglePostComponent } from './pages/single-post/single-post.component';
import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { CommentFormComponent } from './comments/comment-form/comment-form.component';
import { CommentListComponent } from './comments/comment-list/comment-list.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { LoginComponent } from './safe/login/login.component';
import { SignupComponent } from './safe/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ForumComponent } from './pages/forum/forum.component';
import { PostCardComponent } from './layout/post-card/post-card.component';
import { AccountComponent } from './safe/account/account.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { TripCardComponent } from './layout/trip-card/trip-card.component';
import { OfferCardComponent } from './layout/offer-card/offer-card.component';
import { CreateTripComponent } from './pages/create-trip/create-trip.component';
import { CreateOfferComponent } from './pages/create-offer/create-offer.component';
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

defineComponents(IgcRatingComponent);
@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    HeaderComponent,
    CategoryNavbarComponent,
    FooterComponent,
    HomeComponent,
    BussinessComponent,
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
    CreateTripComponent,
    CreateOfferComponent,
    SingleOfferComponent,
    SingleTripComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
