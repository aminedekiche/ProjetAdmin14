import { Component, OnInit, ViewChild } from '@angular/core';
import { UserDto } from '../../../models/users';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { UserDetailComponent } from '../user-detail/user-detail.component';

import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTable, MatTableDataSource, MatTableModule} from '@angular/material/table';
import { FormControl, FormGroup } from '@angular/forms';
import { WilayaDto } from '../../../models/wilaya';
import { WilayaService } from '../../../services/wilaya.service';
import { environment } from '../../../../environments/environment';
import swal from 'sweetalert';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-user-list-critere',
  templateUrl: './user-list-critere.component.html',
  styleUrl: './user-list-critere.component.css'
})
export class UserListCritereComponent {

  displayedColumns: string[] = ['usersPkId', 'usersStPassword', 'usersStStructure', 'usersStFonction','usersInEtatCompte','usersStImageName','action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //user! : UserDto 
  //isloading : boolean =true
  users: UserDto[]=[]
  afficheralertmessage=false;
  affichersuccesmessage=false;  
  total: string ="0"
  registerForm !: FormGroup;
  wilayas: WilayaDto[]=[];
  imageUrl: string =environment.photoUrl;

  constructor( private userservice: UserService, private route: Router, private dialogref:MatDialog, private wilayaservice:WilayaService) { }  
  
  ngOnInit(): void {

    this.registerForm = new FormGroup({
      usersPkId: new FormControl(''),
      usersStPassword: new FormControl(''),
      usersStNom: new FormControl(''),
      usersStPrenom: new FormControl(''),
      usersStMatricule: new FormControl(''),
      usersStStructure: new FormControl(''),
      usersStFonction: new FormControl(''),
      usersStCodeStructure: new FormControl(''),
      usersStImageName: new FormControl(''),
      usersInEtatCompte: new FormControl(1)
    });
    this.getAllwilayas();
    //this.getAllusers();

  }

  NouvelleRech() {
    this.registerForm = new FormGroup({
      usersPkId: new FormControl(''),
      usersStPassword: new FormControl(''),
      usersStNom: new FormControl(''),
      usersStPrenom: new FormControl(''),
      usersStMatricule: new FormControl(''),
      usersStStructure: new FormControl(''),
      usersStFonction: new FormControl(''),
      usersStCodeStructure: new FormControl(''),
      usersStImageName: new FormControl(''),
      usersInEtatCompte: new FormControl(1)
    });

    this.dataSource =new MatTableDataSource();
    this.dataSource.paginator =null;
    this.dataSource.sort = null;
    this.affichersuccesmessage = false;
    this.afficheralertmessage = false;

    this.total ="0"
  }

  RechUsers() {
    this.affichersuccesmessage = false;
    this.afficheralertmessage = false;
    console.log(this.registerForm.value);
    this.userservice.getUsersbyCritereservice(this.registerForm.value).subscribe(
      {
      
        next: (result) => {
          console.log(result);
          if(result.length > 0)
          {
            this.dataSource =new MatTableDataSource(result);
            this.dataSource.paginator =this.paginator;
            this.dataSource.sort = this.sort;
            //this.affichersuccesmessage = true;
            this.total = result.length.toString()
          }
          else { 
            
            this.afficheralertmessage = true;
          
          }
          
          },
          error: (Response) =>{
            console.log(Response);            
            alert("erreur get list");
          }
        
      }
    )
  }

  getAllwilayas(){
    this.wilayaservice.getAllWilayaservice().subscribe(result=>
      {
      this.wilayas = result;
      //console.log(this.wilayas);    
      }
    )
  }

  

  PrintListe() {
    const url = this.route.serializeUrl(
      this.route.createUrlTree(['/repotuser'])
    );
  
    window.open(url, '_blank');
  }

  getAllusers(){
        this.userservice.getAllUsersservice().subscribe(
          {
          
            next: (result) => {
              /*this.users = result
              console.log(this.users);
              this.isloading = false
              this.total = result.length*/
              this.dataSource =new MatTableDataSource(result);
              this.dataSource.paginator =this.paginator;
              this.dataSource.sort = this.sort;

              },
              error: (Response) =>{
                console.log(Response);
                alert("erreur get list");
              }
            
          }
        )
  }

  applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      }

  imprimerlist() {
        throw new Error('Method not implemented.');
  }


  openDialogue(){
        this.dialogref.open(UserDetailComponent,
          {
            width:'60%',
            /*data:{
              animal:'panda',
            },*/
          }).afterClosed().subscribe(val=>{
            if(val==="save"){
              this.getAllusers();
            }
          })
      }
      

  EditUser(row : any){
        this.dialogref.open(UserDetailComponent,
          {
            width:'60%',
            data:row
          }).afterClosed().subscribe(val=>{
            if(val==="update"){
              this.getAllusers();
            }
          })
      }

  DeleteUsers(id: string){
        
        //if(confirm("Vous voulez vraiment supprimer l'element?"))
        //{    
        /*console.log(id);
        this.userservice.deleteUserservice(id).subscribe(
        {          
          next: (result) => {
              alert("delete user");
              this.getAllusers();
            },
            error: (Response) =>{
              alert("erreur delete");
            }          
        })*/

        //}

        //swal("Here's the title!", "...and here's the text!");

        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
          },
          buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
          title: "Are you sure?",
          text: "Vous voulez varaiment supprimer!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            
            this.userservice.deleteUserservice(id).subscribe(
              {          
                next: (result) => {
                    //alert("delete user");
                    this.getAllusers();
                  },
                  error: (Response) =>{
                    //alert("erreur delete");
                  }          
              })
            
            swalWithBootstrapButtons.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire({
              title: "Cancelled",
              text: "Your imaginary file is safe :)",
              icon: "error"
            });
          }
        });

  }
 
}





