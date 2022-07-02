import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService, IUser } from 'src/app/shared/services/database.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  usuario : IUser | undefined;

  constructor(private userService: DatabaseService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getProfile()
      .subscribe({
        next(res) {
          console.log(res)
        },
        error(err) {
          if(err instanceof HttpErrorResponse) {
            if(err.status === 401 || err.status === 500) {
              
            }
          }
        }

      });
      
      
  }

  ngOnDestroy() {
    
  }

}
