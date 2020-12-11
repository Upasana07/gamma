import { AuthorizationService } from './../../../services/authorization.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginPageComponent } from './login-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatRippleModule],
  exports: [LoginPageComponent],
  // providers: [AuthorizationService]
})
export class LoginPageModule {}
