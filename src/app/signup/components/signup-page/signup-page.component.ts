import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthorizationService } from './../../../services/authorization.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {
  details = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required])
  });
  userId: string;
  userName: string;
  hide = true;
  constructor(private router: Router,
    private authService: AuthorizationService,
    private snackBar: MatSnackBar) {
    this.authService.user.subscribe((res) => {
      this.userName = res[0];
      this.userId = res[1];
    });
  }

  ngOnInit(): void {
  }
  getErrorMessage() {
      return 'You must enter a valid value'
  }
  signUp() {
    const payload = {
      "email_id": this.details.value.email,
      "name": this.details.value.name,
      "password": this.details.value.password
    }
    this.authService.createNewUser(payload).subscribe((res) => {
      if (res) {
        this.router.navigate(['/profile']);
        this.authService.updateUser(payload.name, payload.email_id);
        this.snackBar.open('Your entry has been added', '', {
          duration: 3000,
        });
      }
    }, (error) => {
      this.snackBar.open('Please enter all the details', '', {
        duration: 3000,
      });
    })
  }
}
