import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { ToasterPosition } from 'ng-toasty';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {

  cacacher = false;
  authentifier = false;
  submited=false;

  formulaire = new FormGroup({
    usersPkId: new FormControl(''),
    usersStPassword: new FormControl('')
  });

  ToasterPosition = ToasterPosition; 

  constructor(private fb:FormBuilder, private toast:NgToastService, private route: Router, private authent:AuthService, private globale:GlobalService) { 
    
  }

ngOnInit() : void{
  this.formulaire = this.fb.group({
    usersPkId: ['', [Validators.required]],
    usersStPassword: ['', [Validators.required]]
  })
}



connexion (){  

  this.submited=true;

    if(this.formulaire.valid)
    {
      console.log(this.formulaire.value);
      this.authent.Signin(this.formulaire.value).subscribe({
        next:(res) => {
          console.log(res);
          //this.globale.Username = this.formulaire.value.usersPkId!.toString(); 
          //console.log(this.globale.Username);
          //this.formulaire.reset();
          
          this.authent.Storetoken(res.token);
          this.authent.Storeusertoken(this.formulaire.value.usersPkId!.toString());
          this.route.navigate(['admin/dashboard']);
          this.toast.success("Bienvenue a notre site");
        },
        error:(err)=>{
          //this.toast.warning(err.status);
          if(err.status == '500') this.toast.warning("erreur base de donnees!");
          if(err.status == '0') this.toast.warning("erreur backend!");
          if(err.status == '404') this.toast.warning("user name incorrecre!");
          if(err.status == '400') this.toast.warning("mot passe incorrecrt!");
          console.log(err.message);
        }
      })
    }else{
      console.log("n'est pas valide");
    }
      //this.route.navigate(['admin/dashboard']);
}



}
