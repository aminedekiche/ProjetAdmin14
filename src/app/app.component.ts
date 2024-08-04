import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { ToasterPosition } from 'ng-toasty';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit  {
[x: string]: any;

  title = 'e-commerce';
  cacacher = false;
  authentifier = false;
  formulaire!: FormGroup;
  ToasterPosition = ToasterPosition; 

  constructor(private fb:FormBuilder, private toast:NgToastService) { 
    this.formulaire = this.fb.group({
      email: ['dekiche.info@gmail.com', Validators.required],
      passe: ['12456']
    })

  }

  ngOnInit(): void {
    console.log(this.authentifier);
  }

  send() {
    
    var email= this.formulaire.controls['email'].value;
    var passe= this.formulaire.controls['passe'].value;
    console.log(email, passe)

      this.authentifier = true;    

    }

  cacher() {
    //throw new Error('Method not implemented.');
    if(this.cacacher==true)  this.cacacher=false;
    else this.cacacher=true;

  }

  error(){
    this.toast.danger("This is new error message"); // by default visible duration is 2000ms
  }

  success(){
    this.toast.success("This is new error Success", "SUCCESS", 5000) // message with title and 5000ms duration
  }

  info(){
    this.toast.info("This is new error Info", "INFO", 5000)
  }

  warning(){
    this.toast.warning("This is new Warning message", "WARNING", 5000)
  }
  
}


