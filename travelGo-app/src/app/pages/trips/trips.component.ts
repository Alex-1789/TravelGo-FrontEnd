import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css'],
})
export class TripsComponent {

  constructor(private authService: AuthService) {}

  whatRoles() {
    let roles = this.authService.getUserRoles();
    console.log(roles);
  }
}
