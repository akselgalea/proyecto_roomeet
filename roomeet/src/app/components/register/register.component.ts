import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, IRegistro } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  constructor(private authSvc : AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(register: NgForm) {    
    let usuario: IRegistro = {
      username: register.controls['username'].value,
      email: register.controls['email'].value,
      password: btoa(register.controls['password'].value),
    }

    this.authSvc.registro(usuario).subscribe(
      res => {
        console.log(res)
        localStorage.setItem('token', res.token)
      },
      err => console.log(err)
    );
  }
}
