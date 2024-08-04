import { Component, OnInit, ViewChild } from '@angular/core';
import { UserDto } from '../../../models/users';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { UserDetailComponent } from '../user-detail/user-detail.component';

import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTable, MatTableDataSource, MatTableModule} from '@angular/material/table';

import jspdf from "jspdf";
import html2canvas from "html2canvas";
import { RepotuserComponent } from '../../../reports/repotuser/repotuser.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {


  displayedColumns: string[] = ['usersPkId', 'usersStPassword', 'usersStStructure', 'usersStFonction','usersInEtatCompte','action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  user! : UserDto 
  isloading : boolean =true
  users: UserDto[]=[]
  userid = ''
  total: number =0

  constructor( private userservice: UserService, private route: Router, private dialogref:MatDialog) { }  
  
  ngOnInit(): void {

   this.getAllusers();

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
              this.users = result
              //console.log(this.users);
              //this.isloading = false
              //this.total = result.length*/
              this.dataSource =new MatTableDataSource<UserDto>(this.users);
              //this.dataSource =new MatTableDataSource(result);
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
            data:{ 
              usersPkId:''
            },
          }).afterClosed().subscribe(val=>{
            if(val==="save"){
              this.getAllusers();
            }
          })
      }
      

  EditUser(code : string){
        this.dialogref.open(UserDetailComponent,
          {
            width:'60%',
            data:{ 
              usersPkId:code
            },
          }).afterClosed().subscribe(val=>{
            if(val==="update"){
              this.getAllusers();
            }
          })
  }

  DeleteUsers(id: string){
        
        /*if(confirm("Vous voulez vraiment supprimer l'element?"))
        {
    
        console.log(id);

        this.userservice.deleteUserservice(id).subscribe(
        {          
            next: (result) => {
              alert("delete user");
              this.getAllusers();
            },
            error: (Response) =>{
              //console.log(Response);
              alert("erreur delete");
            }          
        })

        }*/

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
                    swalWithBootstrapButtons.fire({
                      title: "Deleted!",
                      text: "Your file has been deleted.",
                      icon: "success"
                    });
                    this.getAllusers();
                  },
                  error: (Response) =>{
                    //alert("erreur delete");
                    Swal.fire({
                      icon: "error",
                      title: "Oops...",
                      text: "Something went wrong!",
                      footer: '<a href="#">Why do I have this issue?</a>'
                    });
                  }          
              })
            
            
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

  /*public captureScreen() {
    var data = document.getElementById("contentToConvert");
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL("image/png");
      let pdf = new jspdf("p", "mm", "a4"); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
      pdf.save("MYPdf.pdf"); // Generated PDF
    });
  }*/

}
