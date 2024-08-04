import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { UserDto } from '../../../models/users';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WilayaDto } from '../../../models/wilaya';
import { WilayaService } from '../../../services/wilaya.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { NgToastService } from 'ng-angular-popup';
import { ToasterPosition } from 'ng-toasty';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.development';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit {
  [x: string]: any;

//upload file
  selectedFiles?: File;// FileList;
  selectedFileNames: string = "";// string[] = [];
  progressInfos: any[] = [];
  message: string =""; //string[] = [];
  previews: string ="";// string[] = [];
  imageUrl: string =environment.photoUrl;
  imageInfos?: Observable<any>;
  progress: number =0;
  message2 : string ="";
  @Output() public onUploadFinished = new EventEmitter();

//

  ToasterPosition = ToasterPosition; 
  PkId : string ='';
  title='formvalidation';
  selectedwilaya :number =0;
  submited=false;
  toStr = JSON.stringify;
  registerForm !: FormGroup;
  actionBtn : string = "save";
  wilayas: WilayaDto[]=[];
  photofilename : string ='';
  inputdata : any;
  photofile?: File;


  constructor(private wilayaservice: WilayaService,
    private toast:NgToastService,
    private userservice:UserService, 
    @Inject(MAT_DIALOG_DATA) public editData :any,
    private formbuilder: FormBuilder, 
    private router : Router, 
    private matdialogueref:MatDialogRef<UserDetailComponent>,private http: HttpClient){}
  
  ngOnInit(): void {
    
    //this.inputdata = this.editData;
    
    this.registerForm = this.formbuilder.group({
      usersPkId: ['', [Validators.required]], //, Validators.minLength(4)
      usersStPassword: ['', [Validators.required]],
      usersStNom: ['',],
      usersStPrenom: ['', ],
      usersStMatricule: ['',],
      usersStStructure: ['',],
      usersStFonction: ['',[Validators.required]],
      usersStCodeStructure:['',],
      usersStImageName: ['',],
      usersInEtatCompte:['1', [Validators.required]],
    });

    this.getAllwilayas();

    if(this.editData.usersPkId != "")
    {
      this.actionBtn = "update";
      //console.log(this.editData.usersPkId);
      this.setPopupData(this.editData.usersPkId);      
    }

    console.log(this.imageUrl);
  }
  
  setPopupData(data : string){

    this.userservice.getUserdetailsservice(data).subscribe(item=>{
      this.editData = item;
      //console.log(this.editData);

      this.registerForm.controls['usersPkId'].setValue(this.editData.usersPkId);
      this.registerForm.controls['usersStPassword'].setValue(this.editData.usersStPassword);
      this.registerForm.controls['usersStStructure'].setValue(this.editData.usersStStructure);
      this.registerForm.controls['usersStFonction'].setValue(this.editData.usersStFonction);
      this.registerForm.controls['usersInEtatCompte'].setValue(this.editData.usersInEtatCompte.toString());      
      this.registerForm.controls['usersStImageName'].setValue(this.editData.usersStImageName);
      this.selectedFileNames = this.editData.usersStImageName;
      this.previews= this.imageUrl + this.selectedFileNames;

    })
    
      
      //console.log(this.editData);
  }

  getAllwilayas(){
    this.wilayaservice.getAllWilayaservice().subscribe(result=>
      {
      this.wilayas = result;
      //console.log(this.wilayas);    
      }
    )
  }

  addUsers() {
    
    if(this.registerForm.valid)
    {
    
      if(!this.editData)
      {
        //console.log(this.addusersRequest);

        this.userservice.addUserservice(this.registerForm.value).subscribe(
          {
            next: (user) => {
            //this.affichersuccesmessage=true;
            //alert("user add");
            //this.success();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1500
            });
            this.registerForm.reset();
            this.matdialogueref.close('save');
            },
            error: (Response) =>{
              console.log(Response);
              this.error();
              alert("erreur add");
            }
            
          }
        );
      }
      else
      {      
        console.log(this.editData.usersPkId);
        this.userservice.updateUserservice(this.editData.usersPkId,
        this.registerForm.value)
        .subscribe({
          next: (Response) => {
            //this.router.navigate(['admin/userslist']);
            //this.affichersuccesmessage=true;
            //alert("user update");
            //this.success();
            Swal.fire({
              title: "Good job!",
              text: "You clicked the button!",
              icon: "success"
            });
            //},2000);
            this.registerForm.reset();
            this.matdialogueref.close('update');
          },
          error: (Response) =>{
            console.log(Response);
            //alert("erreur update");
            //this.afficheralertmessage=true;
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
              footer: '<a href="#">Why do I have this issue?</a>'
            });
            this.error();
          }
        })
        ;
      } 
    }
    else
    {
      //this.error();
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
    }
  
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

  selectFiles(event: any): void {
    //console.log(event.target.files);
    this.selectedFiles = event.target.files[0];
    this.message = "";// [];
    //this.progressInfos = [];
    this.selectedFileNames = "";// [];    
    this.previews = "";// [];    
    if (this.selectedFiles ) { //&& this.selectedFiles[0]
      //const numberOfFiles = this.selectedFiles.length;      
      //for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          //console.log(e.target.result);
          this.previews = e.target.result; //.push(e.target.result);
        };
        reader.readAsDataURL(this.selectedFiles);//this.selectedFiles[0]
        //console.log(this.selectedFiles);
        this.selectedFileNames = this.selectedFiles.name;//.push(this.selectedFiles[0].name);
        console.log(this.selectedFiles.name);
      //}

    }
  }

  

  /*upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    if (file) {
      this.uploadService.upload(file).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(
              (100 * event.loaded) / event.total
            );
          } else if (event instanceof HttpResponse) {
            const msg = 'Uploaded the file successfully: ' + file.name;
            this.message.push(msg);
            this.imageInfos = this.uploadService.getFiles();
          }
        },
        (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ' + file.name;
          this.message.push(msg);
        }
      );
    }
  }*/

  uploadFiles(): void {
    this.message = "";
    if (this.selectedFiles) {      
      let fileToUpload = <File>this.selectedFiles;
      const formData = new FormData();
      formData.append('file', fileToUpload, fileToUpload.name);    
      this.http.post('https://localhost:44389/api/Users/UploadFile', formData, {reportProgress: true, observe: 'events'})
        .subscribe({
          next: (event) => {          
          this.registerForm.controls['usersStImageName'].setValue(fileToUpload.name);
          this.previews= this.imageUrl + fileToUpload.name;
          //alert(this.previews);
          //this.toast.success("photo enregistrer")

          Swal.fire({
            title: "Good job!",
            text: "You clicked the button!",
            icon: "success"
          });

        },
        error: (err: HttpErrorResponse) => 
          { 
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
              footer: '<a href="#">Why do I have this issue?</a>'
            });
            console.log(err); 
          }
      });
      }
      else
      {
        alert('aucun fichier trouvé!')
      }
  }

}
