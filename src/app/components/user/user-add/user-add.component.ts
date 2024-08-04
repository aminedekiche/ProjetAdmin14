import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserDto } from '../../../models/users';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { WilayaDto } from '../../../models/wilaya';
import { WilayaService } from '../../../services/wilaya.service';
import Swal from 'sweetalert2';

@Component({
  
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.css',
  
})
export class UserAddComponent {

  
  selectedFile !: File ;
afficheralertmessage=false;
affichersuccesmessage=false;  
PkId : string ='';
title='formvalidation';
selectedwilaya :string ='';
submited=false;
toStr = JSON.stringify;
registerForm = new FormGroup({
  usersPkId: new FormControl(''),
  usersStPassword: new FormControl(''),
  usersStNom: new FormControl(''),
  usersStPrenom: new FormControl(''),
  usersStMatricule: new FormControl(''),
  usersStStructure: new FormControl(''),
  usersStFonction: new FormControl(''),
  usersStCodeStructure: new FormControl(''),
  usersInEtatCompte: new FormControl('')
});

wilayas: WilayaDto[]=[];

addusersRequest: UserDto={   
  usersPkId: '',
  usersStPassword: '',
  usersStNom: '',
  usersStPrenom: '',
  usersStMatricule: '',
  usersStStructure: '',
  usersStFonction: '',
  usersStCodeStructure: '',
  usersInEtatCompte: 1,
  usersStImageName:'',
  usersStProfile : ''
}


constructor( private formbuilder: FormBuilder,private route:ActivatedRoute,private userservice:UserService, private wilayaservice:WilayaService, private router : Router) {
     
}

ngOnInit(): void{

  
   //validators
  this.registerForm = this.formbuilder.group({
    usersPkId: ['', [Validators.required, Validators.minLength(4)]],
    usersStPassword: ['', [Validators.required, Validators.minLength(4)]],
    usersStNom: ['',],
    usersStPrenom: ['', ],
    usersStMatricule: ['',],
    usersStStructure: ['', [Validators.required]],
    usersStFonction: ['',],
    usersStCodeStructure: [''],
    usersInEtatCompte: ['', ]   
  });

  this.getAllwilayas();  

  console.log(Response);
  this.route.paramMap.subscribe({
    next: (params) => {
      const id= params.get('usersPkId');
      
      if(id){
        this.PkId = id.toString();
        this.userservice.getUserdetailsservice(id).subscribe({
          next:(Response) => {
            this.addusersRequest = Response;
            this.selectedwilaya = this.addusersRequest.usersStStructure;
            console.log(Response);
          }
        })
      }
    }
  })
}

getAllwilayas(){
  this.wilayaservice.getAllWilayaservice().subscribe(result=>
    {
    this.wilayas = result;
    //console.log(this.wilayas);    
    }
  )
}

Nouveau() {
  this.registerForm.valid
  this.registerForm.reset();
  this.PkId ='';
}

addUsers ()
{
  alert('salam');
  
  this.afficheralertmessage=false;
  this.affichersuccesmessage=false;
  this.submited=true;  
  if(this.registerForm.invalid)
  {
    //alert('mauvais');
    //this.afficheralertmessage=true;
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
      footer: '<a href="#">Why do I have this issue?</a>'
    });
    return;
  }
  else
  {      

    if(this.PkId == '') //create
    {
        console.log('nothing');         
        this.userservice.addUserservice(this.addusersRequest).subscribe(
          {
            next: (user) => {
            //console.log(employees);          
            //this.router.navigate(['/admin/userslist']);
            this.affichersuccesmessage=true;
            //toast().default('Title', 'Message!').show();
            //setTimeout(()=>{
              //this.affichersuccesmessage=false;
            //},2000);
            this.PkId  = user.usersPkId;
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1500
            });
            },
            error: (Response) =>{
              console.log(Response);
              this.afficheralertmessage=true;
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: '<a href="#">Why do I have this issue?</a>'
              });
            }
            
          }
        );
      }
      else //update
      {
        console.log(this.addusersRequest.usersPkId);   
          this.userservice.updateUserservice(this.addusersRequest.usersPkId,
            this.addusersRequest)
            .subscribe({
              next: (Response) => {
                //this.router.navigate(['admin/userslist']);
                this.affichersuccesmessage=true;
                //setTimeout(()=>{
                 // this.affichersuccesmessage=false;
                //},2000);
                Swal.fire({
                  title: "Good job!",
                  text: "You clicked the button!",
                  icon: "success"
                });
              },
              error: (Response) =>{
                console.log(Response);
                this.afficheralertmessage=true;
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Something went wrong!",
                  footer: '<a href="#">Why do I have this issue?</a>'
                });
              }
            });
        
      }
  }
  

}

onSelectFile(fileInput: any) {
  this.selectedFile = <File>fileInput.target.files[0];
}


}

