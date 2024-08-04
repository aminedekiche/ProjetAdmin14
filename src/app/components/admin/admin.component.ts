import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import { ToasterPosition } from 'ng-toasty';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  ToasterPosition = ToasterPosition; 
  username : string ='';

  constructor(private globale: GlobalService, private route: Router, private toast:NgToastService, private  authent:AuthService,) 
  { 
    
  }

  ngOnInit(): void {
    this.username = this.authent.getusertoken()!.toString();
    console.log(this.globale.Username);
    
  }

  gottologin() {
    localStorage.clear();
    //this._service.amine = false;
    this.route.navigate(['/login'])
  }

  getuserdetails() {
    this.username = this.authent.getusertoken()!.toString();
    this.route.navigate(['admin/user-profile/',this.username])
   }

}
