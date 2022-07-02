import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'roomeet';
  
  constructor(private authSvc: AuthService) {}

  getStatus = this.authSvc.loggedIn;
  logOut = this.authSvc.logOut;
}
