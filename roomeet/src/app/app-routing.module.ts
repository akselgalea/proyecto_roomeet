import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscarComponent } from './components/buscar/buscar.component';
import { ChatsComponent } from './components/chats/chats.component';
import { FavoritosComponent } from './components/favoritos/favoritos.component';
import { LoginComponent } from './components/login/login.component';
import { MuroComponent } from './components/muro/muro.component';
import { PreferenciasComponent } from './components/profile/preferencias/preferencias.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {path: '', component: MuroComponent, canActivate:[AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'publicaciones', component: MuroComponent, canActivate: [AuthGuard]},
  {path: 'favoritos', component: FavoritosComponent, canActivate: [AuthGuard]},
  {path: 'chats', component: ChatsComponent, canActivate: [AuthGuard]},
  {path: 'buscar', component: BuscarComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'profile/preferencias', component: PreferenciasComponent, canActivate: [AuthGuard]},
  {path: 'roomie/:id', component: ProfileComponent, canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
