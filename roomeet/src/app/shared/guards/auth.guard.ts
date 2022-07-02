import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authSvc: AuthService, private router: Router) {}

  canActivate(): boolean {
    if(this.authSvc.loggedIn()) {
      return true
    } else {
      this.router.navigate(['/login'])
      return false
    }
  }
  
}
