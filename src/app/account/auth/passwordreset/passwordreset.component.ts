import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from '../../../core/services/authentication.service';
import { environment } from '../../../../environments/environment';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.scss']
})

/**
 * Reset-password component
 */
export class PasswordresetComponent implements OnInit, AfterViewInit {

  resetForm: FormGroup;
  submitted = false;
  error = '';
  success = '';
  loading = false;

  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    document.body.setAttribute('class', 'authentication-bg');
    this.resetForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.email]],
    });
  }

  ngAfterViewInit() {
  }

  // convenience getter for easy access to form fields
  get f() { return this.resetForm.controls; }

  /**
   * On submit form
   */
  onSubmit() {
    this.success = '';
    this.submitted = true;

    // stop here if form is invalid
    if (this.resetForm.invalid) {
      return;
    }
    if (environment.defaultauth === 'costplannerbackend') {
      this.authenticationService.resetPassword(this.f.userName.value)
        .pipe(first())
        .subscribe(result => {
          if (result.status == 200) {
            this.error = '';
            this.success = 'Temporary password has been sent to your registered email.'
          } else if (result.status == 201) {
            this.success = '';
            this.error = 'No Username provided.';
          } else if (result.status == 202) {
            this.success = '';
            this.error = 'You have provided invalid Username.';
          } else {
            this.success = '';
            this.error = 'Unknown error!';
          }
          setTimeout(() => {
            this.error = '';
            this.success = '';
          }, 5000);
        }, error => {
          this.success = '';
          this.error = error ? error : '';
          setTimeout(() => {
            this.error = '';
            this.success = '';
          }, 5000);
        });

    }
  }
}
