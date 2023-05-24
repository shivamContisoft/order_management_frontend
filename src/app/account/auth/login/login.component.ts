import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../../../core/services/authentication.service';

import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { ModuleService } from 'src/app/core/services/module.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login component
 */
export class LoginComponent implements OnInit, AfterViewInit {

  loginForm: FormGroup;
  submitted = false;
  error = '';
  returnUrl: string;

  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService, private moduleService: ModuleService) { }

  ngOnInit() {
    document.body.setAttribute('class', 'authentication-bg');

    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    // reset login status
    // this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    // tslint:disable-next-line: no-string-literal
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  ngAfterViewInit() { }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
  **/
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      if (environment.defaultauth === 'costplannerbackend') {
        this.authenticationService.login(this.f.userName.value, this.f.password.value).pipe(first()).subscribe((data) => {

            if (data.status == 200) {
              this.router.navigate(['/dashboard']);
            } else if (data.status == 201) {
              this.error = 'No credentials provided for authentication.';
            } else if (data.status == 202) {
              this.error = 'You have entered invalid Username.';
            } else if (data.status == 203) {
              this.error = 'You have entered invalid Password.';
            } else {
              this.error = 'Unknown error!';
            }
            setTimeout(() => {
              this.error = '';
            }, 5000);
          },
            error => {
              this.error = error ? error : '';

              console.log(this.error,"error");
              setTimeout(() => {
                this.error = '';
              }, 5000);
            });
      }
    }
  }

  getUserModules(data) {
    this.moduleService.getUserModules().pipe(first()).subscribe(result => {
      console.log(result,"result")
      if (data.user.accountType == 1)
        this.router.navigate(['/administrator/dashboard']);
      if (data.user.accountType == 2)
        this.router.navigate(['/costing-team/dashboard']);
      if (data.user.accountType == 3)
        this.router.navigate(['/vendor/dashboard']);
    }, error => {
      console.log(error)
    })
  }

}
