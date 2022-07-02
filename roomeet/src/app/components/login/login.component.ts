import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, ILogin } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authSvc : AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(login: NgForm) {
    let usuario: ILogin = {
      username: login.controls['username'].value,
      password: btoa(login.controls['password'].value)
    }

    this.authSvc.login(usuario).subscribe(
      res => {
        console.log(res)
        localStorage.setItem('token', res.token)
        this.router.navigate(['/profile'])
      },
      err => {
        console.log(err)
      }
    );
  }

}
