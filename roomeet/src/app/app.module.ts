import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { TokenInterceptorService } from './shared/services/token-interceptor.service';
import { AuthService } from './shared/services/auth.service';
import { MuroComponent } from './components/muro/muro.component';
import { FavoritosComponent } from './components/favoritos/favoritos.component';
import { ChatsComponent } from './components/chats/chats.component';
import { BuscarComponent } from './components/buscar/buscar.component';
import { PreferenciasComponent } from './components/profile/preferencias/preferencias.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    MuroComponent,
    FavoritosComponent,
    ChatsComponent,
    BuscarComponent,
    PreferenciasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
