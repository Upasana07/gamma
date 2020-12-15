import { Router } from '@angular/router';
import { AuthorizationService } from './../../../services/authorization.service';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  userId: string;
  userName: string;
  userDetails;
  @Input() dialogRef: MatDialogRef<any>;
  newExperienceDetails = new FormGroup({
    companyName: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    emailId: new FormControl('', Validators.required)
  });

  constructor(private authService: AuthorizationService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router) {
    this.authService.user.subscribe((res) => {
      this.userName = res[0];
      this.userId = res[1];
    });
  }

  ngOnInit(): void {
    this.getUserExperiences();
  }
  createNewExperience(template?: TemplateRef<any>) {
    this.dialogRef = this.dialog.open(template, { width: '350px', height: '500px' });
    this.newExperienceDetails.get('emailId').setValue(this.userId);
  }
  getErrorMessage() {
    return 'You must enter a value'
  }
  addNewExperience(userData) {
    const data = {
      "company_name": userData.value.companyName,
      "title": userData.value.title,
      "start_date": userData.value.startDate,
      "location": userData.value.location,
      "description": userData.value.description,
      "email_id": userData.value.emailId
    }
    if(data) {
      this.authService.addUserExperience(data).subscribe((res) => {
        this.getUserExperiences();
        this.snackBar.open('Your entry has been added', '', {
          duration: 3000,
        });
        this.dialog.closeAll();
      }); 
    }
  }
  getUserExperiences() {
    this.authService.getUserDetails(this.userId).subscribe(res => {
      this.userDetails = res['past_jobs'];
    });
  }
  goBack() {
    this.dialog.closeAll();
    this.newExperienceDetails.reset('');
  }
  logOut() {
    localStorage.setItem('isLoggedIn', 'false')
    this.router.navigate(['/login']);
  }
}
