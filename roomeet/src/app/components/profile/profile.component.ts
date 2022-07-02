import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DatabaseService, IUser } from 'src/app/shared/services/database.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user$ : any
  constructor(private userService: DatabaseService, private router: Router) { }

  ngOnInit(): void {
    this.user$ = this.userService.getProfile()
      .subscribe({
        next(res) {
          console.log(res.body)
        },
        error(err) {
          if(err instanceof HttpErrorResponse) {
            if(err.status === 401 || err.status === 500) {
              console.log(err)
            }
          }
        }
      });
  }

}
