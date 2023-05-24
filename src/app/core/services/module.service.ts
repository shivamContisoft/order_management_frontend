import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthenticationService } from './authentication.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  accountId: any;
  accountType: any;

  private currentModulesSubject: BehaviorSubject<any> = new BehaviorSubject<any>("");
  public currentModules: Observable<any>;

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
    if (localStorage.getItem('modules')) {
      let moduleDetails = CryptoJS.AES.decrypt(localStorage.getItem('modules'), environment.costplanner.encryptionKey).toString(CryptoJS.enc.Utf8);
      this.currentModulesSubject = new BehaviorSubject<any>(JSON.parse(moduleDetails));
      this.currentModules = this.currentModulesSubject.asObservable();
    }
  }


  public get currentModuleValue() {
    return this.currentModulesSubject.value;
  }

  getUserModules() {
    this.accountId = this.authenticationService.currentUserValue.user.id;
    this.accountType = this.authenticationService.currentUserValue.user.accountType;
    return this.http.get<any>(`${environment.costplanner.host}/module/get-user-modules/?userId=${this.accountId}&accountType=${this.accountType}`)
      .pipe(map(result => {
        if (result.status == 200) {
          if (result.data.length > 0) {
            let menues = result.data.map(item => {
              if (item.subModules.length <= 0) {
                return { id: item['cp_main_module.orderId'], label: item['cp_main_module.moduleName'], icon: item['cp_main_module.moduleIcon'], link: item['cp_main_module.moduleUrl'] };
              } else {
                return { id: item['cp_main_module.orderId'], label: item['cp_main_module.moduleName'], icon: item['cp_main_module.moduleIcon'], subItems: item['subModules'].map(item => { return { id: item.cp_sub_module.orderId, label: item.cp_sub_module.moduleName, link: item.cp_sub_module.moduleUrl, parentId: item.cp_sub_module.parentModule, } }) };
              }
            });
            localStorage.setItem('modules', CryptoJS.AES.encrypt(JSON.stringify(menues), environment.costplanner.encryptionKey).toString())
            this.currentModulesSubject = new BehaviorSubject<any>(JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('modules'), environment.costplanner.encryptionKey).toString(CryptoJS.enc.Utf8)));
            this.currentModules = this.currentModulesSubject.asObservable();
          }
        }
        return result;
      }))
  }

}
