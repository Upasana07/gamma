import { AuthGuard } from './guards/auth.guard';
import { LandingPageComponent } from './core/components/landing-page/landing-page.component';
import { SignupPageComponent } from './signup/components/signup-page/signup-page.component';
import { LoginPageComponent } from './login/components/login-page/login-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: SignupPageComponent
},
{
  path: 'login',
  component: LoginPageComponent,
},
{
  path: 'profile',
  component: LandingPageComponent,
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
