import { AuthorizationService } from './../../../services/authorization.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  details = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  hide = true;
  constructor(private router: Router,
    private authService: AuthorizationService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  signIn(data) {
    const payload = {
      'email_id': data.value.email,
      'password': data.value.password
    }
    this.authService.checkCredentials(payload).pipe(switchMap((resp: any) => {
      return this.authService.loginExistingUser(resp.email_id)
    })).subscribe(res => {
      if (res && res.name) {
        this.router.navigate(['/profile']);
        this.authService.updateUser(res.name, this.details.value.email);
      }
    }, error => {
      this.snackBar.open('Please enter correct credentials', '', {
        duration: 3000,
      });
      this.details.reset();
    });
  }
  getErrorMessage() {
    if (this.details.get('email').hasError('required')) {
      return 'You must enter your email'
    }
    else if (this.details.get('password').hasError('required')) {
      return 'You must enter your password'
    }
  }
}
