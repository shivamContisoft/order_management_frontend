import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../../../app/core/services/authentication.service';
import { ProfileService } from '../../../app/core/services/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ConfirmedValidator } from '../confirmed.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {

  currentUser: any [];
  userName = '';
  userEmail = '';
  userContact = '';
  userDesignation = '';
  new_password: any;

  ChangePasswordFormGroup: FormGroup;

  error = '';

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private router: Router,
    private authenticationService: AuthenticationService, private profileService: ProfileService) { }

  ngOnInit(): void {
    this.getUsers();
    this.ChangePasswordFormGroup = this.formBuilder.group({
      userName: [],
      password: ['', [Validators.required]],
      confirm_password: ['', Validators.required]
    }, { 
      validator: ConfirmedValidator('password', 'confirm_password')
    })
  }

  get getChFormControls() {
    return this.ChangePasswordFormGroup.controls;
  }

  getUsers(){
    this.currentUser = this.authenticationService.currentUserValue;
    this.userName = this.currentUser['user']['firstName'] + " " + this.currentUser['user']['lastName'];
    this.userEmail = this.currentUser['user']['email'];
    this.userContact = this.currentUser['user']['contact'];
    this.userDesignation = this.currentUser['user']['designation'];
  }

  updatePassword(){
    this.ChangePasswordFormGroup.controls.userName.setValue(this.userEmail);
    if (this.ChangePasswordFormGroup.valid) {
      this.profileService.updatePassword(this.ChangePasswordFormGroup.value)
            .subscribe(
              data => {
                if (data.status == 200) {
                } else if (data.status == 201) {
                  this.error = 'No credentials provided for authentication.';
                } else if (data.status == 202) {
                  this.error = 'You have invalid User Name.';
                } else {
                  this.error = 'Unknown error!';
                } 
                setTimeout(() => {
                  this.error = '';
                }, 5000);
              },
              error => {
                this.error = error ? error : '';
                setTimeout(() => {
                  this.error = '';
                }, 5000);
              });
    }
  }

  /**
   * Open modal
   * @param content modal content
   */
  openPasswordResetModal(content: any) {
    this.modalService.open(content);
  }

  alertModal(smallDataModal: any, content)  {
    this.modalService.dismissAll(content);
    this.modalService.open(smallDataModal, { size: 'sm',windowClass:'modal-holder', centered: true });
  }

  successmsg() {
    Swal.fire('Changes saved successfully!', 'You clicked the button!', 'success');
  }

  redirectLogin(smallDataModal: any,){
    this.modalService.dismissAll(smallDataModal);
    this.router.navigate(['/account/login']);
  }

}
